angular
  .module("EcommerceApp")
  .controller("orderCtrl", [
    "$scope",
    "$rootScope",
    "infor",
    "msgs",
    "$window",
    OrderController,
  ]);

function OrderController($scope, $rootScope, infor, msgs, $window) {
  $scope.allValues = {
    userInfo: null,
    cartInfo: null,
    ordersInfo: null,
    paymentInfo: null,
    profileInfo: null,
    totalOrderPrice: null,
    totalPrice: null,
  };

  const OnInit = function () {
    getAddress();
    getCart();
    getOrders();
    getUser();
    getPayment();
  };

  const formatReal = (int) => {
    return int.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  };

  $scope.toggleShowPayment = function () {
    $rootScope.globShowPaymentMenu = !$rootScope.globShowPaymentMenu;
  };

  const getAddress = function () {
    infor
      .getInfo("userinfo")
      .then(function (resp) {
        const allAddressOrder = resp.data;
        const id = $rootScope.globAddress;

        const addressOrder = allAddressOrder.find((address) => {
          return address.id == id;
        });

        $scope.allValues.userInfo = addressOrder;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getPayment = function () {
    infor
      .getInfo("payment")
      .then(function (resp) {
        const paymentInfo = resp.data;

        const id = $rootScope.globPayment;

        const paymentType = paymentInfo.find((payment) => {
          return payment.id == id;
        });

        $scope.allValues.paymentInfo = paymentType;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getCart = function () {
    infor
      .getInfo("cart")
      .then(function (resp) {
        const allCartOrder = resp.data;

        let totalPrice = allCartOrder.reduce((acc, value) => {
          return (acc += parseFloat(value.price));
        }, 0);

        $scope.allValues.totalOrderPrice = formatReal(parseInt(totalPrice));
        $scope.allValues.totalPrice = totalPrice;
        $scope.allValues.cartInfo = allCartOrder;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getOrders = function () {
    infor
      .getInfo("order")
      .then(function (resp) {
        const allOrder = resp.data;
        $scope.allValues.ordersInfo = allOrder;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  const getUser = function () {
    infor
      .getInfo("profile")
      .then(function (resp) {
        const profileInfo = resp.data;
        $scope.allValues.profileInfo = profileInfo;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  $scope.ConfirmOrder = function () {
    $scope.poketError = false;
    const totalValue = parseInt($scope.allValues.totalPrice);
    const balancePoket = parseInt($scope.allValues.profileInfo.balance);
    const haveCart = $scope.allValues.cartInfo;

    if (!haveCart.length) {
      $window.location.href = "#!/cart";
      return;
    }

    if (totalValue > balancePoket) {
      $scope.poketError = true;
      return;
    }

    $scope.poketError = false;
    $rootScope.globShowPaymentMenu = false;

    infor.sendInfo(
      "order",
      {
        is_paid: true,
        userinfos_id: parseInt($scope.allValues.userInfo.id),
        payment_id: parseInt($scope.allValues.paymentInfo.id),
      },
      (err) => msgs.addError(err)
    );
  };

  OnInit();
}
