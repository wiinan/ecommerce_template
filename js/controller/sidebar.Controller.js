angular
  .module("EcommerceApp")
  .controller("sideCtrl", ["$scope", "$http", "consts", StoreController]);
function StoreController($scope, $http, consts) {
  $scope.allSpecs = [];
  $scope.cartInfos = [];
  $scope.addressInfo = [];
  $scope.totalValue = 0;

  const onInit = function () {
    AllSpec();
    AllCartStore();
    AllAddressesInfos();
  };

  const AllSpec = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/spec` }).then(function sucess(
      res
    ) {
      let allSpecs = res.data;
      $scope.allSpecs = allSpecs;
    }),
      function handleError(err) {
        console.log(err);
      };
  };

  const AllCartStore = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/cart` }).then(function sucess(
      res
    ) {
      let cartInfos = res.data;
      let totalPrice = cartInfos.reduce((acc, value) => {
        return (acc += value.price);
      }, 0);
      $scope.cartInfos = cartInfos;
      $scope.totalValue = parseFloat(totalPrice);
      console.log($scope.totalValue);
      console.log($scope.cartInfos);
    }),
      function handleError(err) {
        console.log(err);
      };
  };

  const AllAddressesInfos = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/userinfo` }).then(
      function sucess(res) {
        let addressInfo = res.data;
        $scope.addressInfo = addressInfo;
        console.log($scope.addressInfo);
      }
    ),
      function handleError(err) {
        console.log(err);
      };
  };

  onInit();
}
