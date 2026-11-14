/** A phone drawn in CSS around the BloodConnect screenshot, so the edges are always clean. */
export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="phone">
      <div className="phone-body">
        <span className="phone-notch" aria-hidden="true" />
        <div className="phone-screen">
          <img src={src} alt={alt} width={640} height={1226} loading="lazy" />
        </div>
      </div>
    </div>
  );
}
