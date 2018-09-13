var common = {};
$(document).ready(function() {
	var user = JSON.parse(window.localStorage.getItem('todays'));
	$('.username').text(user.username);
});

$('#logout').bind('click', function() {

	$.ajax({
		type: 'POST',
		url: '/logout',
		success: function(res) {
			console.log('logout success...');
			
			var protocol = document.location.protocol;
		    var hostname = window.location.hostname;
		    var port = document.location.port;

		    // 식자재 폐기등록 사진파일 업로드용  API PREFIX
		    document_root = protocol + '//' + hostname + ':' + port;
			$(location).attr('href', document_root);
			return false;
		}
	})

});


$('#reservation').bind('click', function() {

	var protocol = document.location.protocol;
    var hostname = window.location.hostname;
    var port = document.location.port;

    // 식자재 폐기등록 사진파일 업로드용  API PREFIX
    var page = protocol + '//' + hostname + ':' + port + '/member/reservation';
	$(location).attr('href', page);
	return false;

});

function goPage(page, params) {
	var protocol = document.location.protocol;
    var hostname = window.location.hostname;
    var port = document.location.port;

    // 식자재 폐기등록 사진파일 업로드용  API PREFIX
    var url = protocol + '//' + hostname + ':' + port + '/' + page;
    //window.location = "news_edit.html?article_id=" + articleId;
	$(location).attr('href', url);
	//return false;
}

