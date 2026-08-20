'use client';

import { useEffect, useState } from 'react';

/**
 * Route entrance. A teal curtain covers the viewport for the first frame of
 * a new route and wipes upward, so navigation reads as one continuous piece
 * rather than a hard cut. Removed from the DOM once it has played.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const [curtain, setCurtain] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setCurtain(false), 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {curtain ? <div className="curtain" aria-hidden /> : null}
      {children}
    </>
  );
}
