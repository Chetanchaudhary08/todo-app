# Todo App

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing your daily tasks and to-do lists.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)

## Features

- **User Authentication:** Secure sign-up and login functionality.
- **Task Management:** Create, read, update, and delete (CRUD) todos.
- **Task Prioritization:** Assign priorities (low, medium, high) to your tasks.
- **Responsive Design:** A clean, modern UI that works on both desktop and mobile devices.

## Technologies Used

### Frontend
- **React:** A JavaScript library for building user interfaces.
- **Vite:** A build tool that provides a fast development environment.
- **Tailwind CSS:** A utility-first CSS framework for styling.
- **React Router DOM:** For client-side routing.
- **Axios:** For making API requests.

### Backend
- **Node.js:** A JavaScript runtime environment.
- **Express.js:** A web application framework for Node.js.
- **MongoDB:** A NoSQL database for storing user data and todos.
- **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js.
- **bcrypt:** For hashing passwords.
- **JSON Web Token (JWT):** For secure user authentication.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/Chetanchaudhary08/todo-app.git](https://github.com/Chetanchaudhary08/todo-app.git)
    cd todo-app
    ```

2.  **Set up the Backend:**
    Navigate to the `backend` folder, install dependencies, and create a `.env` file.
    ```sh
    cd backend
    npm install
    ```
    Create a `.env` file with your MongoDB URL and a JWT secret key:
    ```env
    dburl=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Start the backend server:
    ```sh
    npm start
    ```

3.  **Set up the Frontend:**
    Open a new terminal, navigate to the `todo-frontend` folder, and install dependencies.
    ```sh
    cd ../todo-frontend
    npm install
    ```
    Start the frontend development server:
    ```sh
    npm run dev
    ```

## Usage

- **Register a new account** on the sign-up page.
- <img width="1905" height="810" alt="Screenshot 2025-09-03 105931" src="https://github.com/user-attachments/assets/ecdc59b9-f04c-4b5d-a85d-55c1499778d6" />


- **Log in** with your credentials.
- <img width="1896" height="835" alt="Screenshot 2025-09-03 105923" src="https://github.com/user-attachments/assets/26d2feb6-72e5-454d-a9ba-1049caeac680" />


- **Add new todos**, set their priority, and mark them as complete.
- <img width="1907" height="880" alt="Screenshot 2025-09-03 110004" src="https://github.com/user-attachments/assets/8186f51a-5985-4e50-a501-29f29c5b50fc" />
- <img width="1895" height="876" alt="Screenshot 2025-09-03 110013" src="https://github.com/user-attachments/assets/4aa0fe00-1d2a-4fa1-a98a-9859262d0a1f" />

-**delete** existing todos,click on ❌ 
<img width="1383" height="535" alt="Screenshot 2025-09-03 110028" src="https://github.com/user-attachments/assets/7afb86ba-3ec6-40b9-b69a-7d491deebf48" />

