import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import JWT_SECRET from "./config/configure.js"
import { userMiddleware } from "./middleware/user_middleware.js";
import cors from "cors";
import bcrypt from "bcrypt";
import user from "./models/usermodel.js"
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://chetan01:gd0YIxXXu8aHXJ5p@chetan01.9ncgjlm.mongodb.net/todo-app").then(() => {
    console.log("Connected Successfully")
}).catch((err) => {
    console.log("Something Wrong", err)
});

const app = express();
app.use(express.json());
app.use(cors());

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

        if (!JWT_SECRET) {
            throw new Error("Value not available");
        }
        const token = jwt.sign({ userID: User._id }, JWT_SECRET, {
            expiresIn: '1h'
        });

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

// // Route 3: Add Content
// app.post("/api/v1/content", userMiddleware, async (req, res) => {
//     const { link, type, title } = req.body;
//     // Create a new content entry linked to the logged-in user.
//     await ContentModel.create({
//         link,
//         type,
//         title,
//         userId: req.userId, // userId is added by the middleware.
//         tags: [] // Initialize tags as an empty array.
//     });

//     res.json({ message: "Content added" }); // Send success response.
// });

// // Route 4: Get User Content
// app.get("/api/v1/content", userMiddleware, async (req, res) => {
//     //@ts-ignore
//     const userId = req.userId;  // User ID is fetched from middleware
//     // Fetch all content associated with the user ID and populate username
//     // The `populate` function is used to include additional details from the referenced `userId`.
//     // For example, it will fetch the username linked to the userId.
//     // Since we specified "username", only the username will be included in the result, 
//     // and other details like password won’t be fetched.
//     const content = await ContentModel.find({ userId: userId }).populate("userId", "username");
//     res.json(content);  // Send the content as response
// });

// // Route 5: Delete User Content
// app.delete("/api/v1/content", userMiddleware, async (req, res) => {
//     const contentId = req.body.contentId;

//     // Delete content based on contentId and userId.
//     await ContentModel.deleteMany({ contentId, userId: req.userId });
//     res.json({ message: "Deleted" }); // Send success response.
// });

// // Route 6: Share Content Link
// app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
//     const { share } = req.body;
//     if (share) {
//         // Check if a link already exists for the user.
//         const existingLink = await LinkModel.findOne({ userId: req.userId });
//         if (existingLink) {
//             res.json({ hash: existingLink.hash }); // Send existing hash if found.
//             return;
//         }

//         // Generate a new hash for the shareable link.
//         const hash = random(10);
//         await LinkModel.create({ userId: req.userId, hash });
//         res.json({ hash }); // Send new hash in the response.
//     } else {
//         // Remove the shareable link if share is false.
//         await LinkModel.deleteOne({ userId: req.userId });
//         res.json({ message: "Removed link" }); // Send success response.
//     }
// });

// // Route 7: Get Shared Content
// app.get("/api/v1/brain/:shareLink", async (req, res) => {
//     const hash = req.params.shareLink;

//     // Find the link using the provided hash.
//     const link = await LinkModel.findOne({ hash });
//     if (!link) {
//         res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
//         return;
//     }

//     // Fetch content and user details for the shareable link.
//     const content = await ContentModel.find({ userId: link.userId });
//     const user = await UserModel.findOne({ _id: link.userId });

//     if (!user) {
//         res.status(404).json({ message: "User not found" }); // Handle missing user case.
//         return;
//     }

//     res.json({
//         username: user.username,
//         content
//     }); // Send user and content details in response.
// });

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

