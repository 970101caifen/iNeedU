app.controller("loginConfirm",function ($state,$scope,$http) {

    //单选框值
    $scope.clientSideList = [
        { text: "个人", value: "0" },
        { text: "团队", value: "1" }
    ];
    $scope.user = {
        clientSide: "0"
    };
    $scope.serverSideChange = function(item) {
        $scope.user.clientSide = item.value;
    };


    //验证表单是否为空
    $scope.change = false;
    //提交表单验证
    $scope.submitted = false;
    $scope.onSubmit = function(){
        if ($scope.loginForm.$valid) {
            $scope.submitted = false;

        }else{
            $scope.submitted = true;
        }
    }
});