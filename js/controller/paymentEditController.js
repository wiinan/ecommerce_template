angular
  .module("EcommerceApp")
  .controller("paymentEditCtrl", [
    "$scope",
    "infor",
    "msgs",
    "$rootScope",
    "$routeParams",
    "$window",
    paymentEditController,
  ]);

function paymentEditController(
  $scope,
  infor,
  msgs,
  $rootScope,
  $routeParams,
  $window
) {
  $scope.editPayment = {
    type: null,
    number: "",
    purchasingPower: "",
  };

  $scope.toggleShowEditPayment = function () {
    $rootScope.globShowEditPayment = !$rootScope.globShowEditPayment;
  };

  const onInit = function () {
    getPayment();
  };

  $scope.location = function (url) {
    $window.location.href = `#!/${url}`;
  };

  const getPayment = function () {
    infor
      .getInfo(`payment?id=${$routeParams.payID}`)
      .then(function (res) {
        const payment = res.data;

        $scope.editPayment.number = payment[0].number;
        $scope.editPayment.type = payment[0].type;
        $scope.editPayment.obj = payment[0];
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.editPaymentClick = function (data) {
    infor.putInfo(
      "payment",
      {
        id: data,
      },
      {
        number: $scope.editPayment.number,
        type: $scope.editPayment.type,
        purchasingPower: $scope.editPayment.purchasingPower,
      },
      (err) => msgs.addError(err)
    );
  };

  $scope.deletePaymentClick = function (data) {
    infor.removeInfo(
      "payment",
      {
        id: data,
      },
      (err) => msgs.addError(err)
    );
  };

  onInit();
}
