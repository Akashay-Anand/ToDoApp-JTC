import React from "react"
import InputForm from './input-form';

export default function ModalForm({ setmodalState, isActive, setcheckReload, taskObj }): React.ReactElement {
  const handlemodalStateChange = () => {
    setmodalState(false);
  };

  return(
    <>
    <div>

      {isActive && (
        <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" onClick={handlemodalStateChange} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
                <InputForm setmodalState= {setmodalState}
                 setcheckReload={setcheckReload}
                  taskObj = {taskObj}/>
              
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
}
