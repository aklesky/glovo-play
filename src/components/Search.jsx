import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { elevation } from '@/theme/elevation';

const Search = props => {
  const { className, onKeyUp, value, placeholder } = props;
  return (
    <section className={className}>
      <Input placeholder={placeholder} autoFocus={value !== ''} type="text" onKeyUp={onKeyUp} defaultValue={value} />
    </section>
  );
};

Search.defaultProps = {
  value: null,
  placeholder: null
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default React.memo(styled(Search)`
  padding: ${props => props.theme.metrics.padding};
  margin-top: ${props => props.theme.metrics.margin};
  margin-bottom: ${props => props.theme.metrics.margin};
  ${elevation};
`);
