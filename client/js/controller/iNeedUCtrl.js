app.controller("iNeedUCtrl",function ($scope,$http) {

    var url ="http://localhost:8088/index";


    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       $scope.msgList=response.data.subjects;

    }, function errorCallback(response) {
        // 请求失败执行代码
    });

});