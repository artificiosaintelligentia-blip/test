'use client';

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Euro, 
  Clock, 
  User,
  CreditCard,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PreAuthResult {
  success: boolean;
  message: string;
  userBalance: number;
  requiredAmount: number;
  remainingBalance?: number;
  consultant?: {
    id: string;
    name: string;
    pricePerMin: number;
    availability: string;
  };
}

interface TestUser {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
}

interface TestConsultant {
  id: string;
  name: string;
  pricePerMin: number;
  availability: string;
}

export default function PreAuthTestPage() {
  const [users, setUsers] = useState<TestUser[]>([]);
  const [consultants, setConsultants] = useState<TestConsultant[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [selectedConsultantId, setSelectedConsultantId] = useState<string>('');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(5);
  const [preAuthResult, setPreAuthResult] = useState<PreAuthResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Load test data on component mount
  useEffect(() => {
    loadTestData();
  }, []);

  const loadTestData = async () => {
    setIsLoadingData(true);
    try {
      // In a real app, this would be API calls
      // For now, we'll use mock data that matches our seed data
      const mockUsers: TestUser[] = [
        { id: 'user1', name: 'Jan Janssen', email: 'jan.janssen@example.com', walletBalance: 2000 },
        { id: 'user2', name: 'Maria Peters', email: 'maria.peters@example.com', walletBalance: 500 },
        { id: 'user3', name: 'Peter de Vries', email: 'peter.de.vries@example.com', walletBalance: 100 },
        { id: 'user4', name: 'Anna Bakker', email: 'anna.bakker@example.com', walletBalance: 0 },
      ];

      const mockConsultants: TestConsultant[] = [
        { id: 'consultant1', name: 'Maria van der Berg', pricePerMin: 2.50, availability: 'online' },
        { id: 'consultant2', name: 'David Klaasen', pricePerMin: 3.00, availability: 'busy' },
        { id: 'consultant3', name: 'Sophie Janssen', pricePerMin: 2.25, availability: 'online' },
        { id: 'consultant4', name: 'Emma Bakker', pricePerMin: 3.25, availability: 'offline' },
      ];

      setUsers(mockUsers);
      setConsultants(mockConsultants);
      
      // Set default selections
      if (mockUsers.length > 0) setSelectedUserId(mockUsers[0].id);
      if (mockConsultants.length > 0) setSelectedConsultantId(mockConsultants[0].id);
      
    } catch (error) {
      console.error('Failed to load test data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const runPreAuthTest = async () => {
    if (!selectedUserId || !selectedConsultantId) {
      alert('Please select both a user and consultant');
      return;
    }

    setIsLoading(true);
    setPreAuthResult(null);

    try {
      // Simulate the pre-auth logic
      const user = users.find(u => u.id === selectedUserId);
      const consultant = consultants.find(c => c.id === selectedConsultantId);

      if (!user || !consultant) {
        throw new Error('User or consultant not found');
      }

      // Calculate required amount (in cents)
      const requiredAmount = Math.round(consultant.pricePerMin * estimatedMinutes * 100);

      // Simulate pre-auth logic
      let result: PreAuthResult;

      if (consultant.availability === 'offline') {
        result = {
          success: false,
          message: 'Consultant is currently offline',
          userBalance: user.walletBalance,
          requiredAmount,
          consultant
        };
      } else if (user.walletBalance < requiredAmount) {
        const shortfall = requiredAmount - user.walletBalance;
        result = {
          success: false,
          message: `Insufficient credits. You need €${(shortfall / 100).toFixed(2)} more to start this session.`,
          userBalance: user.walletBalance,
          requiredAmount,
          consultant
        };
      } else {
        result = {
          success: true,
          message: 'Pre-authorization successful',
          userBalance: user.walletBalance,
          requiredAmount,
          remainingBalance: user.walletBalance - requiredAmount,
          consultant
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPreAuthResult(result);

    } catch (error) {
      console.error('Pre-auth test failed:', error);
      setPreAuthResult({
        success: false,
        message: 'Pre-authorization failed due to system error',
        userBalance: 0,
        requiredAmount: 0
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return `€${(cents / 100).toFixed(2)}`;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading test data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Pre-Authorization Test
              </h1>
              <p className="text-gray-600">
                Test the 5-minute pre-auth system to validate session affordability
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Test Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Selection */}
              <div>
                <Label htmlFor="user">Select Test User</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{user.name}</span>
                          <Badge variant="outline" className="ml-2">
                            {formatCurrency(user.walletBalance)}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedUserId && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current Balance:</span>
                      <span className="font-medium text-blue-600">
                        {formatCurrency(users.find(u => u.id === selectedUserId)?.walletBalance || 0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Consultant Selection */}
              <div>
                <Label htmlFor="consultant">Select Consultant</Label>
                <Select value={selectedConsultantId} onValueChange={setSelectedConsultantId}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Choose a consultant" />
                  </SelectTrigger>
                  <SelectContent>
                    {consultants.map((consultant) => (
                      <SelectItem key={consultant.id} value={consultant.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{consultant.name}</span>
                          <div className="flex items-center space-x-2 ml-2">
                            <Badge className={getAvailabilityColor(consultant.availability)}>
                              {consultant.availability}
                            </Badge>
                            <Badge variant="outline">
                              €{consultant.pricePerMin}/min
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Session Duration */}
              <div>
                <Label htmlFor="duration">Estimated Session Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={estimatedMinutes}
                  onChange={(e) => setEstimatedMinutes(parseInt(e.target.value) || 5)}
                  min="1"
                  max="120"
                  className="mt-2"
                />
              </div>

              {/* Cost Calculation */}
              {selectedConsultantId && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Cost Calculation</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>€{consultants.find(c => c.id === selectedConsultantId)?.pricePerMin}/min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{estimatedMinutes} minutes</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Cost:</span>
                      <span>
                        {formatCurrency(
                          Math.round((consultants.find(c => c.id === selectedConsultantId)?.pricePerMin || 0) * estimatedMinutes * 100)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Test Button */}
              <Button 
                onClick={runPreAuthTest} 
                disabled={isLoading || !selectedUserId || !selectedConsultantId}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Running Pre-Auth Test...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Run Pre-Authorization Test
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Pre-Auth Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!preAuthResult ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    Configure test parameters and click "Run Pre-Authorization Test" to see results
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Result Status */}
                  <div className={`p-4 rounded-lg border-2 ${
                    preAuthResult.success 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center mb-2">
                      {preAuthResult.success ? (
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 mr-2" />
                      )}
                      <span className={`font-semibold ${
                        preAuthResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {preAuthResult.success ? 'Pre-Authorization Successful ✅' : 'Pre-Authorization Failed ❌'}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      preAuthResult.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {preAuthResult.message}
                    </p>
                  </div>

                  {/* Financial Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Financial Details</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-sm text-gray-600">User Balance</div>
                        <div className="text-lg font-semibold text-blue-600">
                          {formatCurrency(preAuthResult.userBalance)}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="text-sm text-gray-600">Required Amount</div>
                        <div className="text-lg font-semibold text-purple-600">
                          {formatCurrency(preAuthResult.requiredAmount)}
                        </div>
                      </div>
                    </div>

                    {preAuthResult.remainingBalance !== undefined && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-sm text-gray-600">Remaining Balance After Session</div>
                        <div className="text-lg font-semibold text-green-600">
                          {formatCurrency(preAuthResult.remainingBalance)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Consultant Details */}
                  {preAuthResult.consultant && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Consultant Details</h4>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{preAuthResult.consultant.name}</span>
                          <Badge className={getAvailabilityColor(preAuthResult.consultant.availability)}>
                            {preAuthResult.consultant.availability}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          Rate: €{preAuthResult.consultant.pricePerMin}/minute
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button 
                      onClick={runPreAuthTest} 
                      variant="outline" 
                      size="sm"
                      disabled={isLoading}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Test Again
                    </Button>
                    
                    {!preAuthResult.success && preAuthResult.userBalance < preAuthResult.requiredAmount && (
                      <Link href="/dashboard/wallet">
                        <Button size="sm">
                          <Euro className="h-4 w-4 mr-2" />
                          Top Up Wallet
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Scenarios */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-green-600 mb-2">✅ Sufficient Balance</h4>
                <p className="text-sm text-gray-600">
                  User: Jan Janssen (€20.00)<br/>
                  Consultant: Sophie Janssen (€2.25/min)<br/>
                  Duration: 5 minutes
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-red-600 mb-2">❌ Insufficient Balance</h4>
                <p className="text-sm text-gray-600">
                  User: Anna Bakker (€0.00)<br/>
                  Consultant: Emma Bakker (€3.25/min)<br/>
                  Duration: 5 minutes
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-red-600 mb-2">❌ Consultant Offline</h4>
                <p className="text-sm text-gray-600">
                  User: Jan Janssen (€20.00)<br/>
                  Consultant: Emma Bakker (Offline)<br/>
                  Duration: 5 minutes
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-yellow-600 mb-2">⚠️ Barely Sufficient</h4>
                <p className="text-sm text-gray-600">
                  User: Maria Peters (€5.00)<br/>
                  Consultant: David Klaasen (€3.00/min)<br/>
                  Duration: 1 minute
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}