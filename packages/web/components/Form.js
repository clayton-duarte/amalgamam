import React, { useState } from 'react';
import { string } from 'prop-types';

import { useStateValue } from '../state';
import Input from '../components/Input';

const Form = ({ store, label }) => {
  const [, dispatch] = useStateValue();
  const [{ value }, setState] = useState({});

  function handleChange(e) {
    const { value } = e.target;
    setState({ value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: `set_${store}`, payload: value });
    setState({ value: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {label && <label>{label}:</label>}
      <Input onChange={handleChange} value={value} />
      <style jsx>{`
        label {
          font-weight: bold;
        }
      `}</style>
    </form>
  );
};

Form.propTypes = {
  store: string.isRequired,
};

export default Form;
