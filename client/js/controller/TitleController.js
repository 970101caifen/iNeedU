app.controller("TitleController",function ($state,$scope, $ionicPopover,$ionicModal) {
    $ionicModal.fromTemplateUrl('templates/SearchView.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchView = modal;
    });

    $scope.searchAction=function () {
        $scope.searchView.show()
    }


//    跳到关注
    $scope.toUserAttention=function () {
        $state.go("userAttention");
    }
//    跳转到通知页面
    $scope.toUserInform=function () {
        $state.go("userInform");
    }
//    跳到我的信息页面
    $scope.toUserMsg=function () {
        $state.go("userMsg");
    }
//    跳到志愿历程
    $scope.toVolunteerCourse=function () {
        $state.go("volunteerCourse");
    }
//    跳到设置页面
    $scope.toSetLoginStatic=function () {
        $state.go("setLoginStatic");
    }
//    跳到团队信息页面
    $scope.toTeamMsg=function () {
        $state.go("teamMsg");
    }
//    跳到团队消息页面
    $scope.toTeamInform=function () {
        $state.go("teamInform");
    }


});