import { useStyletron } from 'baseui';
import React from 'react';

export default function Home(): React.ReactElement {
  const [css, theme] = useStyletron();

  return (
    <div>
      <p className={css({ color: theme.colors.accent })}> Home </p>
    </div>
  );
}
