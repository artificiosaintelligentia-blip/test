'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Bell, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

// Mock data - in real app this would come from APIs
const mockStats = {
  totalUsers: 1247,
  totalConsultants: 89,
  pendingConsultants: 12,
  totalTransactions: 3456,
  totalRevenue: 45678.90,
  activeNotifications: 23,
  publishedPosts: 45,
  draftPosts: 8
};

const mockPendingConsultants = [
  {
    id: 1,
    name: "Lisa van Dijk",
    email: "lisa@example.com",
    specialty: "Tarot & Helderziend",
    experience: "8 jaar",
    appliedAt: "2024-01-15",
    status: "pending",
    documents: ["CV", "Certificaten", "Portfolio"]
  },
  {
    id: 2,
    name: "Mark Hendriks",
    email: "mark@example.com",
    specialty: "Life Coach",
    experience: "12 jaar",
    appliedAt: "2024-01-14",
    status: "pending",
    documents: ["CV", "Certificaten"]
  }
];

const mockTransactions = [
  {
    id: 1,
    user: "Jan Janssen",
    type: "TOPUP",
    amount: 25.00,
    status: "COMPLETED",
    date: "2024-01-15",
    stripeId: "pi_1234567890"
  },
  {
    id: 2,
    user: "Maria Peters",
    type: "SESSION",
    amount: -12.50,
    status: "COMPLETED",
    date: "2024-01-15",
    consultant: "David Klaasen"
  },
  {
    id: 3,
    user: "Peter de Vries",
    type: "REFUND",
    amount: 7.50,
    status: "PENDING",
    date: "2024-01-14",
    reason: "Session cancelled"
  }
];

const mockBlogPosts = [
  {
    id: 1,
    title: "Wat is een medium en hoe werkt het?",
    author: "Admin",
    status: "published",
    publishedAt: "2024-01-10",
    views: 1234,
    featured: true
  },
  {
    id: 2,
    title: "Tarot kaarten: Een complete gids",
    author: "Admin",
    status: "draft",
    publishedAt: null,
    views: 0,
    featured: false
  }
];

const mockNotifications = [
  {
    id: 1,
    type: "consultant_application",
    message: "Nieuwe consultant aanmelding van Lisa van Dijk",
    createdAt: "2024-01-15",
    read: false,
    priority: "high"
  },
  {
    id: 2,
    type: "transaction_dispute",
    message: "Transactie geschil gemeld door gebruiker #1234",
    createdAt: "2024-01-14",
    read: false,
    priority: "medium"
  },
  {
    id: 3,
    type: "system_alert",
    message: "Hoge server load gedetecteerd",
    createdAt: "2024-01-14",
    read: true,
    priority: "low"
  }
];

export default function AdminDashboard() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [selectedConsultant, setSelectedConsultant] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const translations = {
    nl: {
      adminDashboard: "Admin Dashboard",
      overview: "Overzicht",
      consultants: "Consultants",
      transactions: "Transacties",
      blog: "Blog",
      notifications: "Meldingen",
      users: "Gebruikers",
      pendingApprovals: "Wachtend op goedkeuring",
      revenue: "Omzet",
      activeNotifications: "Actieve meldingen",
      publishedPosts: "Gepubliceerde posts",
      approve: "Goedkeuren",
      reject: "Afwijzen",
      view: "Bekijken",
      edit: "Bewerken",
      delete: "Verwijderen",
      search: "Zoeken...",
      filter: "Filter",
      export: "Exporteren",
      pending: "In behandeling",
      approved: "Goedgekeurd",
      rejected: "Afgewezen",
      completed: "Voltooid",
      failed: "Mislukt",
      published: "Gepubliceerd",
      draft: "Concept",
      high: "Hoog",
      medium: "Gemiddeld",
      low: "Laag"
    },
    en: {
      adminDashboard: "Admin Dashboard",
      overview: "Overview",
      consultants: "Consultants",
      transactions: "Transactions",
      blog: "Blog",
      notifications: "Notifications",
      users: "Users",
      pendingApprovals: "Pending approvals",
      revenue: "Revenue",
      activeNotifications: "Active notifications",
      publishedPosts: "Published posts",
      approve: "Approve",
      reject: "Reject",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      search: "Search...",
      filter: "Filter",
      export: "Export",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      failed: "Failed",
      published: "Published",
      draft: "Draft",
      high: "High",
      medium: "Medium",
      low: "Low"
    }
  };

  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': case 'completed': case 'published': return 'bg-green-100 text-green-800';
      case 'rejected': case 'failed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveConsultant = (consultantId: number) => {
    console.log('Approving consultant:', consultantId);
    // API call would go here
  };

  const handleRejectConsultant = (consultantId: number) => {
    console.log('Rejecting consultant:', consultantId);
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
              <Badge className="ml-3 bg-red-800 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </Badge>
            </div>
            
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
              
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-red-700">
                  {language === 'nl' ? 'Gebruiker Dashboard' : 'User Dashboard'}
                </Button>
              </Link>
              
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.adminDashboard}</h1>
          <p className="text-gray-600">
            {language === 'nl' 
              ? 'Beheer gebruikers, consultants, transacties en content'
              : 'Manage users, consultants, transactions and content'
            }
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.users}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-gray-600">{t.consultants}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalConsultants}</p>
                  <p className="text-xs text-orange-600">{mockStats.pendingConsultants} {t.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.revenue}</p>
                  <p className="text-2xl font-bold text-gray-900">€{mockStats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{mockStats.totalTransactions} {t.transactions.toLowerCase()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Bell className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{t.notifications}</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.activeNotifications}</p>
                  <p className="text-xs text-gray-500">{mockStats.publishedPosts} {t.publishedPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="consultants">{t.consultants}</TabsTrigger>
            <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
            <TabsTrigger value="blog">{t.blog}</TabsTrigger>
            <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                    {language === 'nl' ? 'Acties Vereist' : 'Actions Required'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-orange-900">
                          {mockStats.pendingConsultants} {language === 'nl' ? 'consultant aanmeldingen' : 'consultant applications'}
                        </p>
                        <p className="text-sm text-orange-700">
                          {language === 'nl' ? 'Wachten op goedkeuring' : 'Waiting for approval'}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        {t.view}
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-red-900">
                          3 {language === 'nl' ? 'transactie geschillen' : 'transaction disputes'}
                        </p>
                        <p className="text-sm text-red-700">
                          {language === 'nl' ? 'Vereisen onderzoek' : 'Require investigation'}
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        {t.view}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    {language === 'nl' ? 'Recente Activiteit' : 'Recent Activity'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Nieuwe gebruiker geregistreerd</p>
                        <p className="text-xs text-gray-500">2 minuten geleden</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Sessie voltooid: €12.50</p>
                        <p className="text-xs text-gray-500">5 minuten geleden</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Blog post gepubliceerd</p>
                        <p className="text-xs text-gray-500">1 uur geleden</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Consultants Tab */}
          <TabsContent value="consultants" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'nl' ? 'Consultant Beheer' : 'Consultant Management'}</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      {t.export}
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      {language === 'nl' ? 'Uitnodigen' : 'Invite'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <Input
                        placeholder={t.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                      />
                    </div>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{language === 'nl' ? 'Alle statussen' : 'All statuses'}</SelectItem>
                        <SelectItem value="pending">{t.pending}</SelectItem>
                        <SelectItem value="approved">{t.approved}</SelectItem>
                        <SelectItem value="rejected">{t.rejected}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    {mockPendingConsultants.map((consultant) => (
                      <div key={consultant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{consultant.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h4 className="font-medium">{consultant.name}</h4>
                            <p className="text-sm text-gray-600">{consultant.specialty}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                              <span>{consultant.experience} ervaring</span>
                              <span>Aangemeld: {consultant.appliedAt}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(consultant.status)}>
                            {t[consultant.status as keyof typeof t]}
                          </Badge>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                {t.view}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>{consultant.name} - {language === 'nl' ? 'Aanmelding Details' : 'Application Details'}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Email</Label>
                                    <p className="text-sm">{consultant.email}</p>
                                  </div>
                                  <div>
                                    <Label>{language === 'nl' ? 'Specialiteit' : 'Specialty'}</Label>
                                    <p className="text-sm">{consultant.specialty}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label>{language === 'nl' ? 'Documenten' : 'Documents'}</Label>
                                  <div className="flex space-x-2 mt-1">
                                    {consultant.documents.map((doc, index) => (
                                      <Badge key={index} variant="outline">{doc}</Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2 pt-4">
                                  <Button 
                                    onClick={() => handleApproveConsultant(consultant.id)}
                                    className="flex-1"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {t.approve}
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => handleRejectConsultant(consultant.id)}
                                    className="flex-1"
                                  >
                                    <XCircle className="h-4 w-4 mr-2" />
                                    {t.reject}
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'nl' ? 'Transactie Beheer' : 'Transaction Management'}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.export}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{transaction.user}</h4>
                            <Badge variant="outline">{transaction.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {transaction.date}
                            {transaction.consultant && ` • ${transaction.consultant}`}
                            {transaction.reason && ` • ${transaction.reason}`}
                          </p>
                          {transaction.stripeId && (
                            <p className="text-xs text-gray-500">Stripe: {transaction.stripeId}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}€{Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <Badge className={getStatusColor(transaction.status.toLowerCase())}>
                            {t[transaction.status.toLowerCase() as keyof typeof t]}
                          </Badge>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'nl' ? 'Blog Beheer' : 'Blog Management'}</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {language === 'nl' ? 'Nieuwe Post' : 'New Post'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBlogPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{post.title}</h4>
                          {post.featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{language === 'nl' ? 'Door' : 'By'} {post.author}</span>
                          <Badge className={getStatusColor(post.status)}>
                            {t[post.status as keyof typeof t]}
                          </Badge>
                          {post.publishedAt && <span>{post.publishedAt}</span>}
                          <span>{post.views} {language === 'nl' ? 'weergaven' : 'views'}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
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
                <div className="flex justify-between items-center">
                  <CardTitle>{language === 'nl' ? 'Systeem Meldingen' : 'System Notifications'}</CardTitle>
                  <Button variant="outline" size="sm">
                    {language === 'nl' ? 'Alles markeren als gelezen' : 'Mark all as read'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={getPriorityColor(notification.priority)}>
                              {t[notification.priority as keyof typeof t]}
                            </Badge>
                            <span className="text-sm text-gray-500">{notification.createdAt}</span>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm">{notification.message}</p>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          {language === 'nl' ? 'Actie ondernemen' : 'Take action'}
                        </Button>
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