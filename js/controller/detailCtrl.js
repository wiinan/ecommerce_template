angular
  .module("EcommerceApp")
  .controller("DetailCtrl", [
    "$scope",
    "$http",
    "consts",
    "$routeParams",
    "car",
    "msgs",
    DetailController,
  ]);
function DetailController($scope, $http, consts, $routeParams, car, msgs) {
  carId = {};
  $scope.formCar = {
    price: "",
  };

  $scope.formCar = {
    name: "",
    image_url: "",
    rating: 1,
    count_in_stock: "",
    description: "",
    priceFormat: "",
    price: "",
  };

  $scope.defaultValue = {
    spec_id: "",
    slug: "",
  };

  function formatReal(int) {
    return int.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
  }

  $scope.location = function (url) {
    $window.location.href(url);
  };

  ($scope.Url = $http({
    method: "GET",
    carUrl: $routeParams.carUrl,
    url: `${consts.apiUrl}/product?id=${$routeParams.carUrl}`,
  }).then(function (res) {
    const carId = res.data;

    $scope.defaultValue.spec_id = carId[0].spec_id;
    $scope.defaultValue.slug = carId[0].slug;
    $scope.formCar.name = carId[0].name;
    $scope.formCar.image_url = carId[0].image_url;
    $scope.formCar.rating = carId[0].rating;
    $scope.formCar.count_in_stock = carId[0].count_in_stock;
    $scope.formCar.description = carId[0].description;
    $scope.formCar.price = carId[0].price;
    $scope.carId = carId[0];
    $scope.formCar.priceFormat = formatReal(parseInt(carId[0].price));
  })).catch(function (err) {
    msgs.addError(err);
  });

  $scope.addToCart = function (data) {
    car.addCart(
      "cart",
      {
        id: data,
      },
      (err) => msgs.addError(err)
    );
  };

  $scope.editCar = function (data) {
    car.putCar(
      "product",
      {
        id: data,
      },
      {
        name: $scope.formCar.name,
        image_url: $scope.formCar.image_url,
        spec_id: $scope.carId.spec_id,
        slug: $scope.carId.slug,
        rating: $scope.formCar.rating,
        description: $scope.formCar.description,
        price: $scope.formCar.price,
      },
      (err) => msgs.addError(err)
    );
  };
}
