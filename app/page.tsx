'use client';

import { useState } from 'react';
import { Search, Star, Clock, MessageCircle, Phone, Mail, Filter, Globe, Users, Award, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

const featuredConsultants = [
  {
    id: 1,
    name: "Maria van der Berg",
    specialty: "Medium & Helderziende",
    rating: 4.8,
    reviews: 156,
    pricePerMin: 2.50,
    availability: "online",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialties: ["Medium", "Helderziend", "Tarot"]
  },
  {
    id: 2,
    name: "David Klaasen",
    specialty: "Life Coach & Spiritueel Adviseur",
    rating: 4.9,
    reviews: 203,
    pricePerMin: 3.00,
    availability: "online",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialties: ["Life Coaching", "Spiritualiteit", "Burn-out"]
  },
  {
    id: 3,
    name: "Sophie Janssen",
    specialty: "Tarotlezer & Energetisch Therapeut",
    rating: 4.7,
    reviews: 89,
    pricePerMin: 2.25,
    availability: "online",
    image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
    specialties: ["Tarot", "Energetisch", "Chakra's"]
  }
];

const categories = [
  { name: "Astrologie", color: "bg-purple-100 text-purple-800", count: 24 },
  { name: "Burn-out coaching", color: "bg-orange-100 text-orange-800", count: 18 },
  { name: "Geluk en welzijn", color: "bg-green-100 text-green-800", count: 32 },
  { name: "Levensvragen", color: "bg-blue-100 text-blue-800", count: 45 },
  { name: "Liefde & Relatie", color: "bg-pink-100 text-pink-800", count: 38 },
  { name: "Life coaching", color: "bg-indigo-100 text-indigo-800", count: 29 },
  { name: "Luisterend oor", color: "bg-teal-100 text-teal-800", count: 22 },
  { name: "Spiritualiteit", color: "bg-violet-100 text-violet-800", count: 41 },
  { name: "Sterrenbeelden", color: "bg-yellow-100 text-yellow-800", count: 16 },
  { name: "Stress coaching", color: "bg-red-100 text-red-800", count: 21 },
  { name: "Tarot & Kaartleggingen", color: "bg-emerald-100 text-emerald-800", count: 35 },
  { name: "Zielsverwanten", color: "bg-rose-100 text-rose-800", count: 14 }
];

const translations = {
  nl: {
    heroTitle: "Vind je perfecte spirituele adviseur",
    heroSubtitle: "Verbind met ervaren mediums, helderzienden en life coaches voor persoonlijke begeleiding",
    createFreeAccount: "Maak gratis account aan",
    searchPlaceholder: "Zoek naar specialiteit, naam of trefwoord...",
    featuredConsultants: "Uitgelichte Consultants",
    currentlyAvailable: "Nu Aanwezig",
    allCategories: "Alle Categorieën",
    viewAll: "Bekijk Alle",
    whyChooseUs: "Waarom TopMediumVisie?",
    trustedPlatform: "Vertrouwd Platform",
    trustedDesc: "Alle consultants zijn geverifieerd en beoordeeld door echte klanten",
    securePayments: "Veilige Betalingen",
    secureDesc: "Betaal veilig per minuut met je credits, geen verrassingen",
    qualityGuarantee: "Kwaliteitsgarantie",
    qualityDesc: "Niet tevreden? Krijg je credits terug binnen 24 uur",
    howItWorks: "Hoe het werkt",
    step1: "Kies je consultant",
    step1Desc: "Bekijk profielen en lees reviews van andere klanten",
    step2: "Koop credits",
    step2Desc: "Veilig betalen met iDEAL, creditcard of PayPal",
    step3: "Start je sessie",
    step3Desc: "Bel, chat of stuur berichten wanneer het jou uitkomt",
    getStarted: "Begin Nu",
    joinThousands: "Sluit je aan bij duizenden tevreden klanten",
    reviews: "beoordelingen",
    perMin: "/min",
    online: "Online",
    busy: "Bezet",
    offline: "Offline"
  },
  en: {
    heroTitle: "Find your perfect spiritual advisor",
    heroSubtitle: "Connect with experienced mediums, psychics and life coaches for personal guidance",
    createFreeAccount: "Create free account",
    searchPlaceholder: "Search by specialty, name or keyword...",
    featuredConsultants: "Featured Consultants",
    currentlyAvailable: "Currently Available",
    allCategories: "All Categories",
    viewAll: "View All",
    whyChooseUs: "Why TopMediumVisie?",
    trustedPlatform: "Trusted Platform",
    trustedDesc: "All consultants are verified and reviewed by real customers",
    securePayments: "Secure Payments",
    secureDesc: "Pay safely per minute with your credits, no surprises",
    qualityGuarantee: "Quality Guarantee",
    qualityDesc: "Not satisfied? Get your credits back within 24 hours",
    howItWorks: "How it works",
    step1: "Choose your consultant",
    step1Desc: "Browse profiles and read reviews from other customers",
    step2: "Buy credits",
    step2Desc: "Pay securely with iDEAL, credit card or PayPal",
    step3: "Start your session",
    step3Desc: "Call, chat or send messages whenever it suits you",
    getStarted: "Get Started",
    joinThousands: "Join thousands of satisfied customers",
    reviews: "reviews",
    perMin: "/min",
    online: "Online",
    busy: "Busy",
    offline: "Offline"
  }
};

export default function Home() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [searchTerm, setSearchTerm] = useState('');

  const t = translations[language];

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/specialties" className="text-white/90 hover:text-white font-medium transition-colors">
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
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-teal-600 py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            {t.heroSubtitle}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg rounded-full"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Link href="/auth/register">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full">
              {t.createFreeAccount}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Free Account Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white font-medium">
            <Sparkles className="inline h-5 w-5 mr-2" />
            {t.joinThousands} - {t.createFreeAccount.toLowerCase()}!
          </p>
        </div>
      </div>

      {/* Currently Available Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.currentlyAvailable}</h2>
            <Link href="/consultants?availability=online">
              <Button variant="outline">
                {t.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredConsultants.map((consultant) => (
              <Card key={consultant.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={consultant.image} alt={consultant.name} />
                        <AvatarFallback>{consultant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${getAvailabilityColor(consultant.availability)}`}></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{consultant.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{consultant.specialty}</p>
                      <div className="flex items-center space-x-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{consultant.rating}</span>
                        <span className="text-sm text-gray-500">({consultant.reviews} {t.reviews})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {consultant.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">€{consultant.pricePerMin}</div>
                    <div className="text-xs text-gray-500">{t.perMin}</div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 space-x-2">
                  <Link href={`/consultant/${consultant.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      {language === 'nl' ? 'Bekijk Profiel' : 'View Profile'}
                    </Button>
                  </Link>
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    {language === 'nl' ? 'Start Gesprek' : 'Start Chat'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t.allCategories}</h2>
            <Link href="/specialties">
              <Button variant="outline">
                {t.viewAll}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/consultants?specialty=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardContent className="p-4 text-center">
                    <Badge className={`${category.color} mb-2 text-sm font-medium`}>
                      {category.count}
                    </Badge>
                    <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.whyChooseUs}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.trustedPlatform}</h3>
              <p className="text-gray-600">{t.trustedDesc}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.securePayments}</h3>
              <p className="text-gray-600">{t.secureDesc}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.qualityGuarantee}</h3>
              <p className="text-gray-600">{t.qualityDesc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{t.howItWorks}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step1}</h3>
              <p className="text-gray-600">{t.step1Desc}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step2}</h3>
              <p className="text-gray-600">{t.step2Desc}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.step3}</h3>
              <p className="text-gray-600">{t.step3Desc}</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/auth/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-full">
                {t.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TopMediumVisie</h3>
              <p className="text-gray-400">
                {language === 'nl' 
                  ? 'Verbind met de beste spirituele adviseurs in Nederland'
                  : 'Connect with the best spiritual advisors in the Netherlands'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'nl' ? 'Voor Klanten' : 'For Clients'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support/how-it-works" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Hoe het werkt' : 'How it works'}
                </Link></li>
                <li><Link href="/support/pricing" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Tarieven' : 'Pricing'}
                </Link></li>
                <li><Link href="/support/faq" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Veelgestelde vragen' : 'FAQ'}
                </Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'nl' ? 'Voor Consultants' : 'For Consultants'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/consultant/apply" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Word consultant' : 'Become a consultant'}
                </Link></li>
                <li><Link href="/consultant/dashboard" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Consultant login' : 'Consultant login'}
                </Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'nl' ? 'Ondersteuning' : 'Support'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/support/contact" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Contact' : 'Contact'}
                </Link></li>
                <li><Link href="/support/privacy" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Privacy' : 'Privacy'}
                </Link></li>
                <li><Link href="/support/terms" className="hover:text-white transition-colors">
                  {language === 'nl' ? 'Algemene voorwaarden' : 'Terms of service'}
                </Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 TopMediumVisie. {language === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}