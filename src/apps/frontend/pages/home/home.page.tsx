// import { useStyletron } from 'baseui';
import React from 'react';

import { Navbar2 } from '../../components';

export default function Home(): React.ReactElement {
//   const [css, theme] = useStyletron();

  return (
    <>
    <Navbar2 />
    <div className='container-fluid d-flex justify-content-center align-items-center vh-100'>
      <div className='text-center'>
        <h4> ToDo APP</h4>
        <button> Start </button>
      </div>
      {/* <p className={css({ color: theme.colors.accent })}> Home </p> */}
    </div>
    </>
  );
}
