angular
  .module("EcommerceApp")
  .controller("sideCtrl", [
    "$scope",
    "$rootScope",
    "infor",
    "msgs",
    "$window",
    StoreController,
  ]);
function StoreController($scope, $rootScope, infor, msgs, $window) {
  $scope.allSpecs = [];
  $scope.cartInfos = [];
  $scope.addressInfo = [];
  $scope.methodInfo = [];
  $scope.allDefault = {
    totalValue: 0,
    addressSelected: {},
    paymentMethod: {},
  };

  const onInit = function () {
    AllSpec();
    AllCartStore();
    AllPaymentInfos();
    AllAddressesInfos();
  };

  $scope.sortBy = function (property) {
    $rootScope.$emit("car-sort-by", property);
  };

  // $scope.sortByMark = function (property) {};

  $scope.searchMark = function (value) {
    console.log(value);
    $rootScope.$emit("car-sort-mark", value);
    // $window.location.href = `#!/storemark/${value}`;
  };

  $scope.toggleShowAddress = function () {
    $rootScope.globShowAddressMenu = !$rootScope.globShowAddressMenu;
  };

  $scope.toggleShowPayment = function () {
    $rootScope.globShowPaymentMenu = !$rootScope.globShowPaymentMenu;
  };

  $scope.otherLink = function (id) {
    $window.location.href = `#!/payment/${id}`;
  };

  const AllSpec = function () {
    infor
      .getInfo("spec")
      .then(function (res) {
        const allSpecs = res.data;
        $scope.allSpecs = allSpecs;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  const AllCartStore = function () {
    infor
      .getInfo("cart")
      .then(function (res) {
        const cartInfos = res.data;
        let totalPrice = cartInfos.reduce((acc, value) => {
          return (acc += parseFloat(value.price));
        }, 0);
        $scope.cartInfos = cartInfos;
        $scope.allDefault.totalValue = parseFloat(totalPrice);
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  const AllAddressesInfos = function () {
    infor
      .getInfo("userinfo")
      .then(function (res) {
        const addressInfo = res.data;
        $scope.addressInfo = addressInfo;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  const AllPaymentInfos = function () {
    infor
      .getInfo("payment")
      .then(function (res) {
        const methodInfo = res.data;
        $scope.methodInfo = methodInfo;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.addAddressClick = function (value, otherValue) {
    const address = value;
    const payment = otherValue;
    if (
      !address.length ||
      address.length > 1 ||
      !payment.length ||
      payment.length > 1
    ) {
      msgs.addError("Selecione um metodo de pagamento e endereço!");
      return;
    }

    if (!$scope.cartInfos.length) {
      msgs.addError("Carrinho Vazio!");
      return;
    }

    infor.redirectLink(
      "order",
      $scope.allDefault.addressSelected,
      $scope.allDefault.paymentMethod
    );

    AllPaymentInfos();
    AllAddressesInfos();
  };

  onInit();
}
