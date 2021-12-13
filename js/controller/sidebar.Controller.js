angular
  .module("EcommerceApp")
  .controller("sideCtrl", ["$scope", "$http", "consts", StoreController]);
function StoreController($scope, $http, consts) {
  $scope.allSpecs = {};
  $http({ method: "GET", url: `${consts.apiUrl}/spec` }).then(function sucess(
    res
  ) {
    let allSpecs = res.data;
    $scope.allSpecs = allSpecs;
    console.log($scope.allSpecs);
  }),
    function handleError(err) {
      console.log(err);
    };
}
