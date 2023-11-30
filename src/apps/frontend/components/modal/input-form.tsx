import React, { useEffect, useState } from 'react';

import { AccessService } from '../../services';

export default function InputForm({
  setmodalState,
  setcheckReload,
  taskObj,
}): React.ReactElement {
  const accessService = new AccessService();
  const token = localStorage.getItem('token');
  const accountId = localStorage.getItem('userid');

  // define states
  const [name, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskType, setTaskType] = useState('Official');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const editMode = taskObj !== null;

  useEffect(() => {
    if (editMode) {
      setTitle(taskObj.name);
      setDescription(taskObj.description);
      setTaskType(taskObj.taskType);
      setPriority(taskObj.priority);
      setIsCompleted(taskObj.isCompleted);
      setDueDate(taskObj.dueDate.substring(0, 10));

      // const formattedDueDate = dueDate.substring(0, 10);
    }
  }, []);

  // call api to add data lets see the api implementation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    try {
      if (editMode) {
        await accessService.updateTask(
          accountId,
          taskObj.id,
          name,
          description,
          taskType,
          priority,
          isCompleted,
          token,
          dueDate,
        );
      } else {
        await accessService.createTask(
          accountId,
          name,
          description,
          taskType,
          priority,
          isCompleted,
          token,
          dueDate,
        );
      }
      setcheckReload((prevValue) => !prevValue); // reload component
      setmodalState(false); // close modal
    } catch (err) {
      console.log(error);
      setError(true);
    }
    console.log('submited');
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Title"
              value={name}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="taskType">Task Type</label>
            <select
              className="form-control"
              id="taskType"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
            >
              <option value="Official">Official</option>
              <option value="Personal">Personal</option>
              <option value="Hobby">Hobby</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-group form-check">
            <label className="form-check-label" htmlFor="priority">
              <input
                type="checkbox"
                className="form-check-input"
                id="priority"
                checked={priority}
                onChange={() => setPriority(!priority)}
              />
              Priority
            </label>
          </div>
          <div className="form-group form-check">
            <label className="form-check-label ml-auto" htmlFor="isCompleted">
              <input
                type="checkbox"
                className="form-check-input"
                id="priority"
                checked={isCompleted}
                onChange={() => setIsCompleted(!isCompleted)}
              />
              already completed?
            </label>
          </div>
        </form>

        {error && <p>*unsuccessfull</p>}
        {success && <p>*successfull</p>}

        <div className="d-flex justify-content-end">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary ml-auto "
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
