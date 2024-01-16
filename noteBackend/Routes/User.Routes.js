import { User } from "../models/UserModel.js";

export const UserRoutes = (app) => {
  app.post("/api/users", async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        throw { code: 400, message: "Field is required" };
      }
      const todo = new User({data})
      await todo.save()
    } catch (error) {
      console.error(error);
    }
  });

  app.get("/", async (req, res, next) => {
    const todos = await User.find({ userId: req.body.userId });
    res.send(todos);
  });

  app.delete("/delete/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const deleteNote = await User.findByIdAndDelete({
      _id: todoId,
      userId: req.body.todoId,
    });
    if (deleteNote) {
      res.send("delted");
    } else {
      res.send("cant delete");
    }
  });

  app.patch("/edit/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const updatedNote = await User.findOneAndUpdate(
      { _id: todoId, userId: req.body.todoId },
      { ...req.body }
    );
    if (updatedNote) {
      res.send("updated");
    } else {
      res.send("unable to update");
    }
  });
};
