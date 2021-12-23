angular
  .module("EcommerceApp")
  .controller("cartCtrl", ["$scope", "$http", "consts", "car", CartController]);
function CartController($scope, $http, consts, car) {
  $scope.cartDatas = {};

  const onInit = function () {
    cartCars();
  };

  const cartCars = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/cart` }).then(
      function success(res) {
        let cartDatas = res.data;
        $scope.cartDatas = cartDatas;
      }
    ),
      function handleError(err) {
        console.log(err);
      };

    $scope.removeToCart = function (data) {
      car.removeUrl(
        "cart",
        {
          id: data,
        },
        (err) => console.log(err)
      );
    };
  };
  
  onInit();
}
