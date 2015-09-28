// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('classly', ['ionic', 'classly.controllers', 'classly.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('courses', {
        url: '/courses',
        templateUrl: 'templates/courses.html',
        controller: 'CourseCtrl'
    })

    .state('addCourse', {
        url: '/add/course',
        templateUrl: '/templates/addCourse.html',
        controller: 'AddCourseCtrl'
    })

    .state('addNewCourse', {
        url: '/add/course/new',
        templateUrl: 'templates/newCourse.html',
        controller: 'NewCourseCtrl'
    })

    // setup an abstract state for the tabs directive
        .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.chat', {
        url: '/chat',
        views: {
            'tab-dash': {
                templateUrl: 'templates/tab-chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

    .state('tab.groups', {
        url: '/groups',
        views: {
            'tab-chats': {
                templateUrl: 'templates/tab-groups.html',
                controller: 'GroupsCtrl'
            }
        }
      })
      /*
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-chats': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })
      */

    .state('tab.meetups', {
        url: '/meetups',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-meetups.html',
                controller: 'MeetupCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
