import { ParserDataImgProps } from './utils.parserDataImg.types'

export function parserDataImg ( {attributes, typeImg}: ParserDataImgProps ): string | null {
  const formatUrl = attributes?.formats?.[typeImg]?.url;
  return formatUrl || attributes?.url || null;
}
