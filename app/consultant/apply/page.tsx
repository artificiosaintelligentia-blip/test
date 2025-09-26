'use client';

import { useState } from 'react';
import { 
  Globe, 
  Upload, 
  CheckCircle, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin,
  Award,
  FileText,
  Camera,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const specialties = [
  "Medium",
  "Helderziend",
  "Tarot & Kaartleggingen",
  "Life coaching",
  "Liefde & Relatie",
  "Spiritualiteit",
  "Astrologie",
  "Reiki & Healing",
  "Chakra balancing",
  "Droomduiding",
  "Numerologie",
  "Kristallen therapie"
];

const languages = [
  "Nederlands",
  "English",
  "Français",
  "Deutsch",
  "Español",
  "Italiano"
];

const serviceTypes = [
  { id: 'CALL', label: 'Telefonische gesprekken', icon: Phone },
  { id: 'CHAT', label: 'Live chat sessies', icon: MessageCircle },
  { id: 'MESSAGE', label: 'Berichten uitwisseling', icon: Mail },
  { id: 'APPOINTMENT', label: 'Geplande afspraken', icon: Calendar }
];

export default function ConsultantApplicationPage() {
  const [language, setLanguage] = useState<'nl' | 'en'>('nl');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    
    // Professional Info
    specialty: '',
    experience: '',
    certifications: '',
    bio: '',
    pricePerMin: '',
    languages: [] as string[],
    services: [] as string[],
    
    // Availability
    workingHours: '',
    timezone: '',
    
    // Documents
    profilePhoto: null as File | null,
    cv: null as File | null,
    certificates: null as File | null,
    portfolio: null as File | null,
    
    // Agreement
    agreeTerms: false,
    agreeBackground: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    nl: {
      title: "Word Consultant",
      subtitle: "Sluit je aan bij ons team van spirituele adviseurs",
      step: "Stap",
      of: "van",
      personalInfo: "Persoonlijke Informatie",
      professionalInfo: "Professionele Informatie", 
      documents: "Documenten",
      review: "Beoordeling",
      firstName: "Voornaam",
      lastName: "Achternaam",
      email: "E-mailadres",
      phone: "Telefoonnummer",
      location: "Locatie",
      dateOfBirth: "Geboortedatum",
      specialty: "Hoofdspecialiteit",
      experience: "Jaren ervaring",
      certifications: "Certificeringen",
      bio: "Professionele bio",
      pricePerMin: "Tarief per minuut (€)",
      languages: "Talen",
      services: "Diensten",
      workingHours: "Werktijden",
      timezone: "Tijdzone",
      profilePhoto: "Profielfoto",
      cv: "CV/Resume",
      certificates: "Certificaten",
      portfolio: "Portfolio",
      agreeTerms: "Ik ga akkoord met de consultant voorwaarden",
      agreeBackground: "Ik ga akkoord met een achtergrondcontrole",
      previous: "Vorige",
      next: "Volgende",
      submit: "Aanmelding Versturen",
      submitting: "Versturen...",
      success: "Aanmelding Verstuurd!",
      successMessage: "We hebben je aanmelding ontvangen en zullen deze binnen 3-5 werkdagen beoordelen.",
      backToHome: "Terug naar Home"
    },
    en: {
      title: "Become a Consultant",
      subtitle: "Join our team of spiritual advisors",
      step: "Step",
      of: "of",
      personalInfo: "Personal Information",
      professionalInfo: "Professional Information",
      documents: "Documents", 
      review: "Review",
      firstName: "First name",
      lastName: "Last name",
      email: "Email address",
      phone: "Phone number",
      location: "Location",
      dateOfBirth: "Date of birth",
      specialty: "Main specialty",
      experience: "Years of experience",
      certifications: "Certifications",
      bio: "Professional bio",
      pricePerMin: "Rate per minute (€)",
      languages: "Languages",
      services: "Services",
      workingHours: "Working hours",
      timezone: "Timezone",
      profilePhoto: "Profile photo",
      cv: "CV/Resume",
      certificates: "Certificates",
      portfolio: "Portfolio",
      agreeTerms: "I agree to the consultant terms",
      agreeBackground: "I agree to a background check",
      previous: "Previous",
      next: "Next",
      submit: "Submit Application",
      submitting: "Submitting...",
      success: "Application Submitted!",
      successMessage: "We have received your application and will review it within 3-5 business days.",
      backToHome: "Back to Home"
    }
  };

  const t = translations[language];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.success}</h2>
            <p className="text-gray-600 mb-6">{t.successMessage}</p>
            <Link href="/">
              <Button className="w-full">{t.backToHome}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              
              <Link href="/auth/login">
                <Button size="sm" className="bg-white text-blue-600 hover:bg-gray-100">
                  {language === 'nl' ? 'Inloggen' : 'Login'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {t.step} {currentStep} {t.of} 4
            </p>
          </div>
        </div>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && t.personalInfo}
              {currentStep === 2 && t.professionalInfo}
              {currentStep === 3 && t.documents}
              {currentStep === 4 && t.review}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">{t.firstName}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">{t.lastName}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">{t.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">{t.location}</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="mt-2"
                    placeholder="Amsterdam, Nederland"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dateOfBirth">{t.dateOfBirth}</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="specialty">{t.specialty}</Label>
                    <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecteer specialiteit" />
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
                  
                  <div>
                    <Label htmlFor="experience">{t.experience}</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecteer ervaring" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 jaar</SelectItem>
                        <SelectItem value="3-5">3-5 jaar</SelectItem>
                        <SelectItem value="6-10">6-10 jaar</SelectItem>
                        <SelectItem value="11-15">11-15 jaar</SelectItem>
                        <SelectItem value="15+">15+ jaar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">{t.bio}</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="mt-2"
                    rows={4}
                    placeholder="Vertel over jezelf, je ervaring en hoe je mensen helpt..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="certifications">{t.certifications}</Label>
                  <Textarea
                    id="certifications"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    className="mt-2"
                    rows={3}
                    placeholder="Lijst je certificeringen, diploma's en kwalificaties..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="pricePerMin">{t.pricePerMin}</Label>
                  <Input
                    id="pricePerMin"
                    type="number"
                    step="0.25"
                    min="1"
                    max="10"
                    value={formData.pricePerMin}
                    onChange={(e) => handleInputChange('pricePerMin', e.target.value)}
                    className="mt-2"
                    placeholder="2.50"
                  />
                </div>
                
                <div>
                  <Label>{t.languages}</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {languages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <Checkbox
                          id={lang}
                          checked={formData.languages.includes(lang)}
                          onCheckedChange={(checked) => handleArrayChange('languages', lang, checked as boolean)}
                        />
                        <Label htmlFor={lang} className="text-sm">{lang}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>{t.services}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {serviceTypes.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={formData.services.includes(service.id)}
                          onCheckedChange={(checked) => handleArrayChange('services', service.id, checked as boolean)}
                        />
                        <Label htmlFor={service.id} className="text-sm flex items-center">
                          <service.icon className="h-4 w-4 mr-2" />
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="profilePhoto">{t.profilePhoto}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload een professionele foto</p>
                      <Input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('profilePhoto')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Selecteer Foto
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="cv">{t.cv}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload je CV of resume</p>
                      <Input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange('cv', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('cv')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Selecteer CV
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="certificates">{t.certificates}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload certificaten</p>
                      <Input
                        id="certificates"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileChange('certificates', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('certificates')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Selecteer Bestanden
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="portfolio">{t.portfolio}</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Star className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload portfolio (optioneel)</p>
                      <Input
                        id="portfolio"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleFileChange('portfolio', e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('portfolio')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Selecteer Bestanden
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Aanmelding Overzicht</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Persoonlijke Informatie</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Naam:</strong> {formData.firstName} {formData.lastName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Telefoon:</strong> {formData.phone}</p>
                        <p><strong>Locatie:</strong> {formData.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Professionele Informatie</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Specialiteit:</strong> {formData.specialty}</p>
                        <p><strong>Ervaring:</strong> {formData.experience}</p>
                        <p><strong>Tarief:</strong> €{formData.pricePerMin}/min</p>
                        <p><strong>Talen:</strong> {formData.languages.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                    <p className="text-sm text-gray-600">{formData.bio}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm leading-5">
                      {t.agreeTerms}. <Link href="/support/consultant-terms" className="text-blue-600 hover:underline">Lees de voorwaarden</Link>
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeBackground"
                      checked={formData.agreeBackground}
                      onCheckedChange={(checked) => handleInputChange('agreeBackground', checked)}
                    />
                    <Label htmlFor="agreeBackground" className="text-sm leading-5">
                      {t.agreeBackground}
                    </Label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                {t.previous}
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={nextStep}>
                  {t.next}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.agreeTerms || !formData.agreeBackground || isSubmitting}
                >
                  {isSubmitting ? t.submitting : t.submit}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}