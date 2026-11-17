/** The portrait split into three slanted glass shards that slide together and drift apart with the cursor. */
export function ShardPortrait() {
  return (
    <div className="shards">
      {[1, 2, 3].map((n) => (
        <div className={`shard-wrap shard-wrap-${n}`} key={n}>
          <div className="shard">
            <img src="/images/hero-portrait.webp" width={900} height={1125} alt="" loading="eager" />
          </div>
        </div>
      ))}
    </div>
  );
}