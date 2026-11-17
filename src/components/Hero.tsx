import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { SplitText } from './SplitText';
import { MagneticLink } from './MagneticLink';
import { RotatingText } from './RotatingText';
import { SocialIcons } from './SocialIcons';
import { ShardPortrait } from './ShardPortrait';
import { usePointerFollow } from '../hooks/usePointerFollow';
import { roles } from '../data';

interface HeroProps {
  ready: boolean;
  motion: boolean;
}

function ReactAtom() {
  return (
    <svg viewBox="-12 -12 24 24" width="22" height="22" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <ellipse rx="10" ry="4" />
        <ellipse rx="10" ry="4" transform="rotate(60)" />
        <ellipse rx="10" ry="4" transform="rotate(120)" />
      </g>
      <circle r="1.8" fill="currentColor" />
    </svg>
  );
}

const chip = (angle: number): CSSProperties => ({ '--a': `${angle}deg` }) as CSSProperties;
const delay = (ms: number): CSSProperties => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero({ ready, motion }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  usePointerFollow(ref, motion);

  return (
    <section className={`hero wrap ${ready ? 'is-ready' : ''}`} id="top" ref={ref} aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="pill rise" style={delay(0)}>
          <span className="pill-dot" aria-hidden="true" />
          Frontend developer from Bangladesh
        </p>
        <h1 className="hero-title" id="hero-title">
          <span className="hero-line">
            <SplitText text="Tarikul" play={ready} delay={120} step={55} />
          </span>
          <span className="hero-line">
            <SplitText text="Islam" play={ready} delay={500} step={55} />
          </span>
        </h1>
        <p className="build rise" style={delay(850)}>
          I build <RotatingText words={roles} active={motion && ready} />
        </p>
        <p className="lede rise" style={delay(980)}>
          Responsive front ends made with React, TypeScript and Next.js.
        </p>
        <div className="actions rise" style={delay(1100)}>
          <MagneticLink className="btn" href="#work" motion={motion}>
            See my work
          </MagneticLink>
          <MagneticLink className="textlink" href="#contact" motion={motion}>
            Get in touch
          </MagneticLink>
        </div>
        <div className="rise" style={delay(1250)}>
          <SocialIcons />
        </div>
      </div>

      <div className="stage-wrap">
        <div className="stage" aria-hidden="true">
          <div className="stage-glow" />
          <div className="disc" />
          <div className="ring ring-a" />
          <div className="ring ring-b" />
          <div className="orbit orbit-1">
            <div className="chip" style={chip(20)}><span>&lt;/&gt;</span></div>
            <div className="chip" style={chip(140)}><span>{'{ }'}</span></div>
            <div className="chip" style={chip(260)}><span>TS</span></div>
          </div>
          <div className="orbit orbit-2">
            <div className="chip chip-sm" style={chip(80)}><span><ReactAtom /></span></div>
            <div className="chip chip-sm" style={chip(260)}><span>JS</span></div>
          </div>
          <ShardPortrait />
          <a className="float-card fc-a" href="#work" tabIndex={-1}>
            <img src="/images/bloodconnect-logo.svg" width={36} height={36} alt="" />
            <span>
              <b>BloodConnect BD</b>
              <small><i className="live-dot" />Live project</small>
            </span>
          </a>
          <a className="float-card fc-b" href="#work" tabIndex={-1}>
            <span>
              <b>Iqra Plan</b>
              <small>Loading</small>
              <em className="mini-bar"><i /></em>
            </span>
          </a>
        </div>
      </div>

      <a className="scroll-cue rise" style={delay(1500)} href="#work" aria-label="Scroll to my work">
        <span />
      </a>
    </section>
  );
}