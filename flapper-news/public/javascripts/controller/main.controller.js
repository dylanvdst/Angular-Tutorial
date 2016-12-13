angular
	.module('flapperNews')
	.controller('MainCtrl', MainCtrl);

function MainCtrl($scope, posts, auth) {

	$scope.posts = posts.posts;
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.addPost = function () {
		if(!$scope.title || $scope.title === '') {return;}

		posts.create({
			title: $scope.title,
			link: $scope.link
		});

		$scope.title = '';
		$scope.link = '';
	};

	$scope.deletePost = function(post) {
		posts.delete(post);
	};

	$scope.incrementUpvotes = function(post) {
		posts.upvote(post);
	};

	$scope.decrementUpvotes = function(post) {
		posts.downvote(post);
	};

	$scope.isPostOwner = function(post) {
		return post.authorId === auth.currentUserId();
	};

};
