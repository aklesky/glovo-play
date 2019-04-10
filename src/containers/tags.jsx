import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Column } from '@/components/Grid';
import { Tag } from '@/components/Tag';
import { elevation } from '@/theme/elevation';
import { flexbox } from '@/theme/flexbox';


const Tags = props => {
  const { className, onClick, label } = props;
  return (
    <>
      <Row fullWidth onClick={onClick}>
        <Column xs={12} sm={12} md={12} lg={12}>
          <section className={className}>
            <Tag>{label}</Tag>
            <FontAwesomeIcon icon={faTimes} />
          </section>
        </Column>
      </Row>
    </>
  );
};

Tags.displayName = 'CurrentTag';
Tags.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default React.memo(styled(Tags)`
  margin-top: ${props => props.theme.metrics.margin}px;
  margin-bottom: ${props => props.theme.metrics.margin}px;
  padding-left: ${props => props.theme.metrics.paddingHorizontal}px;
  padding-right: ${props => props.theme.metrics.paddingHorizontal}px;
  color: ${props => props.theme.colors.white};
  ${elevation}
  ${flexbox}
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

`);
