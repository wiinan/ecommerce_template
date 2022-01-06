const app = angular
  .module("EcommerceApp")
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("store", {
      url: "/store",
      templateUrl: "../../views/store.template.html",
      controller: "storeCtrl",
    });
    $stateProvider.state("car", {
      url: "/car",
      templateUrl: "../../views/add-car-page.template.html",
      controller: "AddCtrl",
    });
    $stateProvider.state("cart", {
      url: "/cart",
      templateUrl: "../../views/cart-page.template.html",
      controller: "cartCtrl",
    });
    $stateProvider.state("announcement", {
      url: "/my-announcement",
      templateUrl: "../../views/announcement-page.template.html",
      controller: "AnnouncementCtrl",
    });
    $stateProvider.state("allorders", {
      url: "/allorders",
      templateUrl: "../../views/all-orders.template.html",
      controller: "orderCtrl",
    });
    // $stateProvider.state("adm", {
    //   url: "/dashboard-adm",
    //   templateUrl:
    //     "../../views/dashboard/contentDashboard/admDashboard.template.html",
    // });
  });
