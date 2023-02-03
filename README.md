# Build LogIn and LogOut Authentication Functionality with NextAuth!

Using the code in this repository you would be able to LogIn and LogOut functionality and authenticate user using NextAuth. 
## Installation Steps

Run following commands in your terminal:

1. ```npm install```
2. ```npm run dev```

* Read [next-auth](https://next-auth.js.org/) for authentication
* To add NextAuth.js to a project create a file called [...nextauth].js in pages/api/auth. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.
* All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
