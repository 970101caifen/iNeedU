app.controller("TitleController",function ($scope, $ionicPopover,$ionicModal) {
    $ionicModal.fromTemplateUrl('templates/SearchView.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchView = modal;
    });

    $scope.searchAction=function () {
        $scope.searchView.show()
    }

});