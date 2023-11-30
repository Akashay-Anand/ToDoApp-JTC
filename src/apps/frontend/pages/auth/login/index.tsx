import React from 'react';

// import { Navbar2 } from "../../../components";
import ModalForm from '../../../components/modal/modal1';
import { useModelContext } from '../../../contexts/modal.context';
import AuthWrapper from '../auth.wrapper';

import Loginpage from './login.page';

export default function Login(): React.ReactElement {
  const { setFixedMode, setIsActive, setText } = useModelContext();
  setFixedMode(true);
  setIsActive(false);
  setText('Login');

  return (
        <>
            {/* <Navbar2 /> */}
            <AuthWrapper>
                <ModalForm >
                  <Loginpage />
                </ModalForm>
            </AuthWrapper>
        </>
  )
}