angular.module('classly.controllers', [])

  .controller('ClasslyCtrl', ['$rootScope', function($rootScope) {

      }
  ])

  .controller('LoginCtrl', ['$rootScope', '$scope', 'UserFactory', '$window', '$location', function($rootScope, $scope, UserFactory, $window, $location) {

      $scope.user = {
          username: '',
          password: ''
      };

      $scope.login = function() {
          UserFactory.login($scope.user).then(function(user) {

              console.log(user);

              $rootScope.currentUser = user; // used to keep track of current user
              $rootScope.currentUser.username = $rootScope.currentUser.username.charAt(0).toUpperCase() + $rootScope.currentUser.username.slice(1);

              $window.location.assign('#/courses');

          });
      };

  }])

  .controller('CourseCtrl', ['$rootScope', '$scope', 'CourseFactory', function($rootScope, $scope, CourseFactory) {
      $scope.courses = [];

    CourseFactory.getMyCourses($rootScope.currentUser).then(function(courses) {
      if (courses.length) {
        $scope.courses = courses;
      }
    });

      $scope.loadCourse = function(course) {
        $rootScope.currentCourse = course;
        $window.location.assign('#/tab/chat');
      }
  }])

  .controller('AddCourseCtrl', ['$rootScope', '$scope', 'CourseFactory', function($rootScope, $scope, CourseFactory) {

      $scope.courses = [];

      CourseFactory.getAllCourses().then(function(courses) {
        if (courses.length) {
          $scope.courses = courses;
        }
      });

    $scope.addCourse = function(course) {
      course.user = $rootScope.currentUser._id;
      CourseFactory.add(course).then(function(course) {
        console.log('course added');
      })
    };

  }])

  .controller('NewCourseCtrl', ['$scope', '$rootScope', 'CourseFactory', '$location', '$window',
    function($scope, $rootScope, CourseFactory, $location, $window) {

      $scope.newCourse = {
        title: ''
      };

      $scope.createNewCourse = function() {
        CourseFactory.create($scope.newCourse).then(function(course) {
          $window.location.assign('#/add/course');
        });
      };
    }
  ])

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

  .controller('GroupsCtrl', function($scope, $stateParams, Chats) {
      $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('MeetupCtrl', function($scope) {

  });
