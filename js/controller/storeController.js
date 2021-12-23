angular
  .module("EcommerceApp")
  .controller("storeCtrl", [
    "$scope",
    "$http",
    "consts",
    "car",
    StoreController,
  ]);
function StoreController($scope, $http, consts, car) {
  $scope.formStore = {
    id: null,
  };

  $scope.allProducts = [];

  $http({ method: "GET", url: `${consts.apiUrl}/product` }).then(
    function sucess(res) {
      let allProducts = res.data;
      $scope.allProducts = allProducts;
    }
  ),
    function handleError(err) {
      console.log(err);
    };

  $scope.addToCart = function (data) {
    car.addCart(
      "cart",
      {
        id: data,
      },
      (err) => console.log(err)
    );
  };
}
