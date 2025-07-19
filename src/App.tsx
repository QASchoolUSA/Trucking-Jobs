import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  Zap, 
  Star, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  CheckCircle
} from 'lucide-react';

// Types for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  workEligible: string;
  workStatus: string;
  drivingExperience: string;
  cdlViolations: string;
  violationDetails: string;
  haulingPreferences: string[];
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    workEligible: '',
    workStatus: '',
    drivingExperience: '',
    cdlViolations: '',
    violationDetails: '',
    haulingPreferences: []
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Navigation functions
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // Personal Information validation
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    // Work eligibility validation
    if (!formData.workEligible) {
      errors.workEligible = 'Please select your work eligibility status';
    }
    if (formData.workEligible === 'yes' && !formData.workStatus) {
      errors.workStatus = 'Please select your current status';
    }

    // Driving experience validation
    if (!formData.drivingExperience.trim()) {
      errors.drivingExperience = 'Years of experience is required';
    }
    if (!formData.cdlViolations) {
      errors.cdlViolations = 'Please indicate if you have any CDL violations';
    }
    if (formData.cdlViolations === 'yes' && !formData.violationDetails.trim()) {
      errors.violationDetails = 'Please provide violation details';
    }

    // Hauling preferences validation
    if (formData.haulingPreferences.length === 0) {
      errors.haulingPreferences = 'Please select at least one hauling preference';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      setFormSubmitted(true);
    }
  };

  // Update form data
  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Handle checkbox changes for hauling preferences
  const handleHaulingPreferenceChange = (preference: string, checked: boolean) => {
    const updatedPreferences = checked
      ? [...formData.haulingPreferences, preference]
      : formData.haulingPreferences.filter(p => p !== preference);
    
    updateFormData('haulingPreferences', updatedPreferences);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      workEligible: '',
      workStatus: '',
      drivingExperience: '',
      cdlViolations: '',
      violationDetails: '',
      haulingPreferences: []
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  // Navbar Component
  const Navbar = () => (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">TruckerLink</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => navigateTo('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('get-hired')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'get-hired'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Get Hired
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'contact'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateTo('get-hired')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <button
                onClick={() => navigateTo('home')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  currentPage === 'home'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('get-hired')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  currentPage === 'get-hired'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Get Hired
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  currentPage === 'contact'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateTo('get-hired')}
                className="bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors w-full text-left mt-2"
              >
                Apply Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  // HomePage Component
  const HomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat h-96 md:h-[500px] lg:h-[600px] flex items-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Next Driving Job is Just a Click Away
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connect with top trucking companies across the nation. Find the perfect driving opportunity that matches your experience and preferences.
          </p>
          <button
            onClick={() => navigateTo('get-hired')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Hired Now
          </button>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TruckerLink?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're dedicated to connecting professional drivers with the best opportunities in the industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Top Companies */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Star className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Top Companies</h3>
              <p className="text-gray-600">
                Access exclusive job opportunities from the nation's leading trucking companies and logistics providers.
              </p>
            </div>

            {/* Personalized Matching */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Matching</h3>
              <p className="text-gray-600">
                Our advanced matching system connects you with positions that fit your experience, preferences, and lifestyle.
              </p>
            </div>

            {/* Fast & Easy Process */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <Zap className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast & Easy Process</h3>
              <p className="text-gray-600">
                Submit your information once and get matched with multiple opportunities. No lengthy applications for each job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Get Hired Page Component (Main Application Form)
  const GetHiredPage = () => {
    if (formSubmitted) {
      return (
        <div className="min-h-screen bg-gray-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-lg rounded-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your interest! We'll be in touch soon with matching job opportunities.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => navigateTo('home')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Home
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Driver Application
              </h1>
              <p className="text-lg text-gray-600">
                Complete this form to get matched with top trucking opportunities
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Work Eligibility Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Eligibility</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Are you legally eligible to work in the US? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workEligible"
                        value="yes"
                        checked={formData.workEligible === 'yes'}
                        onChange={(e) => updateFormData('workEligible', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="workEligible"
                        value="no"
                        checked={formData.workEligible === 'no'}
                        onChange={(e) => updateFormData('workEligible', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                  {formErrors.workEligible && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.workEligible}</p>
                  )}
                </div>

                {/* Conditional Work Status Field */}
                {formData.workEligible === 'yes' && (
                  <div>
                    <label htmlFor="workStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      What is your current status? *
                    </label>
                    <select
                      id="workStatus"
                      value={formData.workStatus}
                      onChange={(e) => updateFormData('workStatus', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.workStatus ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select your status</option>
                      <option value="US Citizen">US Citizen</option>
                      <option value="Green Card Holder">Green Card Holder</option>
                      <option value="EAD">EAD</option>
                      <option value="Work Visa">Work Visa</option>
                    </select>
                    {formErrors.workStatus && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.workStatus}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Driving Experience & History Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Driving Experience & History</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="drivingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Commercial Driving Experience *
                    </label>
                    <input
                      type="number"
                      id="drivingExperience"
                      min="0"
                      value={formData.drivingExperience}
                      onChange={(e) => updateFormData('drivingExperience', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.drivingExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.drivingExperience && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.drivingExperience}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Any CDL violations or accidents in the last 3 years? *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cdlViolations"
                        value="yes"
                        checked={formData.cdlViolations === 'yes'}
                        onChange={(e) => updateFormData('cdlViolations', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="cdlViolations"
                        value="no"
                        checked={formData.cdlViolations === 'no'}
                        onChange={(e) => updateFormData('cdlViolations', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </div>
                  {formErrors.cdlViolations && (
                    <p className="mt-1 text-sm text-red-600">{formErrors.cdlViolations}</p>
                  )}
                </div>

                {/* Conditional Violation Details Field */}
                {formData.cdlViolations === 'yes' && (
                  <div>
                    <label htmlFor="violationDetails" className="block text-sm font-medium text-gray-700 mb-2">
                      Please provide details *
                    </label>
                    <textarea
                      id="violationDetails"
                      rows={4}
                      value={formData.violationDetails}
                      onChange={(e) => updateFormData('violationDetails', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.violationDetails ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Please describe any violations or accidents..."
                    />
                    {formErrors.violationDetails && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.violationDetails}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Hauling Preferences Section */}
              <div className="pb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Hauling Preferences</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What loads/trailers are you willing to haul? * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Reefer', 'Dry Van', 'Flatbed', 'Conestoga', 'Other'].map((preference) => (
                      <label key={preference} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.haulingPreferences.includes(preference)}
                          onChange={(e) => handleHaulingPreferenceChange(preference, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-gray-700">{preference}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.haulingPreferences && (
                    <p className="mt-2 text-sm text-red-600">{formErrors.haulingPreferences}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Contact Page Component
  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with our team. We're here to help you find your next driving opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <Phone className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">contact@truckerlink.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Address</p>
                  <p className="text-gray-600">
                    1234 Highway Avenue<br />
                    Trucking City, TC 12345
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="contactName"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="contactMessage"
                  rows={6}
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <Truck className="h-8 w-8 text-blue-400 mr-2" />
              <span className="text-xl font-bold">TruckerLink</span>
            </div>
            <p className="text-gray-300">
              Connecting professional drivers with top trucking opportunities across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigateTo('home')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('get-hired')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Get Hired
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 TruckerLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );

  // Main App Render
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'get-hired' && <GetHiredPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />
    </div>
  );
}

export default App;