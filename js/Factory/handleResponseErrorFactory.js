angular
  .module("EcommerceApp")
  .factory("handleResponseError", [
    "$q",
    "$window",
    "consts",
    HandleResponseErrorFactory,
  ]);

function HandleResponseErrorFactory($q, $window, consts) {
  function responseError(errorResponse) {
    if (errorResponse.status === 403) {
      localStorage.removeItem(consts.userKey);
      $window.location.href = "#!/home";
    }
    return $q.reject(errorResponse);
  }

  return { responseError };
}
