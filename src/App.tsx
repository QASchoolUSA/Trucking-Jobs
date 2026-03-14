import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
  CheckCircle,
  ClipboardList,
  Handshake,
  ChevronDown,
  ChevronUp,
  Shield,
  Clock,
  DollarSign,
  Map,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  Building2,
  Target
} from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center" aria-label="TruckerLink home">
            <Truck className="h-8 w-8 text-blue-600 mr-2" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900">TruckerLink</span>
          </Link>

          <div className="hidden md:flex items-baseline space-x-4">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/about" className={navLinkClass('/about')}>About</Link>
            <Link to="/get-hired" className={navLinkClass('/get-hired')}>Get Hired</Link>
            <Link to="/contact" className={navLinkClass('/contact')}>Contact Us</Link>
            <Link
              to="/get-hired"
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/get-hired', label: 'Get Hired' },
              { to: '/contact', label: 'Contact Us' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                  isActive(to) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/get-hired"
              onClick={() => setMobileMenuOpen(false)}
              className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors w-full text-left mt-2"
            >
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                           */
/* ------------------------------------------------------------------ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-6 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-semibold text-gray-900">{question}</span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Home Page                                                          */
/* ------------------------------------------------------------------ */
function HomePage() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How does TruckerLink help truck drivers find jobs?',
      answer:
        'TruckerLink is a free recruitment platform for CDL truck drivers. You fill out one simple application with your experience, CDL credentials, and hauling preferences, and our matching system connects you with multiple trucking companies that fit your profile. No need to apply separately to each company — we bring the best job offers directly to you.',
    },
    {
      question: 'Is TruckerLink free for truck drivers?',
      answer:
        'Yes, TruckerLink is 100% free for truck drivers. We never charge drivers any fees. Our service is paid for by trucking companies who are looking for qualified CDL drivers. You can apply, get matched, and get hired without paying anything.',
    },
    {
      question: 'What types of trucking jobs are available on TruckerLink?',
      answer:
        'TruckerLink offers a wide range of trucking positions including OTR (Over-the-Road) long-haul routes, regional driving jobs, local delivery positions, dedicated routes, and team driving opportunities. We cover all trailer types: reefer (refrigerated), dry van, flatbed, conestoga, tanker, and more.',
    },
    {
      question: 'What qualifications do I need to apply through TruckerLink?',
      answer:
        'Most positions require a valid CDL (Commercial Driver\'s License), typically Class A. Requirements vary by employer, but generally you need to be legally eligible to work in the United States, have a clean driving record, and pass a DOT physical and drug screening. Both experienced drivers and recent CDL graduates are welcome to apply.',
    },
    {
      question: 'How quickly can I get hired through TruckerLink?',
      answer:
        'Many drivers receive their first job match within 24-48 hours of submitting their application. The complete hiring process, including interviews and onboarding, typically takes 1-2 weeks depending on the trucking company. Our streamlined system is designed to get you on the road as fast as possible.',
    },
    {
      question: 'What pay can I expect from trucking jobs on TruckerLink?',
      answer:
        'Pay varies by position, experience, and route type. OTR drivers on TruckerLink typically earn between $60,000 and $90,000+ per year. Local and regional drivers can expect $50,000–$80,000 annually. Many of our partner companies also offer sign-on bonuses, performance bonuses, full benefits packages, and home-time guarantees.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center bg-no-repeat min-h-[500px] lg:min-h-[620px] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url('https://images.pexels.com/photos/1109543/pexels-photo-1109543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
        aria-label="Hero banner showing a semi-truck on the open highway"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Find Top-Paying CDL Truck Driver Jobs — Get Hired Fast
          </h1>
          <p className="text-xl md:text-2xl mb-4 max-w-3xl mx-auto leading-relaxed">
            TruckerLink connects professional CDL drivers with the best trucking companies in America. OTR, regional, local, flatbed, reefer, dry van — one application, unlimited opportunities.
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            100% free for drivers. Apply in under 5 minutes. Start earning more today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/get-hired')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Hired Now
            </button>
            <Link
              to="/about"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="how-it-works-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How TruckerLink Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting matched with your ideal trucking job takes just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '1',
                Icon: ClipboardList,
                title: 'Submit Your Application',
                desc: 'Fill out one quick form with your CDL credentials, driving experience, hauling preferences, and the type of routes you want — OTR, regional, or local.',
              },
              {
                step: '2',
                Icon: Handshake,
                title: 'Get Matched with Top Companies',
                desc: 'Our system instantly matches your profile with trucking companies that fit your qualifications, pay expectations, and lifestyle needs.',
              },
              {
                step: '3',
                Icon: Truck,
                title: 'Hit the Road & Start Earning',
                desc: 'Review your offers, choose the position you want, complete onboarding, and start your new driving career — often within days.',
              },
            ].map(({ step, Icon, title, desc }) => (
              <div key={step} className="text-center p-8 rounded-xl bg-gray-50 relative">
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                    {step}
                  </div>
                </div>
                <Icon className="h-10 w-10 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose TruckerLink */}
      <section className="py-16 bg-gray-50" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Professional Drivers Choose TruckerLink
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're the trusted recruitment platform for thousands of CDL drivers across America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                Icon: Star,
                title: 'Top-Paying Companies',
                desc: 'Access exclusive positions from the nation\'s highest-paying trucking companies and logistics providers, many not listed on public job boards.',
              },
              {
                Icon: Users,
                title: 'Personalized Job Matching',
                desc: 'Our advanced matching system considers your CDL type, endorsements, experience, hauling preferences, home-time needs, and pay expectations.',
              },
              {
                Icon: Zap,
                title: 'Fast Hiring Process',
                desc: 'Submit one application and receive multiple job offers. Most drivers get their first match within 24-48 hours — no waiting weeks for responses.',
              },
              {
                Icon: Shield,
                title: 'Verified Employers Only',
                desc: 'Every trucking company in our network is thoroughly vetted. We only partner with reputable carriers that offer competitive pay, benefits, and safe equipment.',
              },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="h-12 w-12 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white" aria-labelledby="job-types-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="job-types-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trucking Job Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you prefer long-haul OTR routes or local home-daily positions, TruckerLink has the right fit for your career and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: Map,
                title: 'OTR / Long-Haul',
                desc: 'Cross-country routes with top mileage pay. Ideal for drivers who love the open road and want maximum earning potential.',
                pay: '$65K – $95K / year',
              },
              {
                Icon: Building2,
                title: 'Regional Routes',
                desc: 'Multi-state routes within a defined region. Enjoy regular home time while still earning competitive weekly miles.',
                pay: '$55K – $80K / year',
              },
              {
                Icon: Heart,
                title: 'Local / Home Daily',
                desc: 'Be home every night. Perfect for drivers who want steady pay and a predictable schedule without extended time away.',
                pay: '$50K – $75K / year',
              },
              {
                Icon: Target,
                title: 'Dedicated Routes',
                desc: 'Same lanes, same customers, consistent freight. Know your schedule and your paycheck every single week.',
                pay: '$55K – $85K / year',
              },
              {
                Icon: Users,
                title: 'Team Driving',
                desc: 'Drive with a partner and double your miles. Team positions offer the highest earning potential in trucking.',
                pay: '$70K – $100K+ / year',
              },
              {
                Icon: Award,
                title: 'Owner-Operator Leases',
                desc: 'Lease-to-own and independent contractor opportunities with top carriers. Build your own business on the road.',
                pay: '$150K – $250K+ gross / year',
              },
            ].map(({ Icon, title, desc, pay }) => (
              <div
                key={title}
                className="p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <Icon className="h-8 w-8 text-blue-600 mb-4" aria-hidden="true" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 mb-3 leading-relaxed">{desc}</p>
                <p className="text-blue-600 font-semibold text-sm">{pay}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/get-hired"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
            >
              Browse All Positions <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-blue-600 text-white" aria-labelledby="stats-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">TruckerLink by the numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10,000+', label: 'Drivers Placed' },
              { value: '500+', label: 'Partner Companies' },
              { value: '48', label: 'States Covered' },
              { value: '24 hrs', label: 'Avg. Time to First Match' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-extrabold mb-2">{value}</p>
                <p className="text-blue-100 text-lg">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Drivers Say About TruckerLink
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from real CDL drivers who found their ideal trucking positions through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'James R.',
                role: 'OTR Driver, 12 Years Experience',
                text: 'I applied on TruckerLink and had three solid offers within 48 hours. The company I chose pays $0.65/mile with a $5,000 sign-on bonus. Best career move I ever made.',
                stars: 5,
              },
              {
                name: 'Maria S.',
                role: 'Regional Driver, 5 Years Experience',
                text: 'After years of searching job boards, TruckerLink matched me with a regional position that gets me home every weekend. The pay is better than my last OTR gig and I actually see my family now.',
                stars: 5,
              },
              {
                name: 'David L.',
                role: 'Local Flatbed Driver, 8 Years Experience',
                text: "I was skeptical about another job site, but TruckerLink is different. They actually match you with real companies. I'm now driving local flatbed, home every night, making $1,400/week. Can't complain.",
                stars: 5,
              },
            ].map(({ name, role, text, stars }) => (
              <article
                key={name}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex mb-4">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-4 leading-relaxed italic">"{text}"</blockquote>
                <div>
                  <p className="font-bold text-gray-900">{name}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trailer Types */}
      <section className="py-16 bg-white" aria-labelledby="trailer-types-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="trailer-types-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hauling & Trailer Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              TruckerLink covers every major trailer category. Select your specialty or explore new opportunities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Dry Van', desc: 'General freight, enclosed trailers' },
              { name: 'Reefer', desc: 'Temperature-controlled loads' },
              { name: 'Flatbed', desc: 'Open-deck, heavy & oversized' },
              { name: 'Conestoga', desc: 'Rolling tarp flatbed systems' },
              { name: 'Tanker', desc: 'Liquid & gas transport' },
            ].map(({ name, desc }) => (
              <div key={name} className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about finding CDL truck driver jobs through TruckerLink.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Next Trucking Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join over 10,000 CDL drivers who found higher pay, better benefits, and more home time through TruckerLink. Your application takes less than 5 minutes.
          </p>
          <Link
            to="/get-hired"
            className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
          >
            Apply Now — It's Free <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  About Page                                                         */
/* ------------------------------------------------------------------ */
function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About TruckerLink</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            TruckerLink is the leading truck driver recruitment platform in the United States, purpose-built to
            connect CDL-licensed professional drivers with top-paying trucking jobs from verified carriers
            nationwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="mission-heading" className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                The trucking industry is the backbone of the American economy, moving over 72% of all freight
                tonnage across the nation. Yet finding the right driving job has always been frustrating —
                endless applications, unresponsive recruiters, and misleading job postings.
              </p>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                TruckerLink was founded to solve that problem. We built a platform where CDL drivers fill out
                <strong> one application</strong> and instantly get matched with trucking companies that fit their
                experience, credentials, pay expectations, and lifestyle needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                For drivers, our service is completely free — always has been, always will be. We believe every
                professional driver deserves access to the best opportunities in the industry without the hassle.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">What Makes Us Different</h3>
              <ul className="space-y-4">
                {[
                  'Free for all drivers — zero fees, ever',
                  'One application reaches 500+ verified trucking companies',
                  '24-48 hour average response time',
                  'All carrier partners are vetted for safety, pay, and reliability',
                  'Personalized matching based on CDL type, endorsements, and preferences',
                  'Coverage across all 48 contiguous states',
                  'Support for every trailer type: dry van, reefer, flatbed, conestoga, tanker',
                  'Dedicated support team of industry professionals',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="values-heading" className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                Icon: Heart,
                title: 'Drivers First',
                desc: 'Everything we build starts with the driver. Your career goals, your family time, your earning potential — that\'s what drives our platform.',
              },
              {
                Icon: Shield,
                title: 'Trust & Transparency',
                desc: 'No hidden fees, no misleading listings. Every company in our network is verified, and every job posting reflects real, available positions.',
              },
              {
                Icon: TrendingUp,
                title: 'Career Growth',
                desc: 'We don\'t just fill seats. We help drivers find positions that offer advancement, better pay over time, and long-term career satisfaction.',
              },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-lg shadow-md text-center">
                <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Context */}
      <section className="py-16 bg-white" aria-labelledby="industry-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="industry-heading" className="text-3xl font-bold text-gray-900 mb-6 text-center">
            The Trucking Industry & Why Drivers Matter
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              The United States trucking industry generates over <strong>$900 billion in annual revenue</strong> and
              employs approximately 3.5 million truck drivers. Commercial trucking moves 72.6% of all domestic
              freight by weight, making it the single most critical component of the American supply chain.
            </p>
            <p>
              Despite this, the industry faces a persistent driver shortage — estimated at over 80,000 drivers
              as of 2024 by the American Trucking Associations (ATA). This shortage means qualified CDL drivers
              are in higher demand than ever, with companies offering record-high pay, sign-on bonuses up to
              $15,000, and comprehensive benefits packages to attract and retain talent.
            </p>
            <p>
              TruckerLink exists to bridge the gap between drivers seeking better opportunities and companies
              seeking qualified professionals. By centralizing the application process and using intelligent
              matching, we reduce hiring time for companies and eliminate the frustration of job searching for
              drivers.
            </p>
            <p>
              Whether you hold a <strong>Class A CDL</strong>, <strong>Class B CDL</strong>, or are a
              recent graduate of a CDL training program, TruckerLink can help you find positions that match
              your skills and career aspirations — from entry-level local routes to high-paying OTR positions
              with major carriers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the TruckerLink Driver Community
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Over 10,000 drivers have already found better careers through our platform. You could be next.
          </p>
          <Link
            to="/get-hired"
            className="inline-flex items-center bg-white text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg"
          >
            Apply Now — It's Free <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Get Hired Page                                                     */
/* ------------------------------------------------------------------ */

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

function GetHiredPage() {
  const navigate = useNavigate();

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
    haulingPreferences: [],
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.workEligible) errors.workEligible = 'Please select your work eligibility status';
    if (formData.workEligible === 'yes' && !formData.workStatus) errors.workStatus = 'Please select your current status';
    if (!formData.drivingExperience.trim()) errors.drivingExperience = 'Years of experience is required';
    if (!formData.cdlViolations) errors.cdlViolations = 'Please indicate if you have any CDL violations';
    if (formData.cdlViolations === 'yes' && !formData.violationDetails.trim()) errors.violationDetails = 'Please provide violation details';
    if (formData.haulingPreferences.length === 0) errors.haulingPreferences = 'Please select at least one hauling preference';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data Submitted:', formData);
      setFormSubmitted(true);
    }
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleHaulingPreferenceChange = (preference: string, checked: boolean) => {
    const updated = checked
      ? [...formData.haulingPreferences, preference]
      : formData.haulingPreferences.filter((p) => p !== preference);
    updateFormData('haulingPreferences', updated);
  };

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
      haulingPreferences: [],
    });
    setFormErrors({});
    setFormSubmitted(false);
  };

  if (formSubmitted) {
    return (
      <section className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for applying through TruckerLink! Our team will review your profile and match you with
              trucking companies that fit your experience and preferences. Most drivers hear back within 24-48 hours.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/')}
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
      </section>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      formErrors[field] ? 'border-red-500' : 'border-gray-300'
    }`;

  return (
    <>
      {/* Intro */}
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            CDL Truck Driver Job Application
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Complete this quick application to get matched with top-paying trucking positions across the country.
            It's 100% free, takes under 5 minutes, and your information is shared only with verified carriers.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-gray-50 py-12" aria-labelledby="application-form-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 id="application-form-heading" className="sr-only">Driver Application Form</h2>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              {/* Personal Information */}
              <fieldset className="border-b border-gray-200 pb-8">
                <legend className="text-2xl font-bold text-gray-900 mb-6">Personal Information</legend>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={inputClass('firstName')}
                    />
                    {formErrors.firstName && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={inputClass('lastName')}
                    />
                    {formErrors.lastName && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={inputClass('email')}
                    />
                    {formErrors.email && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={inputClass('phone')}
                    />
                    {formErrors.phone && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.phone}</p>}
                  </div>
                </div>
              </fieldset>

              {/* Work Eligibility */}
              <fieldset className="border-b border-gray-200 pb-8">
                <legend className="text-2xl font-bold text-gray-900 mb-6">Work Eligibility</legend>
                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 mb-3">
                    Are you legally eligible to work in the US? *
                  </p>
                  <div className="space-y-2">
                    {['yes', 'no'].map((val) => (
                      <label key={val} className="flex items-center">
                        <input
                          type="radio"
                          name="workEligible"
                          value={val}
                          checked={formData.workEligible === val}
                          onChange={(e) => updateFormData('workEligible', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-gray-700 capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.workEligible && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.workEligible}</p>}
                </div>

                {formData.workEligible === 'yes' && (
                  <div>
                    <label htmlFor="workStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      What is your current status? *
                    </label>
                    <select
                      id="workStatus"
                      value={formData.workStatus}
                      onChange={(e) => updateFormData('workStatus', e.target.value)}
                      className={inputClass('workStatus')}
                    >
                      <option value="">Select your status</option>
                      <option value="US Citizen">US Citizen</option>
                      <option value="Green Card Holder">Green Card Holder</option>
                      <option value="EAD">EAD</option>
                      <option value="Work Visa">Work Visa</option>
                    </select>
                    {formErrors.workStatus && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.workStatus}</p>}
                  </div>
                )}
              </fieldset>

              {/* Driving Experience */}
              <fieldset className="border-b border-gray-200 pb-8">
                <legend className="text-2xl font-bold text-gray-900 mb-6">Driving Experience & History</legend>
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
                      className={inputClass('drivingExperience')}
                    />
                    {formErrors.drivingExperience && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.drivingExperience}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 mb-3">
                    Any CDL violations or accidents in the last 3 years? *
                  </p>
                  <div className="space-y-2">
                    {['yes', 'no'].map((val) => (
                      <label key={val} className="flex items-center">
                        <input
                          type="radio"
                          name="cdlViolations"
                          value={val}
                          checked={formData.cdlViolations === val}
                          onChange={(e) => updateFormData('cdlViolations', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-gray-700 capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.cdlViolations && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.cdlViolations}</p>}
                </div>

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
                      className={inputClass('violationDetails')}
                      placeholder="Please describe any violations or accidents..."
                    />
                    {formErrors.violationDetails && <p className="mt-1 text-sm text-red-600" role="alert">{formErrors.violationDetails}</p>}
                  </div>
                )}
              </fieldset>

              {/* Hauling Preferences */}
              <fieldset className="pb-8">
                <legend className="text-2xl font-bold text-gray-900 mb-6">Hauling Preferences</legend>
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-3">
                    What loads / trailers are you willing to haul? * (Select all that apply)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['Reefer', 'Dry Van', 'Flatbed', 'Conestoga', 'Tanker', 'Other'].map((preference) => (
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
                  {formErrors.haulingPreferences && <p className="mt-2 text-sm text-red-600" role="alert">{formErrors.haulingPreferences}</p>}
                </div>
              </fieldset>

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

          {/* Trust Signals */}
          <div className="mt-8 text-center text-gray-500 text-sm space-y-2">
            <p>Your information is encrypted and shared only with verified trucking companies.</p>
            <p>TruckerLink is 100% free for drivers. We will never charge you a fee.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact Page                                                       */
/* ------------------------------------------------------------------ */
function ContactPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-blue-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Contact TruckerLink</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have questions about finding CDL truck driver jobs? Our team of industry professionals is here to help
            you every step of the way.
          </p>
        </div>
      </section>

      <section className="min-h-screen bg-gray-50 py-12" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="contact-heading" className="sr-only">Contact information and form</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a href="tel:+15551234567" className="text-gray-600 hover:text-blue-600">(555) 123-4567</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <a href="mailto:contact@truckerlink.com" className="text-gray-600 hover:text-blue-600">
                      contact@truckerlink.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <address className="text-gray-600 not-italic">
                      1234 Highway Avenue<br />
                      Trucking City, TC 12345
                    </address>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-2 text-gray-600">
                  <p>Monday – Friday: 8:00 AM – 6:00 PM EST</p>
                  <p>Saturday: 9:00 AM – 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Common Inquiries</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Driver application support & status updates</li>
                  <li>• Trucking company partnership inquiries</li>
                  <li>• CDL job availability in your area</li>
                  <li>• Technical support with the platform</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</p>
                  <p className="text-gray-600">We'll get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      id="contactName"
                      autoComplete="name"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      autoComplete="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      id="contactMessage"
                      rows={6}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-4" aria-label="TruckerLink home">
              <Truck className="h-8 w-8 text-blue-400 mr-2" aria-hidden="true" />
              <span className="text-xl font-bold">TruckerLink</span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              The leading truck driver recruitment platform connecting CDL professionals with top-paying
              trucking jobs across the United States. Free for all drivers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About TruckerLink' },
                  { to: '/get-hired', label: 'Apply for Jobs' },
                  { to: '/contact', label: 'Contact Us' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-300 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Job Types */}
          <div>
            <h3 className="text-lg font-bold mb-4">Trucking Jobs</h3>
            <ul className="space-y-2 text-gray-300">
              <li>OTR / Long-Haul Jobs</li>
              <li>Regional Driving Jobs</li>
              <li>Local / Home Daily Jobs</li>
              <li>Flatbed Trucking Jobs</li>
              <li>Reefer Trucking Jobs</li>
              <li>Dry Van Trucking Jobs</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://facebook.com/truckerlink" aria-label="TruckerLink on Facebook" className="text-gray-300 hover:text-white transition-colors" rel="noopener noreferrer" target="_blank">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/truckerlink" aria-label="TruckerLink on Twitter" className="text-gray-300 hover:text-white transition-colors" rel="noopener noreferrer" target="_blank">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/company/truckerlink" aria-label="TruckerLink on LinkedIn" className="text-gray-300 hover:text-white transition-colors" rel="noopener noreferrer" target="_blank">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
            <div className="text-gray-300 space-y-1 text-sm">
              <p><a href="tel:+15551234567" className="hover:text-white">(555) 123-4567</a></p>
              <p><a href="mailto:contact@truckerlink.com" className="hover:text-white">contact@truckerlink.com</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} TruckerLink. All rights reserved.</p>
          <p className="mt-1">
            TruckerLink is a truck driver recruitment platform. CDL jobs, OTR trucking positions, and local driving opportunities updated daily.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  App Shell                                                          */
/* ------------------------------------------------------------------ */
function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-blue-600 focus:text-white focus:p-4">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/get-hired" element={<GetHiredPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
