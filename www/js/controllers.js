angular.module('classly.controllers', [])

  .controller('ClasslyCtrl', ['$rootScope', function($rootScope) {

      }
  ])

  .controller('LoginCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', function($rootScope, $scope, UserFactory, $window) {

      $scope.user = {
          username: '',
          password: ''
      };

      $scope.login = function() {
          var username = $scope.user.username;
          username = username.toLowerCase();
          username = username.charAt(0).toUpperCase() + username.slice(1);
          $scope.user.username = username;

          UserFactory.login($scope.user).then(function(user) {

              console.log(user);
              $rootScope.currentUser = user; // used to keep track of current user

              $window.location.assign('#/courses');

          });
      };

  }])

  .controller('CourseCtrl', ['$rootScope', '$scope', 'CourseFactory', '$window', function($rootScope, $scope, CourseFactory, $window) {
    $scope.courses = [];

    CourseFactory.getMyCourses($rootScope.currentUser).then(function(courses) {
      if (courses.length) {
        $scope.courses = courses;
      }
    });

      $scope.loadCourse = function(course) {
        $rootScope.currentCourse = course;
        $window.location.assign('#/groups');
      }
  }])

  .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', function($rootScope, $scope, GroupFactory, $window) {
    $scope.groups = [];

    $rootScope.currentCourse.user = $rootScope.currentUser._id;

    GroupFactory.getMyGroups($rootScope.currentCourse).then(function(){});
  }])

  .controller('ChatCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

      $scope.chats = Chats.all();
      $scope.remove = function(chat) {
          Chats.remove(chat);
      };
  })

  .controller('MeetupCtrl', function($scope) {

  });
