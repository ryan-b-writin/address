'use strict';
app.factory("itemStorage", function($q, $http, firebaseURL){

  var getItemList = function(){
    var items = [];
    return $q(function(resolve, reject){
      $http.get(firebaseURL + "items.json")
        .success(function(itemObject){
          var itemCollection = itemObject;
          Object.keys(itemCollection).forEach(function(key){
            itemCollection[key].id=key;
            items.push(itemCollection[key]);
          })
          resolve(items);
        })
        .error(function(error){
          reject(error);
        });
      })
  };
  var deleteItem = function(itemId){
    return $q(function(resolve,reject){
      $http.delete(firebaseURL + `items/${itemId}.json`)
        .success(function(objectFromFirebase){
          resolve(objectFromFirebase)
        })
    })
  };

  var postNewItem = function(newItem){
    return $q(function(resolve,reject){
      $http.post(
        firebaseURL + "items.json",
        JSON.stringify({
          name: newItem.name,
          contact: newItem.contact,
          address: newItem.address,
          region: newItem.region,
        })
        ).success(
        function(objectFromFirebase){
            resolve(objectFromFirebase);
        }
      );
    })
  }

  var getSingleItem = function(itemId){
    console.log("itemID", itemId);
    return $q(function(resolve, reject){
      $http.get(firebaseURL + "items/"+itemId+".json")
        .success(function(itemObject){
          resolve(itemObject);
        })
        .error(function(error){
          reject(error);
        });
      });
  }

  var updateItem = function(itemId, newItem){
    return $q(function(resolve, reject) {
        $http.put(
          firebaseURL + "items/" + itemId + ".json",
          JSON.stringify({
            name: newItem.name,
            contact: newItem.contact,
            address: newItem.address,
            region: newItem.region,
          })
        )
        .success(
            function(objectFromFirebase) {
                resolve(objectFromFirebase);
            }
        );
      });
  };
  return {getItemList:getItemList, deleteItem:deleteItem, postNewItem:postNewItem, getSingleItem:getSingleItem, updateItem:updateItem}
})