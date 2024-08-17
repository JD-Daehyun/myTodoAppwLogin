const dashBoardRouter = require("express").Router();
const pool = require("../db.js");
const authorization = require("../middleware/authorization.js");

//all todos and name
dashBoardRouter.get("/", authorization, async (req, res) => {
  try {
    //req.user has the payload
    // res.json(req.user);
    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users As u LEFT JOIN todo As t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user]
    );
    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//create a todo
dashBoardRouter.post("/todos", authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (user_id, description) VALUES($1, $2) RETURNING *",
      [req.user, description]
    );
    res.json(newTodo.rows[0]);
  } catch (e) {
    console.log(e.message);
  }
});
//update a todo
dashBoardRouter.put("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING * ",
      [description, id, req.user]
    );
    if (updateTodo.rows.length === 0) {
      return res.json("Does not belong to you!");
    }
    res.json("Nice Update Complete");
  } catch (e) {
    console.log(e.message);
  }
});

//delete a todo
dashBoardRouter.delete("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("You cannot delete this");
    }
    res.json("Deleted Complete");
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = dashBoardRouter;
