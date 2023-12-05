import React from 'react';

// import InputForm from '../modal/input-form';
import { useModelContext } from '../../contexts/modal.context';
import { useTodoContext } from '../../contexts/todo.context';
import InputForm from '../modal/input-form';
import ModalForm from '../modal/modal';

const Card = ({ taskObj, deleteTask }) => {
  const { isActive, setIsActive } = useModelContext();
  const { setcheckReload } = useTodoContext();

  const toggle = () => {
    setIsActive(!isActive);
  };

  const handleDelete = () => {
    setcheckReload((prevValue) => !prevValue);
    deleteTask(taskObj.id);
  };

  // move this function into seprate filder
  function formatDateD(targetDate: Date) {
    const year: number = targetDate.getFullYear();
    const month: number = targetDate.getMonth() + 1;
    const day: number = targetDate.getDate();

    return `${day}/${month}/${year}`;
  }

  function formatDateS(targetDateS: string) {
    const targetDate: Date = new Date(targetDateS);
    const year: number = targetDate.getFullYear();
    const month: number = targetDate.getMonth() + 1;
    const day: number = targetDate.getDate();

    return `${day}/${month}/${year}`;
  }

  const isSameDate = () => {
    const targetDate1: Date = new Date(taskObj.createdAt);
    const targetDate2: Date = new Date(taskObj.updatedAt);

    if (targetDate1.getTime() !== targetDate2.getTime()) {
      return false;
    }
    return true;
  };

  const deadline = () => {
    const targetDate: Date = new Date(taskObj.dueDate);

    // Get the current date without the time
    const currentDate: Date = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Calculate the difference in days
    const differenceInDays: number = Math.floor(
      (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    const ans = `${formatDateD(targetDate)} (${differenceInDays}-D)`;

    return ans;
  };

  return (
    <>
      <div className="container">
        <div className="card m-5">
          <div className="card-header d-flex justify-content-between">
            {/* <small className='text-muted'>Priority: {taskObj.priority.toString()}</small> */}
            <div>
              <small className="text-muted">
                {taskObj.priority && 'important'}
              </small>
              <br />
              <input type="checkbox" readOnly checked={taskObj.priority} />
            </div>
            <div className="ml-auto">
              <small className="text-muted">Deadline:</small>
              <br />
              <small>{taskObj.dueDate ? deadline() : '---'}</small>
            </div>
          </div>

          <div className="card-body ">
            <h5 className="card-title">{taskObj.name}</h5>
            <p className="card-text">{taskObj.description}</p>
            <div className="d-flex justify-content-between">
              <h6 className="card-text"> Type: {taskObj.taskType}</h6>
              <div className="ml-auto">
                <button className="btn btn-primary m-1" onClick={toggle}>
                  {' '}
                  edit{' '}
                </button>
                <button className="btn btn-primary m-1" onClick={handleDelete}>
                  {' '}
                  delete{' '}
                </button>
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-between">
            <div>
              <small className="text-muted">
                {' '}
                created At : {formatDateS(taskObj.createdAt)}{' '}
              </small>
              <br />
              {!isSameDate() && (
                <small className="text-muted">
                  {' '}
                  updated At : {formatDateS(taskObj.updatedAt)}{' '}
                </small>
              )}
            </div>

            <div>
              <small className="text-muted">
                {taskObj.isCompleted ? 'Completed' : 'pending'}
              </small>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div>
        {isActive && (
          <ModalForm>
            <InputForm taskObj={taskObj} />
          </ModalForm>
        )}
      </div>
    </>
  );
};

export default Card;
