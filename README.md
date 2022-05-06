# Task-Manger
Project Setup

In order to spin up the project, in the root create .env with these two variable, with your own values.
JWT_SECRET && MONGO_DB

Set up
npm install && npm start 

Database Connection
1. Import connect
2. Invoke in index.js

Routers
1. index.js 
2. auth.js 
3. edit.js
4. home.js
5. trash.js

Register User
1. Validate - name, email, password - with MongoDB
2. Hash Password (by bcrypy)
3. Save user
4. Generate Token (by JWT)
5. Send Token to Session

Login User
1. Get session from token
2. Validate - email, password - in Controller
3. If email or password is missing, throw BadRequest
4. Find User by email
5. Compare password
6. If no user or password does not match, throw UnauthenticatedError
7. If correct, send token to session 

Task 
1. Validate - name, time, date
2. Get all task, edit, delete, create

Security
1. helmet
2. cors