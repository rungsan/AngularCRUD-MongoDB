AngularCRUD
===========

A learning example with AngularJS, NodeJS and MongoDB. It demonstrates CRUD operations on a simple
data model of lastname, firstname. No actual rocket scientists were injured in the creation of this
sample application.

# Folders and files in the application
The following is a quick tour of the folders and files that comprise the application. Not every folder and file
is listed here, just the highlights.

### server.js
A [NodeJS](http://nodejs.org/)/[ExpressJS](http://expressjs.com/) REST Web Service
that accesses a [MongoDB](http://www.mongodb.org/) database for persistence.

## \app
Folder structure containing the client side of the application. This contains the HTML, CSS and JavaScript the runs on
the client browser.

### \app\index.html
The root of the client side application.

### \app\js
AngularJS Controller and Directives.

### \app\lib
Third party libraries used including AngularJS, Bootstrap and Jquery libraries.

### \app\views
HTML templates injected into index.html for viewing a list of documents, details of a document and editing.

## Server side data storage and web services
This application uses server side data storage and web service end points. The data storage is implemented in
[MongoDB](http://mongodb.org) with the RESTful web service via [NodeJS](http://nodejs.org)

The following will be dependent on the location on your system of MongoDB & Node programs
as well as the Mongo database and server.js application.

These are my paths. :)

## Running MongoDB
Install MongoDB (unzip the application) and create a data folder (or use the default location). For this example I
created a folder (\mongo) for the MongoDB binaries at the root of the file system. I also created a data folder
(\mongodata) at the root of the filesystem.

### Start the database server
````
\mongo\mongod --dbpath=\mongodata
````

## Running NodeJS
Download and run the installer for your operating system.

### Start the Web Service from the folder containing server.js.
````
node server.js
````
