import { ParserDataImgProps } from './utils.parserDataImg.types'

export function parserDataImg ( {attributes, typeImg}: ParserDataImgProps ): string | null {
  if ( attributes?.formats[ typeImg ]?.url ) return attributes?.formats[ typeImg ]?.url
  return attributes?.url || null
}
