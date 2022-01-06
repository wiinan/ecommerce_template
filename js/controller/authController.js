angular
  .module("EcommerceApp")
  .controller("AuthCtrl", [
    "auth",
    "msgs",
    "$window",
    "$scope",
    AuthController,
  ]);
function AuthController(auth, msgs, $window, $scope) {
  $scope.formLogin = {
    email: null,
    name: null,
    password: null,
    confirmPassword: null,
    is_admin: false,
  };

  $scope.getUser = () => auth.getUser();

  $scope.logout = () => {
    auth.logout(() => ($window.location.href = "#!/login"));
  };

  $scope.login = function () {
    auth.submit(
      "login",
      {
        email: $scope.formLogin.email,
        password: $scope.formLogin.password,
      },
      (err) => msgs.addError(err)
    );
  };

  // $scope.googleAuth = function () {
  //   auth.googleAuth((err) =>
  //     err ? msgs.addError("Falha no Google Auth") : $window.location.reload()
  //   );
  // };

  $scope.signup = function () {
    auth.submit(
      "signup",
      {
        email: $scope.formLogin.email,
        name: $scope.formLogin.name,
        password: $scope.formLogin.password,
        confirmPassword: $scope.formLogin.confirmPassword,
      },
      (err) =>
        err
          ? msgs.addError(err.errors.message)
          : ($window.location.href = "#!/login")
    );
  };

  let email_typed = document.querySelector(".input-email");
  let span = document.querySelector(".validate span");

  EmailIsValid = function () {
    let emailid = this.value;
    let noSpaceDigit = checkSpace(this.value);
    const lastTenDigit = emailid.slice(-10);

    if (lastTenDigit == "@email.com" && !noSpaceDigit && emailid.length > 10) {
      span.style.background = "rgba(0, 200, 0, 0.6)";
      span.innerHTML = '<i class="bx bx-check"></i>';
    } else {
      span.style.background = "rgba(255, 0, 0, 0.8)";
      span.innerHTML = '<i class="bx bx-x"></i>';
    }
  };

  checkSpace = (s) => {
    return /\s/g.test(s);
  };

  email_typed.addEventListener("input", EmailIsValid);
}
