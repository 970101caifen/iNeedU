app.controller("teamController",function ($state,$http,$scope, $ionicPopover,$ionicModal,$ionicHistory,$stateParams) {
    $scope.back = function () {
        $ionicHistory.goBack();
    }

    $scope.listData = angular.fromJson($stateParams.id);
    // console.log( $scope.listData)
    var team_id = $scope.listData.team_id;
    console.log(team_id)

    var url ="http://localhost:8088/team_details?team_id="+team_id;
   	$http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
        // console.log(response.data);
        $scope.obj = response.data;
        console.log($scope.obj)
    }, function errorCallback(response) {
        // 请求失败执行代码
    });


















});
