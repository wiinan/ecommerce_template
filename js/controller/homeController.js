angular
  .module("EcommerceApp")
  .controller("HomeCtrl", ["$scope", "$http", "consts", StoreController]);
function StoreController($scope, $http, consts) {
  $scope.allProducts = {};
  $http({ method: "GET", url: `${consts.apiUrl}/product` }).then(
    function sucess(res) {
      let allProducts = res.data;
      $scope.allProducts = allProducts;
    }
  ),
    function handleError(err) {
      console.log(err);
    };
}
