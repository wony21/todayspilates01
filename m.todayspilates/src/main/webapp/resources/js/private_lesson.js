var common = {};
$(document).ready(function() {
	var user = JSON.parse(window.localStorage.getItem('todays'));
	var searchDate = $('#date-template').html();
	var reservation = $('#reservation-template').html();
	var curr = new Date; // get current date
	var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
	var last = first + 6; // last day is the first day + 6
	var days = [];
	
	for (var i = first; i <= last; i++) {
		days.push({ key: i });
	}
	var html = Mustache.render(searchDate, {list: days});
	$('#date-container').append(html);
	$('.username').text(user.username);
	
	$.ajax({
		type: 'GET',
		url: '/api/member/reservation',
		data: {storCd: storCd, memberNo: memberNo},
		success: function(res) {
			res.forEach(function(n) {
				n.rsvDt = ax5.util.date(n.rsvDt, {return: 'yyyy/MM/dd'});
				n.lsnEdDt = ax5.util.date(n.lsnEdDt, {return: 'yyyy/MM/dd'});
			})
			var html = Mustache.render(reservation, {list: res});
			$('#reservation-container').append(html);
		}
	});
});

$("#date-container").on('click', 'td', function(e) {
	let seldate = $(this).text();
	console.log('date:' + seldate);
	alert('선택일자: ' + seldate);
	
	//goPage('/member/reservation_detail');
	//$(location).attr('href', 'http://localhost:5050/member/reservation_detail');
});

$(document.body).on('change', '.attend-process', function(e) {
	//var optionSelected = $("option:selected", this);
	let value = $(this).val();
	console.log('value:' + value);
	if (value === '1') {
		let result = confirm('출석처리 하겠습니까?');
		if (result) {
			//출석처리 
		}
	} else if (value === '2') {
		let result = confirm('결석처리 하겠습니까?');
		if (result) {
			
		}
	} else if (value === '3') {
		let result = confirm('정말 삭제하겠습니까?');
		if (result) {
			
		}
	}
	
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

function makeWeekSelectOptions() {
    var year = $("#sh_year").val();
    var month = $("#sh_month").val();
    var today = new Date();
    var sdate = new Date(year, month-1, 01);
    var lastDay = (new Date(sdate.getFullYear(), sdate.getMonth()+1, 0)).getDate();
    var endDate = new Date(sdate.getFullYear(), sdate.getMonth(), lastDay);
    var week = sdate.getDay();
    sdate.setDate(sdate.getDate() - week);
    var edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
 
    var obj = document.getElementById("sh_week");
    obj.options.length = 0;
    var seled = "";
    while(endDate.getTime() >= edate.getTime()) {
        var sYear = sdate.getFullYear();
        var sMonth = (sdate.getMonth()+1);
        var sDay = sdate.getDate();
 
        sMonth = (sMonth < 10) ? "0"+sMonth : sMonth;
        sDay = (sDay < 10) ? "0"+sDay : sDay;
 
        var stxt = sYear + "-" + sMonth + "-" + sDay;
        edate.setDate(sdate.getDate() + 6);
 
        var eYear = edate.getFullYear();
        var eMonth = (edate.getMonth()+1);
        var eDay = edate.getDate();
 
        eMonth = (eMonth < 10) ? "0"+eMonth : eMonth;
        eDay = (eDay < 10) ? "0"+eDay : eDay;
        var etxt = eYear + "-" + eMonth + "-" + eDay;
        if(today.getTime() >= sdate.getTime() && today.getTime() <= edate.getTime()) {
            seled = stxt+"|"+etxt;
        }
 
        obj.options[obj.options.length] = new Option(stxt+"~"+etxt, stxt+"|"+etxt);
        sdate = new Date(edate.getFullYear(), edate.getMonth(), edate.getDate() + 1);
        edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
    }
    if(seled) obj.value = seled;
}

