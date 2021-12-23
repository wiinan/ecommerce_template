angular
  .module("EcommerceApp")
  .controller("AddCtrl", ["$scope", "car", AddCarController]);
function AddCarController($scope, car) {
  $scope.formCar = {
    name: null,
    spec_id: null,
    // slug: null,
    image_url: null,
    rating: 1,
    count_in_stock: null,
    description: null,
    price: null,
  };

  $scope.registerCar = function () {
    car.send(
      "product",
      {
        name: $scope.formCar.name,
        spec_id: $scope.formCar.spec_id,
        // slug: $scope.formCar.slug,
        image_url: $scope.formCar.image_url,
        rating: $scope.formCar.rating,
        count_in_stock: $scope.formCar.count_in_stock,
        description: $scope.formCar.description,
        price: $scope.formCar.price,
      },
      (err) => console.log(err)
    );
  };
}
