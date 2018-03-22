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
            }
        }
    });


    $urlRouterProvider.otherwise("/tab/home");

})
