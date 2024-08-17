import React, { Fragment, useState } from "react";

const EditTodo = ({ todo, setTodosChange }) => {
  const [description, setDescription] = useState(todo.description);

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description };
      const response = await fetch(
        `http://localhost:4001/dashboard/todos/${todo.todo_id}`,
        {
          method: "PUT", //specify to PUT rather than GET
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );
      setTodosChange(true);
      // window.location = "/"; //refresh the page
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${todo.todo_id}`} //to specifiy the modal
      >
        Edit
      </button>

      {/* Modal Component is taken from W3 School BoothStrap Modal */}
      <div
        className="modal"
        id={`id${todo.todo_id}`} //to specifiy the modal
        onClick={() => setDescription(todo.description)} //click outside after changing the content will reset the description back to its orginial
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)} //click X  after changing the content will reset the description back to its orginial
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(todo.description)} //click close after changing the content will reset the description back to its orginial
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;