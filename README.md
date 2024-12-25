# DriveCraft

**DriveCraft** is a dynamic web application designed for managing a driving school office. This project is built with the latest technologies and follows modern software architecture. It provides an intuitive and user-friendly interface for managing driving school operations, including scheduling, student tracking, and staff management.

## Key Features

- **Frontend**: Built with **Angular 17** for a responsive and scalable user interface.
- **Backend**: Uses **Express.js** for handling server-side logic and **MariaDB** for database management.
- **Authentication**: Secure login system with support for user roles (admin, instructor, student).
- **Real-time Data**: Utilizes web sockets for real-time updates on schedules and student progress.
- **Responsive Design**: Fully responsive layout using **Bootstrap** to ensure the app works seamlessly across devices.

## Technologies Used

- **Frontend**: Angular 17, Bootstrap
- **Backend**: Express.js, Node.js
- **Database**: MariaDB (with **XAMPP** for local server management)
- **Authentication**: Custom JWT-based authentication

## Project Setup

To get started with the project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or later)
- [MariaDB](https://mariadb.org/) (for the backend database)
- [XAMPP](https://www.apachefriends.org/index.html) (for local server management)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/emouna1/DriveCraft.git
   cd DriveCraft
   ```

2. **Install dependencies**:
   - For frontend (Angular):
     ```bash
     cd frontend
     npm install
     ```

   - For backend (Express.js):
     ```bash
     cd backend
     npm install
     ```

3. **Set up the database**:
   - Create a **MariaDB** database and configure the connection in the backend (`config/db.js`).
   - Import the provided SQL schema (found in `backend/db_schema.sql`) to set up the database.

4. **Run the app**:
   - Start the backend server:
     ```bash
     npm run dev
     ```

   - Start the frontend application:
     ```bash
     cd frontend
     ng serve
     ```

   Visit [http://localhost:4200](http://localhost:4200) in your browser.

## Development

- To generate a new component or service, use Angular CLI:
  ```bash
  ng generate component component-name
  ng generate service service-name
  ```

- To build the project for production:
  ```bash
  ng build --prod
  ```

- To run unit tests (using Karma):
  ```bash
  ng test
  ```

## Additional Information

- **DriveCraft** was developed as a part of a comprehensive web development project for a driving school system. The goal was to build an efficient, scalable solution to help schools manage their operations and provide a better experience for both instructors and students.

- The project is continuously updated with new features and improvements. Contributions are welcome!

## Live Demo

You can explore the live demo of DriveCraft [here](https://drive-craft.vercel.app/).
