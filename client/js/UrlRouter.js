app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('tabs', {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html"
        })
        .state('tabs.home', {
            url: "/home",
            views: {
                'home-tab': {
                    templateUrl: "templates/home.html",
                    controller: 'iNeedUCtrl'
                }
            }
        })
        .state('tabs.find', {
            url: "/find",
            views: {
                'find-tab': {
                    templateUrl: "templates/find.html",
                    controller: 'FindTabCtrl'
                }
            }
        })
        .state('tabs.mine', {
        url: "/mine",
        views: {
            'mine-tab': {
                templateUrl: "templates/mine.html"
                //controller: 'mineCtrl'
            }
        }
        })
        // 活动路由
        .state("activityInfo", {
            templateUrl: "templates/activityInfo.html",
            cache:false,
            url: "/activityInfo/:id",
            controller: "activityInfo"
        })
        // 团队路由
        .state("teamInfo", {
            templateUrl: "templates/teamInfo.html",
            url: "/teamInfo/:id",
            controller: "teamController"
        })
        .state('userAttention', {
            url: "/userAttention",
            templateUrl: "templates/userAttention.html",
            controller: 'userAttentionCtrl'
        })
        .state('userInform', {
            url: "/userInform",
            templateUrl: "templates/userInform.html",
            controller: 'userInformCtrl'
        })
        .state('userMsg', {
            url: "/userMsg",
            templateUrl: "templates/userMsg.html",
            controller: 'userMsgCtrl'
        })
        .state('volunteerCourse', {
            url: "/volunteerCourse",
            templateUrl: "templates/volunteerCourse.html",
            controller: 'volunteerCourseCtrl'
        })
        .state('teamMsg', {
            url: "/teamMsg",
            templateUrl: "templates/teamMsg.html",
            controller: 'teamMsgCtrl'
        })
        .state('teamInform', {
            url: "/teamInform",
            templateUrl: "templates/teamInform.html",
            controller: 'teamInformCtrl'
        })
        .state('activityContent', {
            url: "/activityContent/:id",
            cache:false,
            templateUrl: "templates/activityContent.html",
            controller: 'activityContentCtrl'
        })
        .state('userjoinActivityInfo', {
            url: "/userjoinActivityInfo/:id",
            cache:false,
            templateUrl: "templates/userjoinActivityInfo.html",
            controller: 'userjoinActivityInfoCtrl'
        });


    $urlRouterProvider.otherwise("/tab/mine");

})
