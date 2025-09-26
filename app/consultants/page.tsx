'use client';

import { useState } from 'react';
import { Search, Star, Clock, MessageCircle, Phone, Mail, Filter, Globe, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Link from 'next/link';

const consultants = [
  {
    id: 1,
    name: "Maria van der Berg",
    specialty: "Medium & Helderziende",
    rating: 4.8,
    reviews: 156,
    pricePerMin: 2.50,
    availability: "online",
    languages: ["Nederlands", "English"],
    experience: "15+ jaar",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "chat", "message"],
    specialties: ["Medium", "Helderziend", "Tarot"],
    bio: "Ervaren medium met een warme, empathische benadering. Gespecialiseerd in contact met overledenen en toekomstvoorspellingen."
  },
  {
    id: 2,
    name: "David Klaasen",
    specialty: "Life Coach & Spiritueel Adviseur",
    rating: 4.9,
    reviews: 203,
    pricePerMin: 3.00,
    availability: "busy",
    languages: ["Nederlands"],
    experience: "12+ jaar",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "message"],
    specialties: ["Life Coaching", "Spiritualiteit", "Burn-out"],
    bio: "Professionele life coach die je helpt bij persoonlijke groei en het vinden van je levensdoel."
  },
  {
    id: 3,
    name: "Sophie Janssen",
    specialty: "Tarotlezer & Energetisch Therapeut",
    rating: 4.7,
    reviews: 89,
    pricePerMin: 2.25,
    availability: "online",
    languages: ["Nederlands", "English", "Français"],
    experience: "8+ jaar",
    image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "chat", "message"],
    specialties: ["Tarot", "Energetisch", "Chakra's"],
    bio: "Intuïtieve tarotlezer en energetisch therapeut. Helpt bij het vinden van antwoorden en energetische balans."
  },
  {
    id: 4,
    name: "Robert de Wit",
    specialty: "Paranormaal Medium",
    rating: 4.6,
    reviews: 124,
    pricePerMin: 2.75,
    availability: "offline",
    languages: ["Nederlands"],
    experience: "20+ jaar",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "message"],
    specialties: ["Paranormaal", "Medium", "Geesten"],
    bio: "Ervaren paranormaal medium met jarenlange ervaring in het leggen van contact met de andere kant."
  },
  {
    id: 5,
    name: "Emma Bakker",
    specialty: "Heldervoelend Medium & Reiki Master",
    rating: 4.9,
    reviews: 267,
    pricePerMin: 3.25,
    availability: "online",
    languages: ["Nederlands", "English"],
    experience: "18+ jaar",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "chat", "message"],
    specialties: ["Heldervoelend", "Reiki", "Healing"],
    bio: "Heldervoelend medium en Reiki Master. Biedt healing en inzicht door energetische verbindingen."
  },
  {
    id: 6,
    name: "Thomas Vermeer",
    specialty: "Spiritueel Life Coach",
    rating: 4.5,
    reviews: 78,
    pricePerMin: 2.00,
    availability: "online",
    languages: ["Nederlands", "English", "Deutsch"],
    experience: "10+ jaar",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
    services: ["call", "chat"],
    specialties: ["Life Coaching", "Spiritualiteit", "Mindfulness"],
    bio: "Spiritueel life coach die je begeleidt naar meer bewustzijn en innerlijke vrede."
  }
];

const specialties = [
  "Alle specialiteiten",
  "Astrologie",
  "Burn-out coaching", 
  "Geluk en welzijn",
  "Levensvragen",
  "Liefde & Relatie",
  "Life coaching",
  "Luisterend oor",
  "Medium",
  "Spiritualiteit",
  "Sterrenbeelden",
  "Stress coaching",
  "Tarot & Kaartleggingen",
  "Zielsverwanten"
];

export default function ConsultantsPage() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Alle specialiteiten');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState([0, 5]);
  const [minRating, setMinRating] = useState(0);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'message': return <Mail className="h-4 w-4" />;
      default: return null;
    }
  };

  const getServiceLabel = (service: string) => {
    const labels = {
      call: language === 'nl' ? 'Bellen' : 'Call',
      chat: language === 'nl' ? 'Chatten' : 'Chat', 
      message: language === 'nl' ? 'Berichten' : 'Message'
    };
    return labels[service as keyof typeof labels] || service;
  };

  const filteredConsultants = consultants
    .filter(consultant => {
      const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           consultant.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesSpecialty = selectedSpecialty === 'Alle specialiteiten' || 
                              consultant.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase())) ||
                              consultant.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
      
      const matchesAvailability = selectedAvailability === 'all' || 
                                 consultant.availability === selectedAvailability;
      
      const matchesPrice = consultant.pricePerMin >= priceRange[0] && consultant.pricePerMin <= priceRange[1];
      const matchesRating = consultant.rating >= minRating;
      
      return matchesSearch && matchesSpecialty && matchesAvailability && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'price-low': return a.pricePerMin - b.pricePerMin;
        case 'price-high': return b.pricePerMin - a.pricePerMin;
        case 'reviews': return b.reviews - a.reviews;
        case 'experience': return parseInt(b.experience) - parseInt(a.experience);
        default: return 0;
      }
    });

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
              <Link href="/consultants" className="text-white font-medium">
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

      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {language === 'nl' ? 'Alle Consultants' : 'All Consultants'}
          </h1>
          <p className="text-gray-600 mb-6">
            {language === 'nl' 
              ? 'Ontdek onze ervaren spirituele adviseurs en vind de perfecte match voor jouw vragen'
              : 'Discover our experienced spiritual advisors and find the perfect match for your questions'
            }
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder={language === 'nl' ? 'Zoek naar naam, specialiteit...' : 'Search by name, specialty...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center">
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  {language === 'nl' ? 'Filters' : 'Filters'}
                </h3>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialty Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'nl' ? 'Specialiteit' : 'Specialty'}
                  </label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'nl' ? 'Beschikbaarheid' : 'Availability'}
                  </label>
                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{language === 'nl' ? 'Alle' : 'All'}</SelectItem>
                      <SelectItem value="online">{language === 'nl' ? 'Online' : 'Online'}</SelectItem>
                      <SelectItem value="busy">{language === 'nl' ? 'Bezet' : 'Busy'}</SelectItem>
                      <SelectItem value="offline">{language === 'nl' ? 'Offline' : 'Offline'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'nl' ? 'Prijs per minuut' : 'Price per minute'}: €{priceRange[0]} - €{priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5}
                    min={0}
                    step={0.25}
                    className="w-full"
                  />
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {language === 'nl' ? 'Minimale beoordeling' : 'Minimum rating'}: {minRating}+
                  </label>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredConsultants.length} {language === 'nl' ? 'consultants gevonden' : 'consultants found'}
              </p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">{language === 'nl' ? 'Hoogste beoordeling' : 'Highest rating'}</SelectItem>
                  <SelectItem value="price-low">{language === 'nl' ? 'Laagste prijs' : 'Lowest price'}</SelectItem>
                  <SelectItem value="price-high">{language === 'nl' ? 'Hoogste prijs' : 'Highest price'}</SelectItem>
                  <SelectItem value="reviews">{language === 'nl' ? 'Meeste reviews' : 'Most reviews'}</SelectItem>
                  <SelectItem value="experience">{language === 'nl' ? 'Meeste ervaring' : 'Most experience'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Consultants Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant) => (
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
                        <p className="text-sm text-gray-600 mb-1">{consultant.specialty}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{consultant.experience}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{consultant.rating}</span>
                        <span className="text-sm text-gray-500">({consultant.reviews})</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">€{consultant.pricePerMin}</div>
                        <div className="text-xs text-gray-500">/min</div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{consultant.bio}</p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {consultant.specialties.slice(0, 3).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {consultant.services.map((service) => (
                        <Badge key={service} variant="outline" className="flex items-center space-x-1 text-xs">
                          {getServiceIcon(service)}
                          <span>{getServiceLabel(service)}</span>
                        </Badge>
                      ))}
                    </div>

                    <div className="text-xs text-gray-500">
                      <strong>{language === 'nl' ? 'Talen' : 'Languages'}:</strong> {consultant.languages.join(', ')}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0 space-x-2">
                    <Link href={`/consultant/${consultant.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        {language === 'nl' ? 'Bekijk Profiel' : 'View Profile'}
                      </Button>
                    </Link>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={consultant.availability === 'offline'}
                    >
                      {language === 'nl' ? 'Start Gesprek' : 'Start Chat'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredConsultants.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  {language === 'nl' ? 'Geen consultants gevonden' : 'No consultants found'}
                </div>
                <div className="text-gray-400">
                  {language === 'nl' ? 'Probeer je filters aan te passen' : 'Try adjusting your filters'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}