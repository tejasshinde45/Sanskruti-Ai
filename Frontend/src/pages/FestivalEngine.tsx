import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Sparkles, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllFestivals, Festival } from '@/lib/festivalData';
import { useSEO } from '@/hooks/useSEO';

export default function FestivalEngine() {
  const [selectedFestival, setSelectedFestival] = useState<Festival | null>(null);
  const festivals = getAllFestivals();

  useSEO({
    title: 'Festival Intelligence',
    description: 'Discover the stories, rituals, and significance of Indian festivals across the diverse cultural landscape of Bharat.',
    keywords: 'indian festivals, diwali, holi, navratri, hindu festivals, cultural heritage, rituals'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-md mb-2">
          Cultural Heritage
        </Badge>
        <h1 className="text-4xl font-bold cinzel-text text-foreground mb-2">Festival Intelligence Engine</h1>
        <p className="text-muted-foreground">Discover the stories, rituals, and significance of Indian festivals</p>
      </motion.div>

      {/* Festival Grid */}
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } }
        }}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {festivals.map((festival, index) => (
          <motion.div
            key={festival.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => setSelectedFestival(festival)}
            className="cursor-pointer group"
          >
            <Card className="p-6 h-full glass-panel hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)] transition-all duration-500 border-2 border-transparent hover:border-primary/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold cinzel-text text-foreground group-hover:text-primary transition-colors">{festival.name}</h3>
                    <p className="text-sm text-primary font-medium mt-1">{festival.date}</p>
                  </div>
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{festival.description}</p>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary border-none">
                    {festival.category}
                  </Badge>
                  {festival.regions.slice(0, 2).map((region) => (
                    <Badge key={region} variant="outline" className="text-xs border-primary/30 text-foreground/80">
                      <MapPin className="w-3 h-3 mr-1" />
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Festival Details Modal */}
      {selectedFestival && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFestival(null)}
        >
          <Card
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-panel border border-primary/30 shadow-[0_0_50px_hsl(var(--primary)/0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 space-y-8 relative">
              {/* Decorative background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <h2 className="text-4xl font-bold cinzel-text text-foreground">{selectedFestival.name}</h2>
                  <p className="text-primary font-medium mt-2">{selectedFestival.date} • {selectedFestival.month}</p>
                </div>
                <Badge className="bg-primary text-primary-foreground text-sm px-3 py-1 shadow-lg shadow-primary/20">{selectedFestival.category}</Badge>
              </div>

              <Tabs defaultValue="overview" className="w-full relative z-10">
                <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-card data-[state=active]:text-primary rounded-lg transition-all">Overview</TabsTrigger>
                  <TabsTrigger value="rituals" className="data-[state=active]:bg-card data-[state=active]:text-primary rounded-lg transition-all">Rituals</TabsTrigger>
                  <TabsTrigger value="food" className="data-[state=active]:bg-card data-[state=active]:text-primary rounded-lg transition-all">Food</TabsTrigger>
                  <TabsTrigger value="mythology" className="data-[state=active]:bg-card data-[state=active]:text-primary rounded-lg transition-all">Mythology</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 cinzel-text text-xl">
                      <Info className="w-5 h-5 text-primary" />
                      Description
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedFestival.description}</p>
                  </div>

                  <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 cinzel-text text-xl">
                      <Sparkles className="w-5 h-5 text-secondary" />
                      Significance
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{selectedFestival.significance}</p>
                  </div>

                  <div className="p-6 rounded-xl bg-card/50 border border-border/50">
                    <h3 className="font-bold text-foreground mb-3 flex items-center gap-2 cinzel-text text-xl">
                      <MapPin className="w-5 h-5 text-accent" />
                      Regions
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedFestival.regions.map((region) => (
                        <Badge key={region} variant="outline" className="border-accent/40 text-foreground/80">{region}</Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rituals" className="space-y-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-bold text-foreground mb-4 cinzel-text text-2xl">Traditional Rituals</h3>
                  {selectedFestival.rituals.map((ritual, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-card/50 border border-border/50 rounded-xl hover:bg-card/80 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0 border border-primary/30">
                        {index + 1}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{ritual}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="food" className="space-y-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-bold text-foreground mb-4 cinzel-text text-2xl">Traditional Foods</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedFestival.foods.map((food) => (
                      <div key={food} className="p-4 bg-card/50 border border-border/50 rounded-xl text-center hover:border-primary/50 transition-colors hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] group">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">{food}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mythology" className="space-y-4 mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h3 className="font-bold text-foreground mb-4 cinzel-text text-2xl">Mythological Story</h3>
                  <div className="p-8 bg-theme-gradient-secondary rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                    <p className="text-white/90 leading-relaxed relative z-10 text-lg font-light tracking-wide">{selectedFestival.mythology}</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
