
$(document).ready(function() {
	var template = $('#reservation-template').html();

	$.ajax({
		type: 'GET',
		url: '/api/member/reservation',
		data: {storCd: '001', memberNo: '00001'},
		success: function(res) {
			console.log('query reservation fetch success...');
			var html = Mustache.render(template, {list: res});
			$('#reservation').append(html);
		}
	})
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
    var page = protocol + '//' + hostname + ':' + port + '/reservation.jsp';
	$(location).attr('href', page);
	return false;

});

