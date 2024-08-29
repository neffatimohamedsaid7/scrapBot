var app = angular.module('myApp', []);

        app.controller('MyController', function($scope) {
            $scope.openElectronApp = function() {
                // Make an HTTP request to the Node.js server to open the Electron app
                fetch('http://localhost:3000/open-electron-app')
                    .then(response => {
                        if (response.ok) {
                            console.log('Electron app opened');
                        } else {
                            console.error('Failed to open Electron app');
                        }
                    })
                    .catch(error => console.error('Error:', error));
            };
        });