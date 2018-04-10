app.controller("volunteerCourseCtrl",function ($state,$scope,$stateParams,$ionicHistory,$cacheFactory,$http,$window) {
    //返回历史页面
    $scope.volunteerCourseback = function () {
        $ionicHistory.goBack();
    }
    //  跳转页面过来时把把用户账号传过来（根据账号查表），把相应信息显示在对应的位置
    var user_cache = $cacheFactory.get("user_cache");
    console.log(user_cache);
    var user = user_cache.get('Msg');
    console.log(user.email);
    var url = 'http://localhost:8088/volunteer_course?email='+user.email;
    $http({
        method: 'get',
        url: url
    }).then(function successCallback(response) {
        //打印后台传过来的数据
        console.log(response.data);
        $scope.array=response.data;
    }, function errorCallback(err) {
        // 请求失败执行代码
        console.log("错误信息："+err);
    });

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
})