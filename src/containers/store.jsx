import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '@/components/Header';
import { Tag } from '@/components/Tag';
import { Subtitle } from '@/components/Subtitle';
import { elevation } from '@/theme/elevation';

const Current = props => {
  const { data, className } = props;
  return (
    <section className={className}>
      <Header>{data.name}</Header>
      {data.tags.map(tag => {
        return (<Tag key={tag}>{tag}</Tag>);
      })}
      <Subtitle>{data.description}</Subtitle>
      <p>{data.open}</p>


    </section>
  );
};

export default React.memo(
  styled(Current)`
    background: ${props => props.theme.colors.white};
    margin: ${props => props.theme.metrics.padding}px;
    min-height: ${props => props.theme.metrics.store.minHeight}px;
    height: 100%;
    max-height: ${props => props.theme.metrics.store.maxHeight}px;;
    ${elevation}
  `
);
