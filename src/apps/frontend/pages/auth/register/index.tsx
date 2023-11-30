import React from 'react';

import ModalForm from '../../../components/modal/modal1';
import { useModelContext } from '../../../contexts/modal.context';
import AuthWrapper from '../auth.wrapper';

import Registerpage from './register.page';

export default function Login(): React.ReactElement {
  const { setFixedMode, setIsActive, setText } = useModelContext();
  setFixedMode(true);
  setIsActive(true);
  setText('Register');
  return (
        <>
            <AuthWrapper>
                <ModalForm fixedMode={true} isActive={true} text="Register">
                  <Registerpage />
                </ModalForm>
            </AuthWrapper>
        </>
  )
}