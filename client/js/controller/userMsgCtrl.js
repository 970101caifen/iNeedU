app.controller("userMsgCtrl",function ($scope,$stateParams,$ionicHistory,$http,$cacheFactory) {
    //返回历史页面
    $scope.userMsgback = function () {
        $ionicHistory.goBack();
    }
    //进入此页面就做数据请求
    //接收我的  那个页面传过来的值
    var user_cache = $cacheFactory.get("user_cache");   //取出名为user_cache的缓存对象
    var user = user_cache.get("Msg");
    if(user != undefined){
        $scope.email = user.email;
        //  跳转页面过来时把把用户账号传过来（根据账号查表），把相应信息显示在对应的位置
        var params = {
            email: $scope.email
        }
        var url = 'http://localhost:8088/user_msg?email='+params.email;

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
            //打印响应信息
            var resultData = response.data;
            console.log(resultData);
            if(resultData[0].result == "fail"){
                console.log("请求失败");
            }else {
                $scope.user_name = resultData[0].user_name;
                $scope.user_leader_email = resultData[0].user_email;
                $scope.user_passwd = resultData[0].user_passwd;
                $scope.user_repasswd = resultData[0].user_passwd;
                $scope.user_leader_tel = resultData[0].user_tel;
                $scope.user_introduce = resultData[0].user_introduce;
            }
        }, function errorCallback(err) {
            // 请求失败执行代码
            console.log("错误信息："+err);
        });
    }
    //验证表单是否为空
    $scope.change = false;
    //提交表单验证
    $scope.submitted = false;
    $scope.onSubmit = function(){
        if ($scope.userMsgForm.$valid) {
            $scope.submitted = false;

        }else{
            $scope.submitted = true;
        }
    }
//    点击修改便修改数据
    $scope.updateemail = false;
    $scope.updateUserMsg = function(){
        //账号有修改就提示用户账号不能修改
        if($scope.email == $scope.user_leader_email){
            $scope.updateemail = false;
            var newparams = {
                name: $scope.user_name,
                email: $scope.user_leader_email,
                passwd: $scope.user_passwd,
                tel: $scope.user_leader_tel,
                user_introduce:$scope.user_introduce
            }
            var url = 'http://localhost:8088/user_newmsg?email='+newparams.email+'&passwd='+newparams.passwd+'&name='+newparams.name+'&tel='+newparams.tel+'&user_introduce='+newparams.user_introduce;

            $http({
                method: 'get',
                url: url/*,
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }*/
            }).then(function successCallback(response) {
                //打印响应信息
                var resultData = JSON.parse(response.data);
                console.log(resultData);
                if(resultData[0].result == "success"){
                    $ionicHistory.goBack();
                }else {
                    console.log("修改失败");
                }
            }, function errorCallback(err) {
                // 请求失败执行代码
                console.log("错误信息："+err);
            });
        }else {
            $scope.updateemail = true;
        }
    }
})