import { FC } from 'react';
import { RegisterOptions } from 'react-hook-form';
import type { FunctionComponentDiv } from './../../../../utils';


export type SpecialProps = {
  error?: boolean
}

export type Props = FC<FunctionComponentDiv & RegisterOptions & SpecialProps>
