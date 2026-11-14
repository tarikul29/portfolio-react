interface LogoProps {
  size?: number;
  draw?: boolean;
}

/** Tarikul monogram: a T whose sides open into code brackets. */
export function Logo({ size = 40, draw = false }: LogoProps) {
  return (
    <svg
      className={draw ? 'logo logo-draw' : 'logo'}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="Tarikul Islam logo"
    >
      <path className="logo-bar" d="M15 10h34v9H15z" fill="#e7ab71" />
      <path className="logo-stem" d="M26 19h12v23l-6 9-6-9z" fill="#e7ab71" />
      <path className="logo-blade" d="M32 25v15" stroke="#78e4bd" strokeWidth="4" strokeLinecap="round" />
      <path
        className="logo-bracket"
        d="M22 27 11 37l11 10"
        fill="none"
        stroke="#61a7bd"
        strokeWidth="5.5"
        strokeLinejoin="miter"
        pathLength={1}
      />
      <path
        className="logo-bracket"
        d="M42 27l11 10-11 10"
        fill="none"
        stroke="#61a7bd"
        strokeWidth="5.5"
        strokeLinejoin="miter"
        pathLength={1}
      />
    </svg>
  );
}
