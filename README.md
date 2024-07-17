# Express CRUD using file  read write
# Express CRUD modularization of functions and Middleware {builtin, custom}
#MongoDB Create Account - 
 cluster 
 -Database {collection of collections / Schemas}
 -Collection {Collection of Documents}
Documents-MongoDB documents do not require a predefined schema. Each document can have a different structure, which allows for storing varied and evolving data.


Install Mongo Compass Practise into mongosh shell integrated into Mongo Compass
https://youtu.be/QPFlGswpyJY?si=0B3KzO22nyTC0e6-

# Mongoose-
   Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a higher-level abstraction over MongoDB's native driver, making it easier to work with MongoDB databases in Node.js applications. Mongoose provides features such as schema definitions, validation, middleware, and model methods, which help in building robust and maintainable applications.

/////This is practice session , hence structure is organised

project-root/
├── src/
│   ├── config/ Contains configuration settings and environment variables.
│   │   └── config.js
│   ├── controllers/ Contains the controller logic for handling requests.
│   │   └── userController.js
│   ├── models/ Defines data models and interacts with the database
│   │   └── userModel.js
│   ├── routes/ Defines API endpoints and routes.
│   │   └── userRoutes.js
│   ├── middlewares/ Holds middleware functions for request processing.
│   │   └── authMiddleware.js
│   ├── services/ Contains business logic may be reused across controllers
│   │   └── userService.js
│   ├── utils/ Utility functions and helpers.
│   │   └── helper.js
│   ├── validations/ Request validation logic.
│   │   └── userValidation.js
│   ├── app.js | Express application setup and middleware registration.
│   └── server.js | Entry point to start the server.
├── tests/
│   ├── unit/ Unit tests for individual components or functions
│   │   └── userController.test.js
│   ├── integration/ Integration tests for testing the application flow.
│   │   └── userRoutes.test.js
├── .env | Environment variables.
├── .gitignore | Files and directories to be ignored by Git.
├── package.json | Metadata about the project and its dependencies.
└── README.md | Project documentation.

