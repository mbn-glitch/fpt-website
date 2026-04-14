import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  LifeBuoy,
  Briefcase,
  Send,
  Check,
  Clock,
  Globe,
  ArrowRight,
} from 'lucide-react';
import SEO from '../components/SEO.jsx';
import Section, { Eyebrow, SectionHeader } from '../components/ui/Section.jsx';
import Button from '../components/ui/Button.jsx';
import WaveBg from '../components/ui/WaveBg.jsx';
import {
  WhatsAppIcon,
  WHATSAPP_URL,
  WHATSAPP_PHONE,
} from '../components/ui/WhatsAppButton.jsx';

const CHANNELS = [
  {
    icon: LifeBuoy,
    tag: 'Trader support',
    title: 'Account & evaluation help',
    body: 'Rule interpretations, platform access, payout status. Reply within 4 hours, 24/7.',
    cta: 'support@fiperpro.com',
    href: 'mailto:support@fiperpro.com',
  },
  {
    icon: Briefcase,
    tag: 'Institutional',
    title: 'Partnerships & desks',
    body: 'Liquidity providers, IBs, and prop desks exploring infrastructure integrations.',
    cta: 'partners@fiperpro.com',
    href: 'mailto:partners@fiperpro.com',
  },
  {
    icon: MessageSquare,
    tag: 'Press & media',
    title: 'Press & communications',
    body: 'Editorial requests, interviews, and commentary on market structure.',
    cta: 'press@fiperpro.com',
    href: 'mailto:press@fiperpro.com',
  },
];

const TOPICS = [
  'Evaluation rules',
  'Funded account',
  'Payouts & Fiper Card',
  'Platform access',
  'Partnerships',
  'Something else',
];

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact"
        path="/contact"
        description="Reach the FPT team directly. Trader support, institutional partnerships, press. Typical reply under 4 hours."
        keywords="FPT contact, Fiper Pro Traders support, prop firm contact"
      />
      {/* Hero */}
      <section className="relative pt-36 sm:pt-44 pb-20 overflow-hidden">
        <WaveBg opacity={0.25} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <Eyebrow dot>Get in touch</Eyebrow>
          <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold leading-[0.98] tracking-tight">
            Direct lines.
            <br />
            <span className="gradient-text">Real responses.</span>
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
            Whether you are mid-evaluation, scaling a desk, or writing
            about the industry — one of these channels is the right one.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-secondary">
            <Pill icon={Clock}>24/7 trader support</Pill>
            <Pill icon={Globe}>12+ countries</Pill>
            <Pill icon={Mail}>Typical reply under 4h</Pill>
          </div>
        </div>
      </section>

      {/* WhatsApp featured */}
      <Section className="!pt-10 !pb-0">
        <WhatsAppCard />
      </Section>

      {/* Channels */}
      <Section>
        <div className="grid md:grid-cols-3 gap-5">
          {CHANNELS.map((c, i) => (
            <motion.a
              key={c.title}
              href={c.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative block bg-card border border-subtle rounded-2xl p-8 hover:border-white/20 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center gradient-red btn-red-glow">
                <c.icon size={22} className="text-white" />
              </div>
              <div className="mt-6 text-xs uppercase tracking-[0.18em] text-tertiary">
                {c.tag}
              </div>
              <h3 className="mt-2 text-xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">{c.body}</p>
              <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/90 group-hover:text-white transition-colors font-mono-num">
                {c.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </Section>

      {/* Form + info */}
      <Section className="bg-[#0A0A0A]">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          <ContactForm />
          <div className="lg:sticky lg:top-32 space-y-10">
            <div>
              <Eyebrow>Why we keep it simple</Eyebrow>
              <h2 className="mt-4 text-3xl sm:text-4xl font-semibold leading-[1.1] tracking-tight">
                You write to a human.
                <br />
                <span className="text-secondary">A human writes back.</span>
              </h2>
              <p className="mt-5 text-[15px] text-secondary leading-relaxed">
                No ticket deflection bots. No support-tier runaround.
                Every message lands with a team member who can actually
                answer — and route you to the right specialist when
                needed.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoBlock label="Response SLA" value="< 4 hours" />
              <InfoBlock label="Coverage" value="24 / 7" />
              <InfoBlock label="Support languages" value="EN · ES · FR" />
              <InfoBlock label="Headquartered" value="Fiper Global" />
            </div>

            <div className="rounded-2xl border border-subtle bg-black/40 p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-[#FCA5A5]">
                Already trading?
              </div>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Open an in-app ticket from the dashboard — it routes
                faster because your account context is attached.
              </p>
              <a
                href="https://crm.fptraders.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-white hover:text-[#FCA5A5] transition-colors"
              >
                Open CRM <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(163,1,0,0.4) 0%, rgba(0,0,0,0) 60%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <Eyebrow>Prefer to skip the form?</Eyebrow>
          <h2 className="mt-6 text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
            Start the evaluation.
            <br />
            <span className="gradient-text">We'll meet you inside.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="https://crm.fptraders.com/register" external size="lg">
              Get Started <ArrowRight size={18} />
            </Button>
            <Button to="/about" variant="ghost" size="lg">
              Learn about FPT
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function WhatsAppCard() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="group relative block rounded-3xl p-8 sm:p-10 overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, rgba(37,211,102,0.12) 0%, rgba(37,211,102,0.04) 60%, rgba(0,0,0,0) 100%), #0F0F0F',
        border: '1px solid rgba(37,211,102,0.25)',
      }}
    >
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0"
            style={{
              background: '#25D366',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
          >
            <WhatsAppIcon size={28} />
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4ADE80]">
                WhatsApp Support
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[10px] font-semibold uppercase tracking-wider text-[#4ADE80]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse-dot" />
                24/7 Available
              </span>
            </div>
            <h3 className="mt-2 text-2xl sm:text-3xl font-semibold leading-tight">
              Chat with our support team instantly.
            </h3>
            <div className="mt-3 font-mono-num text-white text-lg tracking-wide">
              {WHATSAPP_PHONE}
            </div>
          </div>
        </div>

        <div className="md:shrink-0">
          <span
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-white font-medium transition-transform group-hover:scale-[1.03]"
            style={{
              background: '#25D366',
              boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
            }}
          >
            <WhatsAppIcon size={18} />
            Start Chat
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

function Pill({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-subtle bg-white/5">
      <Icon size={14} className="text-[#FCA5A5]" />
      {children}
    </span>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-xl border border-subtle bg-card p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-tertiary">
        {label}
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: TOPICS[0],
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 900);
  };

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative gradient-border rounded-3xl p-10 sm:p-14 text-center"
      >
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl gradient-red btn-red-glow flex items-center justify-center mx-auto">
            <Check size={26} className="text-white" />
          </div>
          <h3 className="mt-6 text-3xl font-semibold">Message received.</h3>
          <p className="mt-4 text-secondary max-w-md mx-auto leading-relaxed">
            A team member will reply to{' '}
            <span className="text-white font-mono-num">{form.email}</span>{' '}
            within 4 hours. For urgent trading issues, open a ticket inside
            the CRM.
          </p>
          <button
            onClick={() => {
              setForm({ name: '', email: '', topic: TOPICS[0], message: '' });
              setStatus('idle');
            }}
            className="mt-8 text-sm text-secondary hover:text-white transition-colors"
          >
            Send another message
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-card border border-subtle rounded-3xl p-8 sm:p-10"
    >
      <Eyebrow>Send a message</Eyebrow>
      <h2 className="mt-3 text-3xl sm:text-4xl font-semibold leading-tight">
        Tell us what you need.
      </h2>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        <Field label="Your name">
          <input
            type="text"
            value={form.name}
            onChange={update('name')}
            required
            placeholder="Alex Morgan"
            className="input"
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            value={form.email}
            onChange={update('email')}
            required
            placeholder="you@domain.com"
            className="input font-mono-num"
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="What's this about?">
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setForm((f) => ({ ...f, topic: t }))}
                className={`px-4 py-2 rounded-full text-sm transition-all border ${
                  form.topic === t
                    ? 'gradient-red text-white border-transparent btn-red-glow'
                    : 'bg-black/40 border-subtle text-secondary hover:text-white hover:border-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Message">
          <textarea
            value={form.message}
            onChange={update('message')}
            required
            rows={5}
            placeholder="Give us the context. The more specific, the faster we can route it."
            className="input resize-none"
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-tertiary max-w-xs">
          By submitting, you agree to be contacted about your inquiry. We
          don't share your details.
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 h-12 px-7 rounded-full gradient-red btn-red-glow text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : (
            <>
              Send message <Send size={16} />
            </>
          )}
        </button>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 15px;
          color: white;
          outline: none;
          transition: border-color .15s ease, background .15s ease;
        }
        .input::placeholder { color: rgba(255,255,255,0.3); }
        .input:focus {
          border-color: #F42821;
          background: rgba(0,0,0,0.7);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-tertiary">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
