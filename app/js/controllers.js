"use strict";

var app = angular.module("phonebook", ["ngRoute", "phonebook.directives"]);

app.config(["$routeProvider", function ($routeProvider) {
   $routeProvider
      .when("/", {
         controller: "ListCtrl",
         templateUrl: "/views/list.html"
      })

      .when("/edit/:contactId", {
         controller: "EditCtrl",
         templateUrl: "/views/edit.html"
      })

      .when("/view/:contactId", {
         controller: "ViewCtrl",
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


app.controller("ListCtrl", function ($scope, $http) {
   $http.get("contacts")
      .success(function (data, status, headers, config) {
         $scope.contacts = data;
      })
       .error(function (data, status, headers, config) {
         // called asynchronously if an error occurs or server returns response with an error status.
      });

   $("#menu-list").addClass("active");
   $("#menu-new").removeClass("active");
});


app.controller("ViewCtrl", function ($scope, $location, $http, $routeParams) {
   $http.get("contacts/" + $routeParams.contactId)
      .success(function (data, status, headers, config) {
         $scope.contact = data;
      })
      .error(function (data, status, headers, config) {
         // called asynchronously if an error occurs or server returns response with an error status.
      });

   $scope.edit = function () {
      $location.path("/edit/" + $scope.contact._id);
   };

   $("#menu-list").removeClass("active");
   $("#menu-new").removeClass("active");
});


app.controller("EditCtrl", function ($scope, $location, $http, $routeParams) {
   $http.get("contacts/" + $routeParams.contactId)
      .success(function (data, status, headers, config) {
         $scope.contact = data;
      })
      .error(function (data, status, headers, config) {
         // called asynchronously if an error occurs or server returns response with an error status.
      });

   $scope.save = function () {
      $http.post("contacts/" + $scope.contact._id, $scope.contact)
         .success(function (data, status, headers, config) {
            $scope.contact = data;
            $location.path("/view/" + $scope.contact._id);
         })
         .error(function (data, status, headers, config) {
            // called asynchronously if an error occurs or server returns response with an error status.
         });
   };

   $scope.remove = function () {
      $http.delete("contacts/" + $scope.contact._id)
         .success(function (data, status, headers, config) {
            $scope.contact = data;
            $location.path("/");
         })
         .error(function (data, status, headers, config) {
            // called asynchronously if an error occurs or server returns response with an error status.
         });

//       Contact.delete(contact._id); // Should also be able to do it this way if Contact is injected
      $location.path("/");
   };

   $("#menu-list").addClass("active");
   $("#menu-new").removeClass("active");
});


app.controller("NewCtrl", function ($scope, $location, $http) {
   $scope.contact = {};

   $scope.save = function () {
      $http.post("contacts/", $scope.contact)
         .success(function (data, status, headers, config) {
            $scope.contact = data;
            $location.path("/view/" + $scope.contact._id);
         })
         .error(function (data, status, headers, config) {
             // called asynchronously if an error occurs or server returns response with an error status.
         });
   };

   $("#menu-list").removeClass("active");
   $("#menu-new").addClass("active");
});
