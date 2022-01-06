angular
  .module("EcommerceApp")
  .controller("AnnouncementCtrl", [
    "$scope",
    "car",
    "msgs",
    "$window",
    announcementController,
  ]);
function announcementController($scope, car, msgs, $window) {
  $scope.announcementDatas = {};

  $scope.location = function (url) {
    $window.location.href = url;
  };

  const onInit = function () {
    AnnouncementCar();
  };

  const AnnouncementCar = function () {
    car
      .getCar("my-announcement")
      .then(function success(res) {
        const announcementDatas = res.data;
        $scope.announcementDatas = announcementDatas;
      })
      .catch(function (err) {
        msgs.addError(err);
      });
  };

  $scope.removeAnnouncement = function (data) {
    car.removeCar("product", { id: data }, (err) => msgs.addError(err));
  };

  onInit();
}
