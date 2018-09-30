var common = {};
let fnObj = {};
let reservationList = [];
let previous = '0';
let reservationTmpl = $('#reservation-template').html();
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

//view 초기화 
fnObj.initView = function(user) {
	$('.username').text(user.username);
	
	fnObj.fn.setTeacher(user);
	fnObj.fn.setDatePicker();
	fnObj.fn.getPrivateLesson(user);
}

//이벤트 초기화 
fnObj.initEvent = function(user) {
	// 선생님 변경시 조회
	$(document.body).on('change', '#teacher', function(e) {
		// var optionSelected = $("option:selected", this);
		fnObj.fn.getPrivateLesson(user);
	});
	
	// 선택한 일자의 개인레슨을 조회
	$("#datepicker tbody").on('click', 'td', function(e) {
		let selected = $(this).hasClass("selected");
	    $("#datepicker tbody td").removeClass("selected");
	    if(!selected) {
	    	$(this).addClass("selected");
	    }
	    fnObj.fn.getPrivateLesson(user);
	});
	
	// 회원명 검색버튼 조회
	$('#search-attend').on('click', function(e) {
		fnObj.fn.getPrivateLesson(user);
	});
	
	// 예약출결처리 이전값 저장
	$(".attend-process select").on('focus', function () {
        // Store the current value on focus and on change
        previous = this.value;
    }).change(function() {
        // Do something with the previous value after the change
        console.log(previous);
        // Make sure the previous value is updated
        // previous = this.value;
    });
	
	// 예약에 대한 출결처리 선택
	$(document.body).on('change', '.attend-process', function(e) {
		// var optionSelected = $("option:selected", this);
		let lsn = $(this).parent().parent().index();	// 선택된 예약정보
		let value = $(this).val();
		let result = false;
		
		if (value === 0) {
			return false;
		}
		if (value === '2') {
			result = confirm('출석처리 하겠습니까?');
			if (result) {
				// 출석처리
				$.extend(reservationList[lsn], {atndFg: value});
				fnObj.fn.updateLessonAttendance(lsn, value);
				alert('출석처리가 완료되었습니다.');
				location.refresh();
			} 
		} else if (value === '1') {
			result = confirm('결석처리 하겠습니까?');
			if (result) {
				fnObj.fn.updateLessonAttendance(lsn, value);
				alert('결석처리가 완료되었습니다.');
				location.refresh();
			}
		} else if (value === '3') {
			result = confirm('정말 삭제하겠습니까?');
			if (result) {
				fnObj.fn.updateLessonAttendance(lsn, value);
				alert('예약을 삭제하였습니다');
				location.refresh();
			}
		}
		
		if (!result) {
			$(this).val(previous);
		}
		previous = value;
	});
}

fnObj.fn = {
	// 강사목록 조회
	setTeacher: function(user) {
		$.ajax({
			type: 'GET',
			url: '/api/teacher',
			data: {storCd: user.storCd},
			success: function(res) {
				let option = '<option value="">선생님(전체)</option>';
				res.forEach(function(n) {
					 option += ' <option value="' + n.empNo + '">' + n.empNm +
	                 '</option> ';
				})
				$('#teacher').html(option);
				$('#teacher').val(user.empNo);	// 로그인한 선생님으로 선택
			}
		});
	},
	//주간 Datepicker 초기화 
	setDatePicker: function() {
		let curr = new Date(); // get current date
		let first = curr.getDate() - curr.getDay(); // First day is the day of the week.
		let getDay = curr.getDay();
		let sttDt = ax5.util.date(curr, { add:{d: -curr.getDay()}, return: 'yyyyMMdd'});
		let endDt = ax5.util.date(curr, { add:{d: 6-getDay}, return: 'yyyyMMdd'});
		let thead = '<tr style="text-align:center; height: 40px;">';
		let tbody = '<tr data-id="" style="text-align: center; vertical-align: middle; height: 40px;">';
		let today = curr.getDate();
		for (var i = 0; i <= 6; i++) {
			var date = ax5.util.date(sttDt, {add: {d: i}, return: 'yyyyMMdd'});
			var day = ax5.util.date(sttDt, {add: {d: i}, return: 'dd'});
			var d = ax5.util.date(sttDt, {add: {d: i}});
			if (parseInt(day) !== today) {
				thead += '<th>' + WEEKS[i] + '</th>';
				tbody += '<td data-id="' + date + '">' + day + '</td>';
			} else {
				thead += '<th class="today">' + WEEKS[i] + '</th>';
				tbody += '<td class="today" data-id="' + date + '">' + day + '</td>';
			}
		}
		$('#datepicker thead').html(thead);
		$('#datepicker tbody').html(tbody);
		
		//선택된 주의 처음일자와 마지막 일자 조회 테스트
		//let firstDate = $('#datepicker tbody tr').find(":first").data('id');
		//let lastDate = $('#datepicker tbody tr').find(":last").data('id');
	},
	
	//예약정보조회 (선택주, 선생님, 회원명, 일자)
	getPrivateLesson: function(user) {
		let search = fnObj.fn.getData(user);
		reservationList.length = 0;
		
		$.ajax({
			type: 'GET',
			url: '/api/teacher/reservation/weekly',
			data: search,
			success: function(res) {
				res.forEach(function(n) {
					n.lsnTm = n.lsnTm.toFixed(1);
					n.rsvDt = (n.rsvDt == null) ? '' : n.rsvDt.substr(4, 2) + '.' + n.rsvDt.substr(6, 7);	// yy-mm-dd
					n.rsvTm = (n.rsvTm == null) ? '' : n.rsvTm.substr(0, 2) + ':' + n.rsvTm.substr(2, 3);  // hh:mm
					n.lsnEdDt = (isValidDate(n.lsnEdDt) === false) ? '' : ('`' + n.lsnEdDt.substr(2, 2) + '.' + n.lsnEdDt.substr(4, 2) + '.' + n.lsnEdDt.substr(6, 7));	// yy-mm-dd
					
					// 출/결처리가 된 항목은 '취소'불가 처리(렌더링 후 jquery를 위한 flag 처리)
					if (n.atndFg == '1') {
						n.sel1 = 'selected';
						n.sel3 = 'hidden';
						n.optFg3 = '0';
					} else if ( n.atndFg  == '2' ) {
						n.sel2 = 'selected';
						n.sel3 = 'hidden';
						n.optFg3 = '0';
					} else if ( n.atndFg == '3' ) {
						n.sel3 = 'selected';
					}
				})
				var html = Mustache.render(reservationTmpl, {list: res});
				$('#reservation-container').html(html);
				
				if(res.length) {
					reservationList = res.slice(0); // res array deep copy
				}
				// 출/결처리가 된 항목은 '취소'는 불가하도록 처리
				$("#sel-attend option[display-flag='0']").each(function(){
					$(this).remove();
				});
			}
		});
		return false;
	},
	// 출결처리
	updateLessonAttendance: function(lsn, val) {
		let data = [].concat(reservationList[lsn]);
		let url = '/api/teacher/lesson/attend';
		
		if (val === 1) {
			url = '/api/teacher/lesson/absent';
		} else if (val === 3) {
			url = '/api/teacher/lesson/cancel';
		} 
		
		$.ajax({
			type: 'PUT',
			url: url,
			data: JSON.stringify(data),
			contentType : "application/json; charset=UTF-8",
			success: function(res) {
				console.log('update success....');
			}
		});
		return false;
	},
	// 조회조건
	getData: function(user) {
		return {
			storCd: user.storCd,
			memberNm: $('#filter').val(),	// 회원명
			empNo: $('#teacher').val(),		// 선생님
			sttDt: $('#datepicker tbody tr').find(":first").data('id'),
			endDt: $('#datepicker tbody tr').find(":last").data('id'),
			rsvDt: $('#datepicker tbody tr .selected').data('id'),
		}
	},
}

$(document).ready(function() {
	let user = JSON.parse(window.localStorage.getItem('todays'));
	fnObj.initView(user);
	fnObj.initEvent(user);
});
	
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

