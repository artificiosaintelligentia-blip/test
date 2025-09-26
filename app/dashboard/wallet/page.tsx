'use client';

import { useState } from 'react';
import { 
  Globe, 
  CreditCard, 
  Plus, 
  Download, 
  Euro,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';

// Mock data - in real app this would come from API
const mockData = {
  user: {
    name: "Jan Janssen",
    email: "jan@example.com",
    walletBalance: 2550, // in cents = €25.50
    memberSince: "Maart 2024"
  },
  transactions: [
    { 
      id: 1, 
      date: "2024-01-15", 
      type: "TOPUP", 
      amount: 2500, 
      description: "Credits gekocht via iDEAL", 
      status: "COMPLETED",
      stripeSessionId: "cs_test_123"
    },
    { 
      id: 2, 
      date: "2024-01-14", 
      type: "SESSION", 
      amount: -750, 
      description: "Gesprek met Maria van der Berg (15 min)", 
      status: "COMPLETED",
      sessionId: "sess_123"
    },
    { 
      id: 3, 
      date: "2024-01-12", 
      type: "SESSION", 
      amount: -1200, 
      description: "Chat sessie met David Klaasen (24 min)", 
      status: "COMPLETED",
      sessionId: "sess_124"
    },
    { 
      id: 4, 
      date: "2024-01-10", 
      type: "TOPUP", 
      amount: 5000, 
      description: "Credits gekocht via creditcard", 
      status: "COMPLETED",
      stripeSessionId: "cs_test_456"
    },
    { 
      id: 5, 
      date: "2024-01-08", 
      type: "REFUND", 
      amount: 500, 
      description: "Terugbetaling sessie #sess_122", 
      status: "COMPLETED",
      sessionId: "sess_122"
    }
  ]
};

// Check if Stripe is available (in real app this would come from API)
const isStripeEnabled = true; // This would be determined by server

export default function WalletPage() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [topupAmount, setTopupAmount] = useState('25');
  const [isLoading, setIsLoading] = useState(false);

  const translations = {
    nl: {
      wallet: "Portemonnee",
      balance: "Saldo",
      topUp: "Bijladen",
      transactions: "Transacties",
      amount: "Bedrag",
      description: "Omschrijving",
      date: "Datum",
      status: "Status",
      type: "Type",
      topUpCredits: "Credits bijladen",
      selectAmount: "Selecteer bedrag",
      customAmount: "Aangepast bedrag",
      payWithIdeal: "Betalen met iDEAL",
      payWithCard: "Betalen met creditcard",
      completed: "Voltooid",
      pending: "In behandeling",
      failed: "Mislukt",
      refunded: "Terugbetaald",
      topup: "Bijlading",
      session: "Sessie",
      refund: "Terugbetaling",
      withdrawal: "Opname",
      exportTransactions: "Transacties exporteren",
      stripeNotAvailable: "Betalingen zijn momenteel niet beschikbaar",
      stripeNotAvailableDesc: "De betalingsfunctionaliteit is tijdelijk uitgeschakeld."
    },
    en: {
      wallet: "Wallet",
      balance: "Balance",
      topUp: "Top Up",
      transactions: "Transactions",
      amount: "Amount",
      description: "Description",
      date: "Date",
      status: "Status",
      type: "Type",
      topUpCredits: "Top up credits",
      selectAmount: "Select amount",
      customAmount: "Custom amount",
      payWithIdeal: "Pay with iDEAL",
      payWithCard: "Pay with credit card",
      completed: "Completed",
      pending: "Pending",
      failed: "Failed",
      refunded: "Refunded",
      topup: "Top-up",
      session: "Session",
      refund: "Refund",
      withdrawal: "Withdrawal",
      exportTransactions: "Export transactions",
      stripeNotAvailable: "Payments are currently unavailable",
      stripeNotAvailableDesc: "Payment functionality is temporarily disabled."
    }
  };

  const t = translations[language];

  const formatAmount = (amountInCents: number) => {
    return (Math.abs(amountInCents) / 100).toFixed(2);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'TOPUP':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'SESSION':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'REFUND':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'WITHDRAWAL':
        return <ArrowDownRight className="h-4 w-4 text-orange-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'TOPUP':
        return 'bg-green-100 text-green-800';
      case 'SESSION':
        return 'bg-blue-100 text-blue-800';
      case 'REFUND':
        return 'bg-purple-100 text-purple-800';
      case 'WITHDRAWAL':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTopUp = async (paymentMethod: 'ideal' | 'card') => {
    if (!isStripeEnabled) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(topupAmount),
          paymentMethod
        }),
      });

      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
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
              
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                  {language === 'nl' ? 'Dashboard' : 'Dashboard'}
                </Button>
              </Link>
              
              <Link href="/auth/login">
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  {mockData.user.name}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.wallet}</h1>
          <p className="text-gray-600">
            {language === 'nl' ? 'Beheer je credits en bekijk je transactiegeschiedenis' : 'Manage your credits and view transaction history'}
          </p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">{t.balance}</p>
                <div className="flex items-center">
                  <Euro className="h-8 w-8 text-blue-600 mr-2" />
                  <span className="text-4xl font-bold text-gray-900">
                    {formatAmount(mockData.user.walletBalance)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {language === 'nl' ? 'Beschikbaar saldo' : 'Available balance'}
                </p>
              </div>
              
              {isStripeEnabled ? (
                <div className="text-right">
                  <Button size="lg" className="mb-2">
                    <Plus className="h-5 w-5 mr-2" />
                    {t.topUp}
                  </Button>
                  <p className="text-xs text-gray-500">
                    {language === 'nl' ? 'Veilig betalen met iDEAL of creditcard' : 'Secure payment with iDEAL or credit card'}
                  </p>
                </div>
              ) : (
                <div className="text-right">
                  <div className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg">
                    <AlertCircle className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">{t.stripeNotAvailable}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top-up Section */}
          <div className="lg:col-span-1">
            {isStripeEnabled ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    {t.topUpCredits}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="amount">{t.selectAmount}</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {['10', '25', '50', '100'].map((amount) => (
                        <Button
                          key={amount}
                          variant={topupAmount === amount ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setTopupAmount(amount)}
                          className="h-12"
                        >
                          €{amount}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="customAmount">{t.customAmount}</Label>
                    <Input
                      id="customAmount"
                      type="number"
                      value={topupAmount}
                      onChange={(e) => setTopupAmount(e.target.value)}
                      className="mt-2"
                      placeholder="€"
                      min="1"
                      max="500"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleTopUp('ideal')}
                      disabled={isLoading || !topupAmount || parseFloat(topupAmount) < 1}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t.payWithIdeal}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleTopUp('card')}
                      disabled={isLoading || !topupAmount || parseFloat(topupAmount) < 1}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t.payWithCard}
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• {language === 'nl' ? 'Minimum €1, maximum €500' : 'Minimum €1, maximum €500'}</p>
                    <p>• {language === 'nl' ? 'Veilige betaling via Stripe' : 'Secure payment via Stripe'}</p>
                    <p>• {language === 'nl' ? 'Credits vervallen niet' : 'Credits never expire'}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t.stripeNotAvailable}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {t.stripeNotAvailableDesc}
                  </p>
                  <Link href="/support/contact">
                    <Button variant="outline">
                      {language === 'nl' ? 'Contact opnemen' : 'Contact support'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Transactions Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{t.transactions}</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {t.exportTransactions}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {transaction.description}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getTypeColor(transaction.type)} variant="secondary">
                              {t[transaction.type.toLowerCase() as keyof typeof t] || transaction.type}
                            </Badge>
                            <Badge className={getStatusColor(transaction.status)} variant="secondary">
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1">
                                {t[transaction.status.toLowerCase() as keyof typeof t] || transaction.status}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}€{formatAmount(transaction.amount)}
                        </div>
                        {transaction.stripeSessionId && (
                          <p className="text-xs text-gray-400 mt-1">
                            ID: {transaction.stripeSessionId.slice(-8)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {mockData.transactions.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      {language === 'nl' ? 'Nog geen transacties' : 'No transactions yet'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}