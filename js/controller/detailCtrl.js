angular
  .module("EcommerceApp")
  .controller("DetailCtrl", [
    "$scope",
    "$http",
    "consts",
    "$routeParams",
    "car",
    DetailController,
  ]);
function DetailController($scope, $http, consts, $routeParams, car) {
  $scope.formCar = {
    name: "",
    image_url: "",
    rating: 1,
    count_in_stock: "",
    description: "",
    price: "",
  };

  $scope.defaultValue = {
    spec_id: "",
    slug: "",
  };

  $scope.carId = "";

  ($scope.Url = $http({
    method: "GET",
    carUrl: $routeParams.carUrl,
    url: `${consts.apiUrl}/product?id=${$routeParams.carUrl}`,
  }).then(function sucess(res) {
    let carId = res.data;
    $scope.defaultValue.spec_id = carId[0].spec_id;
    $scope.defaultValue.slug = carId[0].slug;
    $scope.formCar.name = carId[0].name;
    $scope.formCar.image_url = carId[0].image_url;
    $scope.formCar.rating = carId[0].rating;
    $scope.formCar.count_in_stock = carId[0].count_in_stock;
    $scope.formCar.description = carId[0].description;
    $scope.formCar.price = carId[0].price;
    $scope.carId = carId;
  })),
    function handleError(err) {
      console.log(err);
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
        spec_id: $scope.defaultValue.spec_id,
        slug: $scope.defaultValue.slug,
        rating: $scope.formCar.rating,
        description: $scope.formCar.description,
        price: $scope.formCar.price,
      },
      (err) => console.log(err)
    );
  };
}
