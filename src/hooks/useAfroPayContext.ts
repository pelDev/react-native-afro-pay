import { useContext } from 'react';
import {
  AfroPayContext,
  type AfroPayContextType,
} from '../context/AfroPayContext';

export function useAfroPayContext() {
  const ctx = useContext(AfroPayContext) as AfroPayContextType;

  if (ctx === undefined) {
    // throwing here is a nice touch because this is really a developer error
    // and if this happened during production, something must have really broken
    // and hopefully an error boundary is available to catch and rendering something safely
    // oh - and - maybe you should have monitoring on your webapps too?
    throw new Error(
      'useAfroPayContext can only be used in an AfroPayProvider tree'
    );
  }

  return ctx;
}
