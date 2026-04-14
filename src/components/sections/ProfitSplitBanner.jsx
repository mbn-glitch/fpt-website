import Section, { Eyebrow } from '../ui/Section.jsx';
import CountUp from '../ui/CountUp.jsx';
import WaveBg from '../ui/WaveBg.jsx';

export default function ProfitSplitBanner() {
  return (
    <Section className="relative overflow-hidden" >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, rgba(163,1,0,0.35) 0%, rgba(0,0,0,0) 65%)',
        }}
      />
      <WaveBg opacity={0.2} />

      <div className="relative text-center max-w-4xl mx-auto">
        <Eyebrow>Performance reward</Eyebrow>

        <h2 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-medium text-secondary leading-tight">
          Keep up to
        </h2>

        <div
          className="my-4 leading-none font-semibold font-mono-num gradient-text"
          style={{
            fontSize: 'clamp(120px, 18vw, 220px)',
            filter: 'drop-shadow(0 0 60px rgba(244,40,33,0.5))',
            letterSpacing: '-0.04em',
          }}
        >
          <CountUp end={80} suffix="%" duration={2500} />
        </div>

        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight">
          of every trade you win.
        </h3>

        <p className="mt-10 text-base sm:text-lg text-secondary max-w-xl mx-auto">
          Industry-leading profit share. Paid on a structured cadence.
        </p>
      </div>
    </Section>
  );
}
