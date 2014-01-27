"use strict";

var app = angular.module("phonebook", ["ngRoute", "phonebook.directives", "phonebook.services"]);

app.config(["$routeProvider", function ($routeProvider) {
   $routeProvider
      .when("/", {
         controller: "ListCtrl",
         resolve: {
            // The controller sets $scope to the value of contacts
            contacts: ["MultiContactLoader", function (MultiContactLoader) {
               return new MultiContactLoader();
            }]
         },
         templateUrl: "/views/list.html"
      })

      .when("/edit/:contactId", {
         controller: "EditCtrl",
         resolve: {
            contact: ["ContactLoader", function (ContactLoader) {
               return ContactLoader();
            }]
         },
         templateUrl: "/views/edit.html"
      })

      .when("/view/:contactId", {
         controller: "ViewCtrl",
         resolve: {
            contact: ["ContactLoader", function (ContactLoader) {
               return ContactLoader();
            }]
         },
         templateUrl: "/views/view.html"
      })

      .when("/new", {
         controller: "NewCtrl",
         templateUrl: "/views/edit.html"
      })

      .otherwise({
         redirectTo: "/"
      });
}]);


app.controller("ListCtrl", ["$scope", "contacts",
   function ($scope, contacts) {
      $scope.contacts = contacts;

      $("#menu-list").addClass("active");
      $("#menu-new").removeClass("active");
   }]);


app.controller("ViewCtrl", ["$scope", "$location", "contact",
   function ($scope, $location, contact) {
      $scope.contact = contact;

      $scope.edit = function () {
         $location.path("/edit/" + contact._id);
      };

      $("#menu-list").removeClass("active");
      $("#menu-new").removeClass("active");
   }]);


app.controller("EditCtrl", ["$scope", "$location", "contact",
   function ($scope, $location, contact) {
      $scope.contact = contact;

      $scope.save = function () {
         $scope.contact.$save(function (contact) {
            $location.path("/view/" + contact._id);
         });
      };

      $scope.remove = function () {
         $scope.contact.$remove(function () {
            $location.path("/");
         });

//       Contact.delete(contact._id); // Should also be able to do it this way if Contact is injected
         $location.path("/");
      };

      $("#menu-list").addClass("active");
      $("#menu-new").removeClass("active");
   }]);


app.controller("NewCtrl", ["$scope", "$location", "Contact",
   function ($scope, $location, Contact) {

      $scope.contact = new Contact();

      $scope.save = function () {
         $scope.contact.$save(function (contact) {
            $location.path("/view/" + contact._id);
         });
      };

      $("#menu-list").removeClass("active");
      $("#menu-new").addClass("active");
   }]);
