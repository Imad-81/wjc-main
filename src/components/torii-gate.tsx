export default function ToriiGate() {
  return (
    <div className="relative flex justify-center items-end h-48 my-12">
      {/* Torii Gate SVG */}
      <svg viewBox="0 0 200 250" className="w-32 h-48 md:w-48 md:h-64" preserveAspectRatio="xMidYMid meet">
        {/* Top horizontal beam (Noki) */}
        <rect x="40" y="50" width="120" height="8" fill="currentColor" className="text-foreground" />

        {/* Top cap (Kasagi) */}
        <rect x="35" y="45" width="130" height="6" fill="currentColor" className="text-foreground opacity-70" />

        {/* Left vertical pillar (Hashira) */}
        <rect x="50" y="50" width="12" height="150" fill="currentColor" className="text-foreground" />

        {/* Right vertical pillar (Hashira) */}
        <rect x="138" y="50" width="12" height="150" fill="currentColor" className="text-foreground" />

        {/* Bottom horizontal beam (Shimaki) */}
        <rect x="45" y="185" width="110" height="6" fill="currentColor" className="text-foreground opacity-80" />

        {/* Left cap */}
        <polygon points="45,185 35,200 55,200" fill="currentColor" className="text-foreground opacity-60" />

        {/* Right cap */}
        <polygon points="155,185 145,200 165,200" fill="currentColor" className="text-foreground opacity-60" />
      </svg>
    </div>
  )
}
