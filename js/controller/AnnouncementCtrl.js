angular
  .module("EcommerceApp")
  .controller("AnnouncementCtrl", [
    "$scope",
    "$http",
    "consts",
    "car",
    announcementController,
  ]);
function announcementController($scope, $http, consts, car) {
  $scope.announcementDatas = {};

  const onInit = function () {
    AnnouncementCar();
  };

  const AnnouncementCar = function () {
    $http({ method: "GET", url: `${consts.apiUrl}/my-announcement` }).then(
      function success(res) {
        let announcementDatas = res.data;
        $scope.announcementDatas = announcementDatas;
      }
    ),
      function handleError(err) {
        console.log(err);
      };
  };

  $scope.removeAnnouncement = function (data) {
    car.removeUrl(
      "product",
      {
        id: data,
      },
      (err) => console.log(err)
    );
  };

  onInit();
}
