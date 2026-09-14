import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { ArrowUpRight, Check, ChevronDown, Menu, Play, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'
import amaraImage from '../Amara.png'
import babyshowerImage from '../Babyshower.png'
import celebrationsImage from '../celebrations.png'
import cheersImage from '../Cheers.png'
import graduationImage from '../Graduation.png'
import logoImage from '../logo.png'
import nalediImage from '../Naledi.png'
import traditionalImage from '../traditional.png'

const BRAND_NAME = 'Your_Moment_BW'
const celebrations = [
  { title: 'Weddings', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85' },
  { title: 'Traditional', image: traditionalImage },
  { title: 'Birthdays', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=85' },
  { title: 'Baby showers', image: babyshowerImage },
  { title: 'Graduations', image: graduationImage },
  { title: 'Every occasion', image: celebrationsImage },
]
const demos = [
  { name: 'Amara & Theo', type: 'Wedding', date: '17.08.24', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1100&q=85', url: 'https://theo-amara.vercel.app/' },
]
const demoBirthday = { name: 'Amara Turns 30', type: 'Birthday', date: '02.11.24', image: amaraImage }
const demoGraduation = { name: 'Naledi', type: 'Graduation', date: '06.12.24', image: nalediImage }
const demoItems = [...demos, demoBirthday, demoGraduation]
const features = ['RSVP', 'Live RSVP monitoring', 'Live dashboard', 'Event details', 'Maps', 'Countdown', 'Gallery', 'Background music', 'Gift registry']
const steps = ['Tell us about your celebration', 'Choose your package', 'Send your details', 'We build it', 'Share your link']
const basicFeatures = ['Custom celebration website', 'RSVP', 'Hosted website', 'Mobile responsive', '2 revisions/change-ups', 'No music', 'No live monitoring/dashboard', 'No gift registry']
const premiumFeatures = ['Everything in Basic', 'Background music', 'RSVP with live monitoring', 'Live RSVP dashboard', 'Gift registry', '4 revisions/change-ups', 'Delivered within 5 days']
const reveal = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, .36, 1] } } }
const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const initialFormData = {
  full_name: '', email: '', phone_number: '', celebration_type: '', event_date: '', venue: '',
  package: '', preferred_colours_style: '', features_needed: '', additional_details: '',
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [formState, setFormState] = useState({ status: 'idle', message: '' })
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])
  const openModal = (event) => {
    event?.preventDefault()
    setFormState({ status: 'idle', message: '' })
    setModalOpen(true)
  }
  const closeModal = () => {
    if (formState.status !== 'sending') setModalOpen(false)
  }
  const handleFormChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }))
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity()
      return
    }
    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setFormState({ status: 'error', message: 'The request form is not configured yet. Please try again shortly.' })
      return
    }
    setFormState({ status: 'sending', message: '' })
    try {
      await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, formData, { publicKey: emailJsConfig.publicKey })
      setFormData(initialFormData)
      setFormState({ status: 'success', message: 'Thank you! Your celebration request has been received. We’ll be in touch shortly.' })
    } catch (error) {
      const providerError = error?.text?.includes('Invalid grant')
      setFormState({ status: 'error', message: providerError ? 'Email delivery is temporarily unavailable. Please reconnect the Gmail account in EmailJS, then try again.' : 'Something went wrong while sending your request. Please try again.' })
    }
  }
  return <main>
    <nav className="nav-wrap"><div className="nav container"><a className="wordmark" href="#top"><img src={logoImage} alt={BRAND_NAME} /></a><div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>{['Celebrations', 'Examples', 'Features', 'How It Works', 'Pricing'].map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<a className="nav-cta" href="#get-started" onClick={(event) => { setMenuOpen(false); openModal(event) }}>Get started <ArrowUpRight size={15} /></a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></div></nav>
    <section className="hero" id="top"><div className="hero-image" /><div className="hero-tint" /><div className="hero-content container"><motion.p className="eyebrow light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}>Digital celebrations, thoughtfully made</motion.p><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .35, duration: .8 }}>Your moment.<br /><em>Your story.</em><br />Your website.</motion.h1><motion.p className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>Beautiful digital invitations and celebration websites, designed to make every special occasion unforgettable.</motion.p><motion.div className="button-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .75 }}><a className="button button-light" href="#get-started" onClick={openModal}>Create your website <ArrowUpRight size={17} /></a><a className="text-link light" href="#examples">Explore examples <ArrowUpRight size={16} /></a></motion.div></div><div className="hero-note"><span>Scroll to explore</span><ChevronDown size={16} /></div></section>
    <section className="intro section-pad"><div className="container intro-grid"><motion.p className="eyebrow" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>The invitation, reimagined</motion.p><motion.h2 variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>Not just an invitation.<br /><em>An experience</em> your guests can step into.</motion.h2><motion.p className="intro-body" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}>Every celebration has a feeling. We translate yours into a living, breathing digital space that welcomes guests, builds anticipation and stays with them long after the day.</motion.p></div></section>
    <section className="section-pad celebrations" id="celebrations"><div className="container"><Heading eyebrow="For every beautiful reason" title={<>Made for <em>your kind</em><br />of celebration.</>} aside="From the deeply traditional to the wildly personal, we create a digital home for the moments that matter most." /><div className="celebration-grid">{celebrations.map((item, index) => <motion.button type="button" onClick={openModal} className={`celebration-card card-${index}`} key={item.title} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * .06 }}><img src={item.image} alt={item.title} /><span>{item.title}</span><ArrowUpRight size={19} /></motion.button>)}</div></div></section>
    <section className="section-pad examples" id="examples"><div className="container"><Heading eyebrow="A little inspiration" title={<>See how a moment<br /><em>becomes a world.</em></>} link="View all examples" /><div className="demo-grid">{demoItems.map((demo, index) => <motion.a href={demo.url || '#get-started'} onClick={demo.url ? undefined : openModal} target={demo.url ? '_blank' : undefined} rel={demo.url ? 'noreferrer' : undefined} className="demo-card" key={demo.name} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * .1 }}><div className="demo-image"><img src={demo.image} alt={demo.name} /><span className="demo-play"><Play size={15} fill="currentColor" /></span></div><div className="demo-meta"><div><p className="demo-type">{demo.type} · {demo.date}</p><h3>{demo.name}</h3></div><ArrowUpRight size={19} /></div></motion.a>)}</div></div></section>
    <section className="feature-band section-pad" id="features"><div className="container feature-layout"><div><p className="eyebrow light">The details make the difference</p><h2>Everything your<br /><em>guests need.</em></h2><p className="feature-copy">A considered set of details that turns a link into an experience. Simple for you, memorable for everyone.</p></div><div className="feature-list">{features.map((feature, index) => <motion.div className="feature-item" key={feature} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true }}><span>0{index + 1}</span><strong>{feature}</strong><Sparkles size={16} /></motion.div>)}</div></div></section>
    <section className="section-pad process" id="how-it-works"><div className="container"><Heading eyebrow="From idea to invitation" title={<>A few simple steps.<br /><em>A whole lot of magic.</em></>} /><div className="steps-grid">{steps.map((step, index) => <div className="step" key={step}><span className="step-number">0{index + 1}</span><div className="step-line" /><h3>{step}</h3></div>)}</div></div></section>
    <section className="section-pad pricing" id="pricing"><div className="container pricing-layout"><div className="pricing-intro"><p className="eyebrow">Choose your experience</p><h2>Beautiful by<br /><em>design.</em></h2><p>Start with what feels right for your celebration. Add more when you need it.</p></div><div className="pricing-grid"><PriceCard title="Basic" price="2,000" features={basicFeatures} onOpen={openModal} /><PriceCard title="Premium" price="2,500" features={premiumFeatures} featured onOpen={openModal} /></div><div className="custom-package"><p className="eyebrow">A celebration all your own</p><h3>Other celebrations?</h3><p>Not every celebration needs the same things. Whether it’s a birthday, baby shower, anniversary, graduation, engagement, corporate event, or something unique, we’ll create an experience around what you need.</p><button type="button" className="text-link" onClick={openModal}>Enquire for a custom package <ArrowUpRight size={16} /></button></div></div></section>
    <section className="why section-pad"><div className="container why-layout"><div><p className="eyebrow light">A better way to invite</p><h2>Why go <em>digital?</em></h2><p className="feature-copy">The best celebrations are easy to join, easy to remember and made with intention.</p></div><div className="why-list">{['Share instantly', 'Beautiful on every screen', 'Always accessible', 'Easy to update', 'Less waste'].map((item, index) => <div className="why-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><Check size={18} /></div>)}</div></div></section>
    <section className="emotional"><div className="emotional-image" style={{ backgroundImage: `url(${cheersImage})` }} /><div className="emotional-content container"><p className="eyebrow light">Make it memorable</p><h2>Some moments only happen once.<br /><em>So why should the invitation feel ordinary?</em></h2><a className="button button-light" href="#get-started" onClick={openModal}>Create your website <ArrowUpRight size={17} /></a></div></section>
    <section className="final-cta section-pad"><div className="container"><Sparkles className="cta-spark" size={22} /><p className="eyebrow">Your moment is waiting</p><h2>Ready to make your celebration<br /><em>unforgettable?</em></h2><button className="button button-dark" type="button" onClick={openModal}>Create my website <ArrowUpRight size={17} /></button></div></section>
    <footer><div className="container footer-top"><a className="wordmark footer-wordmark" href="#top"><img src={logoImage} alt={BRAND_NAME} /></a><p>Digital invitations for the moments<br />you'll always remember.</p><div className="footer-links"><a href="#celebrations">Celebrations</a><a href="#examples">Examples</a><a href="#features">Features</a><a href="#pricing">Pricing</a></div><div className="social-links"><a href="#instagram" aria-label="Instagram">ig</a><a href="#facebook" aria-label="Facebook">f</a></div></div><div className="container footer-bottom"><span>© 2024 {BRAND_NAME}. All rights reserved.</span><span>Made for moments that matter.</span></div></footer>
    <CelebrationModal open={modalOpen} onClose={closeModal} formData={formData} formState={formState} onChange={handleFormChange} onSubmit={handleSubmit} />
  </main>
}
function Heading({ eyebrow, title, aside, link }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{aside && <p className="heading-aside">{aside}</p>}{link && <a className="text-link" href="#examples">{link} <ArrowUpRight size={16} /></a>}</div> }
function FormField({ label, name, type = 'text', value, onChange, required, options, multiline }) { return <label className="form-field">{label}{options ? <select name={name} value={value} onChange={onChange} required={required}><option value="">Select one</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select> : multiline ? <textarea name={name} value={value} onChange={onChange} required={required} rows="3" /> : <input name={name} type={type} value={value} onChange={onChange} required={required} />}</label> }
function CelebrationModal({ open, onClose, formData, formState, onChange, onSubmit }) { return <AnimatePresence>{open && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><motion.div className="celebration-modal" role="dialog" aria-modal="true" aria-labelledby="celebration-modal-title" initial={{ opacity: 0, y: 28, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ duration: .28 }}><button className="modal-close" type="button" onClick={onClose} aria-label="Close celebration request form"><X size={20} /></button><p className="eyebrow">Create your celebration</p><h2 id="celebration-modal-title">Tell us about<br /><em>your moment.</em></h2><form className="modal-form" onSubmit={onSubmit}><FormField label="Full Name" name="full_name" value={formData.full_name} onChange={onChange} required /><FormField label="Email" name="email" type="email" value={formData.email} onChange={onChange} required /><FormField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={onChange} required /><FormField label="Celebration Type" name="celebration_type" value={formData.celebration_type} onChange={onChange} required options={['Wedding', 'Traditional celebration', 'Birthday', 'Baby shower', 'Graduation', 'Engagement', 'Anniversary', 'Other event']} /><FormField label="Event Date" name="event_date" type="date" value={formData.event_date} onChange={onChange} required /><FormField label="Venue" name="venue" value={formData.venue} onChange={onChange} required /><FormField label="Package" name="package" value={formData.package} onChange={onChange} required options={['Basic — P2,000', 'Premium — P2,500']} /><FormField label="Preferred Colours / Style" name="preferred_colours_style" value={formData.preferred_colours_style} onChange={onChange} /><FormField label="Features Needed" name="features_needed" value={formData.features_needed} onChange={onChange} /><FormField label="Additional Details" name="additional_details" value={formData.additional_details} onChange={onChange} multiline /><button className="button button-dark form-submit" type="submit" disabled={formState.status === 'sending'}>{formState.status === 'sending' ? 'Sending request...' : 'Submit request'} <ArrowUpRight size={17} /></button>{formState.message && <p className={`form-message ${formState.status}`}>{formState.message}</p>}</form></motion.div></motion.div>}</AnimatePresence> }
function PriceCard({ title, price, features, featured, onOpen }) { return <div className={`price-card ${featured ? 'featured' : ''}`}>{featured && <span className="popular">Most popular</span>}<p className="price-label">{title}</p><div className="price"><span>P</span>{price}<small> once-off</small></div><p className="price-description">{featured ? 'For celebrations with a little more to say.' : 'Everything you need to share your day.'}</p><ul>{features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><button className={`button ${featured ? 'button-light' : 'button-outline'}`} type="button" onClick={onOpen}>Choose {title} <ArrowUpRight size={16} /></button></div> }
export default App
