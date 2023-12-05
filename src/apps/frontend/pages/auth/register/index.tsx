import React, { useEffect } from 'react';

import ModalForm from '../../../components/modal/modal';
import { useModelContext } from '../../../contexts/modal.context';
import AuthWrapper from '../auth.wrapper';

import Registerpage from './register.page';

export default function Login(): React.ReactElement {
  const { setFixedMode, setIsActive, setText } = useModelContext();
  useEffect(() => {
    setFixedMode(true);
    setIsActive(true);
    setText('Register');
  }, []);

  return (
    <>
      <AuthWrapper>
        <ModalForm fixedMode={true} isActive={true} text="Register">
          <Registerpage />
        </ModalForm>
      </AuthWrapper>
    </>
  );
}
