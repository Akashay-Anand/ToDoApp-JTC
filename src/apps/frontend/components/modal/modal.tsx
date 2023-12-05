import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { useModelContext } from '../../contexts/modal.context';

interface ModalFormProps {
  children?: React.ReactNode;
  fixedMode?: boolean;
  isActive?: boolean;
  text?: string;
  setmodalState?: Dispatch<SetStateAction<boolean>>
}

const ModalForm: React.FC<ModalFormProps> = ({ children }) => {
  // importing context for modal
  const {
    fixedMode, isActive, text, setFixedMode, setIsActive,
  } = useModelContext();

  // setIsActive(true); // 🛑 this line is making error // use useeffect

  // handle modal visibility change
  const handlemodalStateChange = () => {
    setFixedMode(false);
    setIsActive(false);
  };

  useEffect(() => {}, []);

  return (
    <>
    <div>

      {isActive && (
        <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{text} form</h5>
                {!fixedMode && (
                <button type="button" className="close" onClick={handlemodalStateChange} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                )}
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
                <hr/>
              </div>
            </div>
          </div>
        </div>
      )}

      {isActive && <div className="modal-backdrop fade show"></div>}
    </div>
    </>
  );
};

export default ModalForm;
