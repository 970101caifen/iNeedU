app.controller("ActivityInfoPage",function ($state,$scope, $ionicPopover,$ionicModal) {

    $scope.toActivityPage =function (item) {
        //console.log("tabs.new");
       // $state.go("activityInfo");
        var item = angular.toJson(item);
        console.log(item)
        // var id1 = item.activity_id;
        // console.log(id1);
        $state.go("activityInfo", {id:item});  
    }
    
     $scope.toTeamPage =function (item) {
        var item = angular.toJson(item);
        console.log(item);
        $state.go("teamInfo",{id:item});
    }
});