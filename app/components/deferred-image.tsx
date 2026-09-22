'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { imageProps } from '@/lib/image-props';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: string };

/** Keep large below-fold decorations outside the browser's eager lazy-load margin. */
export function DeferredImage({ src, sizes, className = '', ...props }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [nearby, setNearby] = useState(false);
  const asset = imageProps(src, sizes);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setNearby(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setNearby(true);
        observer.disconnect();
      }
    }, { rootMargin: '400px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <>
    <img {...asset} {...props} ref={ref} className={`ag-deferred-image ${className}`}
      src={nearby ? asset.src : undefined} srcSet={nearby ? asset.srcSet : undefined}
      loading="lazy" decoding="async" fetchPriority="low" />
    <noscript><img {...asset} {...props} className={className} loading="lazy" /></noscript>
  </>;
}
