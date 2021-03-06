angular
	.module('flapperNews')
	.factory('auth', authFactory);

function authFactory($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['flapper-news-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['flapper-news-token'];
	};

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if(token) {
			var playload = JSON.parse($window.atob(token.split('.')[1]));
			return playload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function() {
		if(auth.isLoggedIn()) {
			var token = auth.getToken();
			var playload = JSON.parse($window.atob(token.split('.')[1]));
			return playload.username;
		}
	};

	auth.currentUserId = function() {
		if(auth.isLoggedIn()) {
			var token = auth.getToken();
			var playload = JSON.parse($window.atob(token.split('.')[1]));
			return playload._id;
		}
	};

	auth.register = function(user) {
		return $http.post('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logOut = function() {
		$window.localStorage.removeItem('flapper-news-token');
	};

	return auth;
};
