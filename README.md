## Chat application in React with RESTful Services

### To Run Application follow the steps

1. `npm install`
2. `node server.js`
3. Navigate to `http://localhost:4000` to access web application

### Application Functionalities

- It requires a login (no password, but username "dog" is not allowed)
- It has RESTful services and makes async calls to perform:
  - Login
  - Logout
  - getting the list of messages and the list of logged in users
  - sending a new message
- The RESTful services will send and receive JSON-formatted data
  - it uses a cookie to store a uid or sid (holding a uuid) to track if a user is logged in
  - it checks the cookie on every service call
- The polling service is called every 5 seconds to update message and user list
- The webpage notifies if a user is already logged in on page refresh
- It supports multiple users (using different browsers/machines/profiles) chatting simultaneously
