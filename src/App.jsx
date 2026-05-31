import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  BookOpen, 
  Sparkles, 
  Award, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronRight, 
  Shield, 
  TrendingUp, 
  Smile, 
  Calendar,
  Send,
  CheckCircle,
  HelpCircle,
  Copy,
  DollarSign
} from 'lucide-react';
import Hero3D from './components/Hero3D';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  // Modals state
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  
  // Form submissions
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', email: '', portfolio: '', coverLetter: '' });
  
  // Section refs for active tracking
  const sections = ['home', 'about', 'programs', 'impact', 'careers', 'contact'];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link tracker
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      setContactSubmitted(true);
      setTimeout(() => {
        setContactSubmitted(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (applyForm.name && applyForm.email) {
      setApplySubmitted(true);
      setTimeout(() => {
        setApplySubmitted(false);
        setApplyModalOpen(false);
        setApplyForm({ name: '', email: '', portfolio: '', coverLetter: '' });
      }, 3000);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <>
      {/* Background Glowing Effects */}
      <div className="bg-glow glow-top-left" />
      <div className="bg-glow glow-mid" />
      <div className="bg-glow glow-bottom-right" />

      {/* Header / Navbar */}
      <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container nav-container">
          <div className="logo-wrapper" style={{ cursor: 'pointer' }} onClick={() => scrollTo('home')}>
            <img src="/she_can_logo.jpeg" alt="She Can Foundation Logo" className="logo-img" />
            <span className="logo-text">
              She Can <span className="logo-highlight">Foundation</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav>
            <ul className="nav-menu">
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(section);
                    }}
                    className={`nav-link ${activeSection === section ? 'active' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setDonateModalOpen(true)}
                  className="btn btn-primary btn-glow"
                >
                  <Heart size={16} fill="currentColor" /> Support Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu-overlay"
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
              {sections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(section);
                    }}
                    style={{
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      color: activeSection === section ? 'var(--primary)' : 'var(--text-white)'
                    }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
              <li style={{ width: '100%', marginTop: '1rem' }}>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setDonateModalOpen(true);
                  }}
                  className="btn btn-primary btn-glow"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Heart size={16} fill="currentColor" /> Support Us
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ flexGrow: 1 }}>
        
        {/* HERO SECTION */}
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="hero-content"
            >
              <div className="hero-badge">
                <span className="pulse-circle" /> Registered NGO • Societies Act 1860
              </div>
              <h1 className="hero-title">
                Empowering Women.<br />
                <span className="text-gradient">Restoring Dignity.</span>
              </h1>
              <p className="hero-lead">
                She Can Foundation works to break social and economic barriers, enabling women from marginalized communities across India to lead independent, self-reliant, and dignified lives.
              </p>
              <div className="hero-buttons">
                <button onClick={() => scrollTo('programs')} className="btn btn-primary btn-glow">
                  Explore Programs <ChevronRight size={16} />
                </button>
                <button onClick={() => scrollTo('careers')} className="btn btn-secondary">
                  Join As Volunteer
                </button>
              </div>
            </motion.div>

            {/* 3D Canvas Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="hero-3d-container"
            >
              <Hero3D />
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section id="impact" className="stats-section">
          <div className="container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="stats-grid"
            >
              <motion.div variants={fadeIn} className="stat-card glass glass-interactive">
                <div className="stat-number">120K+</div>
                <div className="stat-label">Girls Empowered</div>
                <div className="stat-desc">Through hygienic health awareness</div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card glass glass-interactive">
                <div className="stat-number">100%</div>
                <div className="stat-label">Transparent Impact</div>
                <div className="stat-desc">Every donation changes a life directly</div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card glass glass-interactive">
                <div className="stat-number">82+</div>
                <div className="stat-label">Skill Programs</div>
                <div className="stat-desc">Vocational training batches</div>
              </motion.div>
              <motion.div variants={fadeIn} className="stat-card glass glass-interactive">
                <div className="stat-number">150+</div>
                <div className="stat-label">Active Volunteers</div>
                <div className="stat-desc">Youth driving local initiatives</div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MISSION & CORE VALUES SECTION */}
        <section id="about" className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-badge">About the Foundation</span>
              <h2 className="section-title">Driven by Purpose & Hope</h2>
              <p className="section-description">
                We envision a society where every woman has equal access to resources, knowledge, and dignity, regardless of her socio-economic background.
              </p>
            </div>

            {/* Core Values Cards */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="values-grid"
            >
              <motion.div variants={fadeIn} className="value-card glass glass-interactive">
                <div className="value-icon-wrapper">
                  <Sparkles size={28} />
                </div>
                <h3 className="value-title">Equality</h3>
                <p className="value-text">
                  Promoting equal opportunities, breaking gender disparities, and elevating marginalized voices in active society.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="value-card glass glass-interactive">
                <div className="value-icon-wrapper">
                  <Heart size={28} />
                </div>
                <h3 className="value-title">Dignity</h3>
                <p className="value-text">
                  Fostering self-respect and providing the essential tools and support necessary to live a highly respected, dignified life.
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="value-card glass glass-interactive">
                <div className="value-icon-wrapper">
                  <BookOpen size={28} />
                </div>
                <h3 className="value-title">Education</h3>
                <p className="value-text">
                  Educating, mentoring, and guiding young women to help them overcome cycles of social dependency.
                </p>
              </motion.div>
            </motion.div>

            {/* Mission & Vision Split Layout */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="mission-vision-grid"
            >
              <div className="mv-card glass">
                <h3 className="mv-card-title">
                  <Heart size={24} /> Our Mission
                </h3>
                <ul className="mv-list">
                  <li>Empower underprivileged girls and women across India.</li>
                  <li>Promote gender equality and support economic self-reliance.</li>
                  <li>Improve regional accessibility to schools and career mentorship.</li>
                  <li>Provide critical healthcare, hygiene kits, and awareness.</li>
                  <li>Equip women with market-relevant vocational & business training.</li>
                </ul>
              </div>

              <div className="mv-card glass">
                <h3 className="mv-card-title">
                  <TrendingUp size={24} /> Our Vision
                </h3>
                <ul className="mv-list">
                  <li>Creating a nation of confident, independent female leaders.</li>
                  <li>Zero compromises on basic menstrual health and sanitary access.</li>
                  <li>Fostering entrepreneurial frameworks in marginalized villages.</li>
                  <li>Ensuring every girl enjoys the fundamental right to full education.</li>
                  <li>Developing sustainable, community-driven social support systems.</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MAJOR AREAS OF WORK SECTION */}
        <section id="programs" className="section" style={{ background: 'rgba(13, 17, 30, 0.3)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Our Focus Areas</span>
              <h2 className="section-title">Empowerment in Action</h2>
              <p className="section-description">
                From classrooms to healthcare workshops and professional incubators, we design targeted systems for holistic progress.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="programs-grid"
            >
              {/* Program 1: Menstrual Hygiene (Utilizes img1.jpg) */}
              <motion.div variants={fadeIn} className="program-card glass glass-interactive">
                <div className="program-image-area">
                  <img src="/img1.jpg" alt="Menstrual Hygiene Campaign" className="program-img" />
                  <div className="program-image-overlay" />
                </div>
                <div className="program-content">
                  <Heart className="program-icon" size={24} />
                  <h3 className="program-title">Menstrual Hygiene</h3>
                  <p className="program-desc">
                    Distributing dignity kits and breaking taboos around menstrual health through awareness workshops.
                  </p>
                  <ul className="program-features">
                    <li>120k+ Girls Supported</li>
                    <li>Free Sanitary Pad Distribution</li>
                    <li>Professional Health Counseling</li>
                  </ul>
                </div>
              </motion.div>

              {/* Program 2: Education Support (Utilizes img2.jpg) */}
              <motion.div variants={fadeIn} className="program-card glass glass-interactive">
                <div className="program-image-area">
                  <img src="/img2.jpg" alt="Girls studying and discussing" className="program-img" />
                  <div className="program-image-overlay" />
                </div>
                <div className="program-content">
                  <BookOpen className="program-icon" size={24} />
                  <h3 className="program-title">Education Support</h3>
                  <p className="program-desc">
                    Empowering disadvantaged girls with study workshops, guidance, and career planning sessions.
                  </p>
                  <ul className="program-features">
                    <li>Disadvantaged Scholarship Drives</li>
                    <li>Career Guidance Mentorship</li>
                    <li>Critical Learning Resources</li>
                  </ul>
                </div>
              </motion.div>

              {/* Program 3: Women's Empowerment */}
              <motion.div variants={fadeIn} className="program-card glass glass-interactive">
                <div className="program-image-area" style={{ background: 'linear-gradient(135deg, #1e1b4b, #311042)' }}>
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--primary)',
                    opacity: 0.3,
                    padding: '2rem'
                  }}>
                    <Sparkles size={120} />
                  </div>
                  <div className="program-image-overlay" />
                </div>
                <div className="program-content">
                  <Sparkles className="program-icon" size={24} />
                  <h3 className="program-title">Women's Empowerment</h3>
                  <p className="program-desc">
                    Programs focused on fostering leadership skills, building personal confidence, and active civic participation.
                  </p>
                  <ul className="program-features">
                    <li>Self-Defense Training</li>
                    <li>Leadership Seminars</li>
                    <li>Legal Rights Education</li>
                  </ul>
                </div>
              </motion.div>

              {/* Program 4: Skill Development */}
              <motion.div variants={fadeIn} className="program-card glass glass-interactive">
                <div className="program-image-area" style={{ background: 'linear-gradient(135deg, #1c1917, #451a03)' }}>
                  <div style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--secondary)',
                    opacity: 0.3,
                    padding: '2rem'
                  }}>
                    <Briefcase size={120} />
                  </div>
                  <div className="program-image-overlay" />
                </div>
                <div className="program-content">
                  <Briefcase className="program-icon" size={24} />
                  <h3 className="program-title">Skill & Vocations</h3>
                  <p className="program-desc">
                    Practical, hands-on professional courses that improve job prospects and stimulate local entrepreneurship.
                  </p>
                  <ul className="program-features">
                    <li>Digital & Computer Literacy</li>
                    <li>Financial Independence Training</li>
                    <li>Communication & Career Skills</li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FOUNDER'S MESSAGE SECTION */}
        <section className="section">
          <div className="container">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="founder-card glass"
            >
              <div className="founder-img-wrapper">
                <div className="founder-frame">
                  <div className="founder-placeholder">
                    <img src="/she_can_logo.jpeg" alt="Founder Icon" className="founder-logo-inframe" />
                    <h4 style={{ color: 'var(--text-white)' }}>Reeta Mishra</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Founder & President</p>
                  </div>
                </div>
              </div>
              <div className="founder-info">
                <span className="section-badge" style={{ alignSelf: 'flex-start' }}>Founder's Vision</span>
                <p className="founder-quote">
                  "We established She Can Foundation with a single, clear objective: to help women break free from historical social and economic barriers, enabling them to discover their inner strength and become completely self-reliant."
                </p>
                <div className="founder-name">Reeta Mishra</div>
                <div className="founder-title">Founder & President, She Can Foundation</div>
                <p className="founder-bio">
                  Under her leadership, the foundation has expanded from a local community support circle into a registered national entity, touching over 120,000 lives across various states through structured hygiene campaigns, education programs, and micro-skilling batches.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* OPPORTUNITIES / CAREERS SECTION */}
        <section id="careers" className="section" style={{ background: 'rgba(13, 17, 30, 0.3)' }}>
          <div className="container">
            <div className="section-header">
              <span className="section-badge">Get Involved</span>
              <h2 className="section-title">Join the Movement</h2>
              <p className="section-description">
                Develop real-world social impact experience while contributing your talent to vital human development projects. We accept students and professionals.
              </p>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="careers-grid"
            >
              {/* Role 1 */}
              <motion.div variants={fadeIn} className="career-card glass glass-interactive">
                <Award className="career-icon" size={24} />
                <h3 className="career-title">Social Entrepreneurship</h3>
                <p className="career-desc">
                  Work directly on planning and scaling sustainable community models for regional micro-industries.
                </p>
                <button 
                  onClick={() => {
                    setSelectedRole('Social Entrepreneurship Internship');
                    setApplyModalOpen(true);
                  }}
                  className="btn btn-secondary btn-career-apply"
                >
                  Apply Internship
                </button>
              </motion.div>

              {/* Role 2 */}
              <motion.div variants={fadeIn} className="career-card glass glass-interactive">
                <Briefcase className="career-icon" size={24} />
                <h3 className="career-title">Human Resources</h3>
                <p className="career-desc">
                  Coordinate volunteer activities, drive national recruitment drives, and manage internal coordination.
                </p>
                <button 
                  onClick={() => {
                    setSelectedRole('Human Resources Internship');
                    setApplyModalOpen(true);
                  }}
                  className="btn btn-secondary btn-career-apply"
                >
                  Apply Internship
                </button>
              </motion.div>

              {/* Role 3 */}
              <motion.div variants={fadeIn} className="career-card glass glass-interactive">
                <TrendingUp className="career-icon" size={24} />
                <h3 className="career-title">Fundraising Drives</h3>
                <p className="career-desc">
                  Organize corporate partnerships, crowd campaigns, and collaborative NGO sponsorship frameworks.
                </p>
                <button 
                  onClick={() => {
                    setSelectedRole('Fundraising & Partnerships Internship');
                    setApplyModalOpen(true);
                  }}
                  className="btn btn-secondary btn-career-apply"
                >
                  Apply Internship
                </button>
              </motion.div>

              {/* Role 4 */}
              <motion.div variants={fadeIn} className="career-card glass glass-interactive">
                <Smile className="career-icon" size={24} />
                <h3 className="career-title">Awareness Campaigns</h3>
                <p className="career-desc">
                  Plan ground-level workshops and create media resources to drive menstrual hygiene digital campaigns.
                </p>
                <button 
                  onClick={() => {
                    setSelectedRole('Awareness Campaigns & Content Internship');
                    setApplyModalOpen(true);
                  }}
                  className="btn btn-secondary btn-career-apply"
                >
                  Apply Internship
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CONTACT & REGISTRATION DETAILS */}
        <section id="contact" className="section">
          <div className="container contact-grid">
            
            {/* Info panel */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="contact-info-panel"
            >
              <div>
                <span className="section-badge">Get In Touch</span>
                <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Let's Connect</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                  Have questions, ideas, or partnerships in mind? Reach out to our executive panel. We are always eager to collaborate.
                </p>

                <div className="contact-card-wrapper">
                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="contact-item-title">Email Us</div>
                      <a href="mailto:president@shecanfoundation.org" className="contact-item-value">
                        president@shecanfoundation.org
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="contact-item-title">Call Us</div>
                      <a href="tel:+918283841830" className="contact-item-value">
                        +91 82838 41830
                      </a>
                    </div>
                  </div>

                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <Shield size={20} />
                    </div>
                    <div>
                      <div className="contact-item-title">Official Registry</div>
                      <div className="contact-item-value">
                        Indian Societies Registration Act, 1860
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="registration-box">
                <div className="registration-title">Official NGO Recognition</div>
                <p className="registration-text">
                  She Can Foundation is fully registered as a non-governmental organization under the provisions of the Societies Registration Act XXI of 1860, Government of India.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="contact-form glass"
            >
              <h3 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Send a Message</h3>
              
              <form onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Full Name</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    className="form-control" 
                    placeholder="Your Name" 
                    required 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    className="form-control" 
                    placeholder="you@example.com" 
                    required 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">How can we help you?</label>
                  <textarea 
                    id="contact-message" 
                    className="form-control" 
                    placeholder="Write your message here..." 
                    required 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-primary form-submit-btn btn-glow">
                  <Send size={16} /> Send Message
                </button>
              </form>

              <AnimatePresence>
                {contactSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="form-status-message success"
                  >
                    Message sent successfully! We'll reply within 24 hours.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo-area">
              <div className="logo-wrapper">
                <img src="/she_can_logo.jpeg" alt="Logo" className="logo-img" />
                <span className="logo-text">She Can</span>
              </div>
              <p className="footer-desc">
                Dedicated to breaking cycles of poverty and inequality, restoring dignity, and supporting female self-reliance across India.
              </p>
              <div className="footer-socials">
                <a href="#" className="social-icon-btn" aria-label="Facebook">FB</a>
                <a href="#" className="social-icon-btn" aria-label="Instagram">IG</a>
                <a href="#" className="social-icon-btn" aria-label="Twitter">TW</a>
                <a href="mailto:president@shecanfoundation.org" className="social-icon-btn" aria-label="Email"><Mail size={16} /></a>
              </div>
            </div>

            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About Mission</a></li>
                <li><a href="#programs" onClick={(e) => { e.preventDefault(); scrollTo('programs'); }}>Our Programs</a></li>
                <li><a href="#impact" onClick={(e) => { e.preventDefault(); scrollTo('impact'); }}>Impact Stats</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-heading">Contact Details</h4>
              <ul className="footer-links">
                <li style={{ color: 'var(--text-muted)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} /> president@shecanfoundation.org
                </li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={14} /> +91 82838 41830
                </li>
                <li style={{ color: 'var(--text-muted)', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} /> Registered in India
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © {new Date().getFullYear()} She Can Foundation. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Use</a>
              <a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* DONATE MODAL */}
      <AnimatePresence>
        {donateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(3, 5, 12, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 1100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass"
              style={{
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                maxWidth: '520px',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setDonateModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--text-white)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(255, 94, 19, 0.1)',
                  color: 'var(--primary)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Heart size={30} fill="currentColor" />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Make a Donation</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Your support directly empowers women with sanitization kits and educational opportunities.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="registration-box" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
                    Bank Transfer Details (India)
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Account Name:</span>
                      <span style={{ color: 'var(--text-white)', fontWeight: 500 }}>She Can Foundation</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Bank Name:</span>
                      <span style={{ color: 'var(--text-white)', fontWeight: 500 }}>State Bank of India</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Account Number:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--text-white)', fontWeight: 500 }}>482838418301</span>
                        <Copy size={14} style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => copyToClipboard('482838418301')} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)' }}>IFSC Code:</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--text-white)', fontWeight: 500 }}>SBIN0001830</span>
                        <Copy size={14} style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={() => copyToClipboard('SBIN0001830')} />
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                    Or contact our president to support:
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-white)' }}>
                    +91 82838 41830
                  </div>
                </div>

                <button 
                  onClick={() => setDonateModalOpen(false)} 
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTERNSHIP APPLICATION MODAL */}
      <AnimatePresence>
        {applyModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(3, 5, 12, 0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 1100,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass"
              style={{
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                maxWidth: '520px',
                padding: '2.5rem',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setApplyModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--text-white)',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Apply for Internship</h3>
              <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {selectedRole}
              </p>

              {applySubmitted ? (
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 1.5rem' }} />
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Application Submitted!</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Thank you for applying. Our HR panel will reach out to you via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-name">Full Name</label>
                    <input 
                      type="text" 
                      id="apply-name" 
                      className="form-control" 
                      required 
                      placeholder="Your Name"
                      value={applyForm.name}
                      onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-email">Email Address</label>
                    <input 
                      type="email" 
                      id="apply-email" 
                      className="form-control" 
                      required 
                      placeholder="you@example.com"
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-portfolio">Resume Link / Portfolio Link</label>
                    <input 
                      type="url" 
                      id="apply-portfolio" 
                      className="form-control" 
                      placeholder="https://drive.google.com/..."
                      value={applyForm.portfolio}
                      onChange={(e) => setApplyForm({ ...applyForm, portfolio: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-cover">Brief Cover Note</label>
                    <textarea 
                      id="apply-cover" 
                      className="form-control" 
                      placeholder="Why do you want to join She Can Foundation?"
                      rows={3}
                      value={applyForm.coverLetter}
                      onChange={(e) => setApplyForm({ ...applyForm, coverLetter: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setApplyModalOpen(false)} 
                      className="btn btn-secondary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
