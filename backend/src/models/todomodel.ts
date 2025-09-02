import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        dueDate: { type: Date },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
