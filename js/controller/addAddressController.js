angular
  .module("EcommerceApp")
  .controller("addAddressCtrl", [
    "$scope",
    "infor",
    "msgs",
    "$rootScope",
    "$window",
    addAddressController,
  ]);

function addAddressController($scope, infor, msgs, $rootScope, $window) {
  $scope.type_payment = [
    { name: "Metodo de Pagamento", value: "" },
    { name: "Debit", value: "Debit" },
    { name: "Credit", value: "Credit" },
    { name: "Pix", value: "Pix" },
  ];

  $scope.addAddress = {
    fullName: null,
    address: null,
    city: null,
    postal_code: null,
    country: null,
    payment_type: null,
  };

  $scope.addPayment = {
    type: null,
    number: null,
    password: "",
    purchasingPower: "",
  };

  $scope.location = function (url) {
    console.log(url);
    $window.location.href = `#!/${url}`;
  };

  $scope.toggleShowAddress = function () {
    $rootScope.globShowAddressMenu = !$rootScope.globShowAddressMenu;
  };

  $scope.toggleShowPayment = function () {
    $rootScope.globShowPaymentMenu = !$rootScope.globShowPaymentMenu;
  };

  $scope.addAddressClick = function () {
    infor.sendInfo(
      "userinfo",
      {
        fullname: $scope.addAddress.fullName,
        address: $scope.addAddress.address,
        city: $scope.addAddress.city,
        postal_code: $scope.addAddress.postal_code,
        county: $scope.addAddress.country,
        payment_type: $scope.addAddress.payment_type,
      },
      (err) => msgs.addError(err)
    );
  };

  $scope.addPaymentClick = function () {
    infor.sendInfo(
      "payment",
      {
        type: $scope.addPayment.type,
        number: $scope.addPayment.number,
        password: $scope.addPayment.password,
        purchasingPower: $scope.addPayment.purchasingPower,
      },
      (err) => msgs.addError(err)
    );
  };
}
