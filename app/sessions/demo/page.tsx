'use client';

import { useState } from 'react';
import { 
  Play, 
  Square, 
  Star, 
  Clock, 
  Phone, 
  MessageCircle, 
  Mail, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Euro,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

// Mock data for demo
const mockConsultants = [
  {
    id: 'consultant1',
    name: 'Maria van der Berg',
    specialty: 'Medium & Helderziende',
    pricePerMin: 2.50,
    availability: 'online',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['CALL', 'CHAT', 'MESSAGE']
  },
  {
    id: 'consultant2',
    name: 'David Klaasen',
    specialty: 'Life Coach & Spiritueel Adviseur',
    pricePerMin: 3.00,
    availability: 'online',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['CALL', 'MESSAGE']
  }
];

const mockUser = {
  name: 'Jan Janssen',
  walletBalance: 2000 // €20.00
};

interface SessionData {
  id: string;
  consultantId: string;
  consultant: {
    name: string;
    image: string;
  };
  type: string;
  cost: number;
  status: string;
  startedAt: string;
  duration?: number;
}

export default function SessionDemoPage() {
  const [selectedConsultant, setSelectedConsultant] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('');
  const [estimatedMinutes, setEstimatedMinutes] = useState<number>(5);
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  
  // Review state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [completedReview, setCompletedReview] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const consultant = mockConsultants.find(c => c.id === selectedConsultant);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'CALL': return <Phone className="h-4 w-4" />;
      case 'CHAT': return <MessageCircle className="h-4 w-4" />;
      case 'MESSAGE': return <Mail className="h-4 w-4" />;
      case 'APPOINTMENT': return <Calendar className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatCurrency = (cents: number) => {
    return `€${(cents / 100).toFixed(2)}`;
  };

  const startSession = async () => {
    if (!selectedConsultant || !sessionType) {
      setMessage({ type: 'error', text: 'Please select consultant and session type' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Simulate API call to create session
      const sessionCost = Math.round((consultant?.pricePerMin || 0) * estimatedMinutes * 100);
      
      // Mock session creation
      const mockSession: SessionData = {
        id: `session_${Date.now()}`,
        consultantId: selectedConsultant,
        consultant: {
          name: consultant?.name || '',
          image: consultant?.image || ''
        },
        type: sessionType,
        cost: sessionCost,
        status: 'ACTIVE',
        startedAt: new Date().toISOString()
      };

      setCurrentSession(mockSession);
      setIsSessionActive(true);
      setSessionDuration(0);
      setMessage({ type: 'success', text: 'Session started successfully!' });

      // Start timer
      const timer = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
      setSessionTimer(timer);

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to start session' });
    } finally {
      setIsLoading(false);
    }
  };

  const endSession = async () => {
    if (!currentSession || !isSessionActive) return;

    setIsLoading(true);
    
    try {
      // Stop timer
      if (sessionTimer) {
        clearInterval(sessionTimer);
        setSessionTimer(null);
      }

      const actualMinutes = Math.max(1, Math.ceil(sessionDuration / 60));
      
      // Mock session completion
      const updatedSession = {
        ...currentSession,
        status: 'COMPLETED',
        duration: actualMinutes,
        cost: Math.round((consultant?.pricePerMin || 0) * actualMinutes * 100)
      };

      setCurrentSession(updatedSession);
      setIsSessionActive(false);
      setShowReviewForm(true);
      setMessage({ type: 'success', text: `Session completed! Duration: ${actualMinutes} minutes` });

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to end session' });
    } finally {
      setIsLoading(false);
    }
  };

  const submitReview = async () => {
    if (!currentSession || !reviewRating) return;

    setIsLoading(true);

    try {
      // Mock review creation
      const mockReview = {
        id: `review_${Date.now()}`,
        sessionId: currentSession.id,
        rating: reviewRating,
        comment: reviewComment,
        createdAt: new Date().toISOString(),
        user: {
          name: mockUser.name
        }
      };

      setCompletedReview(mockReview);
      setShowReviewForm(false);
      setMessage({ type: 'success', text: 'Review submitted successfully!' });

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to submit review' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetDemo = () => {
    if (sessionTimer) {
      clearInterval(sessionTimer);
      setSessionTimer(null);
    }
    setCurrentSession(null);
    setIsSessionActive(false);
    setSessionDuration(0);
    setShowReviewForm(false);
    setCompletedReview(null);
    setReviewRating(5);
    setReviewComment('');
    setMessage(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Session Demo
              </h1>
              <p className="text-gray-600">
                Test the complete session flow: start, conduct, end, and review
              </p>
            </div>
            <div className="flex space-x-4">
              <Link href="/sessions/test">
                <Button variant="outline">
                  Pre-Auth Test
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* User Info */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <User className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="font-medium">{mockUser.name}</p>
                  <p className="text-sm text-gray-500">Demo User</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Wallet Balance</p>
                <p className="text-xl font-bold text-green-600">
                  {formatCurrency(mockUser.walletBalance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Display */}
        {message && (
          <Card className={`mb-6 border-2 ${
            message.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                )}
                <span className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                  {message.text}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Session Setup */}
          <Card>
            <CardHeader>
              <CardTitle>Start New Session</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!currentSession ? (
                <>
                  {/* Consultant Selection */}
                  <div>
                    <Label>Select Consultant</Label>
                    <Select value={selectedConsultant} onValueChange={setSelectedConsultant}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choose a consultant" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockConsultants.map((consultant) => (
                          <SelectItem key={consultant.id} value={consultant.id}>
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={consultant.image} />
                                <AvatarFallback>{consultant.name[0]}</AvatarFallback>
                              </Avatar>
                              <span>{consultant.name}</span>
                              <Badge variant="outline">€{consultant.pricePerMin}/min</Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Session Type */}
                  {consultant && (
                    <div>
                      <Label>Session Type</Label>
                      <Select value={sessionType} onValueChange={setSessionType}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Choose session type" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultant.services.map((service) => (
                            <SelectItem key={service} value={service}>
                              <div className="flex items-center space-x-2">
                                {getServiceIcon(service)}
                                <span>{service}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Estimated Duration */}
                  <div>
                    <Label>Estimated Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={estimatedMinutes}
                      onChange={(e) => setEstimatedMinutes(parseInt(e.target.value) || 5)}
                      min="1"
                      max="120"
                      className="mt-2"
                    />
                  </div>

                  {/* Cost Preview */}
                  {consultant && (
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Session Cost Preview</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Rate:</span>
                          <span>€{consultant.pricePerMin}/min</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{estimatedMinutes} minutes</span>
                        </div>
                        <div className="flex justify-between font-medium border-t pt-1">
                          <span>Estimated Cost:</span>
                          <span>{formatCurrency(Math.round(consultant.pricePerMin * estimatedMinutes * 100))}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={startSession}
                    disabled={!selectedConsultant || !sessionType || isLoading}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Session
                  </Button>
                </>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Session Configuration Complete</p>
                  <p className="text-gray-600">Session is now active in the panel to the right</p>
                  <Button onClick={resetDemo} variant="outline" className="mt-4">
                    Start New Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Session / Review */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentSession ? (
                  isSessionActive ? 'Active Session' : 
                  showReviewForm ? 'Leave Review' : 
                  completedReview ? 'Session Complete' : 'Session Status'
                ) : 'Session Status'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!currentSession ? (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active session</p>
                  <p className="text-sm text-gray-500 mt-2">Start a session to see it here</p>
                </div>
              ) : showReviewForm ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage src={currentSession.consultant.image} />
                      <AvatarFallback>{currentSession.consultant.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-medium">{currentSession.consultant.name}</h3>
                    <p className="text-sm text-gray-500">
                      Session Duration: {currentSession.duration} minutes
                    </p>
                    <p className="text-sm text-gray-500">
                      Final Cost: {formatCurrency(currentSession.cost)}
                    </p>
                  </div>

                  <div>
                    <Label>Rating</Label>
                    <div className="flex space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${
                              star <= reviewRating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Comment (optional)</Label>
                    <Textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience..."
                      className="mt-2"
                      rows={4}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={submitReview} disabled={isLoading} className="flex-1">
                      Submit Review
                    </Button>
                    <Button onClick={() => setShowReviewForm(false)} variant="outline">
                      Skip
                    </Button>
                  </div>
                </div>
              ) : completedReview ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Review Submitted!</h3>
                    <p className="text-gray-600">Thank you for your feedback</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{currentSession.consultant.name}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= completedReview.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {completedReview.comment && (
                      <p className="text-sm text-gray-700 italic">"{completedReview.comment}"</p>
                    )}
                  </div>

                  <Button onClick={resetDemo} className="w-full">
                    Start Another Session
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Session Info */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={currentSession.consultant.image} />
                      <AvatarFallback>{currentSession.consultant.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{currentSession.consultant.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        {getServiceIcon(currentSession.type)}
                        <span>{currentSession.type}</span>
                        <Badge variant={isSessionActive ? 'default' : 'secondary'}>
                          {currentSession.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Session Timer */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {formatTime(sessionDuration)}
                    </div>
                    <p className="text-sm text-gray-500">Session Duration</p>
                  </div>

                  {/* Session Cost */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current Cost:</span>
                      <span className="font-bold text-blue-600">
                        {formatCurrency(Math.round((consultant?.pricePerMin || 0) * Math.max(1, Math.ceil(sessionDuration / 60)) * 100))}
                      </span>
                    </div>
                  </div>

                  {/* Session Controls */}
                  {isSessionActive ? (
                    <Button onClick={endSession} disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700">
                      <Square className="h-4 w-4 mr-2" />
                      End Session
                    </Button>
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-600 mb-4">Session completed</p>
                      <Button onClick={() => setShowReviewForm(true)} className="w-full">
                        Leave Review
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Demo Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-blue-600 mb-2">1. Setup</h4>
                <p className="text-sm text-gray-600">
                  Select a consultant, session type, and estimated duration
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-green-600 mb-2">2. Start Session</h4>
                <p className="text-sm text-gray-600">
                  Click "Start Session" to begin. Timer starts automatically
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-orange-600 mb-2">3. End Session</h4>
                <p className="text-sm text-gray-600">
                  Click "End Session" when done. Cost calculated based on actual time
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium text-purple-600 mb-2">4. Review</h4>
                <p className="text-sm text-gray-600">
                  Leave a rating and comment. Updates consultant's overall rating
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}