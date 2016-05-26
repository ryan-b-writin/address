app.controller("ItemEditCtrl", function($scope, $http, $location, $routeParams, itemStorage){
  $scope.newEntry = {};
  $scope.submitButtonText = "EDIT"
  $scope.pageTitle = "Edit Entry"

  itemStorage.getSingleItem($routeParams.itemId)
    .then(function successCallback(response){
      console.log("response", response);
      $scope.newEntry=response;
    })

  $scope.addNewItem = function(){
        itemStorage.updateItem($routeParams.itemId, $scope.newEntry)
          .then(function successCallback(response){
            $location.url("/items/list");
          })
  }
});