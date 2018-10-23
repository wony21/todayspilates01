var common = {};
$(function() {
	var user = JSON.parse(window.localStorage.getItem('todays'));
	$('.username').text(user.username);
});

