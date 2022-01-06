angular
  .module("EcommerceApp")
  .controller("HomeCtrl", ["$scope", "$window", StoreController]);
function StoreController($scope, $window) {
  $scope.location = function (url) {
    $window.location.href = `#!/${url}`;
  };
}
