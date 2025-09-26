'use client';

import { useState } from 'react';
import { Globe, ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const categories = [
  {
    name: "Astrologie",
    description: "Ontdek wat de sterren voor jou in petto hebben. Persoonlijke horoscopen en astrologische begeleiding.",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    count: 24,
    image: "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Horoscoop", "Sterrenbeelden", "Planeten"]
  },
  {
    name: "Burn-out coaching",
    description: "Professionele begeleiding bij burn-out klachten. Herstel je energie en vind je balans terug.",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    count: 18,
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Stress", "Herstel", "Balans"]
  },
  {
    name: "Geluk en welzijn",
    description: "Vind je weg naar meer geluk en welzijn in je dagelijks leven. Praktische tips en begeleiding.",
    color: "bg-green-100 text-green-800 border-green-200",
    count: 32,
    image: "https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Geluk", "Welzijn", "Positief denken"]
  },
  {
    name: "Levensvragen",
    description: "Grote en kleine levensvragen bespreken met ervaren adviseurs. Krijg duidelijkheid over je pad.",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    count: 45,
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Levensdoel", "Richting", "Keuzes"]
  },
  {
    name: "Liefde & Relatie",
    description: "Relatieproblemen, liefdesverdriet of op zoek naar de ware? Krijg inzicht in je liefdesleven.",
    color: "bg-pink-100 text-pink-800 border-pink-200",
    count: 38,
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Liefde", "Relaties", "Zielsverwant"]
  },
  {
    name: "Life coaching",
    description: "Persoonlijke ontwikkeling en doelen bereiken met professionele life coaches.",
    color: "bg-indigo-100 text-indigo-800 border-indigo-200",
    count: 29,
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Doelen", "Groei", "Motivatie"]
  },
  {
    name: "Luisterend oor",
    description: "Soms heb je gewoon iemand nodig die naar je luistert. Veilige ruimte om je verhaal te delen.",
    color: "bg-teal-100 text-teal-800 border-teal-200",
    count: 22,
    image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Luisteren", "Steun", "Begrip"]
  },
  {
    name: "Spiritualiteit",
    description: "Spirituele begeleiding en ontwikkeling. Ontdek je spirituele pad en innerlijke wijsheid.",
    color: "bg-violet-100 text-violet-800 border-violet-200",
    count: 41,
    image: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Spiritueel", "Meditatie", "Bewustzijn"]
  },
  {
    name: "Sterrenbeelden",
    description: "Alles over sterrenbeelden en hun invloed op je persoonlijkheid en leven.",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    count: 16,
    image: "https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Sterrenbeeld", "Karakter", "Compatibiliteit"]
  },
  {
    name: "Stress coaching",
    description: "Leer omgaan met stress en spanning. Praktische technieken voor een rustiger leven.",
    color: "bg-red-100 text-red-800 border-red-200",
    count: 21,
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Stress", "Ontspanning", "Mindfulness"]
  },
  {
    name: "Tarot & Kaartleggingen",
    description: "Inzicht in je toekomst en huidige situatie door ervaren tarotlezers en kaartleggers.",
    color: "bg-emerald-100 text-emerald-800 border-emerald-200",
    count: 35,
    image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Tarot", "Kaarten", "Voorspelling"]
  },
  {
    name: "Zielsverwanten",
    description: "Op zoek naar je zielsverwant? Krijg inzicht in liefde en spirituele verbindingen.",
    color: "bg-rose-100 text-rose-800 border-rose-200",
    count: 14,
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
    tags: ["Zielsverwant", "Liefde", "Verbinding"]
  }
];

export default function SpecialtiesPage() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');

  const translations = {
    nl: {
      title: "Alle Specialiteiten",
      subtitle: "Ontdek onze verschillende specialiteiten en vind de perfecte begeleiding voor jouw situatie",
      consultants: "consultants",
      viewConsultants: "Bekijk Consultants",
      popularCategories: "Populaire Categorieën",
      allCategories: "Alle Categorieën"
    },
    en: {
      title: "All Specialties",
      subtitle: "Discover our different specialties and find the perfect guidance for your situation",
      consultants: "consultants",
      viewConsultants: "View Consultants",
      popularCategories: "Popular Categories",
      allCategories: "All Categories"
    }
  };

  const t = translations[language];

  const popularCategories = categories
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                TopMediumVisie
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/consultants" className="text-white/90 hover:text-white font-medium transition-colors">
                {language === 'nl' ? 'Consultants' : 'Consultants'}
              </Link>
              <Link href="/specialties" className="text-white font-medium">
                {language === 'nl' ? 'Specialiteiten' : 'Specialties'}
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-white font-medium transition-colors">
                Blog
              </Link>
              <Link href="/support" className="text-white/90 hover:text-white font-medium transition-colors">
                {language === 'nl' ? 'Hulp' : 'Support'}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
                className="flex items-center space-x-1 text-white hover:bg-blue-700"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'nl' ? 'EN' : 'NL'}</span>
              </Button>
              
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  {language === 'nl' ? 'Dashboard' : 'Dashboard'}
                </Button>
              </Link>
              
              <Link href="/auth/login">
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  {language === 'nl' ? 'Inloggen' : 'Login'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.popularCategories}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCategories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className={`${category.color} mb-2`}>
                      <Users className="h-3 w-3 mr-1" />
                      {category.count} {t.consultants}
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">{category.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {category.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link href={`/consultants?specialty=${encodeURIComponent(category.name)}`}>
                    <Button className="w-full group-hover:bg-blue-700 transition-colors">
                      {t.viewConsultants}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Categories Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t.allCategories}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={`/consultants?specialty=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full group border-2 hover:border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <Badge className={`${category.color} text-sm font-medium px-3 py-1`}>
                        <Users className="h-3 w-3 mr-1" />
                        {category.count}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {category.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 justify-center">
                      {category.tags.slice(0, 2).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {language === 'nl' ? 'Niet gevonden wat je zoekt?' : "Can't find what you're looking for?"}
          </h2>
          <p className="text-xl mb-6 opacity-90">
            {language === 'nl' 
              ? 'Bekijk alle beschikbare consultants of neem contact met ons op'
              : 'Browse all available consultants or contact us'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultants">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {language === 'nl' ? 'Alle Consultants' : 'All Consultants'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/support/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                {language === 'nl' ? 'Contact Opnemen' : 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}