// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('classly', ['ionic', 'classly.controllers', 'classly.services', 'ionic-datepicker', 'ionic-timepicker'])

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
        cache: false,
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('courses', {
        cache: false,
        url: '/courses',
        templateUrl: 'templates/courses.html',
        controller: 'CourseCtrl'
    })

    .state('addCourses', {
      cache: false,
      url: '/courses/add',
      templateUrl: 'templates/addCourses.html',
      controller: 'AddCourseCtrl'
    })

    .state('groups', {
      cache: false,
      url: '/groups',
      templateUrl: 'templates/groups.html',
      controller: 'GroupCtrl'
    })

    .state('addGroup', {
      cache: false,
      url: '/groups/add',
      templateUrl: 'templates/newGroup.html',
      controller: 'AddGroupCtrl'
    })

    // setup an abstract state for the tabs directive
        .state('tab', {
          cache: false,
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.chat', {
        cache: false,
        url: '/chat',
        views: {
            'tab-chat': {
                templateUrl: 'templates/tab-chat.html',
                controller: 'ChatCtrl'
            }
        }
    })

      .state('chatSettings', {
        cache: false,
        url: '/chat/setting',
        templateUrl: 'templates/chatSettings.html'
      })

    .state('tab.meetups', {
        cache: false,
        url: '/meetups',
        views: {
            'tab-meetups': {
                templateUrl: 'templates/tab-meetups.html',
                controller: 'MeetupsCtrl'
            }
        }
    })

    .state('meetup', {
        cache: false,
        url: '/meetup',
        templateUrl: 'templates/meetup.html',
        controller: 'MeetupCtrl'
    })

    .state('addMeetup', {
      cache: false,
      url: '/meetups/add',
      templateUrl: 'templates/newMeetup.html',
      controller: 'AddMeetupCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
