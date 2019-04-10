import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input } from './Input';
import { Label } from './Label';

const Search = props => {
  const { className, onKeyUp, value, placeholder } = props;
  return (
    <section className={className}>
      <Label htmlFor="filter" aria-label={placeholder}>
        <Input
          id="filter"
          placeholder={placeholder}
          autoFocus={value !== ''}
          type="text"
          onKeyUp={onKeyUp}
          defaultValue={value}
        />
      </Label>
    </section>
  );
};

Search.defaultProps = {
  value: undefined,
  placeholder: null
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
};

export default React.memo(styled(Search)`
  margin-top: ${props => props.theme.metrics.margin}px;
  margin-bottom: ${props => props.theme.metrics.margin}px;
`);
