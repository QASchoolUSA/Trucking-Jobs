import React, { useState, useEffect, useRef } from 'react';
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
  Shield,
  DollarSign,
  Map,
  Award,
  TrendingUp,
  Heart,
  ArrowRight,
  Building2,
  Target,
  Quote,
  Sparkles,
  Clock,
  ChevronRight,
} from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = (path: string) =>
    `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive(path)
        ? 'text-brand-700 bg-brand-50'
        : 'text-gray-600 hover:text-brand-700 hover:bg-gray-50'
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-md border-b border-gray-200/50 py-2'
            : 'bg-transparent py-4'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="Trucking Jobs home">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-700 transition-colors shadow-md">
                <Truck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                Trucking<span className="text-brand-600">Jobs</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className={navLinkClass('/')}>Home</Link>
              <Link to="/about" className={navLinkClass('/about')}>About</Link>
              <Link to="/get-hired" className={navLinkClass('/get-hired')}>Get Hired</Link>
              <Link to="/contact" className={navLinkClass('/contact')}>Contact</Link>
              <Link to="/get-hired" className="btn-primary ml-3 !py-2.5 !px-6 text-sm">
                Apply Now
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 w-80 max-w-[calc(100vw-2rem)] h-full bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <span className="text-lg font-bold text-gray-900">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-5 space-y-1">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/get-hired', label: 'Get Hired' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium transition-all ${
                  isActive(to)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
                <ChevronRight className="ml-auto h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>
          <div className="p-5 border-t border-gray-100">
            <Link
              to="/get-hired"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-base"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Item                                                           */
/* ------------------------------------------------------------------ */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      open ? 'border-brand-200 bg-brand-50/30 shadow-card' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-6 py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className={`text-lg font-semibold transition-colors ${open ? 'text-brand-700' : 'text-gray-900'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          open ? 'bg-brand-600 rotate-180' : 'bg-gray-100'
        }`}>
          <ChevronDown className={`h-4 w-4 transition-colors ${open ? 'text-white' : 'text-gray-500'}`} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-5">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with intersection observer animation               */
/* ------------------------------------------------------------------ */
function Section({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Home Page                                                          */
/* ------------------------------------------------------------------ */
function HomePage() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'How does Trucking Jobs help truck drivers find jobs?',
      answer:
        'Trucking Jobs is a free recruitment platform for CDL truck drivers. You fill out one simple application with your experience, CDL credentials, and hauling preferences, and our matching system connects you with multiple trucking companies that fit your profile. No need to apply separately to each company — we bring the best job offers directly to you.',
    },
    {
      question: 'Is Trucking Jobs free for truck drivers?',
      answer:
        'Yes, Trucking Jobs is 100% free for truck drivers. We never charge drivers any fees. Our service is paid for by trucking companies who are looking for qualified CDL drivers. You can apply, get matched, and get hired without paying anything.',
    },
    {
      question: 'What types of trucking jobs are available on Trucking Jobs?',
      answer:
        'Trucking Jobs offers a wide range of trucking positions including OTR (Over-the-Road) long-haul routes, regional driving jobs, local delivery positions, dedicated routes, and team driving opportunities. We cover all trailer types: reefer (refrigerated), dry van, flatbed, conestoga, tanker, and more.',
    },
    {
      question: 'What qualifications do I need to apply through Trucking Jobs?',
      answer:
        'Most positions require a valid CDL (Commercial Driver\'s License), typically Class A. Requirements vary by employer, but generally you need to be legally eligible to work in the United States, have a clean driving record, and pass a DOT physical and drug screening. Both experienced drivers and recent CDL graduates are welcome to apply.',
    },
    {
      question: 'How quickly can I get hired through Trucking Jobs?',
      answer:
        'Many drivers receive their first job match within 24-48 hours of submitting their application. The complete hiring process, including interviews and onboarding, typically takes 1-2 weeks depending on the trucking company. Our streamlined system is designed to get you on the road as fast as possible.',
    },
    {
      question: 'What pay can I expect from trucking jobs on Trucking Jobs?',
      answer:
        'Pay varies by position, experience, and route type. OTR drivers on Trucking Jobs typically earn between $60,000 and $90,000+ per year. Local and regional drivers can expect $50,000–$80,000 annually. Many of our partner companies also offer sign-on bonuses, performance bonuses, full benefits packages, and home-time guarantees.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative hero-gradient min-h-[100vh] flex items-center overflow-hidden"
        aria-label="Hero banner"
      >
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/20 rounded-full blur-[100px] animate-pulse-soft" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-300/15 rounded-full blur-[120px] animate-pulse-soft animate-delay-300" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-brand-300" />
              <span className="text-sm font-medium text-brand-200">100% Free for CDL Drivers</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight text-balance animate-fade-in-up">
              Find Top-Paying CDL Truck Driver Jobs
            </h1>

            <p className="text-lg sm:text-xl text-brand-200/90 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-delay-100">
              One application connects you with America's best trucking companies. OTR, regional, local — get matched and start earning more in days, not weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
              <button onClick={() => navigate('/get-hired')} className="btn-primary text-lg !py-5 !px-10 shadow-lg shadow-brand-600/30">
                Get Hired Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <Link to="/about" className="btn-ghost text-lg !py-5 !px-10">
                Learn More
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 animate-fade-in-up animate-delay-400">
              {[
                { value: '10,000+', label: 'Drivers Placed' },
                { value: '500+', label: 'Carrier Partners' },
                { value: '48', label: 'States Covered' },
                { value: '<24h', label: 'Avg. Match Time' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
                  <p className="text-sm text-brand-300 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* How It Works */}
      <Section className="py-20 lg:py-28 bg-white" aria-labelledby="how-it-works-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Simple Process</p>
            <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Three simple steps to your next trucking career. No hassle, no fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                Icon: ClipboardList,
                title: 'Submit Your Application',
                desc: 'Fill out one quick form with your CDL credentials, driving experience, hauling preferences, and route type — OTR, regional, or local.',
              },
              {
                step: '02',
                Icon: Handshake,
                title: 'Get Matched Instantly',
                desc: 'Our system matches your profile with trucking companies that fit your qualifications, pay expectations, and lifestyle needs.',
              },
              {
                step: '03',
                Icon: Truck,
                title: 'Hit the Road & Earn',
                desc: 'Review your offers, choose the position you want, complete onboarding, and start your new driving career — often within days.',
              },
            ].map(({ step, Icon, title, desc }, i) => (
              <div key={step} className="relative group">
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card card-lift h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-600 transition-colors duration-300">
                      <Icon className="h-6 w-6 text-brand-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                    </div>
                    <span className="text-5xl font-extrabold text-gray-100 group-hover:text-brand-100 transition-colors">{step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-500 leading-relaxed">{desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 transform -translate-y-1/2 z-10">
                    <ChevronRight className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose */}
      <Section className="py-20 lg:py-28 bg-gray-50 mesh-bg" aria-labelledby="why-choose-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Why Us</p>
            <h2 id="why-choose-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Why Drivers Choose Trucking Jobs
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The trusted recruitment platform for thousands of CDL professionals across America.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: Star,
                title: 'Top-Paying Companies',
                desc: 'Access exclusive positions from the highest-paying trucking companies, many not listed on public job boards.',
                color: 'from-amber-400 to-orange-500',
                bg: 'bg-amber-50',
              },
              {
                Icon: Users,
                title: 'Personalized Matching',
                desc: 'Our system considers your CDL type, endorsements, experience, preferences, and pay expectations.',
                color: 'from-brand-400 to-brand-600',
                bg: 'bg-brand-50',
              },
              {
                Icon: Zap,
                title: 'Fast Hiring Process',
                desc: 'Submit one application and get multiple offers. Most drivers hear back within 24-48 hours.',
                color: 'from-emerald-400 to-green-600',
                bg: 'bg-emerald-50',
              },
              {
                Icon: Shield,
                title: 'Verified Employers',
                desc: 'Every carrier is thoroughly vetted for safety, competitive pay, benefits, and reliable equipment.',
                color: 'from-violet-400 to-purple-600',
                bg: 'bg-violet-50',
              },
            ].map(({ Icon, title, desc, bg }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card card-lift"
              >
                <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-5`}>
                  <Icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Job Categories */}
      <Section className="py-20 lg:py-28 bg-white" aria-labelledby="job-types-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Opportunities</p>
            <h2 id="job-types-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Trucking Job Categories
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Whether you prefer long-haul OTR or local home-daily positions, we have the right fit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                Icon: Map,
                title: 'OTR / Long-Haul',
                desc: 'Cross-country routes with top mileage pay. Ideal for drivers who love the open road.',
                pay: '$65K – $95K / year',
              },
              {
                Icon: Building2,
                title: 'Regional Routes',
                desc: 'Multi-state routes within a defined region. Regular home time with competitive weekly miles.',
                pay: '$55K – $80K / year',
              },
              {
                Icon: Heart,
                title: 'Local / Home Daily',
                desc: 'Be home every night. Steady pay and a predictable schedule without extended time away.',
                pay: '$50K – $75K / year',
              },
              {
                Icon: Target,
                title: 'Dedicated Routes',
                desc: 'Same lanes, same customers, consistent freight. Know your schedule and paycheck weekly.',
                pay: '$55K – $85K / year',
              },
              {
                Icon: Users,
                title: 'Team Driving',
                desc: 'Drive with a partner and double your miles. Highest earning potential in trucking.',
                pay: '$70K – $100K+ / year',
              },
              {
                Icon: Award,
                title: 'Owner-Operator Leases',
                desc: 'Lease-to-own and independent contractor opportunities. Build your own business on the road.',
                pay: '$150K – $250K+ gross / year',
              },
            ].map(({ Icon, title, desc, pay }) => (
              <div
                key={title}
                className="group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-card card-lift overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-500 to-brand-300 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-600 transition-colors duration-300">
                    <Icon className="h-5 w-5 text-brand-600 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{desc}</p>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      <DollarSign className="h-3.5 w-3.5" />
                      {pay}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/get-hired" className="btn-primary text-lg">
              Browse All Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section className="py-20 lg:py-24 hero-gradient relative overflow-hidden" aria-labelledby="stats-heading">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="stats-heading" className="sr-only">Trucking Jobs by the numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { value: '10,000+', label: 'Drivers Placed', Icon: Users },
              { value: '500+', label: 'Partner Companies', Icon: Building2 },
              { value: '48', label: 'States Covered', Icon: Map },
              { value: '24 hrs', label: 'Avg. Match Time', Icon: Clock },
            ].map(({ value, label, Icon }) => (
              <div key={label} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-brand-300" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-1">{value}</p>
                <p className="text-brand-300 text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              What Drivers Say
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Real CDL drivers who found their ideal positions through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: 'James R.',
                role: 'OTR Driver, 12 Years Experience',
                text: 'I applied on Trucking Jobs and had three solid offers within 48 hours. The company I chose pays $0.65/mile with a $5,000 sign-on bonus. Best career move I ever made.',
                initials: 'JR',
              },
              {
                name: 'Maria S.',
                role: 'Regional Driver, 5 Years Experience',
                text: 'After years of searching job boards, Trucking Jobs matched me with a regional position that gets me home every weekend. The pay is better than my last OTR gig and I actually see my family now.',
                initials: 'MS',
              },
              {
                name: 'David L.',
                role: 'Local Flatbed Driver, 8 Years Experience',
                text: "I was skeptical about another job site, but Trucking Jobs is different. They actually match you with real companies. I'm now driving local flatbed, home every night, making $1,400/week.",
                initials: 'DL',
              },
            ].map(({ name, role, text, initials }) => (
              <article
                key={name}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-card card-lift relative"
              >
                <Quote className="absolute top-6 right-6 h-10 w-10 text-brand-100" aria-hidden="true" />
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-gray-600 leading-relaxed mb-6 relative z-10">
                  "{text}"
                </blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-sm">
                    {initials}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>

      {/* Trailer Types */}
      <Section className="py-20 lg:py-28 bg-white" aria-labelledby="trailer-types-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Specialties</p>
            <h2 id="trailer-types-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Hauling & Trailer Types
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Every major trailer category covered. Select your specialty or explore new opportunities.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Dry Van', desc: 'General freight, enclosed trailers' },
              { name: 'Reefer', desc: 'Temperature-controlled loads' },
              { name: 'Flatbed', desc: 'Open-deck, heavy & oversized' },
              { name: 'Conestoga', desc: 'Rolling tarp flatbed systems' },
              { name: 'Tanker', desc: 'Liquid & gas transport' },
            ].map(({ name, desc }) => (
              <div
                key={name}
                className="group bg-white border border-gray-200 rounded-2xl px-8 py-6 text-center hover:border-brand-300 hover:shadow-card transition-all duration-300 w-full sm:w-auto sm:min-w-[200px]"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 group-hover:bg-brand-50 flex items-center justify-center transition-colors">
                  <Truck className="h-5 w-5 text-gray-400 group-hover:text-brand-600 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{name}</h3>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="py-20 lg:py-28 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">FAQ</p>
            <h2 id="faq-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Everything you need to know about finding CDL truck driver jobs.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 lg:py-28 hero-gradient relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/20 rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight text-balance">
            Ready to Start Your Next Trucking Career?
          </h2>
          <p className="text-lg text-brand-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join over 10,000 CDL drivers who found higher pay, better benefits, and more home time. Your application takes less than 5 minutes.
          </p>
          <Link
            to="/get-hired"
            className="inline-flex items-center justify-center bg-white text-brand-700 font-bold py-5 px-10 rounded-xl text-lg transition-all duration-200 hover:bg-brand-50 hover:shadow-xl shadow-lg active:scale-[0.98]"
          >
            Apply Now — It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
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
      <section className="hero-gradient relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-brand-400/15 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
            <Building2 className="h-4 w-4 text-brand-300" />
            <span className="text-sm font-medium text-brand-200">Our Story</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            About Trucking Jobs
          </h1>
          <p className="text-lg sm:text-xl text-brand-200/90 max-w-2xl mx-auto leading-relaxed">
            The leading truck driver recruitment platform, purpose-built to connect CDL professionals with top-paying jobs from verified carriers nationwide.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Mission */}
      <Section className="py-20 lg:py-28 bg-white" aria-labelledby="mission-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Our Mission</p>
              <h2 id="mission-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
                Connecting Drivers with Better Careers
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  The trucking industry is the backbone of the American economy, moving over 72% of all freight
                  tonnage across the nation. Yet finding the right driving job has always been frustrating —
                  endless applications, unresponsive recruiters, and misleading job postings.
                </p>
                <p className="text-lg">
                  Trucking Jobs was founded to solve that problem. We built a platform where CDL drivers fill out
                  <strong className="text-gray-900"> one application</strong> and instantly get matched with trucking companies that fit their
                  experience, credentials, pay expectations, and lifestyle needs.
                </p>
                <p className="text-lg">
                  For drivers, our service is completely free — always has been, always will be. We believe every
                  professional driver deserves access to the best opportunities without the hassle.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-brand-50/50 rounded-3xl p-8 lg:p-10 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">What Makes Us Different</h3>
              <ul className="space-y-4">
                {[
                  'Free for all drivers — zero fees, ever',
                  'One application reaches 500+ verified trucking companies',
                  '24-48 hour average response time',
                  'All carrier partners vetted for safety, pay, and reliability',
                  'Personalized matching based on CDL type and preferences',
                  'Coverage across all 48 contiguous states',
                  'Every trailer type: dry van, reefer, flatbed, conestoga, tanker',
                  'Dedicated support team of industry professionals',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="py-20 lg:py-28 bg-gray-50 mesh-bg" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">What We Stand For</p>
            <h2 id="values-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                Icon: Heart,
                title: 'Drivers First',
                desc: 'Everything we build starts with the driver. Your career goals, your family time, your earning potential — that\'s what drives our platform.',
                bg: 'bg-rose-50',
              },
              {
                Icon: Shield,
                title: 'Trust & Transparency',
                desc: 'No hidden fees, no misleading listings. Every company in our network is verified, and every job posting reflects real, available positions.',
                bg: 'bg-brand-50',
              },
              {
                Icon: TrendingUp,
                title: 'Career Growth',
                desc: 'We don\'t just fill seats. We help drivers find positions that offer advancement, better pay over time, and long-term career satisfaction.',
                bg: 'bg-emerald-50',
              },
            ].map(({ Icon, title, desc, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-card card-lift text-center">
                <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <Icon className="h-7 w-7 text-brand-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                <p className="text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Industry Context */}
      <Section className="py-20 lg:py-28 bg-white" aria-labelledby="industry-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wider mb-3">Industry Insight</p>
            <h2 id="industry-heading" className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Why Drivers Matter
            </h2>
          </div>
          <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
            <p>
              The United States trucking industry generates over <strong className="text-gray-900">$900 billion in annual revenue</strong> and
              employs approximately 3.5 million truck drivers. Commercial trucking moves 72.6% of all domestic
              freight by weight, making it the single most critical component of the American supply chain.
            </p>
            <p>
              Despite this, the industry faces a persistent driver shortage — estimated at over 80,000 drivers
              as of 2024 by the American Trucking Associations (ATA). This means qualified CDL drivers
              are in higher demand than ever, with companies offering record-high pay, sign-on bonuses up to
              $15,000, and comprehensive benefits packages.
            </p>
            <p>
              Trucking Jobs exists to bridge the gap between drivers seeking better opportunities and companies
              seeking qualified professionals. By centralizing the application process and using intelligent
              matching, we reduce hiring time for companies and eliminate frustration for drivers.
            </p>
            <p>
              Whether you hold a <strong className="text-gray-900">Class A CDL</strong>, <strong className="text-gray-900">Class B CDL</strong>, or are a
              recent graduate of a CDL training program, Trucking Jobs can help you find positions that match
              your skills and aspirations — from entry-level local routes to high-paying OTR positions.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <section className="py-20 lg:py-28 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-400/20 rounded-full blur-[150px]" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight text-balance">
            Join the Trucking Jobs Driver Community
          </h2>
          <p className="text-lg text-brand-200 mb-10">
            Over 10,000 drivers have already found better careers through our platform. You could be next.
          </p>
          <Link
            to="/get-hired"
            className="inline-flex items-center justify-center bg-white text-brand-700 font-bold py-5 px-10 rounded-xl text-lg transition-all duration-200 hover:bg-brand-50 hover:shadow-xl shadow-lg active:scale-[0.98]"
          >
            Apply Now — It's Free
            <ArrowRight className="ml-2 h-5 w-5" />
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
      <section className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-10 sm:p-14 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" aria-hidden="true" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Application Submitted!</h1>
            <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto">
              Thank you for applying through Trucking Jobs! We'll match you with companies that fit your profile. Most drivers hear back within 24-48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate('/')} className="btn-primary">
                Back to Home
              </button>
              <button onClick={resetForm} className="btn-secondary">
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = (field: string) =>
    `input-modern ${formErrors[field] ? 'error' : ''}`;

  return (
    <>
      {/* Intro */}
      <section className="hero-gradient relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
            <Clock className="h-4 w-4 text-brand-300" />
            <span className="text-sm font-medium text-brand-200">Takes Under 5 Minutes</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            CDL Driver Application
          </h1>
          <p className="text-lg text-brand-200/90 max-w-2xl mx-auto">
            Complete this quick application to get matched with top-paying trucking positions. 100% free — your info is shared only with verified carriers.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="bg-gray-50 pb-20" aria-labelledby="application-form-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-8 sm:p-10 lg:p-12">
            <h2 id="application-form-heading" className="sr-only">Driver Application Form</h2>

            <form onSubmit={handleSubmit} className="space-y-10" noValidate>
              {/* Personal Information */}
              <fieldset>
                <legend className="text-xl font-bold text-gray-900 mb-2">Personal Information</legend>
                <p className="text-sm text-gray-500 mb-6">Tell us about yourself so we can match you with the right opportunities.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      className={inputClass('firstName')}
                      placeholder="John"
                    />
                    {formErrors.firstName && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      className={inputClass('lastName')}
                      placeholder="Smith"
                    />
                    {formErrors.lastName && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className={inputClass('email')}
                      placeholder="john@example.com"
                    />
                    {formErrors.email && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className={inputClass('phone')}
                      placeholder="(555) 123-4567"
                    />
                    {formErrors.phone && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.phone}</p>}
                  </div>
                </div>
              </fieldset>

              <hr className="border-gray-100" />

              {/* Work Eligibility */}
              <fieldset>
                <legend className="text-xl font-bold text-gray-900 mb-2">Work Eligibility</legend>
                <p className="text-sm text-gray-500 mb-6">Confirm your eligibility to work as a truck driver in the United States.</p>
                <div className="mb-6">
                  <p className="block text-sm font-semibold text-gray-700 mb-3">
                    Are you legally eligible to work in the US? <span className="text-red-400">*</span>
                  </p>
                  <div className="flex gap-4">
                    {['yes', 'no'].map((val) => (
                      <label
                        key={val}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.workEligible === val
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="workEligible"
                          value={val}
                          checked={formData.workEligible === val}
                          onChange={(e) => updateFormData('workEligible', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.workEligible === val ? 'border-brand-500' : 'border-gray-300'
                        }`}>
                          {formData.workEligible === val && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
                        </div>
                        <span className="font-medium capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.workEligible && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.workEligible}</p>}
                </div>

                {formData.workEligible === 'yes' && (
                  <div>
                    <label htmlFor="workStatus" className="block text-sm font-semibold text-gray-700 mb-2">
                      What is your current status? <span className="text-red-400">*</span>
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
                    {formErrors.workStatus && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.workStatus}</p>}
                  </div>
                )}
              </fieldset>

              <hr className="border-gray-100" />

              {/* Driving Experience */}
              <fieldset>
                <legend className="text-xl font-bold text-gray-900 mb-2">Driving Experience</legend>
                <p className="text-sm text-gray-500 mb-6">Share your commercial driving background and history.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label htmlFor="drivingExperience" className="block text-sm font-semibold text-gray-700 mb-2">
                      Years of Experience <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      id="drivingExperience"
                      min="0"
                      value={formData.drivingExperience}
                      onChange={(e) => updateFormData('drivingExperience', e.target.value)}
                      className={inputClass('drivingExperience')}
                      placeholder="0"
                    />
                    {formErrors.drivingExperience && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.drivingExperience}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="block text-sm font-semibold text-gray-700 mb-3">
                    CDL violations or accidents in the last 3 years? <span className="text-red-400">*</span>
                  </p>
                  <div className="flex gap-4">
                    {['yes', 'no'].map((val) => (
                      <label
                        key={val}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.cdlViolations === val
                            ? 'border-brand-500 bg-brand-50 text-brand-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <input
                          type="radio"
                          name="cdlViolations"
                          value={val}
                          checked={formData.cdlViolations === val}
                          onChange={(e) => updateFormData('cdlViolations', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.cdlViolations === val ? 'border-brand-500' : 'border-gray-300'
                        }`}>
                          {formData.cdlViolations === val && <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />}
                        </div>
                        <span className="font-medium capitalize">{val}</span>
                      </label>
                    ))}
                  </div>
                  {formErrors.cdlViolations && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.cdlViolations}</p>}
                </div>

                {formData.cdlViolations === 'yes' && (
                  <div>
                    <label htmlFor="violationDetails" className="block text-sm font-semibold text-gray-700 mb-2">
                      Please provide details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="violationDetails"
                      rows={4}
                      value={formData.violationDetails}
                      onChange={(e) => updateFormData('violationDetails', e.target.value)}
                      className={inputClass('violationDetails')}
                      placeholder="Please describe any violations or accidents..."
                    />
                    {formErrors.violationDetails && <p className="mt-2 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.violationDetails}</p>}
                  </div>
                )}
              </fieldset>

              <hr className="border-gray-100" />

              {/* Hauling Preferences */}
              <fieldset>
                <legend className="text-xl font-bold text-gray-900 mb-2">Hauling Preferences</legend>
                <p className="text-sm text-gray-500 mb-6">Select the types of loads and trailers you're willing to haul.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Reefer', 'Dry Van', 'Flatbed', 'Conestoga', 'Tanker', 'Other'].map((preference) => (
                    <label
                      key={preference}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.haulingPreferences.includes(preference)
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.haulingPreferences.includes(preference)}
                        onChange={(e) => handleHaulingPreferenceChange(preference, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
                        formData.haulingPreferences.includes(preference) ? 'border-brand-500 bg-brand-500' : 'border-gray-300'
                      }`}>
                        {formData.haulingPreferences.includes(preference) && (
                          <CheckCircle className="h-3.5 w-3.5 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-sm">{preference}</span>
                    </label>
                  ))}
                </div>
                {formErrors.haulingPreferences && <p className="mt-3 text-sm text-red-500 flex items-center gap-1" role="alert"><X className="h-3.5 w-3.5" />{formErrors.haulingPreferences}</p>}
              </fieldset>

              <div className="pt-4">
                <button type="submit" className="btn-primary w-full text-lg !py-4">
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
              <Shield className="h-4 w-4" />
              <span>Your information is encrypted and shared only with verified trucking companies.</span>
            </div>
            <p className="text-gray-400 text-sm">Trucking Jobs is 100% free for drivers. We will never charge you a fee.</p>
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
      <section className="hero-gradient relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-8">
            <Mail className="h-4 w-4 text-brand-300" />
            <span className="text-sm font-medium text-brand-200">We're Here to Help</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Contact Trucking Jobs
          </h1>
          <p className="text-lg text-brand-200/90 max-w-2xl mx-auto">
            Have questions about finding CDL truck driver jobs? Our team is here to help every step of the way.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="bg-gray-50 pb-20" aria-labelledby="contact-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
          <h2 id="contact-heading" className="sr-only">Contact information and form</h2>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Get in Touch</h3>
                <div className="space-y-5">
                  {[
                    {
                      Icon: Phone,
                      label: 'Phone',
                      value: '(555) 123-4567',
                      href: 'tel:+15551234567',
                    },
                    {
                      Icon: Mail,
                      label: 'Email',
                      value: 'contact@truckingjobs.com',
                      href: 'mailto:contact@truckingjobs.com',
                    },
                  ].map(({ Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-brand-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                        <a href={href} className="text-gray-900 font-medium hover:text-brand-600 transition-colors">
                          {value}
                        </a>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-5 w-5 text-brand-600" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Address</p>
                      <address className="text-gray-900 font-medium not-italic">
                        1234 Highway Avenue<br />
                        Trucking City, TC 12345
                      </address>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h4>
                <div className="space-y-3">
                  {[
                    { day: 'Mon – Fri', hours: '8:00 AM – 6:00 PM EST' },
                    { day: 'Saturday', hours: '9:00 AM – 4:00 PM EST' },
                    { day: 'Sunday', hours: 'Closed' },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{day}</span>
                      <span className="text-gray-500">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 sm:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-sm text-gray-500 mb-8">We'll get back to you within one business day.</p>
                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-emerald-600" aria-hidden="true" />
                    </div>
                    <p className="text-xl font-bold text-gray-900 mb-2">Message Sent!</p>
                    <p className="text-gray-500">We'll get back to you within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        id="contactName"
                        autoComplete="name"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                        className="input-modern"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        id="contactEmail"
                        autoComplete="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                        className="input-modern"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactMessage" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                      <textarea
                        id="contactMessage"
                        rows={6}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                        className="input-modern"
                        placeholder="How can we help you?"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full text-base">
                      Send Message
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </form>
                )}
              </div>
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
    <footer className="bg-gray-950 text-white relative overflow-hidden" role="contentinfo">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5" aria-label="Trucking Jobs home">
              <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
                <Truck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">
                Trucking<span className="text-brand-400">Jobs</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              The leading truck driver recruitment platform connecting CDL professionals with top-paying
              trucking jobs across the United States. Free for all drivers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-5">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About Us' },
                  { to: '/get-hired', label: 'Apply for Jobs' },
                  { to: '/contact', label: 'Contact Us' },
                ].map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Job Types */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-5">Job Types</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>OTR / Long-Haul Jobs</li>
              <li>Regional Driving Jobs</li>
              <li>Local / Home Daily</li>
              <li>Flatbed Trucking</li>
              <li>Reefer Trucking</li>
              <li>Dry Van Trucking</li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-5">Connect</h3>
            <div className="flex gap-3 mb-6">
              {[
                { href: 'https://facebook.com/truckingjobs', label: 'Facebook', Icon: Facebook },
                { href: 'https://twitter.com/truckingjobs', label: 'Twitter', Icon: Twitter },
                { href: 'https://linkedin.com/company/truckingjobs', label: 'LinkedIn', Icon: Linkedin },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={`Trucking Jobs on ${label}`}
                  className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-brand-600 hover:text-white transition-all"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <p><a href="tel:+15551234567" className="text-gray-400 hover:text-white transition-colors">(555) 123-4567</a></p>
              <p><a href="mailto:contact@truckingjobs.com" className="text-gray-400 hover:text-white transition-colors">contact@truckingjobs.com</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Trucking Jobs. All rights reserved.</p>
          <p>CDL jobs, OTR trucking positions, and local driving opportunities updated daily.</p>
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
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:bg-brand-600 focus:text-white focus:p-4 focus:rounded-br-lg">
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
