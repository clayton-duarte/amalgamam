import React from 'react';

import colors from '../helpers/colors-enum';

const Input = (props) => {
  return (
    <>
      <input autoFocus placeholder=">" {...props} />
      <style jsx>{`
        input {
          all: unset;
          display: block;
          color: ${colors.white};
          background: ${colors.gray};
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Input;
