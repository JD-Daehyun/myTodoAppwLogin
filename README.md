# PERN Todo App with JWT Authorization and Local Storage

## Overview
This project is a Full Stack PERN (Postgres, Express, React, Node) application that combines two separate projects into a fully functional Todo App with user authentication and authorization.

### Key Technologies
- **PostgreSQL**: Relational database used to store user and task data.
- **Express**: Backend framework used to build the server and API endpoints.
- **React**: Frontend library used to create the user interface.
- **Node.js**: JavaScript runtime used to build the server and handle backend logic.

### Project Breakdown
1. **Todo App**: A basic application that allows users to create, edit, delete, and view tasks.
2. **Login Page with JWT**: A secure login system that uses JSON Web Tokens (JWT) for authorization.

These two projects were then combined to create a comprehensive Full Stack application. Users can register with their email, password, and name, then log in to access a dashboard where they can manage their todos. Each user's todos are private, meaning other users cannot view them.

### Additional Features
- **Bootstrap**: Used to enhance the user interface and provide responsive design elements.
- **React Toastify**: Integrated for providing user-friendly notifications (toast messages).
- **W3Schools Resources**: Utilized for implementing modals and tables.
- **Postman**: Employed for testing API endpoints and ensuring proper request/response handling.

## What I Learned
1. **Backend Setup**: Properly configured the backend, including the server and database integration.
2. **Relational Database Management**: Created and connected multiple tables using a relational database schema.
3. **Database Schema Design**: Developed a simple yet effective database schema to manage user and todo data.
4. **Security Measures**: Implemented password hashing and salting to enhance user security.
   ![Data Schema](../todo%20and%20user%20data%20schema.jpg)
5. **API Testing**: Used Postman and browser console to test API requests and responses effectively.

## Areas for Improvement
1. **Secure Token Storage**: In a production environment, storing authorization tokens in local storage is not recommended due to potential Cross-Site Scripting (XSS) attacks. A better approach is to use session IDs and cookies, or store JWTs in cookies.
2. **State Management**: For larger applications, incorporating Redux or another state management library is advisable to ensure consistency across components and manage complex state logic efficiently.

## Conclusion
This project provided a great opportunity to explore and integrate various aspects of frontend and backend development within a Full Stack application. It served as a comprehensive exercise in building a secure, user-friendly, and functional web application.
