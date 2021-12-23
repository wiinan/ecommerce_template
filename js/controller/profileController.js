angular
  .module("EcommerceApp")
  .controller("perfilCtrl", [
    "auth",
    "$scope",
    "$window",
    "$http",
    "consts",
    PerfilController,
  ]);

function PerfilController(auth, $scope, $window, $http, consts) {
  $scope.cartDatas = {};
  $scope.announcement = {};

  const OnInit = function () {
    GetCartCars();
    getAnnouncementeCar();
  };

  const GetCartCars = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/cart` }).then(
      function success(res) {
        let cartDatas = res.data;
        $scope.cartDatas = cartDatas;
      }
    ),
      function handleError(err) {
        console.log(err);
      };
  };

  const getAnnouncementeCar = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/my-announcement` }).then(
      function success(res) {
        let announcement = res.data;
        $scope.announcement = announcement;
      }
    ),
      function handleError(err) {
        console.log(err);
      };
  };

  OnInit();
}
