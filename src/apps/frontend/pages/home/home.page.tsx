// import { useStyletron } from 'baseui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// import { Navbar2 } from '../../components';
import Button1 from '../../components/widgets/button/button1';
// import { Link } from 'react-router-dom';

export default function Home(): React.ReactElement {
  const navigation = useNavigate();

  const buttonFun = () => {
    navigation('/login');
  };

  return (
    <>
    <div className=' d-flex justify-content-center align-items-center vh-100'>
      <div className=''>
        <h4> "Every accomplishment starts with the decision to try."</h4>
        <Button1 task={buttonFun}/>
      </div>
    </div>
    </>
  );
}
