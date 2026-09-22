import images from './generated/images.json';

type ImageAsset = { src: string; srcSet?: string; width?: number; height?: number };
const assets: Record<string, ImageAsset> = images;

/** Static, fingerprinted images; works on any host without /_next/image. */
export function imageProps(src: string, sizes = '100vw'): ImageAsset & { sizes?: string } {
  const asset = assets[src];
  return asset ? { ...asset, sizes } : { src };
}
