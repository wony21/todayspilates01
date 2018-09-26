var common = {};
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];
$(document).ready(function() {
	let user = JSON.parse(window.localStorage.getItem('todays'));
	let newReservation = $('#new-reservation-template').html();
	let reservation = $('#reservation-template').html();
	let curr = new Date; // get current date
	let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	let last = first + 6; // last day is the first day + 6
	let days = [];
	let thead = '<tr style="text-align:center; height: 40px;">';
	let tbody = '<tr data-id="" style="text-align: center; vertical-align: middle; height: 40px;">';
	let today = curr.getDate();
	for (var i = first, idx = 0; i <= last; i++) {
		if (i !== today) {
			thead += '<th>' + WEEKS[idx++] + '</th>';
			tbody += '<td>' + i + '</td>';
		} else {
			thead += '<th class="today">' + WEEKS[idx++] + '</th>';
			tbody += '<td class="today">' + i + '</td>';
		}
	}
	$('.username').text(user.username);
	var html = Mustache.render(newReservation, {list: []});
	$('#new-reservation-container').html(html);
	
	//강사목록 조회 
	$.ajax({
		type: 'GET',
		url: '/api/teacher',
		data: {storCd: user.storCd},
		success: function(res) {
			let option = '<option value="">선생님 선택</option>';
			res.forEach(function(n) {
				 option += ' <option value="' + n.empNo + '">' + n.empNm +
                 '</option> ';
			})
			$('#teacher').html(option);
			$('#teacher').val(user.empNo);	//로그인한 선생님으로 선택 
			getPrivateLesson();
		}
	});
	
	function getPrivateLesson() {
		let search = getData();
		console.log(search);
		$.ajax({
			type: 'GET',
			url: '/api/teacher/reservation/list',
			data: search,
			success: function(res) {
				res.forEach(function(n) {
					//n.rsvDt = ax5.util.date((n.rsvDt == null) ? '' : n.rsvDt, {return: 'yyyy/MM/dd'});
					//n.lsnEdDt = ax5.util.date((n.lsnEdDt == null) ? '' : n.lsnEdDt, {return: 'yyyy/MM/dd'});
					n.rsvDt = (n.rsvDt == null) ? '(예약없음)' : n.rsvDt.substr(4, 2) + '.' + n.rsvDt.substr(6, 7);	// yy-mm-dd
					n.rsvTm = (n.rsvTm == null) ? '' : n.rsvTm.substr(0, 2) + ':' + n.rsvTm.substr(2, 3);  // hh:mm
					n.lsnEdDt = (n.lsnEdDt == null) ? '' : ('`' + n.lsnEdDt.substr(2, 2) + '.' + n.lsnEdDt.substr(4, 2) + '.' + n.lsnEdDt.substr(6, 7));	// yy-mm-dd
					n.lsnTm = Number(n.lsnTm).toFixed(1);
					n.dy = (n.dy == null) ? '' : '(' + n.dy + ')';
					n.lsnData = JSON.stringify(n);
				});
				var html = Mustache.render(reservation, {list: res});
				$('#reservation-container').html(html);
			}
		});
	}

	function getData() {
		return {
			storCd: user.storCd,
			memberNm: $('#filter').val(),
			empNo: $('#teacher').val(),
			sttDt: ax5.util.date(new Date(), {return: 'yyyyMMdd'}),
			endDt: '99991231'
		}
	}
	
	$(document.body).on('change', '#teacher', function(e) {
		//var optionSelected = $("option:selected", this);
		getPrivateLesson();
	});
	
	$("#date-container").on('click', 'td', function(e) {
		let searchDate = $(this).text();
		
		let selected = $(this).hasClass("selected");
	    $("#date-container td").removeClass("selected");
	    if(!selected) {
	    	$(this).addClass("selected");
	    }
	});
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

$("#reservation-container").on('click', 'tbody tr', function(e) {
	let lnsData = $(this).data('id');
	console.log(lnsData);
	
	
	
//	user.lsnCd = lsnCd;
//	user.lsnNm = lsnNm;
//	user.empNm = empNm;
//	window.localStorage.setItem('todays', JSON.stringify(user));
	
	//goPage('member/reservation-detail');
	//goPage('/member/reservation_detail');
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
