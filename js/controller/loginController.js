angular
  .module("EcommerceApp")
  .controller("LoginCtrl", ["auth", "$scope", "$window", LoginController]);

function LoginController(auth, $scope, $window) {
  $scope.showModal = false;

  $scope.haveUser = auth.getUser() ? auth.getUser().sessionInitialized : null;

  $scope.quit = function () {
    auth.logout(() => ($window.location.href = "#!/login"));
  };

  $scope.toggleModal = function () {
    $scope.showModal = !$scope.showModal;
  };
}
