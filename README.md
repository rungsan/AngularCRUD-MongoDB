Angular-CRUD
=================

A learning example with AngularJS, NodeJS and MongoDB. It demonstrates CRUD operations
on a simple data model of lastname, firstname. No rocket science here!

# Files

### server.js
A [NodeJS](http://nodejs.org/)/[ExpressJS](http://expressjs.com/) REST Web Service
that accesses a [MongoDB](http://www.mongodb.org/) database for persistence.

## \app
Folder structure containing the client side of the application. This contains the HTML, CSS and JavaScript the runs on
the client browser.

### \app\index.html
The root of the client side application.

### \app\js
AngularJS Controller, Directives and Services.

### \app\lib
AngularJS, Bootstrap and Jquery libraries.

### \app\views
HTML templates injected into index.html for viewing a list of documents, details of a document and editing.

## Running MongoDB and NodeJS
The following will be dependent on the location on your system of MongoDB & Node programs
as well as the Mongo database and server.js.

These are my paths. :)

### Start the database server
````
\mongo\mongod --dbpath=\data
````

### Start the Web Service from the folder containing server.js.
````
node server.js
````
