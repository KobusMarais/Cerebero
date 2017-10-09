angular.module('nodeLogin', [])
.controller('mainController', ($scope, $location, $http, $window) => {
    $scope.loginUser = () => {
        $http.post('/login', $scope.formData)
            .success((data) => {
                $scope.formData = {};
                $scope.userData = data;
            })
            .error((error) => {
                console.log('Error: ' + error);
            });
    };

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

 // User profiles 
 angular.module('nodeProfile', [])
 .controller('mainController', ($scope, $http) => {
     $scope.formData = {};
     $scope.userData = {};
    
    $scope.slider = {
        value: 100,
        options: {
            showSelectionBar: true
        }
    };
     // Create a new user
     $scope.createUser = () => {
         $http.post('/register', $scope.formData)
             .success((data) => {
                 $scope.formData = {};
                 $scope.userData = data;
                 console.log(data);
             })
             .error((error) => {
                 console.log('Error: ' + error);
             });
     };

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
});
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
            //       __dirname, '..', 'public', 'index.html'));
            //   });
        })
        .error((error) => {
            console.log('Error: ' + error);
        });
    };
});  */
