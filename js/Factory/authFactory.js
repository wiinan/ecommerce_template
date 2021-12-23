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

  function signup(user, callback) {
    submit("signup", user, callback);
  }

  function login(user, callback) {
    submit("login", user, callback);
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
        console.log(resp);
      });
  }

  function submit(url, user, callback) {
    $http
      .post(`${consts.apiUrl}/${url}`, user)
      .then(function (resp) {
        localStorage.setItem(consts.userKey, JSON.stringify(resp.data));
        if (callback) callback(null, resp.data);
      })
      .catch(function (resp) {
        if (callback) callback(resp.data, null);
        if (
          resp.data.error ===
          "TypeError: Cannot destructure property 'password' of 'req.data' as it is null."
        ) {
          msgs.addError("preencha os campos");
        } else if (resp.data.error === "usuario já existe") {
          msgs.addError("Usuario ja existe");
        } else if (resp.data.error === "Error: Usuario nao encontrado!") {
          msgs.addError("Senha Invalida");
        } else if (resp.data.error === "Error: senhas nao sao iguais") {
          msgs.addError("As senhas nao sao iguais");
        } else if (resp.data.error === "Error: Usuario nao encontrado!") {
          msgs.addError("Usuario não existe!");
        } else {
          msgs.addError("Usuario ou senha invalido!");
        }
      });
  }

  function logout(callback) {
    user = null;

    localStorage.removeItem(consts.userKey);

    $http.defaults.headers.common.token = "";

    if (callback) callback(null);
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
          if (callback) {
            callback(resp);
          }
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

            user.isValid ? ($window.location.href = "#!/home") : authPage;
          }
        });
      }
    } catch (err) {
      msgs.addSuccess(err);
    }
  }

  return {
    signup,
    login,
    logout,
    getUser,
    validateToken,
    ValidadeUser,
    googleAuth,
  };
}
