import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function InitialLetters({ name }) {
  const formattedName = name.replace(/\s(de|da|do|dos|das|)\s/g, ' ');
  const letters = formattedName.match(/\b([A-Z])/g);

  const initialName = letters[0] + letters[letters.length - 1];

  return <Container>{initialName}</Container>;
}

InitialLetters.defaultProps = {
  name: String,
};

InitialLetters.propTypes = {
  name: PropTypes.string,
};
