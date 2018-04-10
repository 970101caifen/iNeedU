app.controller("chooseSchoolTeamToList",function ($scope, $http,$cacheFactory) {
	$scope.updata=function(data){
           console.log(data);
	}

	var url ="http://localhost:8088/home_activity";

    $http({
        method: 'GET',
        url: url
    }).then(function successCallback(response) {
        // $scope.topList=response.data[0].activity_category_name;
        console.log(response.data);
        $scope.array=response.data;
  
        // console.log($scope.array)
    	//     var data1 = response.data.activity_start_datatime;
    	//     var date = new Date(data1)
  		// var a = date.getFullYear()
  		// console.log(a);
  		var activity_id = response.data[0].activity_id
		console.log(activity_id) ;		
	    $scope.school=[
				        {id:1,name:'西昌学院',team:'白开水',url:''},
				        {id:2,name:'西华大学',team:'众筹'},
				        {id:3,name:'四川大学',team:'微薄之力'},
				        {id:4,name:'成都理工大学',team:'给劲'},
				        {id:5,name:'电子科技大学',team:'圆梦'}
	        		];

	        		  console.log($scope.school);
	    $scope.team
	     	=[
		        {name:'白开水'},
		        {name:'众筹'},
		        {name:'微薄之力'},
		        {name:'给劲'},
		        {name:'圆梦'}
			];
	    }, function errorCallback(response) {
	        

	    });



  //   $scope.school=[
		// 	        {name:'西昌学院',team:'白开水'},
		// 	        {name:'西华大学',team:'众筹'},
		// 	        {name:'四川大学',team:'微薄之力'},
		// 	        {name:'成都理工大学',team:'给劲'},
		// 	        {name:'电子科技大学',team:'圆梦'}
  //       		];
  //       		  console.log($scope.school);
  //    $scope.team
  //    	=[
	 //        {name:'白开水'},
	 //        {name:'众筹'},
	 //        {name:'微薄之力'},
	 //        {name:'给劲'},
	 //        {name:'圆梦'}
		// ];
      
  //   $scope.activity
  //   	=[
	 //        {name:'敬老院',count:'10',time:'2018-03-21',outtime:'03-26',img:'res/images/1.png'},
	 //        {name:'捡垃圾',count:'100',time:'2018-03-22',outtime:'03-27',img:'res/images/1.png'},
	 //        {name:'扫楼梯',count:'15',time:'2018-03-23',outtime:'03-28',img:'res/images/1.png'},
	 //        {name:'整理图书馆',count:'3',time:'2018-03-24',outtime:'03-29',img:'res/images/1.png'},
	 //        {name:'文明过马路',count:'30',time:'2018-03-25',outtime:'03-30',img:'res/images/2.png'},     
	 //        {name:'文明乘车',count:'3',time:'2018-03-26',outtime:'03-1',img:'res/images/2.png'},     
	 //        {name:'禁止酒驾',count:'5',time:'2018-03-27',outtime:'03-3',img:'res/images/2.png'},     
		// ];
});