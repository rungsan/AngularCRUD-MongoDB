
/*
 * Database is contacts
 * Collections are people, log
 * URL's are
 */
var express = require("express"),
   app = express(),
   MongoClient = require("mongodb").MongoClient,
   Server = require("mongodb").Server,
   ObjectID = require("mongodb").ObjectID;

// app.use(express.bodyParser());
app.configure(function () {
   app.use(express.methodOverride());  // Allows use of "put" & "del" methods?
   app.use(express.bodyParser());      // This clears out rec.body?
   app.use(express.static(__dirname + '/app'));
//   app.use(app.router);
});

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db("contacts");


/*
 * Get all contacts
 */
app.get("/contacts", function (req, res) {
   db.collection("people").find().toArray(function (err, docs) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully retrieved all contacts: " + JSON.stringify(docs));
         res.send(docs);
      }
   });
});


/*
 * Get a contact
 */
app.get("/contacts/:id", function (req, res) {
   console.log("Get a contact: " + req.params.id);

   db.collection("people").findOne({"_id" : new ObjectID(req.params.id)}, function (err, doc) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully retrieved one contact: " + JSON.stringify(doc));
         res.send(doc);
      }
   });
});


/*
 * Add a contact.
 *
 * Note: Angular is calling this endpoint when doing a POST for update instead
 * of appending the :id at the end.
 */
app.post("/contacts", function (req, res) {

   var person = req.body;
   console.log("POST /contacts, req.body: " + JSON.stringify(person));

   db.collection("people").insert(person, function (err, result) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully inserted: " + JSON.stringify(result));
         res.send(result);
      }
   });

});


/*
 * Update a contact.
 * Angular seems to call without the :id on an update!?
 */
app.post("/contacts/:id", function (req, res) {
   console.log("Updating a contact");

   db.collection("people").save(req.body, function (err, saved) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully updated: " + JSON.stringify(saved));
         res.send(saved);
      }
   });

});


/*
 * Delete a contact
 */
app.del("/contacts/:id", function (req, res) {
   console.log("Deleting contact id", req.params.id);

   db.collection("people").remove({"_id" : req.params.id}, function (err, removed) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully updated " + removed + " documents!");
         res.send("Contact deleted", 200);
      }
   });
});


/*
 * For any undefined routes, return a 404.
 */
app.get("*", function (req, res) {
   console.log("A GET that wasn't found", req.params);
   res.send("Page Not Found", 404);
});
app.post("*", function (req, res) {
   console.log("A POST that wasn't found", req.params);
   res.send("Page Not Found", 404);
});
app.del("*", function (req, res) {
   console.log("A DELETE that wasn't found", req.params);
   res.send("Page Not Found", 404);
});


/*
 * Fire up the server and start listening!
 */
mongoclient.open(function (err, mongoclient) {
   if (err) { throw err; }

   app.listen(3000, function () {
      console.log("Express server started on port 3000");
   });
});
