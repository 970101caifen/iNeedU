app.controller("activityContentCtrl",function ($state,$scope,$stateParams,$ionicHistory,$http,$ionicModal,$cacheFactory) {
    //返回历史页面
    $scope.activityContentback = function () {
        $ionicHistory.goBack();
    }
    //接收上个页面传过来的id，即活动
    $scope.activityId = angular.fromJson($stateParams.id);
    console.log($scope.activityId);
    $scope.activityTitle = $scope.activityId.activity_category_name;
    //接收我的  那个页面传过来的值
    var user_cache = $cacheFactory.get("user_cache");   //取出名为user_cache的缓存对象
    //    点击不同的活动，页面去请求不同的内容
    var url = 'http://localhost:8088/access_activity?activityCategoryId=' + $scope.activityId.activity_category_id;

    $http({
        method: 'get',
        url: url/*,
                            data:params,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }*/
    }).then(function successCallback(response) {
        $scope.resultData = response.data;
        //得到活动后再根据获取到的团队id去查表获取相应用户名
    }, function errorCallback(err) {
        // 请求失败执行代码
        console.log("错误信息：" + err);
    });
    //判断是点击的哪个活动
    if($scope.activityId.activity_category_id ==1 || $scope.activityId.activity_category_id == 2){
        //根据传过来的role判断是用户还是团队，再显示不同的内容
        var user = user_cache.get("Msg");
        console.log(user);
        if(user != undefined){
            if(user.clientSide == 0){
                $scope.isUser = true;
                $scope.isTeam = false;
            }else if(user.clientSide == 1){
                $scope.isUser = false;
                $scope.isTeam = true;

                //判断活动发布内容是否为空
                $scope.activity_titleCorrect = false;
                $scope.activitySiteCorrect = false;
                $scope.activityMsgCorrect = false;
                $scope.activityStartTimeCorrect = false;
                $scope.activityEndTimeCorrect = false;
                $scope.activityNeedNumCorrect = false;
                //跳到发布活动模态框
                $ionicModal.fromTemplateUrl('templates/releaseActivities.html', {
                    scope: $scope
                }).then(function(modal) {
                    $scope.releaseActivities = modal;
                });

                $scope.showReleaseActivities = function() {
                    $scope.releaseActivities.show();
                };
                $scope.hideReleaseActivities = function(activity) {
                    console.log(activity);
                    if (activity.activity_title == null) {
                        $scope.activity_titleCorrect = true;
                    } else if (activity.activitySite == null) {
                        $scope.activitySiteCorrect = true;
                    } else if (activity.activityMsg == null) {
                        $scope.activityMsgCorrect = true;
                    } else if (activity.activityStartTime == null) {
                        $scope.activityStartTimeCorrect = true;
                    } else if (activity.activityEndTime == null) {
                        $scope.activityEndTimeCorrect = true;
                    } else if (activity.activityNeedNum == null) {
                        $scope.activityNeedNumCorrect = true;
                    } else {
                        var url = 'http://localhost:8088/release_activity?activity_title=' + activity.activity_title + "&activitySite=" + activity.activitySite + "&activityMsg=" + activity.activityMsg + "&activityStartTime=" + activity.activityStartTime + "&activityEndTime=" + activity.activityEndTime + "&activityNeedNum=" + activity.activityNeedNum + "&activityCategoryId=" + $scope.activityId.activity_category_id + "&teamEmail=" + user.email;

                        $http({
                            method: 'get',
                            url: url/*,
                            data:params,
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }*/
                        }).then(function successCallback(response) {
                            //var resultData = JSON.parse(response.data);
                            console.log("success:" + response.data);
                            $scope.releaseActivities.hide();
                        }, function errorCallback(err) {
                            // 请求失败执行代码
                            console.log("错误信息：" + err);
                        });
                    }
                };
            }
        }else{
            $scope.isUser = true;
            $scope.isTeam = false;
        }
    }else if($scope.activityId.activity_category_id ==4){
        $scope.isCharity = true;
        $scope.isUser = false;
        $scope.isTeam = false;
    }else{
        $scope.isCharity = false;
        $scope.isUser = false;
        $scope.isTeam = false;
    }


})