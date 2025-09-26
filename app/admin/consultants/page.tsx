'use client';

import { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone,
  MapPin,
  Star,
  Clock,
  Download,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

// Mock data for consultant management
const mockConsultants = [
  {
    id: 1,
    name: "Lisa van Dijk",
    email: "lisa@example.com",
    phone: "+31 6 12345678",
    specialty: "Tarot & Helderziend",
    experience: "8 jaar",
    pricePerMin: 2.75,
    rating: 0,
    reviewCount: 0,
    totalSessions: 0,
    status: "pending",
    appliedAt: "2024-01-15",
    location: "Utrecht, Nederland",
    languages: ["Nederlands", "English"],
    bio: "Ervaren tarotlezer met een intuïtieve benadering. Gespecialiseerd in liefde en carrière readings.",
    certifications: ["Tarot Master Certificaat", "Helderziend Diploma"],
    documents: ["CV", "Certificaten", "Portfolio"],
    services: ["CALL", "CHAT", "MESSAGE"]
  },
  {
    id: 2,
    name: "Mark Hendriks",
    email: "mark@example.com",
    phone: "+31 6 87654321",
    specialty: "Life Coach",
    experience: "12 jaar",
    pricePerMin: 3.50,
    rating: 0,
    reviewCount: 0,
    totalSessions: 0,
    status: "pending",
    appliedAt: "2024-01-14",
    location: "Amsterdam, Nederland",
    languages: ["Nederlands"],
    bio: "Professionele life coach die mensen helpt hun doelen te bereiken en persoonlijke groei te realiseren.",
    certifications: ["Certified Life Coach", "NLP Practitioner"],
    documents: ["CV", "Certificaten"],
    services: ["CALL", "MESSAGE", "APPOINTMENT"]
  },
  {
    id: 3,
    name: "Maria van der Berg",
    email: "maria@topmediumvisie.nl",
    phone: "+31 6 11111111",
    specialty: "Medium & Helderziende",
    experience: "15+ jaar",
    pricePerMin: 2.50,
    rating: 4.8,
    reviewCount: 156,
    totalSessions: 1247,
    status: "approved",
    appliedAt: "2023-12-01",
    location: "Amsterdam, Nederland",
    languages: ["Nederlands", "English"],
    bio: "Ervaren medium en helderziende met meer dan 15 jaar ervaring.",
    certifications: ["Gecertificeerd Medium", "Tarot Master", "Reiki Level II"],
    documents: ["CV", "Certificaten", "Portfolio"],
    services: ["CALL", "CHAT", "MESSAGE", "APPOINTMENT"]
  }
];

export default function AdminConsultantsPage() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [reviewNote, setReviewNote] = useState('');

  const translations = {
    nl: {
      consultantManagement: "Consultant Beheer",
      searchConsultants: "Zoek consultants...",
      allStatuses: "Alle statussen",
      pending: "In behandeling",
      approved: "Goedgekeurd",
      rejected: "Afgewezen",
      suspended: "Geschorst",
      view: "Bekijken",
      approve: "Goedkeuren",
      reject: "Afwijzen",
      suspend: "Schorsen",
      export: "Exporteren",
      applicationDetails: "Aanmelding Details",
      personalInfo: "Persoonlijke Informatie",
      professionalInfo: "Professionele Informatie",
      documents: "Documenten",
      reviewNotes: "Beoordeling Notities",
      addNote: "Notitie toevoegen...",
      approveApplication: "Aanmelding Goedkeuren",
      rejectApplication: "Aanmelding Afwijzen",
      name: "Naam",
      email: "Email",
      phone: "Telefoon",
      location: "Locatie",
      specialty: "Specialiteit",
      experience: "Ervaring",
      pricePerMin: "Tarief/min",
      languages: "Talen",
      services: "Diensten",
      bio: "Bio",
      certifications: "Certificeringen",
      appliedAt: "Aangemeld op",
      rating: "Beoordeling",
      sessions: "Sessies",
      reviews: "Reviews"
    },
    en: {
      consultantManagement: "Consultant Management",
      searchConsultants: "Search consultants...",
      allStatuses: "All statuses",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      suspended: "Suspended",
      view: "View",
      approve: "Approve",
      reject: "Reject",
      suspend: "Suspend",
      export: "Export",
      applicationDetails: "Application Details",
      personalInfo: "Personal Information",
      professionalInfo: "Professional Information",
      documents: "Documents",
      reviewNotes: "Review Notes",
      addNote: "Add note...",
      approveApplication: "Approve Application",
      rejectApplication: "Reject Application",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      specialty: "Specialty",
      experience: "Experience",
      pricePerMin: "Rate/min",
      languages: "Languages",
      services: "Services",
      bio: "Bio",
      certifications: "Certifications",
      appliedAt: "Applied at",
      rating: "Rating",
      sessions: "Sessions",
      reviews: "Reviews"
    }
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredConsultants = mockConsultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultant.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || consultant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (consultantId: number) => {
    console.log('Approving consultant:', consultantId);
    // API call would go here
  };

  const handleReject = (consultantId: number) => {
    console.log('Rejecting consultant:', consultantId, 'Note:', reviewNote);
    // API call would go here
  };

  const handleSuspend = (consultantId: number) => {
    console.log('Suspending consultant:', consultantId);
    // API call would go here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-white">
                TopMediumVisie
              </Link>
              <Badge className="ml-3 bg-red-800 text-white">Admin</Badge>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/admin" className="text-white/90 hover:text-white font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/consultants" className="text-white font-medium">
                Consultants
              </Link>
              <Link href="/admin/transactions" className="text-white/90 hover:text-white font-medium transition-colors">
                Transactions
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === 'nl' ? 'en' : 'nl')}
                className="flex items-center space-x-1 text-white hover:bg-red-700"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'nl' ? 'EN' : 'NL'}</span>
              </Button>
              
              <Button size="sm" className="bg-white text-red-600 hover:bg-gray-100">
                Admin User
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.consultantManagement}</h1>
          <p className="text-gray-600">
            {language === 'nl' 
              ? 'Beheer consultant aanmeldingen en bestaande consultants'
              : 'Manage consultant applications and existing consultants'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.pending}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockConsultants.filter(c => c.status === 'pending').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.approved}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockConsultants.filter(c => c.status === 'approved').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.rejected}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {mockConsultants.filter(c => c.status === 'rejected').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{mockConsultants.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t.consultantManagement}</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t.export}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={t.searchConsultants}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allStatuses}</SelectItem>
                  <SelectItem value="pending">{t.pending}</SelectItem>
                  <SelectItem value="approved">{t.approved}</SelectItem>
                  <SelectItem value="rejected">{t.rejected}</SelectItem>
                  <SelectItem value="suspended">{t.suspended}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Consultants List */}
            <div className="space-y-4">
              {filteredConsultants.map((consultant) => (
                <div key={consultant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{consultant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{consultant.name}</h4>
                        <Badge className={getStatusColor(consultant.status)}>
                          {t[consultant.status as keyof typeof t]}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {consultant.email}
                        </span>
                        <span>{consultant.specialty}</span>
                        <span>€{consultant.pricePerMin}/min</span>
                        {consultant.status === 'approved' && (
                          <>
                            <span className="flex items-center">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {consultant.rating} ({consultant.reviewCount})
                            </span>
                            <span>{consultant.totalSessions} {t.sessions.toLowerCase()}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{consultant.location}</span>
                        <span>•</span>
                        <span>{t.appliedAt}: {consultant.appliedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedConsultant(consultant)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          {t.view}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{consultant.name} - {t.applicationDetails}</DialogTitle>
                        </DialogHeader>
                        
                        {selectedConsultant && (
                          <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="grid w-full grid-cols-4">
                              <TabsTrigger value="personal">{t.personalInfo}</TabsTrigger>
                              <TabsTrigger value="professional">{t.professionalInfo}</TabsTrigger>
                              <TabsTrigger value="documents">{t.documents}</TabsTrigger>
                              <TabsTrigger value="review">{t.reviewNotes}</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="personal" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-medium">{t.name}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.name}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.email}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.email}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.phone}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.phone}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.location}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.location}</p>
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="professional" className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="font-medium">{t.specialty}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.specialty}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.experience}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.experience}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.pricePerMin}</Label>
                                  <p className="text-sm text-gray-600">€{selectedConsultant.pricePerMin}</p>
                                </div>
                                <div>
                                  <Label className="font-medium">{t.languages}</Label>
                                  <p className="text-sm text-gray-600">{selectedConsultant.languages.join(', ')}</p>
                                </div>
                              </div>
                              
                              <div>
                                <Label className="font-medium">{t.bio}</Label>
                                <p className="text-sm text-gray-600 mt-1">{selectedConsultant.bio}</p>
                              </div>
                              
                              <div>
                                <Label className="font-medium">{t.certifications}</Label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedConsultant.certifications.map((cert: string, index: number) => (
                                    <Badge key={index} variant="outline">{cert}</Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <Label className="font-medium">{t.services}</Label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedConsultant.services.map((service: string, index: number) => (
                                    <Badge key={index} variant="secondary">{service}</Badge>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="documents" className="space-y-4">
                              <div>
                                <Label className="font-medium">{t.documents}</Label>
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                  {selectedConsultant.documents.map((doc: string, index: number) => (
                                    <div key={index} className="p-3 border rounded-lg">
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{doc}</span>
                                        <Button variant="outline" size="sm">
                                          <Eye className="h-3 w-3 mr-1" />
                                          {t.view}
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </TabsContent>
                            
                            <TabsContent value="review" className="space-y-4">
                              <div>
                                <Label htmlFor="reviewNote">{t.reviewNotes}</Label>
                                <Textarea
                                  id="reviewNote"
                                  value={reviewNote}
                                  onChange={(e) => setReviewNote(e.target.value)}
                                  placeholder={t.addNote}
                                  className="mt-2"
                                  rows={4}
                                />
                              </div>
                              
                              {selectedConsultant.status === 'pending' && (
                                <div className="flex space-x-3 pt-4">
                                  <Button 
                                    onClick={() => handleApprove(selectedConsultant.id)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {t.approveApplication}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleReject(selectedConsultant.id)}
                                    className="flex-1"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {t.rejectApplication}
                                  </Button>
                                </div>
                              )}
                              
                              {selectedConsultant.status === 'approved' && (
                                <div className="pt-4">
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleSuspend(selectedConsultant.id)}
                                    className="w-full"
                                  >
                                    {t.suspend}
                                  </Button>
                                </div>
                              )}
                            </TabsContent>
                          </Tabs>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    {consultant.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(consultant.id)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReject(consultant.id)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredConsultants.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === 'nl' ? 'Geen consultants gevonden' : 'No consultants found'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}