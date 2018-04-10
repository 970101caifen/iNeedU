app.controller("mineCtrl",function ($state,$scope,$http, $ionicPopover,$ionicModal,$cacheFactory) {
    var user_cache = $cacheFactory("user_cache");  //声明一个user_cache缓存对象
    //团队id
    $scope.team_id='';
    //登录和未登录的状态值
    $scope.isLogin = true;
    $scope.isUserLogin = false;
    $scope.isTeamLogin = false;
    //登录后获得用户名和账号以及是团队还是个人
    $scope.user_name = '';
    $scope.team_name = '';
    $scope.user_email = '';
    $scope.team_email = '';
        //判断账号和密码是否正确
    $scope.emailCorrect=false;
    $scope.passwdCorrect = false;
    $scope.accountVerification = false;
    //跳到登录模态框
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.login = modal;
    });

    $scope.showLogin = function() {
        $scope.login.show();
    };
    $scope.hideLogin = function(user) {
        console.log(user);
        var url = 'http://localhost:8088/login?email='+user.email+"&passwd="+user.passwd+"&role="+user.clientSide;

        $http({
            method: 'get',
            url: url/*,
            data:params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }*/
        }).then(function successCallback(response) {
            var resultData = JSON.parse(response.data);
            console.log(resultData);
            if(resultData[0].result == "密码错误"){
                $scope.passwdCorrect = true;
            }else if(resultData[0].result == "该账号不存在"){
                $scope.emailCorrect = true;
            }else if(resultData[0].result == "账号被冻结或还没有认证"){
                $scope.accountVerification = true;
            }else{
                user_cache.put("Msg",user);
                //    登录成功后显示用户信息
                if(user.clientSide == 0){
                    $scope.user_email = user.email;
                    $scope.user_name = resultData[0].result;
                    $scope.isLogin = false;
                    $scope.isUserLogin = true;
                    $scope.login.hide();
                }else if(user.clientSide == 1){
                    $scope.team_email = user.email;
                    $scope.team_name = resultData[0].result;
                    $scope.team_id = resultData[0].team_id;
                    $scope.isLogin = false;
                    $scope.isTeamLogin = true;
                    $scope.login.hide();
                }
            }
        }, function errorCallback(err) {
            // 请求失败执行代码
            console.log("错误信息："+err);
        });

    };

    //    跳到个人注册模态框
    $ionicModal.fromTemplateUrl('templates/userRegister.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.userRegister = modal;
    });

    $scope.showUserRegister = function() {
        $scope.userRegister.show();
    };
    //验证两次输入密码是否一致
    $scope.user_repasswd_correct = false;
    $scope.hideUserRegister = function(userMsg){
        console.log(userMsg);
        //验证账号是否存在
        $scope.emailCorrect = false;
        if(userMsg.user_repasswd == userMsg.user_passwd){
            $scope.emailCorrect = false;
            var params = {
                name: userMsg.user_name,
                email: userMsg.user_leader_email,
                passwd: userMsg.user_passwd,
                tel: userMsg.user_leader_tel,
                user_introduce:userMsg.user_introduce
            }
            var url = 'http://localhost:8088/user_register?email='+params.email+"&passwd="+params.passwd+"&name="+params.name+"&tel="+params.tel+"&user_introduce="+params.user_introduce;

            $http({
                method: 'get',
                url: url/*,
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }*/
            }).then(function successCallback(response) {
                var resultData = JSON.parse(response.data);
                if(resultData[0].result == "success"){
                    console.log("success:"+resultData)
                    //    注册成功后隐藏
                    var user = {email: userMsg.user_leader_email, clientSide: 0};
                    user_cache.put("Msg",user);
                    $scope.user_email = userMsg.user_leader_email;
                    $scope.user_name = userMsg.user_name;
                    $scope.isLogin = false;
                    $scope.isUserLogin = true;
                    $scope.isTeamLogin = false;
                    $scope.userRegister.hide();
                }else if(resultData[0].result == "fail"){
                    $scope.emailCorrect = true;
                }
            }, function errorCallback(err) {
                // 请求失败执行代码
                console.log("错误信息："+err);
            });
        }else {
            $scope.user_repasswd_correct = true;
        }

    }

    //    跳到团队注册模态框
    $ionicModal.fromTemplateUrl('templates/teamRegister.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.teamRegister = modal;
    });

    $scope.showTeamRegister = function() {
        $scope.teamRegister.show();
    };
    //验证两次输入密码是否一致
    $scope.team_repasswd_correct = false;
    $scope.hideTeamRegister = function(teamMsg) {
        console.log(teamMsg);
        $scope.emailCorrect = false;
        if(teamMsg.team_passwd == teamMsg.team_repasswd){
            $scope.team_repasswd_correct = false;
            var params = {
                name: teamMsg.team_name,
                email: teamMsg.team_leader_email,
                passwd: teamMsg.team_passwd,
                tel: teamMsg.team_leader_tel,
                school: teamMsg.team_byschool,
                founding_time: teamMsg.team_founding_time,
                leader_name: teamMsg.team_leader_name,
                team_introduce:teamMsg.team_introduce
            }

            var url = 'http://localhost:8088/team_register?email='+params.email+'&passwd='+params.passwd+'&name='+params.name+'&tel='+params.tel+'&school='+params.school+'&founding_time='+params.founding_time+'&leader_name='+params.leader_name+'&team_introduce='+params.team_introduce;

            $http({
                method: 'get',
                url: url/*,
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }*/
            }).then(function successCallback(response) {
                var resultData = JSON.parse(response.data);
                console.log(resultData);
                if(resultData[0].result == "success"){
                    $scope.emailCorrect = false;
                    //    注册成功后
                    var user = {email: teamMsg.team_leader_email, clientSide: 1};
                    user_cache.put("Msg",user);
                    $scope.teamRegister.hide();
                    $scope.team_email = teamMsg.team_leader_email;
                    $scope.team_name = teamMsg.team_name;
                    $scope.team_id = resultData[0].team_id;
                    $scope.isLogin = false;
                    $scope.isUserLogin = false;
                    $scope.isTeamLogin = true;
                    var url = 'http://localhost:8088/team_id?email='+params.email;

                    $http({
                        method: 'get',
                        url: url/*,
                data:params,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }*/
                    }).then(function successCallback(response) {
                        var resultData = JSON.parse(response.data);
                        console.log(resultData);
                        if(resultData[0].result == "success"){
                            $scope.team_id = resultData[0].team_id;

                        }
                    }, function errorCallback(err) {
                        // 请求失败执行代码
                        console.log("错误信息："+err);
                    });
                }else if(resultData[0].result == "fail"){
                    $scope.emailCorrect = true;
                }
            }, function errorCallback(err) {
                // 请求失败执行代码
                console.log("错误信息："+err);
            });
        }else {
            $scope.team_repasswd_correct = true;
        }

    };

    //跳到团队活动模态框
    $ionicModal.fromTemplateUrl('templates/teamActivity.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.teamActivity = modal;
    });
    $scope.showTeamActivity = function() {
        var url ="http://localhost:8088/team_details?team_id="+$scope.team_id;
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
        $scope.teamActivity.show();
    };
    $scope.hideTeamActivity = function() {
        $scope.teamActivity.hide();
    };
    //跳到设置模态框，点击退出登录和切换账号跳到未登录页面
    $ionicModal.fromTemplateUrl('templates/setLoginStatic.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.setLoginStatic = modal;
    });

    $scope.showSetLoginStatic = function() {
        $scope.setLoginStatic.show();
    };
    $scope.hideSetLoginStatic = function() {
        var user = {email: '', clientSide: 0};
        user_cache.put("Msg",user);
        $scope.isLogin = true;
        $scope.isUserLogin = false;
        $scope.isTeamLogin = false;
        $scope.setLoginStatic.hide();
    };

})