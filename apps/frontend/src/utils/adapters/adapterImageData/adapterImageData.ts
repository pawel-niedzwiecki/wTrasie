import { AdapterImageDataProps } from './types'

export function adapterImageData({ attributes, typeImg }: AdapterImageDataProps): string | null {
  if (!attributes) return null;
  const formatUrl = attributes.formats?.[typeImg]?.url;
  return formatUrl || attributes.url || null;
}
