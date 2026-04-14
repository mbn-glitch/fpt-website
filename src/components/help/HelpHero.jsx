import { Eyebrow } from '../ui/Section.jsx';
import WaveBg from '../ui/WaveBg.jsx';
import HelpSearch from './HelpSearch.jsx';
import { useNavigate } from 'react-router-dom';

const POPULAR_QUERIES = [
  { label: 'How to start', path: '/help/getting-started#how-do-i-start' },
  { label: 'Payouts', path: '/help/payouts-fiper-card#when-can-i-withdraw-profits' },
  { label: 'Drawdown rules', path: '/help/challenges-rules#how-is-drawdown-calculated' },
  { label: 'Profit target', path: '/help/challenges-rules#what-is-the-profit-target' },
];

export default function HelpHero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-36 sm:pt-44 pb-16 overflow-hidden">
      <WaveBg opacity={0.22} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] radial-red pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <Eyebrow dot>Help Center</Eyebrow>
        <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1] tracking-tight">
          Answers. Organized.
          <br />
          <span className="gradient-text">Searchable.</span>
        </h1>
        <p className="mt-8 text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
          Everything you need to navigate FPT — from your first challenge to
          your first payout.
        </p>

        <div className="mt-10 max-w-[600px] mx-auto">
          <HelpSearch />
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 text-sm">
          <span className="text-tertiary mr-1">Popular searches:</span>
          {POPULAR_QUERIES.map((p) => (
            <button
              key={p.label}
              onClick={() => navigate(p.path)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-subtle text-secondary hover:text-white hover:border-white/20 transition-colors"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
