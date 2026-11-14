import { useRef } from 'react';
import { Reveal } from './Reveal';
import { SplitText } from './SplitText';
import { useInView } from '../hooks/useInView';
import { useTilt } from '../hooks/useTilt';

const offers = [
  { title: 'Websites', text: 'Clean, responsive front end builds.' },
  { title: 'Web apps', text: 'Interactive apps that feel smooth.' },
  { title: 'Design to code', text: 'A Photoshop design turned into a working page.' },
];

export function About({ motion }: { motion: boolean }) {
  const [titleRef, titleSeen] = useInView<HTMLHeadingElement>(0.4);
  const [portraitRef, portraitSeen] = useInView<HTMLDivElement>(0.3);
  const tiltRef = useRef<HTMLDivElement>(null);
  useTilt(tiltRef, motion, 5);

  return (
    <section className="block wrap" id="about" aria-labelledby="about-title">
      <div className="about-grid">
        <div ref={portraitRef} className="portrait-wrap">
          <figure className={`portrait ${portraitSeen ? 'is-in' : ''}`}>
            <div className="portrait-tilt" ref={tiltRef}>
              <img src="/images/about.webp" width={960} height={1200} alt="Tarikul standing on a rooftop in a red t-shirt." loading="lazy" />
            </div>
          </figure>
        </div>
        <div>
          <h2 className="title" id="about-title" ref={titleRef}>
            <SplitText text="About" play={titleSeen} step={60} />
          </h2>
          <Reveal delay={100}>
            <p>
              I'm Tarikul, a computer engineering student from Bangladesh. I build the front end of websites and apps:
              layout, animation and everything a visitor sees and touches.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              I write HTML, CSS and JavaScript by hand, and use React, TypeScript and Next.js for larger apps. I also
              design in Photoshop.
            </p>
          </Reveal>
          <ul className="offers">
            {offers.map((offer, i) => (
              <li key={offer.title}>
                <Reveal delay={300 + i * 120}>
                  <h3>{offer.title}</h3>
                  <p>{offer.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}