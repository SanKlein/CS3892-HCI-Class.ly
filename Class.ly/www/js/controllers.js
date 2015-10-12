angular.module('classly.controllers', [])

  .controller('ClasslyCtrl', ['$rootScope', '$ionicSideMenuDelegate', '$window', function($rootScope, $ionicSideMenuDelegate, $window) {

        $rootScope.logout = function() {
          $rootScope.currentUser = null;

          $window.location.assign('#/login');
        };

        $rootScope.openMenu = function () {
          $ionicSideMenuDelegate.toggleLeft();
        };

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
              $rootScope.currentUser = user; // used to keep track of current user

              $window.location.assign('#/courses');
          });
      };

  }])

  .controller('CourseCtrl', ['$rootScope', '$scope', 'CourseFactory', '$window', '$ionicListDelegate', function($rootScope, $scope, CourseFactory, $window, $ionicListDelegate) {
    $scope.courses = [];

    CourseFactory.getMyCourses($rootScope.currentUser).then(function(courses) {
      if (courses.length) {
        $scope.courses = courses;
      }
    });

    $scope.loadCourse = function(course) {
      $rootScope.currentCourse = course;
      $window.location.assign('#/groups');
    };

    $scope.remove = function(post, index) {
      $scope.courses.splice(index, 1);
      $ionicListDelegate.closeOptionButtons();
    };
  }])

  .controller('AddCourseCtrl', ['$rootScope', '$scope', 'CourseFactory', '$window', function($rootScope, $scope, CourseFactory, $window) {
    $scope.course = {
      courses: [],
      query: ''
    };

    CourseFactory.getMyCourses($rootScope.currentUser).then(function(courses) {
      if (courses) {
        for (var i = 0; i < courses.length; i++) {
          (function(index) {
              courses[index].added = false;
              $scope.course.courses.push(courses[index]);
          })(i);
        }
      }
    });

    $scope.addCourse = function(course, index) {
      $scope.course.courses[index].added = !course.added;
    };
  }])

  .controller('GroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', '$ionicListDelegate', function($rootScope, $scope, GroupFactory, $window, $ionicListDelegate) {
    $scope.groups = [];

    $rootScope.currentCourse.user = $rootScope.currentUser._id;

    GroupFactory.getMyGroups($rootScope.currentCourse).then(function(groups) {
      $scope.groups = groups;
    });

    $scope.loadGroup = function(group) {
      $rootScope.currentGroup = group;
      $window.location.assign('#/tab/chat');
    };

    $scope.remove = function(post, index) {
      $scope.groups.splice(index, 1);
      $ionicListDelegate.closeOptionButtons();
    };
  }])

  .controller('AddGroupCtrl', ['$rootScope', '$scope', 'GroupFactory', '$window', 'UserFactory', function($rootScope, $scope, GroupFactory, $window, UserFactory) {
    $scope.group = {
      title: '',
      users: []
    };

    UserFactory.all().then(function(users) {
      if (users) {
        for (var i = 0; i < users.length; i++) {
          (function(index) {
            users[index].added = false;
            $scope.group.users.push(users[index]);
          })(i);
        }
      }
    });

    $scope.addUser = function(user, index) {
      $scope.group.users[index].added = !user.added;
    };

    $scope.createGroup = function() {
      var group = {
        title: $scope.group.title,
        course: $rootScope.currentCourse._id
      };

      GroupFactory.create(group).then(function(group) {
        $window.location.assign('#/groups');
      });
    };
  }])

  .controller('ChatCtrl', ['$rootScope', '$scope', 'ChatFactory', '$window', function($rootScope, $scope, ChatFactory, $window) {

    $scope.chatroom = {
      chats: [],
      text: ''
    };

    ChatFactory.getChat().then(function(chats) {
      if (chats.length) {
        for (var i = 0; i < chats.length; i++) {
          (function(index) {
            chats[index].liked = false;
            $scope.chatroom.chats.push(chats[index]);
          })(i);
        }
      }
    });

    $scope.likeChat = function(chat, index) {
      $scope.chatroom.chats[index].liked = !chat.liked;
    };

    $scope.addChat = function() {
      console.log('add chat clicked');
      var newChat = {
        text: $scope.chatroom.text,
        user_id: $rootScope.currentUser._id,
        user_username: $rootScope.currentUser.username,
        course : $rootScope.currentCourse._id,
        group: $rootScope.currentGroup._id
      };

      ChatFactory.create(newChat).then(function(chat) {
        console.log(chat);
        if ($scope.chatroom.chats) {
          $scope.chatroom.chats.push(chat);
        } else {
          $scope.chatroom.chats = [chat];
        }
      });

      $scope.chatroom.text = '';
    };
  }])

  .controller('MeetupCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', function($rootScope, $scope, MeetupFactory, $window) {
    $scope.meetups = [];

    MeetupFactory.all().then(function(meetups) {
      console.log('all meetups found');
      console.log(meetups);
      if (meetups) {
        $scope.meetups = meetups;
      }
    });

  }])

  .controller('AddMeetupCtrl', ['$rootScope', '$scope', 'MeetupFactory', '$window', 'UserFactory', function($rootScope, $scope, MeetupFactory, $window, UserFactory) {
    $scope.meetup = {
      date: '',
      time: '',
      location: '',
      users: []
    };

    UserFactory.all().then(function(users) {
      if (users) {
        for (var i = 0; i < users.length; i++) {
          (function(index) {
            users[index].added = false;
            $scope.meetup.users.push(users[index]);
          })(i);
        }
      }
    });

    $scope.addUser = function(user, index) {
      $scope.meetup.users[index].added = !user.added;
    };

    $scope.createMeetup = function() {
      var meetup = {
        date: $scope.meetup.date,
        time: $scope.meetup.time,
        location: $scope.meetup.location,
        course: $rootScope.currentCourse._id,
        group: $rootScope.currentGroup._id
      };
      console.log('created meetup');
      console.log(meetup);

      MeetupFactory.create(meetup).then(function(group) {
        $window.location.assign('#/tab/meetups');
      });
    };
  }]);

