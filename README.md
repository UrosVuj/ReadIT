# ReadIT
ReadIT - Book catalogue social web app

Check it out at  https://app-readit.herokuapp.com/  ( Dyno might be sleeping at times :) )

## Features
* Guest access and user registration
* Database consisting of numerous books and their detailed information

  * Each book has its ***comment section*** and ***reviews***
  * Progress bars for books the user has marked as *'currently reading'*
  * Users can freely add books through an intuitive UI. Those books are to be approved/rejected by the *moderator* team
* Users have ***wishlists/reading lists/lists of finished books*** with ***graphed representations*** of genres they enjoy

* ***Book discussion rooms*** with set time and date when they begin
  * **Live chat** between users in the same room
  * Users can add people to their private rooms while moderators create public events
  

## Development server

Run `ng serve` in the **frontend** directory to start that part of the app.

Run `node app.js` in the **backend** directory to start the backend part.

Run `mongorestore` from the Mongo shell with the provided DB dump.

Navigate to `http://localhost:4200/` and enjoy :)

