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
    console.log("Error response", errorResponse);
    if (errorResponse.status === 403) {
      localStorage.removeItem(consts.userKey);
      $window.location.href = "#!/login";
    }
    if (errorResponse.status === 404) {
      console.log("404");
    }
    return $q.reject(errorResponse);
  }

  return { responseError };
}
