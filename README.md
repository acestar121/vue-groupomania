Openclassroom Project 7 Groupomania: Create a corporate social network

Frontend: CLI View - npm install - npm run serve

Backend: Nodejs - Database: MySQL Workbench - npm install
-npm start

connection to the database with your credentials:
create a config.json file from the model.config.json template and put your own identifiers - DB_HOST="" - DB_USER="" - DB_PASSWORD= "" - DB_NAME="" - DB_dialect=""
and for the administrator account: - ADMIN_PSEUDO = "" - ADMIN_EMAIL = "" - ADMIN_PASSWORD = ""

Functional specifications:

- login page: allows the user to log in or create an account if they do not already have one. Creating the account will require a minimum of information, and the connection will be made using email and password only.
- login functionality: the user must have the ability to log out, the user's session persists while logged in, and the login data must be secure.
- home page: must list the posts created by different users, from the most recent to the oldest.
- creation of a post: a user must be able to create a post, which contains text and an image. He must also be able to modify and delete his posts.
- like system: a user must be able to like a post, only once per post.
- administrator role: to be able to carry out moderation, an "administrator" user will be created, who will have the rights to modify/delete all posts on the social network.

Graphic identity :

- font: Lato,
- colors:
  primary: #FD2D01,
  secondary: #FFD7D7,
  tertiary: #4E5166.
