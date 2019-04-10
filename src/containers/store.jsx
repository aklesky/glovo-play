import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Header } from '@/components/Header';
import { Tag } from '@/components/Tag';
import { Subtitle } from '@/components/Subtitle';
import { elevation } from '@/theme/elevation';
import { Grid, Row, Column } from '@/components/Grid';
import { Text } from '@/components/Text';

const Current = props => {
  const { data, className, refetch } = props;

  const onClick = tag => () => {
    refetch({
      tag
    });
  };

  return (
    <section className={className}>
      <Grid fullWidth fullHeight>
        <Row>
          <Column fullWidth fullHeight>
          <Header>{data.name}</Header>
          <Subtitle>{data.description}</Subtitle>
          {data.tags.map(tag => {
            return (
              <Tag onClick={onClick(tag)} key={tag}>
                {tag}
              </Tag>
            );
          })}
          <Text align='flex-end'>{data.open}</Text>
          </Column>

        </Row>
      </Grid>
    </section>
  );
};

Current.displayName = 'Store';
Current.propTypes = {
  className: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
  refetch: PropTypes.func.isRequired
};

export default React.memo(
  styled(Current)`
    flex: 1;
    background: ${props => props.theme.colors.white};
    margin: ${props => props.theme.metrics.padding}px;
    min-height: ${props => props.theme.metrics.store.minHeight}px;
    height: 100%;
    max-height: ${props => props.theme.metrics.store.maxHeight}px;
    ${elevation}
  `
);
