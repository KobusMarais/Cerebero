angular.module('nodeLogin', [])
.controller('mainController', ($scope, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/api/login', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.userData = data;
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then(function (data) {
            //want redirection
            $window.location.href = '/loadGame';
        }, function (error) {
        });
    };

    $scope.redirect = function(){
        window.location = "/register";
    }

    // Create a new user
    // $scope.createUser = () => {
    //     $http.post('/register', $scope.formData)
    //     .success((data) => {
    //         $scope.formData = {};
    //         $scope.userData = data;
    //         console.log(data);
    //     })
    //     .error((error) => {
    //         console.log('Error: ' + error);
    //     });
    // };
    // // Delete a user
    // $scope.deleteUser = (userID) => {
    //     $http.delete('/api/v1/users/' + userID)
    //     .success((data) => {
    //         $scope.userData = data;
    //         console.log(data);
    //     })
    //     .error((data) => {
    //         console.log('Error: ' + data);
    //     });
    // };
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
                 console.log(data);
             })
             .error((error) => {
                 console.log('Error: ' + error);
             })
             .then(function (data) {
                 //want redirection
                 $window.location.href = '/login';
             }, function (error) {
             });
     };

     $scope.redirect = function(){
         window.location = "/login";
     }
 });
    // // Insert user profile into the DB
    // $scope.setUserProfile = () => {
    //     $http.post('/api/v1/createProfile', $scope.formData)
    //     .success((data) => {
    //         $scope.formData = {};
    //         $scope.userData = data;
    //         console.log(data);
    //     })
    //     .error((error) => {
    //         console.log('Error: ' + error);
    //     });
    // };

/*

 // User profiles
 angular.module('nodeLogin', [])
 .controller('mainController', ($scope, $http) => {
     $scope.formData = {};
     $scope.userData = {};

    $scope.slider = {
        value: 100,
        options: {
            showSelectionBar: true
        }
    };

    // Login a registered user
    $scope.loginUser = () => {
        $http.post('/api/v1/loginUsers', $scope.formData)
        .success((data) => {
            $scope.formData = {};
            $scope.userData = data;
            console.log(data);
            $window.$location.$http  = '/profile.html'
            // router.get('/', (req, res, next) => {
            //     res.sendFile(path.join(
            //       __dirname, '..', 'Public', 'register.html'));
            //   });
        })
        .error((error) => {
            console.log('Error: ' + error);
        });
    };
});  */
