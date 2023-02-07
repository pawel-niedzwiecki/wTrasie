import styled, {css} from 'styled-components';
import {SpecialProps} from './component.loading.wheel.props'


export const Wrapper = styled.div<SpecialProps>`
  ${({size}) => css`
    width: ${size}rem;
    height: ${size}rem;
  `}
`

export const Wheel = styled.div<SpecialProps & { el: undefined[] }>`
  ${({theme: {spaces, radiis}, size}) => css`

    top: 30%;
    left: 30%;
    width: ${size}rem;
    height: ${size}rem;
    position: relative;

    span {
      top: -12%;
      left: -18%;
      width: 24%;
      height: 8%;
      display: block;
      position: absolute;
      margin: ${spaces.small};
      border-radius: ${radiis.default};
      background-color: var(--uxu-color-primary-accent6);
      animation-name: loading-wheel-blink;
      animation-duration: 1.4s;
      animation-fill-mode: both;
      animation-iteration-count: infinite;

      ${children};
    }

    @keyframes loading-wheel-blink {
      0% {
        opacity: 1
      }
      to {
        opacity: 0.15
      }
    }

  `}
`;


const children = css<SpecialProps & { el: undefined[] }>`
  ${({el}) => {
    let style = {}
    const count = el.length;

    for (let i = 0; i < count; i++) {
      Object.assign(style, {
        [`&:nth-child(${i + 1})`]: {
          animationDelay: `${0 - (i / 10)}s`,
          transform: `rotate(${360 / count * i}deg) translate(146%)`
        }
      })
    }

    return style
  }};
`
