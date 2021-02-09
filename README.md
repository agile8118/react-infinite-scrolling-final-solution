This is the final solution code we wrote in [this](https://youtu.be/JbhCsuWu8cg) video.

This application will show a list of articles with infinite scrolling set up.

## Installing the dependencies

In the root directory run:

> npm run add

## How to run the app

You can start the app by running this command from the root directory:

> npm start

after running it you will be prompted to specify what kind of database you want to use.
You have 3 options, the MongoDB, MySQL or no database at all. So choose one of them.

You also might want to add some data into the database that you want to use. You can either do that
manually or just run the seed.js file by running this command from the root directory:

> npm run seed

Then you will be prompted to choose what database you want the seed data to be saved in.
You have these options: MySQL, MongoDB and no database. If you choose
no database the data will be saved in this file: ./server/database/data.json.
If you want to choose MongoDB, make sure that you have the mongo server running on you machine.
And if you want to use the MySQL database make sure that you have the server running and also
you need to create a new DB called node-paginate (see server/config/dev.js file).

## Front-end logic

The front-end is written in React.js using create-react-app.

To start the react server run:

> npm run start

Also to get a production build run this command from the same directory:

> npm run build

## Other useful commands

Other commands that can be ran from the root directory:

> npm run dev:node

It will start nodejs with nodemon, BEFORE you run this make sure to pass the right
database name in the package.json file for the npm run dev:node command.

> npm run dev

This command will start both the nodejs server and the React server in one terminal tab.
