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
        templateUrl: "../../views/routes-store-page.template.html",
        title: "Store",
      })
      .when("/store/:carUrl", {
        templateUrl: "../../views/details-page.template.html",
        controller: "DetailCtrl",
        title: "Car Details",
      })
      .when("/storemark/:carMark", {
        templateUrl: "../../views/store-mark.template.html",
        controller: "markCtrl",
        title: "Car Store",
      })
      .when("/edit/:carUrl", {
        templateUrl: "../../views/edit-page.template.html",
        title: "Edit Car",
        controller: "DetailCtrl",
      })
      .when("/order", {
        templateUrl: "../../views/order.template.html",
        title: "Edit Car",
        controller: "orderCtrl",
      })
      .when("/car/:carUUID", {
        templateUrl: "../../views/add-img-page.template.html",
        title: "add Image",
        controller: "AddCtrl",
      })
      .when("/payment/:payID", {
        templateUrl: "../../views/template/editPayment.template.html",
        title: "Add Value",
        controller: "paymentEditCtrl",
      })
      .when("/profile", {
        templateUrl: "../../views/perfil-page.template.html",
        title: "My Profile",
        controller: "perfilCtrl",
      })
      .when("/allorders", {
        templateUrl: "../../views/routes-store-page.template.html",
        title: "All Order",
      })
      .when("/car", {
        templateUrl: "../../views/routes-store-page.template.html",
        title: "Add Car",
      })
      .when("/cart", {
        templateUrl: "../../views/routes-store-page.template.html",
        title: "Cart",
      })
      .when("/my-announcement", {
        templateUrl: "../../views/routes-store-page.template.html",
        title: "Announcement",
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
