Angular-CRUD TODO
=================

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
