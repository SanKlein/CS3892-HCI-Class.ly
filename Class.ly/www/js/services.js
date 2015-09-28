var base = 'http://localhost:3000';

angular.module('classly.services', [])

.factory('UserFactory', ['$q', '$http', function($q, $http) {
    return {

        login: function (user) {

            var deferred = $q.defer();

            $http.post(base + '/login', user)
                .success(function (user) {
                    deferred.resolve(user);
                })
                .error(function (err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;
        }
    }
}])

.factory('CourseFactory', ['$q', '$http', function($q, $http) {
    return {

        create: function (course) {

            var deferred = $q.defer();

            $http.post(base + '/course/create', course)
                .success(function (newCourse) {
                    deferred.resolve(newCourse);
                })
                .error(function (err) {
                    deferred.reject(err);
                })
            ;

            return deferred.promise;
        },

      getAllCourses: function() {
        var deferred = $q.defer();

        $http.get(base + '/course/all')
          .success(function (courses) {
            deferred.resolve(courses);
          })
          .error(function (err) {
            deferred.reject(err);
          })
        ;

        return deferred.promise;
      },

      getMyCourses: function(user) {
        var deferred = $q.defer();

        $http.get(base + '/course/my', user)
          .success(function (courses) {
            deferred.resolve(courses);
          })
          .error(function(err) {
            deferred.reject(err);
          })
        ;

        return deferred.promise;
      },

      add : function(course) {
        var deferred = $q.defer();

        $http.post(base + '/course/add', course)
          .success(function (course) {
            deferred.resolve(course);
          })
          .error(function(err) {
            deferred.reject(err);
          })
        ;

        return deferred.promise;
      }
    }
}]);
