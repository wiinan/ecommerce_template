angular
  .module("EcommerceApp")
  .config(function ($routeProvider, $httpProvider) {
    // $routeProvider.when("/", {
    //   templateUrl: "../../views/homePage/homePage.template.html",
    // });

    $routeProvider
      .when("/home", {
        templateUrl: "../../views/home-page.template.html",
        controller: "HomeCtrl",
        title: "Home",
      })
      .when("/login", {
        templateUrl: "../../views/login.template.html",
        controller: "AuthCtrl",
        title: "Login",
      })
      .when("/signup", {
        templateUrl: "../../views/register.template.html",
        controller: "AuthCtrl",
        title: "Register",
      })
      .when("/store", {
        templateUrl: "../../views/store.template.html",
        controller: "storeCtrl",
        title: "Store",
      });

    $httpProvider.interceptors.push("handleResponseError");
  })
  .run([
    "$rootScope",
    "auth",
    function ($rootScope, auth) {
      $rootScope.$on("$locationChangeStart", function () {
        auth.ValidadeUser();
      });

      auth.ValidadeUser();
    },
  ]);

// Use this method to register work which should be performed when the injector is done loading all modules.
