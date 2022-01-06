angular
  .module("EcommerceApp")
  .controller("LoginCtrl", [
    "auth",
    "$scope",
    "$window",
    "infor",
    "msgs",
    LoginController,
  ]);

function LoginController(auth, $scope, $window, infor, msgs) {
  $scope.money = 0;

  $scope.showModal = false;

  $scope.haveUser = auth.getUser() ? auth.getUser().sessionInitialized : null;

  const onInit = function () {
    if ($scope.haveUser) {
      getUser();
    }
  };

  function formatReal(int) {
    return int.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  }

  const getUser = function () {
    infor
      .getInfo("profile")
      .then(function (resp) {
        const info = resp.data;
        $scope.money = formatReal(info.balance);
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.quit = function () {
    auth.logout(() => ($window.location.href = "#!/login"));
  };

  $scope.toggleModal = function () {
    $scope.showModal = !$scope.showModal;
  };

  onInit();
}
