import Link from 'next/link';
import styled, { css } from 'styled-components';
import { SpecialProps } from './component.link.types';
import { listensPropsSize } from './../../../utils';
import { btn } from './../../../components/atoms/button/component.button.style';


export const Url = styled.a<SpecialProps>`
  ${({size, shape, align, color, variant}) => css`
    ${listensPropsSize};
    ${btn({size, shape, align, color, variant})};
  `}

`;

export const Slug = styled(Link)<SpecialProps>`
  ${({size, shape, align, color, variant}) => css`
    ${listensPropsSize};
    ${btn({size, shape, align, color, variant})};
  `}
`;
