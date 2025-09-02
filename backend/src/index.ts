import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import JWT_SECRET from "./config/configure.js"
import { usermiddleware, type AuthRequest } from "./middleware/user_middleware.js";
import cors from "cors";
import bcrypt from "bcrypt";
import user from "./models/usermodel.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import Todo from "./models/todomodel.js";
dotenv.config();

const DB_url = process.env.dburl as string;
mongoose.connect(DB_url).then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log("Something Wrong", err)
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("API is working 🚀");
});

app.post("/api/v1/signup", async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const checkEmail = await user.findOne({
            email: email
        })
        if (checkEmail) {
            res.status(409).json({
                message: "Email already exist"
            })
            return;
        }

        const hashPassword = await bcrypt.hash(password, 5);

        const newUser = new user({
            username: username,
            email: email,
            password: hashPassword
        })
        await newUser.save();

        res.status(201).json({
            message: "User successfully created"
        })
        return;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("Something wnet wrong while receving data", err.message);
        } else {
            console.log("Something wnet wrong while receving data", err);
        }
        res.status(500).send({
            message: "Something wnet wrong while receving data"
        })
        return;
    }
})

app.post("/api/v1/signin", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        //checking whether the email exsist or not
        const User = await user.findOne({
            email: email
        })

        if (!User || !User.password) {
            res.status(404).json({ message: "User not found or password is missing" });
            return;
        }

        const isMatch = await bcrypt.compare(password, User.password);

        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("Value not available");
        }
        const token = jwt.sign({ userID: User._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        console.log("Signing with secret:", process.env.JWT_SECRET);

        res.status(200).json({
            message: "user logged in successfully",
            token,
            userID: User._id
        })
        return;
    } catch (err) {
        console.log("something wrong", err);
        res.status(500).json({
            message: "Something went wrong"
        })
        return;
    }
})

app.post("/api/v1/createtodo", usermiddleware, async (req: AuthRequest, res: Response) => {
    try {
        console.log("Request body:", req.body);
        console.log("User from token:", req.user);

        const { title, dueDate, priority, tags } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const todo = new Todo({
            title,
            user: req.user.userID, // check if this is undefined
            dueDate,
            priority,
            tags,
        });

        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ message: "Error creating todo", error });
    }
});

app.get("/api/v1/get-todos", usermiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const todos = await Todo.find({ user: req.user!.userID });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
});

// Update a todo
app.put("/api/v1/update-todo/:id", usermiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const { title, priority, tags, completed } = req.body;

        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user!.userID }, // ensure only owner can update
            { title, priority, tags, completed },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ message: "Error updating todo" });
    }
});

// Delete a todo
app.delete("/api/v1/delete-todo/:id", usermiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user!.userID, // ensure only owner can delete
        });

        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found or not authorized" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ message: "Error deleting todo" });
    }
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

