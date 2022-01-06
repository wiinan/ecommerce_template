angular
  .module("EcommerceApp")
  .controller("AddCtrl", [
    "$scope",
    "car",
    "msgs",
    "$routeParams",
    "$window",
    AddCarController,
  ]);
function AddCarController($scope, car, msgs, $routeParams, $window) {
  $scope.formCar = {
    name: null,
    spec_id: null,
    image_url: null,
    rating: 1,
    count_in_stock: null,
    description: null,
    price: null,
    img: null,
    name: null,
    productImage: null,
  };

  const onInit = function () {
    getCar();
  };

  $scope.location = function (url) {
    $window.location.href = url;
  };

  const UUID = $routeParams.carUUID === null ? null : $routeParams.carUUID;

  $scope.registerCar = function () {
    car.send(
      "product",
      {
        name: $scope.formCar.name,
        spec_id: $scope.formCar.spec_id,
        rating: $scope.formCar.rating,
        count_in_stock: $scope.formCar.count_in_stock,
        description: $scope.formCar.description,
        price: $scope.formCar.price,
      },
      (err) => msgs.addError(err)
    );
  };

  const getCar = function () {
    car
      .getCar(`product?id=${UUID}`)
      .then(function (resp) {
        const product = resp.data;
        $scope.formCar.productImage = product[0].image.url;
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  $scope.deleteImage = function () {
    car
      .getCar(`product?id=${UUID}`)
      .then(function (resp) {
        const product = resp.data;
        $scope.formCar.productImage = product[0].image.url;
        const id = product[0].image_id;
        car.removeImg("image", id, (err) => msgs.addError(err));
      })
      .catch(function (resp) {
        msgs.addError(resp.data.error);
      });
  };

  $scope.encodeImageFileAsURL = function (element) {
    if (element.files.length > 0) {
      const fileToLoad = element.files[0];

      const fileName = element.files[0].name;

      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;

        const newImage = document.createElement("img");
        newImage.src = srcData;
        $scope.formCar.img = srcData;

        car.send(
          `image/${UUID}`,
          {
            img: $scope.formCar.img,
            name: fileName,
          },
          (err) => msgs.addError(err)
        );

        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  UUID ? onInit() : null;
}
