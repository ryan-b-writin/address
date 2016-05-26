app.controller("ItemNewCtrl", function($scope, $http, $location, itemStorage){
  $scope.submitButtonText = "Add New Entry"
  $scope.pageTitle = "Create New Entry"
  $scope.newEntry = {
    name: "",
    contact: "",
    address: "",
    region: ""
  };

  $scope.addNewItem = function(){
        itemStorage.postNewItem($scope.newEntry)
          .then(function successCallback(response){
            $location.url("/items/list");
          })
  }
})