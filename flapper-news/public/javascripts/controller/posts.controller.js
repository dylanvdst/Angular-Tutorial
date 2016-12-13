angular
	.module('flapperNews')
	.controller('PostCtrl', PostCtrl);

function PostCtrl($scope, posts, post, auth) {

	$scope.post = post;
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.addComment = function() {
		if(!$scope.body || $scope.body === '') {return;}

		posts.addComment(post._id, {
			body: $scope.body,
			author: 'user'
		}).success(function(comment) {
			$scope.post.comments.push(comment);
		});

		$scope.body = '';
	};

	$scope.deleteComment = function(comment) {
		posts.deleteComment(post, comment);
	};

	$scope.incrementUpvotes = function (comment) {
		posts.upvoteComment(post, comment);
	};

	$scope.decrementUpvotes = function (comment) {
		posts.downvoteComment(post, comment);
	};

	$scope.isCommentOwner = function(comment) {
		return comment.authorId === auth.currentUserId();
	};

};
