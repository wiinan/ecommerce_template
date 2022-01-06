angular
  .module("EcommerceApp")
  .factory("car", ["$http", "$window", "consts", "msgs", carFactory]);

function carFactory($http, $window, consts, msgs) {
  function getCar(url) {
    return $http({
      url: `${consts.apiUrl}/${url}`,
      method: "GET",
    });
  }

  function send(url, carDatas, callback) {
    $http({
      data: carDatas,
      url: `${consts.apiUrl}/${url}`,
      method: "POST",
    })
      .then(function (resp) {
        const carUUID = resp.data.id;
        msgs.addSuccess(carUUID);
        $window.location.href =
          url === "product" ? `#!/car/${carUUID}` : "#!/store";
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function addCart(url, UUID, callback) {
    const { id } = UUID;
    $http({
      url: `${consts.apiUrl}/${url}/${id}`,
      method: "POST",
    })
      .then(function (resp) {
        $window.location.href = "#!/cart";
        msgs.addSuccess("Adicionado ao Carrinho!");
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function removeCar(url, UUID, callback) {
    const { id } = UUID;
    $http({
      url: `${consts.apiUrl}/${url}/${id}`,
      method: "DELETE",
    })
      .then(function (resp) {
        msgs.addSuccess("Produto Removido do Carrinho!");
        $window.location.href = url === "product" && "#!/my-announcement";
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function removeImg(url, id, callback) {
    $http({
      method: "DELETE",
      url: `${consts.apiUrl}/${url}/${id}`,
    })
      .then(function (resp) {
        console.log(id);
        msgs.addSuccess("Produto Removido do Carrinho!");
        $window.location.href = "#!/my-announcement";
      })
      .catch(function (resp) {
        callback(resp.data.error, null);
      });
  }

  function putCar(url, UUID, value, callback) {
    const { id } = UUID;
    $http({
      data: value,
      url: `${consts.apiUrl}/${url}/${id}`,
      method: "PUT",
    })
      .then(function (resp) {
        msgs.addSuccess("Produto Editado!");
        $window.location.href = `#!/car/${id}`;
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
      });
  }

  return { send, addCart, removeCar, putCar, getCar, removeImg };
}
