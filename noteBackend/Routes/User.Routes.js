import { User } from "../models/UserModel.js";

export const UserRoutes = (app) => {
   app.post("/api/users", async (req, res) => {
      try {
        const { user } = req.body;
        console.log("Received user:", user);
    
        if (!user) {
          throw { code: 400, message: "Field is required" };
        }
    
        const todo = new User({ user });
        await todo.save();
        res.status(201).json({ message: "User created successfully" });
      } catch (error) {
        console.error(error);
        res.status(error.code || 500).json({ error: error.message || "Internal Server Error" });
      }
    });
    

  app.get("/api/getUser", async (req, res, next) => {
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
      res.send("Note deleted successfully");
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
