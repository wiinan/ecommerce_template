angular
  .module("EcommerceApp")
  .controller("cartCtrl", ["$scope", "car", "msgs", CartController]);
function CartController($scope, car, msgs) {
  $scope.cartDatas = {};

  const onInit = function () {
    cartCars();
  };

  const cartCars = function () {
    car
      .getCar("cart")
      .then(function (res) {
        let cartDatas = res.data;
        $scope.cartDatas = cartDatas;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.removeToCart = function (data) {
    car.removeCar(
      "cart",
      {
        id: data,
      },
      (err) => msgs.addError(err)
    );
  };

  onInit();
}
