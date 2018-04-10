app.controller("FindTabCtrl",function ($state,$scope,$http, $ionicPopover,$ionicModal,$cacheFactory) {

    var url ="http://localhost:8088/category";

    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {

         $scope.array=response.data;
    }, function errorCallback(err) {
        // 请求失败执行代码
    });
    $scope.toDetailActivity=function(e){
        var hre = 'find_category_activity.html?msg=' + angular.toJson(e);
        //传递对象：先将对象转成字符串（序列化）
        location.href = hre;
    }

    //    点击不同类型跳转到不同类型的活动页面
    $scope.toActivityContent=function (item) {
        var item = angular.toJson(item);

        $state.go("activityContent",{id:item});
    }

});