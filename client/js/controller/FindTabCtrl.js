app.controller("FindTabCtrl",function ($scope,$http) {
    var url ="http://localhost:8088/qq";
    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {

        $scope.topList=response.data.data.topList;
        console.log($scope.topList);
    }, function errorCallback(response) {
        // 请求失败执行代码
    });
});