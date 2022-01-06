angular
  .module("EcommerceApp")
  .controller("perfilCtrl", [
    "infor",
    "$scope",
    "msgs",
    "$rootScope",
    PerfilController,
  ]);

function PerfilController(infor, $scope, msgs, $rootScope) {
  $scope.cartDatas = {};
  $scope.announcement = {};
  $scope.profile = {};

  $scope.toggleShowPayment = function () {
    $rootScope.globShowPaymentMenu = !$rootScope.globShowPaymentMenu;
  };

  const OnInit = function () {
    GetCartCars();
    getAnnouncementeCar();
    getProfile();
  };

  function formatReal(int) {
    return int.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  }

  const GetCartCars = function () {
    infor
      .getInfo("cart")
      .then(function (res) {
        const cartDatas = res.data;
        $scope.cartDatas = cartDatas;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getAnnouncementeCar = function () {
    infor
      .getInfo("my-announcement")
      .then(function (res) {
        const announcement = res.data;
        $scope.announcement = announcement;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getProfile = function () {
    infor
      .getInfo("profile")
      .then(function (res) {
        const profile = res.data;
        $scope.profile = profile;
        $scope.money = formatReal(parseInt(profile.balance));
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  OnInit();
}
