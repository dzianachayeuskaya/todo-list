# todo-list

## Installation

You can download or clone this project by running this command from your terminal:

> git clone https://github.com/dzianachayeuskaya/todo-list.git

This will create a directory in the name of the project folder.

After downloading the project files and folders, navigate to the project folder:

> cd todo-server

Start TODO server:

> node index

You can use TODO server at http://localhost:3000.
Press CTRL+C to stop the server.

In another terminal tab, go to the folder todo-with-modules:

> cd ../todo-with-modules

And start the local server (for example, using a pre-installed globally installed library serve):

> npm install --global serve

> serve

You should see the application in your browser's address bar at something like http://localhost:52157.

## Features

Features provided by this application:

- creating a to-do list displaying the readiness of each task,
- adding a new task,
- deleting old completed or unfinished task.

The user can also move between to-do lists (navigation at the top of the page).

In the "My To Do" list, the gray button acts as a switch between storages (server and local storage), which allows you to separate lists and store different data, and the tasks from the server storage will be common to all users.
