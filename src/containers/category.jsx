import React from 'react';
import PropTypes from 'prop-types';
import { media } from '@/theme/images';
import { Image } from '@/components/Image';
import { Category } from '@/components/Category';

const Current = props => {
  const {
    data,
    children,
    fullWidth,
    paddingVertical,
    marginVertical,
    paddingHorizontal,
    marginHorizontal
  } = props;

  if (!data || !data.id) {
    return null;
  }

  const imageState = data && data.active ? 'active' : 'closed';
  return (
    <Category
      active={data && data.active}
      fullWidth={fullWidth}
      paddingVertical={paddingVertical}
      marginVertical={marginVertical}
      paddingHorizontal={paddingHorizontal}
      marginHorizontal={marginHorizontal}
      alignItems="center"
      justifyContent="center"
    >
      {data && <Image src={media[data.name][imageState]} alt={data.label} />}
      {children}
    </Category>
  );
};

Current.displayName = 'Category';

Current.defaultProps = {
  children: null,
  fullWidth: false,
  paddingVertical: null,
  paddingHorizontal: null,
  marginVertical: null,
  marginHorizontal: null,
  data: {
    name: null,
    label: null,
    active: false
  }
};

Current.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    active: PropTypes.bool
  }),
  fullWidth: PropTypes.bool,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  marginVertical: PropTypes.number,
  marginHorizontal: PropTypes.number
};

export default React.memo(Current);
