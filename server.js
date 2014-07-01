
/*
 * Database is contacts
 * Collections are "people" and someday "log"
 *
 * URL's are
 *   get    /contacts
 *   get    /contacts/:id
 *   post   /contacts
 *   post   /contacts/:id
 *   delete /contacts/:id
 *   post   /flintstones
 */
var express = require("express"),
   app = express(),
   MongoClient = require("mongodb").MongoClient,
   Server = require("mongodb").Server,
   ObjectID = require("mongodb").ObjectID;      // Used to create Mongo ObjectID's from string representations of _id

app.configure(function () {
   app.use(express.methodOverride());           // Allows use of "put" & "del" methods?
   app.use(express.bodyParser());               // This clears out rec.body?
   app.use(express.static(__dirname + '/app')); // Serve static files from the "app" subfolder
});

var mongoclient = new MongoClient(new Server("localhost", 27017));  // Connect to Mongo on the local host, default port
var db = mongoclient.db("contacts");                                // Create a handle to the contacts database


/*
 * Get all contacts
 *
 */
app.get("/contacts", function (req, res) {
   db.collection("people").find().toArray(function (err, docs) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully retrieved all contacts: " + docs.length);
         res.send(docs);
      }
   });
});


/*
 * Get a contact
 *
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
 */
app.post("/contacts", function (req, res) {

   var person = req.body;
   console.log("PUT /contacts, req.body: " + JSON.stringify(person));

   db.collection("people").insert(person, function (err, result) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully inserted: " + JSON.stringify(result[0])); // Note the returned value (result) is an array even if it’s one document

         res.send(result[0]);
      }
   });

});


/*
 * Update a contact.
 *
 */
app.post("/contacts/:id", function (req, res) {
   console.log("Updating a contact");

   var person = req.body;
   person._id = new ObjectID(person._id);   // Convert _id to a mongo ObjectID

   db.collection("people").update({"_id" : person._id}, person, function (err, result) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully updated: " + JSON.stringify(result));

         db.collection("people").findOne({"_id" : person._id}, function (err, doc) {
            if (err) {
               throw err;
            } else {
               console.dir("Successfully retrieved one contact: " + JSON.stringify(doc));
               res.send(doc);
            }
         });
      }
   });

});


/*
 * Delete a contact
 *
 */
app.del("/contacts/:id", function (req, res) {
   console.log("Deleting contact id", req.params.id);

   db.collection("people").remove({"_id" : new ObjectID(req.params.id)}, function (err, removed) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully removed " + removed + " documents!");
         res.send("Contact deleted", 200);
      }
   });
});


/**
 * Reset the database. This deletes all data and loads the sample/test data
 */
app.post("/flintstones", function (req, res) {

   db.collection("people").remove(function (err, removed) {
      if (err) {
         throw err;
      } else {
         // console.dir("Successfully removed " + removed + " documents!");

         db.collection("people").insert(testData, function (err, result) {      // insert takes an object or array of objects
            if (err) {
               throw err;
            } else {
               // console.dir("Successfully inserted: " + JSON.stringify(result.length) + " documents"); // Note the returned value (result) is an array even if it’s one document

               res.send(result);
            }
         });
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



/**
 * This is dummy test data loaded by the /flintstones endpoint.
 *
 * @type {Array}
 */
var testData = [
   {
      "firstname": "Fred",
      "lastname":  "Flintstone",
      "address": {
         "street": "345 Cave Stone Rd",
         "city":   "Bedrock",
         "state":  "NA",
         "zip":    "123"
      },
      "phonenumbers": [
         {
            "type":   "mobile",
            "number": "111"
         },
         {
            "type":   "work",
            "number": "123",
            "extension": "42"
         }
      ],
      "email": [
         {
            "type":    "personal",
            "account": "Fred@Flintstone.com"
         }
      ],
      "birthday":  "1970-01-01",
      "spouse":    "Wilma",
      "children": [
         {
            "sex":  "girl",
            "name": "Pebbles"
         }
      ]
   },

   {
      "firstname":   "Wilma",
      "lastname":    "Flintstone",
      "address": {
         "street": "345 Cave Stone Rd",
         "city":   "Bedrock",
         "state":  "NA",
         "zip":    "123"
      },
      "email": [
         {
            "type":    "personal",
            "account": "Wilma@Flintstone.com"
         }
      ],
      "birthday":  "1970-02-01",
      "spouse":    "Fred",
      "children": [
         {
            "sex":  "girl",
            "name": "Pebbles"
         }
      ]
   },

   {
      "firstname":   "Barney",
      "lastname":    "Rubble",
      "address": {
         "street": "123 Granite Way",
         "city":        "Bedrock",
         "state":       "NA",
         "zip":         "123"
      },
      "phonenumbers": [
         {
            "type":   "work",
            "number": "333"
         }
      ],
      "email": [
         {
            "type":    "personal",
            "account": "Barney@Rubble.com"
         }
      ],
      "birthday":  "1970-03-01",
      "spouse":    "Betty",
      "children": [
         {
            "sex":  "boy",
            "name": "Bam Bam"
         }
      ]
   },

   {
      "firstname":   "Betty",
      "lastname":    "Rubble",
      "address": {
         "street": "123 Granite Way",
         "city":        "Bedrock",
         "state":       "NA",
         "zip":         "123"
      },
      "phonenumbers": [
         {
            "type":   "work",
            "number": "333"
         }
      ],
      "email": [
         {
            "type":    "personal",
            "account": "Betty@Rubble.com"
         }
      ],
      "birthday":  "1970-04-01",
      "spouse":    "Barney",
      "children": [
         {
            "sex":  "boy",
            "name": "Bam Bam"
         }
      ]
   }
];

