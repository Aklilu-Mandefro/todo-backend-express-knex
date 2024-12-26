const app = require("./server-config.js");
const routes = require("./server-routes.js");
const userRoutes = require("./user-routes.js"); //Import the user registration routes

const port = process.env.PORT || 5000;

app.get("/", routes.getAllTodos);
app.get("/:id", routes.getTodo);

app.post("/", routes.postTodo);
app.patch("/:id", routes.patchTodo);

app.delete("/", routes.deleteAllTodos);
app.delete("/:id", routes.deleteTodo);

// New user registration route
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
