angular
  .module("EcommerceApp")
  .constant("consts", {
    appName: "EcommerceApp",
    version: "1.0",
    owner: "wiinan",
    year: "2021",
    apiUrl: "http://localhost:3000/api",
    userKey: "_ecommerce_app_user",
  })
  .run([
    "$rootScope",
    "consts",
    function ($rootScope, consts) {
      $rootScope.consts = consts;
    },
  ]);
