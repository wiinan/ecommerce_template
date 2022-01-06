angular
  .module("EcommerceApp")
  .factory("infor", [
    "$http",
    "msgs",
    "$window",
    "consts",
    "$rootScope",
    inforFactory,
  ]);

function inforFactory($http, msgs, $window, consts, $rootScope) {
  $rootScope.globShowAddressMenu = false;
  $rootScope.globShowPaymentMenu = false;
  $rootScope.globShowEditPayment = false;

  $rootScope.globPayment = null;
  $rootScope.globAddress = null;

  function getInfo(url) {
    return $http({
      url: `${consts.apiUrl}/${url}`,
      method: "GET",
    });
  }

  function sendInfo(url, infoDatas, callback) {
    $http({
      data: infoDatas,
      url: `${consts.apiUrl}/${url}`,
      method: "POST",
    })
      .then(function (resp) {
        $window.location.href = "#!/cart";
        {
          msgs.addSuccess("Adicionado com Sucesso");
          $rootScope.globShowAddressMenu = false;
          $rootScope.globShowPaymentMenu = false;
        }
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function sendCart(url, callback) {
    $http({
      url: `${consts.apiUrl}/${url}`,
      method: "POST",
    })
      .then(function (resp) {
        msgs.addSuccess("Adicionado com Sucesso");
        $window.location.href = `#!/allorders`;
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function removeInfo(url, ID, callback) {
    const { id } = ID;
    $http({
      url: `${consts.apiUrl}/${url}/${id}`,
      method: "DELETE",
    })
      .then(function (resp) {
        msgs.addSuccess("Removido com sucesso!");
        $window.location.href = url === "payment" ? "#!/cart" : "#!/home";
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function putInfo(url, ID, value, callback) {
    const { id } = ID;
    $http({
      data: value,
      url: `${consts.apiUrl}/${url}/${id}`,
      method: "PUT",
    })
      .then(function (resp) {
        msgs.addSuccess("Editado com Sucesso!");
        $window.location.href = url === "payment" ? `#!/cart` : "#!/home";
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  function redirectLink(url, address, payment) {
    $window.location.href = `#!/${url}`;
    $rootScope.globAddress = address[0];
    $rootScope.globPayment = payment[0];
  }

  return { sendInfo, sendCart, redirectLink, getInfo, putInfo, removeInfo };
}
