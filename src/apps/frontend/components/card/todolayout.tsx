import React, { useState } from 'react';
import ModalForm from '../modal/modal-Form.component';

export default function TodoLayout({ setcheckReload }) {
  const [modalState, setmodalState] = useState(false);

  const handlemodalStateChange = () => {
    setmodalState(!modalState);
  };

  return (
    <>
      <div className="containerbtn">
        <div className="right-btn">
          <button type="button" onClick={handlemodalStateChange}>
            Add task
          </button>
        </div>
        <div className="left-btn">
          <button type="button">Reset</button>
          <button type="button">completed</button>
          <button type="button">pending</button>
        </div>
      </div>

      <div className="modal-content">
        {modalState && (
          <ModalForm
            setmodalState={setmodalState}
            isActive={modalState}
            setcheckReload={setcheckReload}
            taskObj={null}
          />
        )}
      </div>

      <div className="containertodolist">
        <ul></ul>
      </div>
    </>
  );
}
