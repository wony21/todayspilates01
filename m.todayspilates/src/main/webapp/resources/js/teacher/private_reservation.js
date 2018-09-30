var common = {};
let fnObj = {};
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

fnObj.initView = function() {
	console.log('initView');
	let newReservation = $('#new-reservation-template').html();
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
	
	let html = Mustache.render(newReservation, {list: []});
	$('#new-reservation-container').html(html);
	
}

fnObj.initEvent = function() {
	console.log('init Event');
	$("#reservation-container").on('click', 'tbody tr', function(e) {
		let lnsData = $(this).data('id');
		console.log(lnsData);
		
		$('#userInfo').text(lnsData.memberNm);
	});
	
	/*$("#teacher").on('change', function(e) {
		//var optionSelected = $("option:selected", this);
		getPrivateLesson();
	});
	*/
	//날짜선택시 선택일자 toggle 이벤트 
	$("#date-container").on('click', 'td', function(e) {
		let searchDate = $(this).text();
		
		let selected = $(this).hasClass("selected");
	    $("#date-container td").removeClass("selected");
	    if(!selected) {
	    	$(this).addClass("selected");
	    }
	});
	
	//예약등록 버튼 이벤트
	$('#add-lesson').on('click', function(e) {
		fnObj.fn.addPrivateLesson();
	});
}

fnObj.fn = {
	getPrivateLesson: function(user) {
		let search = fnObj.fn.getData(user);
		let reservation = $('#reservation-template').html();
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
				let html = Mustache.render(reservation, {list: res});
				$('#reservation-container').html(html);
			}
		});
	},
	
	getData : function(user) {
		console.log('this is getData function;');
		$('.username').text(user.username);
		
		return {
			storCd: user.storCd,
			memberNm: $('#filter').val(),
			empNo: $('#teacher').val(),
			sttDt: ax5.util.date(new Date(), {return: 'yyyyMMdd'}),
			endDt: '99991231'
		}
	},
	
	setLsnCd: function() {
		let option = '';
		
		option += '<option value="' + 01 + '">' + '개인' + '</option> ';
		option += '<option value="' + 02 + '">' + '듀엣' + '</option> ';
		
		$('#lsnCd').html(option);
	},
	
	//예약일자 셋팅 (현재일 ~ 90일 까지만 일단 셋팅)
	setRsvDate : function() {
		let option = '';
		for (var i = 0; i <= 90; i++) {
			var date = ax5.util.date(new Date(), {add: {d: i}});
			var formattedDate = ax5.util.date(new Date(), {add: {d: i}, return: 'yyyyMMdd'});
			var day = WEEKS[date.getDay()];
			
			var d = /*'`' + formattedDate.substr(2, 2) + '.' + */formattedDate.substr(4, 2) + '.' + formattedDate.substr(6, 7);
			option += '<option value="' + formattedDate + '">' + d + ' (' + day + ')' + '</option> ';
		}
		$('#rsvDt').html(option);
	},
	//예약시간 셋팅 (00 ~ 24)
	setRsvTime: function() {
		let option = '';
		for (var i = 1; i < 24; i++) {
			//let prefix = (i < 12) ? 'am ' : 'pm ';
			let tm = ("0" + i).slice(-2) + "00";
			let formattedTm = /*prefix + */("0" + i).slice(-2) + ":" + "00";
			
			option += ' <option value="' + tm + '">' + formattedTm +
            '</option> ';
		}
		
		let now = new Date($.now());
		$('#rsvTm').html(option);
		$('#rsvTm').val(("0" + now.getHours()).slice(-2) + "00");
	},
	//레슨시간 셋팅 (0.5 ~ 6.0)
	setLsnTime: function() {
		let option = '';
		for (var i = 0.5; i <= 4; i+= 0.5) {
			option += ' <option value="' + i.toFixed(1) + '">' + i.toFixed(1) +
            '</option> ';
		}
		$('#lsnTm').html(option);
		$('#lsnTm').val('1.0');	//default 값 
	},
	//선생님 셋팅 
	setTeacher: function(user) {
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
			}
		});
		return false;
	},
	
	//실제 예약등록 처리 
	addPrivateLesson: function() {
		console.log('addPrvateLesson api call...');
	},
	
};

$(document).ready(function() {
	let user = JSON.parse(window.localStorage.getItem('todays'));

	fnObj.initView();
	fnObj.initEvent();
	
	//개인레슨 예약조회
	fnObj.fn.getPrivateLesson(user);
	//레슨 등록정보 셋팅 
	fnObj.fn.setLsnCd();
	fnObj.fn.setRsvDate();
	fnObj.fn.setRsvTime();
	fnObj.fn.setLsnTime();
	fnObj.fn.setTeacher(user);

});

