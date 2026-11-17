/** The framed portrait is cut into three slanted shards (frame included) that slide together on load. */
export function ShardPortrait() {
  return (
    <div className="shards">
      {[1, 2, 3].map((n) => (
        <div className={`shard-wrap shard-wrap-${n}`} key={n}>
          <div className="shard">
            <span className="shard-frame" />
            <img src="/images/hero-portrait.webp" width={900} height={1125} alt="" loading="eager" />
          </div>
        </div>
      ))}
    </div>
  );
}