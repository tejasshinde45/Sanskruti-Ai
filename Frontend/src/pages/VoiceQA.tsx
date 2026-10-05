import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, Send, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const sampleQuestions = [
  'What is the meaning of Namaste?',
  'Tell me about the significance of Diwali',
  'What are the benefits of yoga?',
  'Explain the concept of Karma',
  'What is Ayurveda?'
];

import { answerQuestion } from '@/lib/gemini';
import { toast } from 'sonner';
import { useSEO } from '@/hooks/useSEO';

// At the top of the file, outside component:
const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';
// Default "Adam" (Guaranteed to work on all free accounts).
const ELEVENLABS_VOICE_ID = 'pNInz6obpgDQGcFmaJgB';

export default function VoiceQA() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useSEO({
    title: 'Voice Oracle',
    description: 'Ask questions in your language and get AI-powered audio responses about Indian culture, mythology, and philosophy.',
    keywords: 'voice ai, spiritual questions, hindi ai, cultural questions, hinduism ai oracle'
  });

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    try {
      let aiResponse = "";
      
      // Hardcoded quick question responses
      const textLower = text.toLowerCase();
      if (textLower.includes("namaste")) {
        aiResponse = "Namaste is a beautiful ancient greeting. It means 'I bow to the divine within you,' recognizing that we all share the same spiritual essence.";
      } else if (textLower.includes("diwali")) {
        aiResponse = "Diwali is the grand Festival of Lights. It celebrates the victory of light over darkness and Lord Rama's return to Ayodhya, filling our hearts with hope and prosperity.";
      } else if (textLower.includes("yoga")) {
        aiResponse = "Yoga is far more than physical exercise. It is a profound spiritual science designed to harmonize your body, mind, and soul, bringing deep inner peace.";
      } else if (textLower.includes("karma")) {
        aiResponse = "Karma is the universal law of cause and effect. Every thought and action creates energy that eventually returns to us, teaching us to live with love and responsibility.";
      } else if (textLower.includes("ayurveda")) {
        aiResponse = "Ayurveda is India's ancient science of life. It teaches us how to live in perfect harmony with nature by balancing our body's energies through natural herbs and lifestyle.";
      } else {
        // Only call the AI for new, custom questions!
        aiResponse = await answerQuestion(text);
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      speakText(aiResponse); // Auto-play the audio when generated!
    } catch (error: any) {
      toast.error(error.message || "Failed to connect to the Sage AI.");
    } finally {
      setIsThinking(false);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognitionConstructor();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Automatically send the message after speaking!
        handleSendMessage(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = async (text: string) => {
    if (isSpeaking) return;

    if (ELEVENLABS_API_KEY) {
      setIsSpeaking(true);
      try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}?optimize_streaming_latency=1`, {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.35,  // Lowered for more emotional variance
              similarity_boost: 0.85, // Kept high so it sounds clear
              use_speaker_boost: true
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("ElevenLabs Error Data:", errorData);
          throw new Error(errorData.detail?.message || errorData.detail?.status || "ElevenLabs API failed");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const audio = new Audio(url);
        
        audio.onended = () => setIsSpeaking(false);
        audio.play();
      } catch (error: any) {
        console.error("ElevenLabs error details:", error);
        toast.error(`ElevenLabs Error: ${error.message}`);
        // Fallback to browser TTS
        fallbackSpeakText(text);
      }
    } else {
      console.warn("ElevenLabs API Key is missing. Falling back to browser TTS.");
      toast.warning("ElevenLabs API Key missing! Using basic voice.");
      fallbackSpeakText(text);
    }
  };

  const fallbackSpeakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md mb-2">
          Interactive Oracle
        </Badge>
        <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2">Voice-Based Q&A</h1>
        <p className="text-muted-foreground">Ask questions in your language and get audio responses</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col glass-panel border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            {/* Messages */}
            <ScrollArea className="flex-1 p-6 relative z-10">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_20px_hsl(var(--primary)/0.15)]">
                      <MessageSquare className="w-12 h-12 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold cinzel-text text-foreground">Start a Conversation</h3>
                      <p className="text-muted-foreground mt-2 max-w-xs mx-auto">Ask anything about Indian culture, history, and ancient traditions.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`p-5 rounded-2xl shadow-sm border ${message.type === 'user'
                            ? 'bg-primary text-primary-foreground border-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.3)]'
                            : 'bg-card/60 backdrop-blur-sm text-foreground border-border/50 shadow-inner'
                          }`}>
                          <p className={`text-base leading-relaxed ${message.type === 'user' ? 'font-medium' : ''}`}>{message.content}</p>
                        </div>
                        {message.type === 'assistant' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => speakText(message.content)}
                            className="mt-2 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                            disabled={isSpeaking}
                          >
                            <Volume2 className={`w-4 h-4 mr-2 ${isSpeaking ? 'animate-pulse text-primary' : ''}`} />
                            {isSpeaking ? 'Speaking...' : 'Listen'}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] order-1">
                        <div className="p-5 rounded-2xl shadow-sm border bg-card/60 backdrop-blur-sm text-foreground border-border/50 shadow-inner flex items-center gap-3">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                          <span className="text-sm text-muted-foreground font-medium cinzel-text">The Sage is contemplating...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border/30 bg-card/30 backdrop-blur-md relative z-10">
              <div className="flex gap-3">
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(inputText);
                    }
                  }}
                  placeholder="Ask a question or use voice input..."
                  className="resize-none border-border/50 bg-background/50 focus-visible:ring-primary text-foreground placeholder:text-muted-foreground rounded-xl"
                  rows={2}
                />
                <div className="flex flex-col gap-2 shrink-0 justify-center">
                  <Button
                    onClick={isListening ? stopListening : startListening}
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    className={`rounded-xl transition-all ${isListening ? 'animate-pulse shadow-[0_0_15px_hsl(var(--destructive)/0.5)]' : 'border-primary/50 text-primary hover:bg-primary/20'}`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </Button>
                  <Button
                    onClick={() => handleSendMessage(inputText)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md rounded-xl transition-all hover:shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                    size="icon"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
              {isListening && (
                <p className="text-xs text-primary mt-3 text-center animate-pulse font-medium tracking-wide flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                  Listening to your voice...
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 glass-panel border-primary/20 bg-primary/5 hover:border-primary/40 transition-colors duration-500">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2 cinzel-text text-xl">
              <Mic className="w-6 h-6 text-primary" />
              Quick Questions
            </h3>
            <div className="space-y-3">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 bg-card/60 border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-[0_0_10px_hsl(var(--primary)/0.15)]"
                  onClick={() => handleSendMessage(question)}
                >
                  <span className="text-sm font-medium whitespace-break-spaces">{question}</span>
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 glass-panel border-secondary/20 bg-theme-gradient-secondary overflow-hidden relative">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
            <div className="relative z-10">
              <h3 className="font-bold text-white mb-5 cinzel-text text-xl">Features</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  <Badge variant="outline" className="bg-secondary/20 border-secondary/40 text-secondary w-6 h-6 p-0 flex justify-center items-center rounded-full">✓</Badge>
                  Voice input support
                </div>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  <Badge variant="outline" className="bg-secondary/20 border-secondary/40 text-secondary w-6 h-6 p-0 flex justify-center items-center rounded-full">✓</Badge>
                  Text-to-speech responses
                </div>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  <Badge variant="outline" className="bg-secondary/20 border-secondary/40 text-secondary w-6 h-6 p-0 flex justify-center items-center rounded-full">✓</Badge>
                  Multi-language support
                </div>
                <div className="flex items-center gap-3 text-white/90 font-medium">
                  <Badge variant="outline" className="bg-secondary/20 border-secondary/40 text-secondary w-6 h-6 p-0 flex justify-center items-center rounded-full">✓</Badge>
                  Cultural knowledge base
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
