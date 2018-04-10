app.controller("teamMsgCtrl",function ($scope,$stateParams,$ionicHistory,$http,$cacheFactory) {
    //进入此页面就做数据请求
    //接收我的  那个页面传过来的值
    var user_cache = $cacheFactory.get("user_cache");   //取出名为user_cache的缓存对象
    var user = user_cache.get("Msg");
    if(user != undefined){
        $scope.email = user.email;
        var params = {
            email: $scope.email
        }
        var url = 'http://localhost:8088/team_msg?email='+params.email;
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
                $scope.team_name = resultData[0].team_name;
                $scope.team_leader_email = resultData[0].team_leader_email;
                $scope.team_passwd = resultData[0].team_passwd;
                $scope.team_repasswd = resultData[0].team_passwd;
                $scope.team_leader_tel = resultData[0].team_leader_tel;
                $scope.team_byschool = resultData[0].team_byschool;
                $scope.team_founding_time = resultData[0].team_founding_time;
                $scope.team_leader_name = resultData[0].team_leader_name;
                $scope.team_introduce = resultData[0].team_introduce;
            }
        }, function errorCallback(err) {
            // 请求失败执行代码
            console.log("错误信息："+err);
        });
    }
    //返回历史页面
    $scope.teamMsgback = function () {
        $ionicHistory.goBack();
    }
    //验证表单是否为空
    $scope.change = false;
    //提交表单验证
    $scope.submitted = false;
    $scope.onSubmit = function(){
        if ($scope.teamMsgForm.$valid) {
            $scope.submitted = false;
        }else{
            $scope.submitted = true;
        }
    }
//    点击修改就提交数据
    $scope.updateemail = false;
    $scope.updateTeamMsg = function(){
        if($scope.email == $scope.team_leader_email){
            $scope.updateemail = false;
            var newparams = {
                name: $scope.team_name,
                email: $scope.team_leader_email,
                passwd: $scope.team_passwd,
                tel: $scope.team_leader_tel,
                school: $scope.team_byschool,
                founding_time: $scope.team_founding_time,
                leader_name: $scope.team_leader_name,
                team_introduce:$scope.team_introduce
            }
            var url = 'http://localhost:8088/team_newmsg?email='+newparams.email+'&passwd='+newparams.passwd+'&name='+newparams.name+'&tel='+newparams.tel+'&school='+newparams.school+'&founding_time='+newparams.founding_time+'&leader_name='+newparams.leader_name+'&team_introduce='+newparams.team_introduce;

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