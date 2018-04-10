app.controller("userAttentionCtrl",function ($scope,$stateParams,$ionicHistory,$http,$window) {
    //返回历史页面
    $scope.userAttentionback = function () {
        $ionicHistory.goBack();
    }
    //  跳转页面过来时把把用户账号传过来（根据账号查表），把相应信息显示在对应的位置
    console.log($stateParams)
    $scope.email = $stateParams.teamEmail;
    var params = {
        email: $scope.email
    }
    var url = 'http://localhost:8088/user_attention?email='+params.email;

    $http({
        method: 'get',
        url: url/*,
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }*/
    }).then(function successCallback(response) {
        //打印后台传过来的数据
        console.log(response);
    }, function errorCallback(err) {
        // 请求失败执行代码
        console.log("错误信息："+err);
    });
})