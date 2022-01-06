angular
  .module("EcommerceApp")
  .factory("auth", [
    "$http",
    "$window",
    "consts",
    "msgs",
    "$http",
    AuthFactory,
  ]);

function AuthFactory($http, $window, consts, msgs) {
  let user = null;

  function getUser() {
    if (!user) {
      user = JSON.parse(localStorage.getItem(consts.userKey));
    }
    return user;
  }

  function googleAuth(callback) {
    $http({
      method: "GET",
      url: `${consts.apiUrl}/auth/google`,
      headers: {
        contentType: "application/json",
      },
    })
      .then(function (resp) {
        localStorage.setItem(consts.userKey, JSON.stringify(resp.data));
        if (callback) {
          callback(null, resp.data);
        }
      })
      .catch(function (resp) {
        msgs.addError(resp.data);
      });
  }

  function submit(url, user, callback) {
    $http({ url: `${consts.apiUrl}/${url}`, data: user, method: "POST" })
      .then(function (resp) {
        if (url === "login") {
          localStorage.setItem(consts.userKey, JSON.stringify(resp.data));
        }

        if (url === "signup") {
          msgs.addSuccess("Registrado com Sucesso!");
        }

        ValidadeUser();
        $window.location.href = "#!/home";
      })
      .catch(function (resp) {
        if (
          resp.data.error ===
          "TypeError: Cannot destructure property 'password' of 'req.data' as it is null."
        ) {
          callback("preencha os campos");
        } else if (resp.data.error === "usuario já existe") {
          callback("Usuario ja existe");
        } else if (resp.data.error === "Error: Usuario nao encontrado!") {
          callback("Senha Invalida");
        } else if (resp.data.error === "Error: senhas nao sao iguais") {
          callback("As senhas nao sao iguais");
        } else if (resp.data.error === "Error: Usuario nao encontrado!") {
          callback("Usuario não existe!");
        } else {
          callback("Usuario ou senha invalido!");
        }
      });
  }

  function logout(callback) {
    user = null;
    localStorage.removeItem(consts.userKey);
    $http.defaults.headers.common.token = "";

    if (callback) callback();
  }

  function validateToken(token, callback) {
    const tokenBearer = `${token}`;
    if (tokenBearer) {
      $http({
        method: "POST",
        url: `${consts.apiUrl}/verifyToken`,
        headers: {
          token: `${token}`,
          "Content-Type": "Application/x-www-form-urlencoded",
        },
      })
        .then((resp) => {
          if (!resp.data.valid) {
            logout();
          } else {
            $http.defaults.headers.common.Authorization = getUser().tokenBearer;
          }
          if (callback) callback(null, resp.data.valid);
        })
        .catch(function (resp) {
          callback(resp.data.error, null);
        });
    }
  }

  function ValidadeUser() {
    try {
      const user = getUser();
      const authPage = "#!/login";
      const isAuthPage = $window.location.href.includes(authPage);

      if (!user && !isAuthPage) {
        $window.location.href = authPage;
      } else if (user && !user.isValid) {
        validateToken(user.userLogged, (err, valid) => {
          if (!valid) {
            $window.location.href = authPage;
            logout();
          } else {
            user.isValid = true;
            $http.defaults.headers.common.token = `${user.userLogged}`;

            !user.isValid && authPage;
          }
        });
      }
    } catch (err) {
      msgs.addSuccess(err);
    }
  }

  return { logout, getUser, validateToken, ValidadeUser, googleAuth, submit };
}
