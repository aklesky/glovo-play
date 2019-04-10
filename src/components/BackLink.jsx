import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { elevation } from '@/theme/elevation';
import { flexbox } from '@/theme/flexbox';
import { transform } from '@/theme/transform';

const BackButton = props => {
  const { className, to, ariaLabel } = props;
  return (
    <Link to={to} className={className} aria-label={ariaLabel}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </Link>
  );
};

BackButton.displayName = 'Back';
BackButton.defaultProps = {
  to: '/',
  ariaLabel: '',
}
BackButton.propTypes = {
  className: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string,
  to: PropTypes.string
};

export default styled(BackButton)`
  ${flexbox}
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.metrics.padding}px;
  margin: ${props => props.theme.metrics.margin}px;
  cursor: pointer;
  ${elevation};
  display: block;
  color: ${props => props.theme.colors.white};

  &:visited,
  &:hover,
  &:visited {
    color: ${props => props.theme.colors.white};
  }
  &:hover {
    ${transform};
  }
`;
