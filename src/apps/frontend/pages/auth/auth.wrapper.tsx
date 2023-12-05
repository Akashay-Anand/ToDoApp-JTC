import React, { PropsWithChildren } from 'react';

const AuthWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <>
    <div>
      {children}
    </div>
  </>
);

export default AuthWrapper;
