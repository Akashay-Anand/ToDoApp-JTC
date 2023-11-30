// import { useStyletron } from 'baseui';
import React from 'react';

// import { Navbar2 } from '../../components';
import Button1 from '../../components/widgets/button/button1';
// import { Link } from 'react-router-dom';

export default function Home(): React.ReactElement {
//   const [css, theme] = useStyletron();

  return (
    <>
    <div className=' d-flex justify-content-center align-items-center vh-100'>
      <div className=''>
        <h4> "Every accomplishment starts with the decision to try."</h4>
        <Button1 />
      </div>
      {/* <p className={css({ color: theme.colors.accent })}> Home </p> */}
    </div>
    </>
  );
}
