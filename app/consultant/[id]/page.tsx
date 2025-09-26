'use client';

import { useState } from 'react';
import { Star, Clock, MessageCircle, Phone, Mail, Globe, Calendar, Heart, Share2, MapPin, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

// Mock data - in real app this would come from API
const consultant = {
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
  services: ["call", "chat", "message", "appointment"],
  specialties: ["Medium", "Helderziend", "Tarot", "Dromen", "Chakra's"],
  bio: "Welkom bij mijn profiel! Ik ben Maria, een ervaren medium en helderziende met meer dan 15 jaar ervaring in het begeleiden van mensen op hun spirituele pad. Mijn gave ontdekte ik al op jonge leeftijd en sindsdien help ik mensen bij het vinden van antwoorden op hun levensvragen.\n\nIk werk met verschillende technieken zoals tarotkaarten, helderziendheid en mediumschap. Mijn benadering is warm, empathisch en respectvol. Ik geloof dat iedereen recht heeft op duidelijkheid en begeleiding in moeilijke tijden.\n\nOf je nu vragen hebt over liefde, carrière, familie of spirituele groei - ik sta klaar om je te helpen met mijn intuïtieve gaven en jarenlange ervaring.",
  location: "Amsterdam, Nederland",
  responseTime: "Binnen 2 uur",
  totalSessions: 1247,
  repeatClients: 89,
  certifications: ["Gecertificeerd Medium", "Tarot Master", "Reiki Level II"],
  workingHours: "Ma-Vr: 09:00-21:00, Za-Zo: 10:00-18:00"
};

const reviews = [
  {
    id: 1,
    name: "Sarah K.",
    rating: 5,
    date: "2 dagen geleden",
    comment: "Maria is echt geweldig! Ze heeft me zo goed geholpen met mijn vragen over mijn relatie. Alles wat ze zei klopte precies. Heel dankbaar voor haar inzichten.",
    verified: true
  },
  {
    id: 2,
    name: "Peter M.",
    rating: 5,
    date: "1 week geleden", 
    comment: "Fantastische reading gehad met Maria. Ze kon direct contact maken met mijn overleden vader. Heel troostend en helend. Zeker een aanrader!",
    verified: true
  },
  {
    id: 3,
    name: "Linda V.",
    rating: 4,
    date: "2 weken geleden",
    comment: "Goede sessie gehad. Maria is heel lief en begripvol. Sommige dingen waren heel accuraat, andere minder. Maar over het algemeen een positieve ervaring.",
    verified: true
  }
];

const ratingBreakdown = [
  { stars: 5, percentage: 78 },
  { stars: 4, percentage: 15 },
  { stars: 3, percentage: 5 },
  { stars: 2, percentage: 1 },
  { stars: 1, percentage: 1 }
];

export default function ConsultantProfile({ params }: { params: { id: string } }) {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [isFavorite, setIsFavorite] = useState(false);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    const texts = {
      online: language === 'nl' ? 'Online' : 'Online',
      busy: language === 'nl' ? 'Bezet' : 'Busy',
      offline: language === 'nl' ? 'Offline' : 'Offline'
    };
    return texts[availability as keyof typeof texts] || availability;
  };

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'call': return <Phone className="h-5 w-5" />;
      case 'chat': return <MessageCircle className="h-5 w-5" />;
      case 'message': return <Mail className="h-5 w-5" />;
      case 'appointment': return <Calendar className="h-5 w-5" />;
      default: return null;
    }
  };

  const getServiceLabel = (service: string) => {
    const labels = {
      call: language === 'nl' ? 'Bellen' : 'Call',
      chat: language === 'nl' ? 'Chatten' : 'Chat',
      message: language === 'nl' ? 'Berichten' : 'Message',
      appointment: language === 'nl' ? 'Afspraak' : 'Appointment'
    };
    return labels[service as keyof typeof labels] || service;
  };

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Avatar className="h-32 w-32">
                        <AvatarImage src={consultant.image} alt={consultant.name} />
                        <AvatarFallback className="text-2xl">
                          {consultant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${getAvailabilityColor(consultant.availability)} flex items-center justify-center`}>
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{consultant.name}</h1>
                        <p className="text-lg text-gray-600 mb-2">{consultant.specialty}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {consultant.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {consultant.experience}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={isFavorite ? 'text-red-600 border-red-600' : ''}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{consultant.rating}</span>
                        <span className="text-gray-500 ml-1">({consultant.reviews} {language === 'nl' ? 'beoordelingen' : 'reviews'})</span>
                      </div>
                      <Badge className={`${getAvailabilityColor(consultant.availability)} text-white`}>
                        {getAvailabilityText(consultant.availability)}
                      </Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {consultant.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p><strong>{language === 'nl' ? 'Talen' : 'Languages'}:</strong> {consultant.languages.join(', ')}</p>
                      <p><strong>{language === 'nl' ? 'Reactietijd' : 'Response time'}:</strong> {consultant.responseTime}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">{language === 'nl' ? 'Over mij' : 'About'}</TabsTrigger>
                <TabsTrigger value="reviews">{language === 'nl' ? 'Beoordelingen' : 'Reviews'}</TabsTrigger>
                <TabsTrigger value="stats">{language === 'nl' ? 'Statistieken' : 'Statistics'}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{language === 'nl' ? 'Over mij' : 'About me'}</h3>
                    <div className="prose max-w-none">
                      {consultant.bio.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-3">{language === 'nl' ? 'Certificeringen' : 'Certifications'}</h4>
                      <div className="space-y-2">
                        {consultant.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold mb-2">{language === 'nl' ? 'Werktijden' : 'Working hours'}</h4>
                      <p className="text-sm text-gray-700">{consultant.workingHours}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold">{language === 'nl' ? 'Beoordelingen' : 'Reviews'}</h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{consultant.rating}</div>
                        <div className="text-sm text-gray-500">{consultant.reviews} {language === 'nl' ? 'beoordelingen' : 'reviews'}</div>
                      </div>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="mb-8">
                      {ratingBreakdown.map((item) => (
                        <div key={item.stars} className="flex items-center mb-2">
                          <div className="flex items-center w-16">
                            <span className="text-sm">{item.stars}</span>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                          </div>
                          <Progress value={item.percentage} className="flex-1 mx-3" />
                          <span className="text-sm text-gray-500 w-12">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <span className="font-medium">{review.name}</span>
                              {review.verified && (
                                <CheckCircle className="h-4 w-4 text-green-600 ml-2" />
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="stats" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-6">{language === 'nl' ? 'Statistieken' : 'Statistics'}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{consultant.totalSessions}</div>
                        <div className="text-sm text-gray-600">{language === 'nl' ? 'Totaal sessies' : 'Total sessions'}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{consultant.repeatClients}%</div>
                        <div className="text-sm text-gray-600">{language === 'nl' ? 'Terugkerende klanten' : 'Repeat clients'}</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{consultant.experience}</div>
                        <div className="text-sm text-gray-600">{language === 'nl' ? 'Ervaring' : 'Experience'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">{language === 'nl' ? 'Start een sessie' : 'Start a session'}</h3>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600">€{consultant.pricePerMin}</div>
                  <div className="text-sm text-gray-500">{language === 'nl' ? 'per minuut' : 'per minute'}</div>
                </div>
                
                <div className="space-y-3">
                  {consultant.services.map((service) => (
                    <Button
                      key={service}
                      className="w-full justify-start"
                      variant={consultant.availability === 'offline' ? 'outline' : 'default'}
                      disabled={consultant.availability === 'offline'}
                    >
                      {getServiceIcon(service)}
                      <span className="ml-2">{getServiceLabel(service)}</span>
                    </Button>
                  ))}
                </div>
                
                {consultant.availability === 'offline' && (
                  <p className="text-sm text-gray-500 text-center mt-4">
                    {language === 'nl' 
                      ? 'Deze consultant is momenteel offline' 
                      : 'This consultant is currently offline'
                    }
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">{language === 'nl' ? 'Snel overzicht' : 'Quick overview'}</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'nl' ? 'Beoordeling' : 'Rating'}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{consultant.rating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'nl' ? 'Sessies' : 'Sessions'}</span>
                  <span className="font-medium">{consultant.totalSessions}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'nl' ? 'Reactietijd' : 'Response time'}</span>
                  <span className="font-medium">{consultant.responseTime}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">{language === 'nl' ? 'Terugkerende klanten' : 'Repeat clients'}</span>
                  <span className="font-medium">{consultant.repeatClients}%</span>
                </div>
              </CardContent>
            </Card>

            {/* Similar Consultants */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">{language === 'nl' ? 'Vergelijkbare consultants' : 'Similar consultants'}</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`https://images.pexels.com/photos/${3762800 + i}/pexels-photo-${3762800 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`} />
                        <AvatarFallback>C{i}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          Consultant {i}
                        </p>
                        <div className="flex items-center">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-500">4.{7 + i}</span>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">
                        €{2.25 + (i * 0.25)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}