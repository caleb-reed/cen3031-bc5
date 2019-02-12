angular.module('listings').controller('ListingsController', ['$scope', 'Listings', 
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

      $scope.addListing = function () {
          /**TODO 
          *Save the article using the Listings factory. If the object is successfully 
          saved redirect back to the list page. Otherwise, display the error
         */
          $scope.listings.push($scope.newListing);
          $scope.listings.sort(function (a, b) {
              var x = a.code.toLowerCase();
              var y = b.code.toLowerCase();
              if (x < y) { return -1; }
              if (x > y) { return 1; }
              return 0;
          });
          Listings.create($scope.newListing);
          $scope.newListing = {};
      }
    $scope.deleteListing = function(id) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
        var index = $scope.listings.indexOf(id);
        /*for (i = index; i < $scope.listings.length - 1; i++) {
            $scope.listings[i] = $scope.listings[i + 1];
        }
        v2 = $scope.listings.pop();*/
        $scope.listings.splice(index, 1);
        Listings.delete(id).then(function (response) {} , function (error) {
            console.log('Error Deleting:', error);

            Listings.getAll().then(function (response) {
                $scope.listings = response.data;
            }, function (error) {
                console.log('Unable to retrieve listings:', error);
            });
        });

    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);