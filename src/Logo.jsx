// The JARVIS mark — the same waveform glyph as the macOS menu bar icon,
// white on the vermilion squircle. Used in the navbars and hero; favicon.svg
// matches. `animated` makes the bars ripple like a live waveform (CSS in
// index.css; disabled under prefers-reduced-motion).
export function LogoMark({ size = 20, animated = false, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={`shrink-0 ${animated ? 'wave-animated' : ''} ${className}`.trim()}
    >
      <rect width="100" height="100" rx="22" fill="#C0533A" />
      <g fill="#F4EFE6">
        <rect x="15.5" y="42" width="5" height="16" rx="2.5" />
        <rect x="23.5" y="36" width="5" height="28" rx="2.5" />
        <rect x="31.5" y="28" width="5" height="44" rx="2.5" />
        <rect x="39.5" y="38" width="5" height="24" rx="2.5" />
        <rect x="47.5" y="20" width="5" height="60" rx="2.5" />
        <rect x="55.5" y="38" width="5" height="24" rx="2.5" />
        <rect x="63.5" y="28" width="5" height="44" rx="2.5" />
        <rect x="71.5" y="36" width="5" height="28" rx="2.5" />
        <rect x="79.5" y="42" width="5" height="16" rx="2.5" />
      </g>
    </svg>
  )
}
