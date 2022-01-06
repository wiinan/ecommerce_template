angular
  .module("EcommerceApp")
  .controller("storeCtrl", [
    "$scope",
    "car",
    "msgs",
    "$rootScope",
    StoreController,
  ]);

function StoreController($scope, car, msgs, $rootScope) {
  $scope.formStore = {
    id: null,
    link_image: null,
  };

  $scope.searchCar = "";

  $scope.allProducts = [];

  const onInit = function () {
    orderByMark();
    orderBy();
    getCar();
  };

  const orderBy = function () {
    $rootScope.$on("car-sort-by", (event, property) => {
      $scope.propertyName = property;
    });
  };

  const orderByMark = function () {
    $rootScope.$on("car-sort-mark", (event, property) => {
      $scope.propertyMark = property;
    });
  };

  const getCar = function (value = "product") {
    car
      .getCar(value)
      .then(function (res) {
        $scope.allProducts = res.data;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.addToCart = function (data) {
    car.addCart(
      "cart",
      {
        id: data,
      },
      () => msgs.addSuccess("1 Produto Adicionado!")
    );
  };

  $scope.encodeImageFileAsURL = function (element) {
    if (element.files.length > 0 || element.files.length < 2) {
      const fileToLoad = element.files[0];
      const fileName = element.files[0].name;
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const srcData = fileLoadedEvent.target.result;

        const newImage = document.createElement("img");
        newImage.src = srcData;
        $scope.formStore.link_image = srcData;

        car.send(
          "image",
          {
            img: $scope.formStore.link_image,
            name: fileName,
          },
          (err) => msgs.addError(err)
        );

        document.getElementById("imgTest").innerHTML = newImage.outerHTML;
      };

      fileReader.readAsDataURL(fileToLoad);
    }
  };

  onInit();
}
