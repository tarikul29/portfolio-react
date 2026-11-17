/** Drawn illustrations for the project panels, so no outside pictures are needed. */

export function ShopArt() {
  return (
    <svg className="art-svg art-shop-svg" viewBox="0 0 240 240" role="img" aria-label="Shopping bag with floating product tiles">
      <defs>
        <linearGradient id="bagA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c4b5fd" />
          <stop offset="0.55" stopColor="#f472b6" />
          <stop offset="1" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="bagB" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="shop-tiles">
        <rect className="tile t1" x="22" y="48" width="38" height="38" rx="9" fill="#a78bfa" opacity="0.85" />
        <rect className="tile t2" x="184" y="40" width="34" height="34" rx="9" fill="#fb7185" opacity="0.85" />
        <rect className="tile t3" x="190" y="150" width="30" height="30" rx="8" fill="#fdba74" opacity="0.85" />
      </g>
      <g className="shop-bag">
        <path d="M84 84c0-24 12-40 36-40s36 16 36 40" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.9" />
        <path d="M58 84h124l-10 118a10 10 0 0 1-10 9H78a10 10 0 0 1-10-9z" fill="url(#bagA)" />
        <path d="M58 84h124l-3 34H61z" fill="url(#bagB)" />
        <circle cx="96" cy="108" r="5" fill="#fff" />
        <circle cx="144" cy="108" r="5" fill="#fff" />
        <path d="m120 140 6.500 13.500 14.500 2-10.500 10 2.500 14.500-13-7-13 7 2.500-14.500-10.500-10 14.500-2z" fill="#fff" opacity="0.92" />
      </g>
    </svg>
  );
}

export function WeatherArt() {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg className="art-svg art-weather-svg" viewBox="0 0 240 240" role="img" aria-label="Sun behind a drifting cloud">
      <defs>
        <radialGradient id="sunA" cx="0.35" cy="0.3" r="0.9">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.5" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#fb923c" />
        </radialGradient>
        <linearGradient id="cloudA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#bfe3f5" />
        </linearGradient>
      </defs>
      <g className="sun" transform="translate(96 100)">
        <g className="sun-rays">
          {rays.map((deg) => (
            <rect key={deg} x="-3" y="-66" width="6" height="18" rx="3" fill="#fcd34d" transform={`rotate(${deg})`} />
          ))}
        </g>
        <circle r="40" fill="url(#sunA)" />
      </g>
      <g className="cloud">
        <path
          d="M82 190h98a30 30 0 0 0 4-59.700A44 44 0 0 0 99 120a36 36 0 0 0-17 70z"
          fill="url(#cloudA)"
        />
      </g>
      <g className="drops" fill="#7dd3fc">
        <path className="drop d1" d="M104 208c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
        <path className="drop d2" d="M134 208c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
        <path className="drop d3" d="M164 208c3 5 5 8 5 11a5 5 0 0 1-10 0c0-3 2-6 5-11z" />
      </g>
    </svg>
  );
}

export function BookArt() {
  return (
    <svg className="art-svg art-book-svg" viewBox="0 0 240 240" role="img" aria-label="Open book">
      <defs>
        <linearGradient id="pageA" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c8fff0" />
        </linearGradient>
      </defs>
      <g className="book">
        <path d="M120 70c-22-14-52-18-86-14v118c34-4 64 0 86 14 22-14 52-18 86-14V56c-34-4-64 0-86 14z" fill="url(#pageA)" />
        <path d="M120 70v118" stroke="#0f766e" strokeWidth="3" opacity="0.5" />
        <g stroke="#0f766e" strokeWidth="5" strokeLinecap="round" opacity="0.55">
          <path d="M52 92c20-2 38 0 56 8" />
          <path d="M52 114c20-2 38 0 56 8" />
          <path d="M52 136c20-2 38 0 56 8" />
          <path d="M132 100c18-8 36-10 56-8" />
          <path d="M132 122c18-8 36-10 56-8" />
          <path d="M132 144c18-8 36-10 56-8" />
        </g>
        <path className="bookmark" d="M168 58v34l8-7 8 7V58z" fill="#fb7185" />
      </g>
    </svg>
  );
}