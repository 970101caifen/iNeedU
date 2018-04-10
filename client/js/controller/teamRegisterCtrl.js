app.controller("teamRegisterCtrl",function ($scope,$ionicHistory,$http,$window) {
    //验证表单是否为空
    $scope.change = false;
    //提交表单验证
    $scope.submitted = false;
    $scope.onSubmit = function(){
        if ($scope.teamRegisterForm.$valid) {
            $scope.submitted = false;
        }else{
            $scope.submitted = true;
        }
    }
});