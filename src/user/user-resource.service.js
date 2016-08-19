(function () {
    'use strict';
    angular.module('app.user')
        .service('UserResourceService', UserResourceService);
    UserResourceService.$inject = ['$resource', 'API_HOST', 'USER_CONTEXT'];

    function UserResourceService($resource, API_HOST, USER_CONTEXT) {
        var userResource = $resource(API_HOST + USER_CONTEXT + ':action', {}, {
            changePassword: {
                method: 'PUT',
                url: API_HOST + USER_CONTEXT + 'changePassword?param=username::username',
                params: {
                    username: '@username'
                }
            },
            updateProfile: {
                method: 'PUT',
                url: API_HOST + USER_CONTEXT + 'updateProfile?param=username::username',
                params: {
                    username: '@username'
                }
            },
            userPassword: {
                method: 'GET',
                url: API_HOST + USER_CONTEXT + 'userPassword?param=username::username',
                params: {
                    username: '@username'
                }
            },
            register: {
                method: 'POST',
                url: API_HOST + USER_CONTEXT + 'register'
            }
        });

        return {
            getUserProfile: getUserProfile,
            changePassword: changePassword,
            updateAvatar: updateAvatar,
            getUserPassword: getUserPassword,
            register: register
        };

        function getUserProfile(username, callback) {
            return userResource.get({
                action: 'userProfile',
                param: 'username:' + username
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function changePassword(username, password, callback) {
            return userResource.changePassword({
                username: username,
                password: password
            },
                function () {
                    callback();
                },
                function (err) {
                    callback(err);
                });
        }

        function updateAvatar(username, avatarId, callback) {
            return userResource.updateProfile({
                username: username,
                avatarId: avatarId
            },
                function () {
                    callback();
                },
                function (err) {
                    callback(err);
                });
        }

        function getUserPassword(username, callback) {
            return userResource.userPassword({
                username: username
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function register(username, email, password, firstname, lastname, callback) {
            return userResource.register({
                username: username,
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();