import React from 'react';

/**
 * Clean faceted red Cash-Cannon SVG matching the 3D gun silhouette.
 * Serves as the zero-layout-shift pre-load and reduced-motion fallback.
 */
const PortfolioGunVisual = ({ recoil = false, isFiring = false }) => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center select-none pointer-events-none"
      style={{
        transform: recoil
          ? 'translate3d(14px, -4px, 0) rotate(-6deg) scale(1.015)'
          : 'translate3d(0, 0, 0) rotate(-13deg) scale(1)',
        transition: recoil
          ? 'transform 55ms cubic-bezier(0.2, 0.9, 0.3, 1)'
          : 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <svg
        viewBox="0 0 460 320"
        className="w-full h-full drop-shadow-[0_22px_26px_rgba(17,17,17,0.2)]"
        role="img"
        aria-label="Red 3D-style PORTFOLIO money gun"
      >
        <defs>
          <linearGradient id="cannonTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF524C" />
            <stop offset="100%" stopColor="#E61A16" />
          </linearGradient>
          <linearGradient id="cannonSide" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EB1713" />
            <stop offset="100%" stopColor="#BD0B08" />
          </linearGradient>
          <linearGradient id="cannonDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A80906" />
            <stop offset="100%" stopColor="#7C0503" />
          </linearGradient>
        </defs>

        {/* Muzzle flash when firing */}
        {isFiring && (
          <g transform="translate(36, 148)" opacity="0.95">
            <polygon
              points="0,0 -30,-16 -16,-3 -38,8 -13,14 -24,28 4,12"
              fill="#C6F432"
              stroke="#111111"
              strokeWidth="2.2"
            />
          </g>
        )}

        {/* Red Trigger Guard Loop */}
        <path
          d="M174 176 L192 176 L204 222 C207 232 214 236 226 236 L278 232 L282 248 L222 252 C202 252 192 242 188 225 Z"
          fill="#D4100C"
        />

        {/* Curved Red Trigger */}
        <path
          d="M226 178 C228 202 238 214 256 222 L246 232 C226 220 215 204 214 178 Z"
          fill="#B30C09"
        />

        {/* Angled All-Red Pistol Grip */}
        <path
          d="M242 172 L338 172 L372 284 C374 294 366 302 354 302 L298 302 C288 302 280 294 277 284 Z"
          fill="url(#cannonSide)"
        />
        <path
          d="M242 172 L262 172 L294 294 L277 284 Z"
          fill="#F53833"
          opacity="0.5"
        />

        {/* Main Chamfered Body: Top Bevel */}
        <polygon points="74,64 388,64 364,88 54,88" fill="url(#cannonTop)" />

        {/* Right Rear Bevel */}
        <polygon points="388,64 412,92 412,158 384,182 364,158 364,88" fill="url(#cannonDark)" />

        {/* Front Left Chamfered Nose + Dark Ejection Slot */}
        <polygon points="54,88 74,64 74,182 54,158" fill="#EB231E" />
        <rect x="52" y="102" width="11" height="44" rx="2" fill="#190303" />

        {/* Main Red Side Face */}
        <rect x="74" y="88" width="290" height="94" fill="url(#cannonSide)" />

        {/* Subtle 4 screw pinholes */}
        <circle cx="152" cy="100" r="2.5" fill="#420504" opacity="0.6" />
        <circle cx="304" cy="100" r="2.5" fill="#420504" opacity="0.6" />
        <circle cx="152" cy="170" r="2.5" fill="#420504" opacity="0.6" />
        <circle cx="304" cy="170" r="2.5" fill="#420504" opacity="0.6" />

        {/* Bold Off-White PORTFOLIO Printed Directly on Red */}
        <text
          x="219"
          y="146"
          textAnchor="middle"
          fontFamily="'Bricolage Grotesque', 'Arial Black', sans-serif"
          fontWeight="800"
          fontSize="44"
          letterSpacing="1.5"
          fill="#F7F4F0"
        >
          PORTFOLIO
        </text>
      </svg>
    </div>
  );
};

export default PortfolioGunVisual;
