angular
	.module('flapperNews')
	.factory('posts', postFactory);

function postFactory($http, auth) {
	var o = {
		posts: []
	};

	o.get = function(id) {
		return $http.get('/posts/' + id).then(function(res) {
			return res.data;;
		});
	};

	o.getAll = function() {
		return $http.get('/posts').success(function(data) {
			angular.copy(data, o.posts);
		});
	};

	o.create = function(post) {
		post.authorId = auth.currentUserId();
		return $http.post('/posts', post, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			o.posts.push(data);
		});
	};

	o.delete = function(post) {
		return $http.delete('/posts/' + post._id, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function() {
			o.posts.splice(o.posts.indexOf(post), 1);
		});
	};

	o.upvote = function(post) {
		return $http.put('/posts/' + post._id + '/upvote', null, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			post.upvotes += 1;
		});
	};

	o.downvote = function(post) {
		return $http.put('/posts/' + post._id + '/downvote', null, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			post.upvotes -= 1;
		});
	};

	o.addComment = function(id, comment) {
		comment.authorId = auth.currentUserId();
		return $http.post('/posts/' + id + '/comments', comment, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.deleteComment = function(post, comment) {
		return $http.delete('/posts/' + post._id + '/comments/'+ comment._id, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function() {
			post.comments.splice(post.comments.indexOf(comment), 1);
		});
	};

	o.upvoteComment = function(post, comment) {
		return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			comment.upvotes += 1;
		});
	};

	o.downvoteComment = function(post, comment) {
		return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote', null, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data) {
			comment.upvotes -= 1;
		});
	};

	return o;
};
