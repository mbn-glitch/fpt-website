export default function WaveBg({ className = '', opacity = 0.2 }) {
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 1440 800"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F42821" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A30100" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,400 C240,320 480,480 720,400 C960,320 1200,480 1440,400 L1440,800 L0,800 Z"
        fill="url(#waveGrad)"
      />
      <path
        d="M0,500 C240,420 480,580 720,500 C960,420 1200,580 1440,500"
        stroke="url(#waveGrad)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M0,300 C360,220 720,380 1080,300 C1260,260 1440,320 1440,320"
        stroke="#F42821"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}
