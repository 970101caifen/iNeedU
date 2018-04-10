app.controller("userRegisterCtrl",function ($scope,$ionicHistory,$http,$window) {
    //单选框值
    $scope.clientSideList = [
        { text: "男", value: "0" },
        { text: "女", value: "1" }
    ];
    $scope.userMsg = {
        clientSide: "0"
    };
    $scope.serverSideChange = function(item) {
        $scope.userMsg.clientSide = item.value;
    };
    //验证表单是否为空
    $scope.change = false;
    //提交表单验证
    $scope.submitted = false;

    $scope.onSubmit = function(){
        if ($scope.userRegisterForm.$valid) {
            $scope.submitted = false;
        }else{
            $scope.submitted = true;
        }
    }
});