import React, { useEffect } from 'react';

import ModalForm from '../../../components/modal/modal';
import { useModelContext } from '../../../contexts/modal.context';
import AuthWrapper from '../auth.wrapper';

import Loginpage from './login.page';

export default function Login(): React.ReactElement {
  const { setFixedMode, setIsActive, setText } = useModelContext();
  useEffect(() => {
    setFixedMode(true);
    setIsActive(true);
    setText('Login');
  }, []);

  return (
    <>
      <AuthWrapper>
        <ModalForm>
          <Loginpage />
        </ModalForm>
      </AuthWrapper>
    </>
  );
}
