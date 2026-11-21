import type { CSSProperties } from 'react';
import { testimonials } from '../data';
import { SplitText } from './SplitText';
import { useInView } from '../hooks/useInView';

export function Testimonials({ motion }: { motion: boolean }) {
  const [titleRef, titleSeen] = useInView<HTMLHeadingElement>(0.4);
  const [listRef, listSeen] = useInView<HTMLUListElement>(0.2);
  const items = testimonials.filter((item) => item.quote.trim() !== '');

  if (items.length === 0) return null;

  return (
    <section className="block wrap" id="testimonials" aria-labelledby="testimonials-title">
      <h2 className="title" id="testimonials-title" ref={titleRef}>
        <SplitText text="Testimonials" play={titleSeen} step={50} />
      </h2>
      <ul ref={listRef} className={`friends testi ${listSeen || !motion ? 'is-in' : ''}`}>
        {items.map((item, i) => (
          <li className="friend" key={item.name} style={{ '--i': i } as CSSProperties}>
            <span className="testi-mark" aria-hidden="true">&ldquo;</span>
            <blockquote className="friend-quote">{item.quote}</blockquote>
            <div className="testi-who">
              <span className="friend-ring">
                <img src={item.photo} width={520} height={520} alt={item.name} loading="lazy" />
              </span>
              <div>
                <p className="friend-name">{item.name}</p>
                {item.role && <p className="friend-role">{item.role}</p>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}