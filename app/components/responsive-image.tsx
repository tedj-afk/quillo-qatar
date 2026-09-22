import type { ImgHTMLAttributes } from 'react';
import { imageProps } from '@/lib/image-props';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: string };

export function ResponsiveImage({ src, sizes, loading, decoding = 'async', fetchPriority = 'low', ...props }: Props) {
  return <img {...imageProps(src, sizes)} loading={loading ?? (src.endsWith('.svg') ? 'eager' : 'lazy')} decoding={decoding} fetchPriority={fetchPriority} {...props} />;
}

// CSS hides these decorations below 701px. A media source also prevents downloads.
export function DesktopHeroImage({ src }: { src: string }) {
  return <picture className="ag-desktop-decoration">
    <source media="(max-width: 700px)" srcSet="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=" />
    <ResponsiveImage src={src} sizes="(max-width: 1000px) 64px, 82px" loading="eager" alt="" />
  </picture>;
}
