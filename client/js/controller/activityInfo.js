app.controller("activityInfo",function ($state,$scope,$location,$http,$ionicHistory,$ionicPopover,$stateParams,$cacheFactory, $ionicModal){
	$scope.back = function () {
        $ionicHistory.goBack();
    }
    $scope.listData = angular.fromJson($stateParams.id);
    console.log("$scope.listData :"+$scope.listData.activity_id)
    // 请求数据
    var url ="http://localhost:8088/activity_details?activity_id="+$scope.listData.activity_id;  
    $scope.joinus = function(code){
        var user_cache = $cacheFactory.get("user_cache");
        console.log(user_cache);
        var user = user_cache.get('Msg');
        console.log(user.email);
        if(user!=undefined&&user.email !=''){
            var url1 ="http://localhost:8088/joinus?activity_id="+$scope.listData.activity_id+'&count='+code+'&email='+user.email;
            console.log(url1);
            $http({
            method: 'GET',
            url: url1
            }).then(function successCallback(response) {
                if(response.data=='1'){
                    alert("申请成功");
                    document.getElementsByTagName('button')[0].disabled=true; 

                    //shuaxin
                    $http({
                    method: 'GET',
                    url: url
                    }).then(function successCallback(response) {
                    // console.log("response.data:"+response.data);
                    var item= response.data[$scope.listData.activity_id-1]
                    //console.log("item:"+item) ;
                    $scope.obj=item;
                    }, function errorCallback(response) {
                    // 请求失败执行代码
                    });
                    // shuaxinjieshu

                }else if(response.data=='0'){
                    alert("您已申请过");
                    document.getElementsByTagName('button')[0].disabled=true; 

                }else{
                    alert("申请失败");
                }   
            }, function errorCallback(response) {
                        // 请求失败执行代码
                    });

        }else{
                alert('请登录')
                $location.path("/templates/login.html");
        }  
    }

    $scope.checkRegister = function(item){
        var item = angular.toJson(item);
        // console.log(item+'$$$$$$$')
        // var id1 = item.activity_id;
        // console.log(id1);
        // $state.go('userjoinActivityInfo', {id:item});
        var url2 ="http://localhost:8088/userjoinActivity_Info?activity_id="+$scope.listData.activity_id;  
        $http({
            method: 'GET',
            url: url2
            }).then(function successCallback(response) {
                if(response.data){
                    $scope.isTeam=true;
                    $scope.userjoin=response.data;
                    console.log($scope.userjoin)
                }else{
                     $scope.isTeam=false;
                }
            }, function errorCallback(response) {
                        // 请求失败执行代码
                    });

    }
// 进入
   	$http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
       // console.log("response.data:"+response.data);
  		var item= response.data[$scope.listData.activity_id-1]
		//console.log("item:"+item) ;
		$scope.obj=item;
    }, function errorCallback(response) {
        // 请求失败执行代码
    });
   	//默认显示我要参与，登录后判断是团队还是个人,是团队显示团队回复
    $scope.isUser=true;
    $scope.isTeam=false;
    //接收我的  那个页面传过来的值
    var user_cache = $cacheFactory.get("user_cache");   //取出名为user_cache的缓存对象
    //根据传过来的role判断是用户还是团队，再显示不同的内容
    var user = user_cache.get("Msg");
    if(user == undefined){
        $scope.isUser=true;
        $scope.isTeam=false;
    }else if(user.clientSide == 1){
        $scope.isUser=false;
        $scope.isTeam=true;
    }else if(user.clientSide == 0){
        $scope.isUser=true;
        $scope.isTeam=false;
    }
});