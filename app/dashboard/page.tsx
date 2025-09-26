'use client';

import { useState } from 'react';
import { 
  Globe, 
  CreditCard, 
  History, 
  Calendar, 
  Heart, 
  Bell, 
  Phone, 
  MessageCircle, 
  Mail,
  Plus,
  Download,
  Star,
  Clock,
  Euro
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const mockData = {
  user: {
    name: "Jan Janssen",
    email: "jan@example.com",
    walletBalance: 2550,
    memberSince: "Maart 2024"
  },
  transactions: [
    { id: 1, date: "2024-01-15", type: "topup", amount: 25.00, description: "Credits gekocht via iDEAL" },
    { id: 2, date: "2024-01-14", type: "session", amount: -7.50, description: "Gesprek met Maria van der Berg (15 min)" },
    { id: 3, date: "2024-01-12", type: "session", amount: -12.00, description: "Chat sessie met David Klaasen (24 min)" },
    { id: 4, date: "2024-01-10", type: "topup", amount: 50.00, description: "Credits gekocht via creditcard" }
  ],
  sessions: [
    {
      id: 1,
      consultant: "Maria van der Berg",
      date: "2024-01-14",
      duration: 15,
      type: "call",
      cost: 7.50,
      rating: 5,
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      consultant: "David Klaasen", 
      date: "2024-01-12",
      duration: 24,
      type: "chat",
      cost: 12.00,
      rating: 4,
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ],
  appointments: [
    {
      id: 1,
      consultant: "Sophie Janssen",
      date: "2024-01-20",
      time: "14:00",
      type: "call",
      status: "confirmed",
      image: "https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ],
  favorites: [
    {
      id: 1,
      name: "Maria van der Berg",
      specialty: "Medium & Helderziende",
      rating: 4.8,
      pricePerMin: 2.50,
      availability: "online",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      name: "Emma Bakker",
      specialty: "Heldervoelend Medium & Reiki Master",
      rating: 4.9,
      pricePerMin: 3.25,
      availability: "busy",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ],
  notifications: [
    { id: 1, message: "Maria van der Berg is nu online", time: "5 min geleden", type: "availability" },
    { id: 2, message: "Je afspraak met Sophie Janssen is bevestigd", time: "2 uur geleden", type: "appointment" },
    { id: 3, message: "Nieuwe review ontvangen van David Klaasen", time: "1 dag geleden", type: "review" }
  ]
};

export default function Dashboard() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [topupAmount, setTopupAmount] = useState('25');

  const translations = {
    nl: {
      dashboard: "Dashboard",
      wallet: "Portemonnee",
      history: "Geschiedenis", 
      appointments: "Afspraken",
      favorites: "Favorieten",
      notifications: "Meldingen",
      credits: "Credits",
      topUp: "Bijladen",
      transactions: "Transacties",
      sessions: "Sessies",
      upcoming: "Aankomend",
      consultant: "Consultant",
      date: "Datum",
      duration: "Duur",
      cost: "Kosten",
      rating: "Beoordeling",
      confirmed: "Bevestigd",
      pending: "In afwachting",
      online: "Online",
      busy: "Bezet",
      offline: "Offline",
      viewProfile: "Bekijk Profiel",
      startSession: "Start Sessie",
      markAllRead: "Alles als gelezen markeren"
    },
    en: {
      dashboard: "Dashboard",
      wallet: "Wallet",
      history: "History",
      appointments: "Appointments", 
      favorites: "Favorites",
      notifications: "Notifications",
      credits: "Credits",
      topUp: "Top Up",
      transactions: "Transactions",
      sessions: "Sessions",
      upcoming: "Upcoming",
      consultant: "Consultant",
      date: "Date",
      duration: "Duration",
      cost: "Cost",
      rating: "Rating",
      confirmed: "Confirmed",
      pending: "Pending",
      online: "Online",
      busy: "Busy",
      offline: "Offline",
      viewProfile: "View Profile",
      startSession: "Start Session",
      markAllRead: "Mark all as read"
    }
  };

  const t = translations[language];

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'message': return <Mail className="h-4 w-4" />;
      default: return null;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                {t.credits}: €{(mockData.user.walletBalance / 100).toFixed(2)}
              </Button>
              
              <Link href="/sessions/test">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  Pre-Auth Test
                </Button>
              </Link>
              
              <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                {mockData.user.name}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === 'nl' ? 'Welkom terug' : 'Welcome back'}, {mockData.user.name}
          </h1>
          <p className="text-gray-600">
            {language === 'nl' ? 'Lid sinds' : 'Member since'} {mockData.user.memberSince}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Euro className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.credits}</p>
                  <p className="text-2xl font-bold text-gray-900">€{(mockData.user.walletBalance / 100).toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <History className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.sessions}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.sessions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.appointments}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.appointments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.favorites}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockData.favorites.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="wallet" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              {t.wallet}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              {t.history}
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {t.appointments}
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              {t.favorites}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" />
              {t.notifications}
            </TabsTrigger>
          </TabsList>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    {t.topUp} {t.credits}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">{language === 'nl' ? 'Bedrag' : 'Amount'}</Label>
                      <div className="flex space-x-2 mt-2">
                        {['10', '25', '50', '100'].map((amount) => (
                          <Button
                            key={amount}
                            variant={topupAmount === amount ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTopupAmount(amount)}
                          >
                            €{amount}
                          </Button>
                        ))}
                      </div>
                      <Input
                        id="amount"
                        type="number"
                        value={topupAmount}
                        onChange={(e) => setTopupAmount(e.target.value)}
                        className="mt-2"
                        placeholder="€"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        {language === 'nl' ? 'Bijladen met iDEAL' : 'Top up with iDEAL'}
                      </Button>
                      <Button variant="outline" className="w-full">
                        <CreditCard className="h-4 w-4 mr-2" />
                        {language === 'nl' ? 'Bijladen met creditcard' : 'Top up with credit card'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{language === 'nl' ? 'Recente transacties' : 'Recent transactions'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.transactions.slice(0, 4).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {t.sessions}
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {language === 'nl' ? 'Exporteren' : 'Export'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.sessions.map((session) => (
                      <div key={session.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.image} alt={session.consultant} />
                          <AvatarFallback>{session.consultant.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <p className="font-medium">{session.consultant}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            {getServiceIcon(session.type)}
                            <span>{session.date}</span>
                            <Clock className="h-3 w-3" />
                            <span>{session.duration} min</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-bold">€{session.cost.toFixed(2)}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < session.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.transactions}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.transactions.map((transaction) => (
                      <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.upcoming} {t.appointments}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.image} alt={appointment.consultant} />
                        <AvatarFallback>{appointment.consultant.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <p className="font-medium">{appointment.consultant}</p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          {getServiceIcon(appointment.type)}
                          <span>{appointment.date} om {appointment.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status === 'confirmed' ? t.confirmed : t.pending}
                        </Badge>
                        <Button size="sm">
                          {language === 'nl' ? 'Wijzigen' : 'Modify'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'nl' ? 'Jouw favoriete consultants' : 'Your favorite consultants'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockData.favorites.map((favorite) => (
                    <div key={favorite.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={favorite.image} alt={favorite.name} />
                          <AvatarFallback>{favorite.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(favorite.availability)}`}></div>
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{favorite.name}</p>
                        <p className="text-sm text-gray-600">{favorite.specialty}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{favorite.rating}</span>
                          <span className="text-xs text-gray-500">• €{favorite.pricePerMin}/min</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-1">
                        <Link href={`/consultant/${favorite.id}`}>
                          <Button size="sm" variant="outline" className="text-xs">
                            {t.viewProfile}
                          </Button>
                        </Link>
                        <Button size="sm" className="text-xs" disabled={favorite.availability === 'offline'}>
                          {t.startSession}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {t.notifications}
                  <Button variant="outline" size="sm">
                    {t.markAllRead}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Bell className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}