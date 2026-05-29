/* global React */
// PhotoFrame — placeholder photography container.
// Until G2E provides real plant photography, every "photo" surface is a stylized
// dark panel with a placeholder tag and an optional location caption.

function PhotoFrame({ tag, caption, status, children, style }) {
  return (
    <div className="photo" style={style}>
      {tag && <div className="photo-placeholder-tag">{tag}</div>}
      {children}
      {caption && (
        <div className="photo-caption">
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: 'var(--bone-100)',
            opacity: status === 'operating' ? 1 : 0.55,
          }} />
          {caption}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { PhotoFrame });
