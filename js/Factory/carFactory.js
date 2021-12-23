angular
  .module("EcommerceApp")
  .factory("car", ["$http", "$window", "consts", carFactory]);

function carFactory($http, $window, consts) {
  async function send(url, carDatas, callback) {
    $http({
      data: carDatas,
      url: `${consts.apiUrl}/${url}`,
      method: "POST",
    })
      .then(function (resp) {
        $window.location.href = "#!/store";
        if (callback) callback(resp.data, null);
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  async function addCart(url, UUID, callback) {
    let carUUID = UUID;
    $http({
      url: `${consts.apiUrl}/${url}/${carUUID.id}`,
      method: "POST",
    })
      .then(function (resp) {
        $window.location.href = "#!/store";
        if (callback) callback(resp.data, null);
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  async function removeUrl(url, UUID, callback) {
    let carUUID = UUID;
    $http({
      url: `${consts.apiUrl}/${url}/${carUUID.id}`,
      method: "DELETE",
    })
      .then(function (resp) {
        $window.location.href = `#!/${url}`;
        if (callback) callback(resp.data, null);
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  async function putCar(url, UUID, value, callback) {
    let carUUID = UUID;
    $http({
      data: value,
      url: `${consts.apiUrl}/${url}/${carUUID.id}`,
      method: "PUT",
    })
      .then(function (resp) {
        $window.location.href = url === "product" && "#!/my-announcement";
        if (callback) callback(resp.data, null);
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  return { send, addCart, removeUrl, putCar };
}
