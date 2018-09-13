var common = {};
$(document).ready(function() {
	var reservation = $('#reservation-template').html();
	var summary = $('#summary-template').html();
	var user = JSON.parse(window.localStorage.getItem('todays'));
	$('.username').text(user.username);
	
	$.ajax({
		type: 'GET',
		url: '/api/member/reservation',
		data: {storCd: user.storCd, memberNo: user.memberNo},
		success: function(res) {
			res.forEach(function(n) {
				n.rsvDt = ax5.util.date((n.rsvDt == null) ? '' : n.rsvDt, {return: 'yyyy/MM/dd'});
				n.lsnEdDt = ax5.util.date((n.lsnEdDt == null) ? '' : n.lsnEdDt, {return: 'yyyy/MM/dd'});
			})
			var html = Mustache.render(reservation, {list: res});
			$('#reservation-container').append(html);
		}
	});
	
	$.ajax({
		type: 'GET',
		url: '/api/member/lesson/summary',
		data: {storCd: user.storCd, memberNo: user.memberNo},
		success: function(res) {
			var html = Mustache.render(summary, {list: res});
			$('#summary-container').append(html);
			$('#lsnUseSum').text(res[0].lsnUseSum);
			//console.log('memberNo:' + {memberNo})
		}
	});
});

$("#reservation-container").on('click', 'tbody tr', function(e) {
	let lsnCd = $(this).data('id');
	let lsnNm = $(this).find('td').eq(0).text();
	let empNm = $(this).find('td').eq(3).text();
	let user = JSON.parse(window.localStorage.getItem('todays'));
	user.lsnCd = lsnCd;
	user.lsnNm = lsnNm;
	user.empNm = empNm;
	window.localStorage.setItem('todays', JSON.stringify(user));
	
	//goPage('member/reservation-detail');
	goPage('/member/reservation_detail');
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

