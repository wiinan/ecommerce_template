angular.module("EcommerceApp").directive("selectNgFiles", [selectFilesDir]);
function selectFilesDir() {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attr, ngModel) {
      elem.on("change", function () {
        const files = elem[0].files;
        ngModel.$setViewValue(files);
      });
    },
  };
}
