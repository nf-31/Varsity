import React from 'react';

function WithComponentLoading(Component) {
  return function withComponentLoading({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return (
      <p style={{ textAlign: 'center', fontSize: '30px' }}>
        Loading...
      </p>
    );
  };
}
export default WithComponentLoading;