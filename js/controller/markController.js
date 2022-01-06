angular
  .module("EcommerceApp")
  .controller("markCtrl", [
    "$scope",
    "car",
    "msgs",
    "$routeParams",
    MarkController,
  ]);
function MarkController($scope, car, msgs, $routeParams) {
  $scope.formStore = {
    id: null,
    link_image: null,
    mark: "",
  };

  $scope.allProducts = [];

  const onInit = function () {
    getMark();
  };

  const getMark = function () {
    car
      .getCar(`product?mark=${$routeParams.carMark}`)
      .then(function (res) {
        const allProducts = res.data;
        $scope.formStore.mark = $routeParams.carMark;
        $scope.allProducts = allProducts;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.addToCart = function (data) {
    car.addCart(
      "cart",
      {
        id: data,
      },
      (err) => msgs.addError(err)
    );
  };

  onInit();
}
