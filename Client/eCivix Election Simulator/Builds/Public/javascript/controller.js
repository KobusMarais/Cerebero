// User Login
angular.module('nodeLogin', [])
.controller('mainController', ($scope, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/api/login', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.userData = data;
                $window.localStorage.setItem('accessToken',data.access_token);
                $window.location.href = '/loadGame';
            })
            .error((error) => {
                console.log('Error: ' + error);
            }, function (error) {
        });
    };

    $scope.redirect = function(){
        window.location = "/register";
    }
});

 // User Registration
 angular.module('nodeRegistration', [])
 .controller('mainController', ($scope, $http, $window) => {
     $scope.formData = {};
     $scope.userData = {};

     // Create a new user
     $scope.createUser = () => {
         $http.post('/api/register', $scope.formData)
             .success((data) => {
                 $scope.formData = {};
                 $scope.userData = data;
                 $window.location.href = '/login';
             })
             .error((error) => {
                 console.log('Error: ' + error);
             }, function (error) {
         });
     };

     $scope.redirect = function(){
         window.location = "/login";
     }
 });
