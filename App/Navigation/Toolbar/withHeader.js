import React from 'react';
import Wrapper from './Wrapper';

export const withHeader = Scene => {
  return () => (
    <Wrapper>
      <Scene />
    </Wrapper>
  );
};
