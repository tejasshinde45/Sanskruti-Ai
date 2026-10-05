import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, Calendar, Utensils, Music, Users, Sparkles, Paintbrush } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSEO } from '@/hooks/useSEO';

const states = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    region: 'Western India',
    capital: 'Mumbai',
    festivals: ['Ganesh Chaturthi', 'Gudi Padwa', 'Diwali'],
    dances: ['Lavani', 'Koli', 'Tamasha'],
    foods: ['Vada Pav', 'Pav Bhaji', 'Puran Poli', 'Misal Pav'],
    heroes: ['Chhatrapati Shivaji Maharaj', 'Dr. B.R. Ambedkar', 'Jyotiba Phule'],
    art: ['Warli Painting', 'Paithani Sarees'],
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'tamilnadu',
    name: 'Tamil Nadu',
    region: 'Southern India',
    capital: 'Chennai',
    festivals: ['Pongal', 'Deepavali', 'Navaratri'],
    dances: ['Bharatanatyam', 'Karagattam'],
    foods: ['Idli', 'Dosa', 'Sambar', 'Chettinad Cuisine'],
    heroes: ['Thiruvalluvar', 'Subramania Bharati', 'A.P.J. Abdul Kalam'],
    art: ['Tanjore Painting', 'Kolam'],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'punjab',
    name: 'Punjab',
    region: 'Northern India',
    capital: 'Chandigarh',
    festivals: ['Baisakhi', 'Lohri', 'Diwali'],
    dances: ['Bhangra', 'Giddha'],
    foods: ['Sarson da Saag', 'Makki di Roti', 'Chole Bhature', 'Lassi'],
    heroes: ['Guru Nanak Dev', 'Maharaja Ranjit Singh', 'Bhagat Singh'],
    art: ['Phulkari Embroidery'],
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'westbengal',
    name: 'West Bengal',
    region: 'Eastern India',
    capital: 'Kolkata',
    festivals: ['Durga Puja', 'Kali Puja', 'Poila Boishakh'],
    dances: ['Rabindra Nritya', 'Chhau'],
    foods: ['Rasgulla', 'Mishti Doi', 'Fish Curry', 'Sandesh'],
    heroes: ['Rabindranath Tagore', 'Netaji Subhas Chandra Bose', 'Swami Vivekananda'],
    art: ['Kalighat Painting', 'Terracotta'],
    color: 'from-green-500 to-teal-500'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    region: 'Northern India',
    capital: 'Jaipur',
    festivals: ['Teej', 'Gangaur', 'Pushkar Fair'],
    dances: ['Ghoomar', 'Kalbelia'],
    foods: ['Dal Baati Churma', 'Laal Maas', 'Ghevar', 'Ker Sangri'],
    heroes: ['Maharana Pratap', 'Rani Padmini', 'Mirabai'],
    art: ['Miniature Painting', 'Blue Pottery'],
    color: 'from-pink-500 to-purple-500'
  },
  {
    id: 'kerala',
    name: 'Kerala',
    region: 'Southern India',
    capital: 'Thiruvananthapuram',
    festivals: ['Onam', 'Vishu', 'Thrissur Pooram'],
    dances: ['Kathakali', 'Mohiniyattam', 'Theyyam'],
    foods: ['Appam', 'Puttu', 'Fish Moilee', 'Sadya'],
    heroes: ['Adi Shankaracharya', 'Sree Narayana Guru'],
    art: ['Mural Painting', 'Aranmula Kannadi'],
    color: 'from-emerald-500 to-green-500'
  }
];

export default function CulturalMap() {
  const [selectedState, setSelectedState] = useState(states[0]);

  useSEO({
    title: 'Cultural Map of India',
    description: 'Explore the diverse traditions, heroes, art, and heritage across different states and regions of India.',
    keywords: 'india cultural map, indian states, maharashtra culture, punjab culture, tamil nadu culture, indian heritage'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md mb-2">
          Heritage Explorer
        </Badge>
        <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2">Region-Wise Cultural Map</h1>
        <p className="text-muted-foreground">Explore the diverse traditions, heroes, and heritage across India</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* State Selection */}
        <div className="lg:col-span-1">
          <Card className="p-6 glass-panel border-primary/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>

            <h2 className="text-xl font-bold cinzel-text text-foreground mb-4 flex items-center gap-2 relative z-10">
              <Map className="w-6 h-6 text-primary" />
              Select a State
            </h2>

            <div className="space-y-3 relative z-10">
              {states.map((state) => (
                <motion.button
                  key={state.id}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedState(state)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 border-2 ${selectedState.id === state.id
                      ? `bg-primary border-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.4)]`
                      : 'bg-card/40 border-border/50 text-foreground hover:bg-card hover:border-primary/50 hover:shadow-md'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-bold ${selectedState.id === state.id ? 'text-primary-foreground' : 'text-foreground'}`}>
                        {state.name}
                      </p>
                      <p className={`text-xs font-medium uppercase tracking-wider mt-1 ${selectedState.id === state.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {state.region}
                      </p>
                    </div>
                    <MapPin className={`w-5 h-5 ${selectedState.id === state.id ? 'text-primary-foreground' : 'text-primary opacity-70'}`} />
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>
        </div>

        {/* State Details */}
        <div className="lg:col-span-2">
          <motion.div
            key={selectedState.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 glass-panel border-primary/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="space-y-8 relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-bold cinzel-text text-foreground">{selectedState.name}</h2>
                    <p className="text-secondary font-medium mt-2 text-lg uppercase tracking-wider">{selectedState.region}</p>
                    <Badge className="mt-4 bg-primary/20 text-primary border-primary/40 backdrop-blur-sm px-3 py-1 font-medium text-sm">
                      Capital: {selectedState.capital}
                    </Badge>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-theme-gradient-secondary flex items-center justify-center p-[2px] shadow-[0_0_20px_hsl(var(--secondary)/0.3)]">
                    <div className="w-full h-full bg-card/80 backdrop-blur-xl rounded-full flex items-center justify-center">
                      <MapPin className="w-10 h-10 text-secondary drop-shadow-[0_0_8px_hsl(var(--secondary)/0.5)]" />
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="festivals" className="w-full">
                  <TabsList className="grid w-full grid-cols-5 bg-card/50 border border-border/50 rounded-xl p-1 h-auto relative z-20">
                    <TabsTrigger value="festivals" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline font-semibold">Festivals</span>
                    </TabsTrigger>
                    <TabsTrigger value="dances" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
                      <Music className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline font-semibold">Dances</span>
                    </TabsTrigger>
                    <TabsTrigger value="foods" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
                      <Utensils className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline font-semibold">Foods</span>
                    </TabsTrigger>
                    <TabsTrigger value="heroes" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline font-semibold">Heroes</span>
                    </TabsTrigger>
                    <TabsTrigger value="art" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 transition-all">
                      <Paintbrush className="w-4 h-4 mr-2" />
                      <span className="hidden md:inline font-semibold">Art</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="festivals" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <h3 className="font-bold cinzel-text text-xl text-foreground flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-accent" />
                        Major Festivals
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedState.festivals.map((festival) => (
                          <div key={festival} className="p-5 bg-card/40 rounded-xl border border-border/50 hover:border-accent/40 hover:bg-accent/5 transition-all group">
                            <div className="flex items-center gap-3">
                              <Calendar className="w-6 h-6 text-accent group-hover:scale-110 transition-transform" />
                              <p className="font-bold text-foreground text-lg">{festival}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="dances" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <h3 className="font-bold cinzel-text text-xl text-foreground flex items-center gap-2">
                        <Music className="w-5 h-5 text-secondary" />
                        Traditional Dances
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedState.dances.map((dance) => (
                          <div key={dance} className="p-5 bg-card/40 rounded-xl border border-border/50 hover:border-secondary/40 hover:bg-secondary/5 transition-all group">
                            <div className="flex items-center gap-3">
                              <Music className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                              <p className="font-bold text-foreground text-lg">{dance}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="foods" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <h3 className="font-bold cinzel-text text-xl text-foreground flex items-center gap-2">
                        <Utensils className="w-5 h-5 text-primary" />
                        Traditional Cuisine
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedState.foods.map((food) => (
                          <div key={food} className="p-5 bg-card/40 rounded-xl border border-border/50 text-center hover:border-primary/40 hover:bg-primary/5 transition-all group">
                            <Utensils className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <p className="font-bold text-foreground">{food}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="heroes" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <h3 className="font-bold cinzel-text text-xl text-foreground flex items-center gap-2">
                        <Users className="w-5 h-5 text-accent" />
                        Cultural Heroes
                      </h3>
                      <div className="space-y-3">
                        {selectedState.heroes.map((hero) => (
                          <div key={hero} className="p-4 bg-card/40 rounded-xl border border-border/50 hover:border-accent/40 hover:bg-accent/5 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-theme-gradient-secondary flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                {hero.charAt(0)}
                              </div>
                              <p className="font-bold text-foreground text-lg tracking-wide">{hero}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="art" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                      <h3 className="font-bold cinzel-text text-xl text-foreground flex items-center gap-2">
                        <Paintbrush className="w-5 h-5 text-secondary" />
                        Traditional Art Forms
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedState.art.map((artForm) => (
                          <div key={artForm} className="p-5 bg-theme-gradient-secondary rounded-xl shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all group-hover:bg-black/30"></div>
                            <div className="relative z-10 flex items-center gap-3">
                              <Paintbrush className="w-6 h-6 text-secondary" />
                              <p className="font-bold text-white text-lg tracking-wide drop-shadow-sm">{artForm}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
