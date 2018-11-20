var common = {};
let fnObj = {};
let reservation = $('#reservation-template').html();
let newReservation = $('#new-reservation-template').html();
let updateReservation = $('#update-reservation-template').html();
let selectedItem = -1;
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];
const OPT_NO_RSVDT = '1';

fnObj.initView = function() {
    let html;

    html = Mustache.render(reservation, {});
    $('#reservation-container').html(html);
    //예약등록 팝업창 렌더링 초기화 필요
    html = Mustache.render(newReservation, {});
    $('#new-reservation-container').html(html);
    //예약수정 팝업창
    html = Mustache.render(updateReservation, {});
    $('#update-reservation-container').html(html);
};

fnObj.initEvent = function(user) {
    $('#search-member').on('click', function() {
        fnObj.fn.getPrivateLesson(user, OPT_NO_RSVDT);
    });

    $('#call-new-reservation').on('click', function() {
        
        let mode = '';
        let empNo = '';
        $('#userInfo').text($('#filter').val());
        fnObj.fn.setRsvDate();
        fnObj.fn.setRsvTime();
        fnObj.fn.setTeacher(mode, user, empNo);
        //fnObj.fn.setLsnTime();
        fnObj.fn.getPrivateLesson(user, null);
        //$('#exampleModalCenter').modal('toggle');
    });

    //예약수정 모드
    $('#reservation-container').on('click', 'tbody tr', function(e) {
    	
        let mode = 'update';
        let lsnData = $(this).data('id');

        if (typeof lsnData === 'undefined') {
            return false;
        }

        // request data
        var r = {};
        r.storCd = lsnData.storCd;
        r.memberNo = lsnData.memberNo;
        $.ajax({
            type: 'GET',
            url: '/api/teacher/reservation/lesson',
            data: r,
            success: function(res) {
//				if ( res.length == 0) {
//					alert('관리자에게 예약할 레슨을 등록 후 예약하세요.');
//					location.refresh();
//					return false;
//				}
                res.forEach(function(n) {
                    n.lsnData = JSON.stringify(n);
                    n.lsnStDt = (n.lsnStDt == null || n.lsnStDt == '') ?
                        '' :
                        ('`' + n.lsnStDt.substr(2, 2) + '.' +
                            n.lsnStDt.substr(4, 2) + '.' +
                            n.lsnStDt.substr(6, 7));	// yy-mm-dd
                    n.lsnEdDt = (n.lsnEdDt == null || n.lsnEdDt == '') ?
                        '' :
                        ('`' + n.lsnEdDt.substr(2, 2) + '.' +
                            n.lsnEdDt.substr(4, 2) + '.' +
                            n.lsnEdDt.substr(6, 7));	// yy-mm-dd
                    // n.lsnTm = Number(n.lsnTm).toFixed(1);
                    n.dy = (n.dy == null) ? '' : '(' + n.dy + ')';
                });
                lsnData.lsnStDt2 = (lsnData.lsnStDt == null || lsnData.lsnStDt == '') ?
	                        '' :
	                        ('`' + lsnData.lsnStDt.substr(2, 2) + '.' +
	                        		lsnData.lsnStDt.substr(4, 2) + '.' +
	                        		lsnData.lsnStDt.substr(6, 7));	// yy-mm-dd
                lsnData.lsnEdDt2 = (lsnData.lsnEdDt == null || lsnData.lsnEdDt == '') ?
		                    '' :
		                    ('`' + lsnData.lsnEdDt.substr(2, 2) + '.' +
		                    		lsnData.lsnEdDt.substr(4, 2) + '.' +
		                    		lsnData.lsnEdDt.substr(6, 7));	// yy-mm-dd
                $('#up-userInfo').text(lsnData.memberNm);
                $('#update-data').val(JSON.stringify(lsnData));
                $('#update-lsnTm').attr('disabled', true);
                $('#update-lsnTm').attr('disabled', true);

                let html = Mustache.render(updateReservation, {list: lsnData});
                $('#update-reservation-container').html(html);

                //레슨 등록정보 셋팅
                //fnObj.fn.setReservationList(n);
                fnObj.fn.setLsnCd(mode, lsnData.lsnCd);
                fnObj.fn.setRsvDate(mode, lsnData.rsvDt);
                fnObj.fn.setRsvTime(mode, lsnData.rsvTm);
                fnObj.fn.setLsnTime(mode, lsnData.lsnTm);
                fnObj.fn.setTeacher(mode, user, lsnData.empNo);

                //$('#update-teacher').val(res[0].empNo);	//현재 레슨선생님을 기본값으로 설정
                //팝업창 띄우기
                $('#updateModalCenter').modal('toggle');
            },
        });
    });

    $('#new-reservation-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        selectedItem = $(this).index(); //selectedItem => 전역변수

        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        if (!selected) {
            $('#new-reservation-container tbody tr').
                children('td').
                removeClass('selected');
            $(this).children('td').addClass('selected');
        }
    });

    //예약등록 버튼 이벤트
    $('#add-lesson').on('click', function(e) {
        fnObj.fn.addPrivateLesson(user);
    });

    $('#update-lesson').on('click', function(e) {
        fnObj.fn.updatePrivateLesson(user);
    });
};

fnObj.fn = {
    getPrivateLesson: function(user, opt1) {
        let search = fnObj.fn.getData(user);
        // 예약일자가 있는 것만 조회
        // 없는 경우를 조회하고 싶은 경우에는 opt1의 값을 할당하지 않는다.
        search.opt1 = opt1;
        search.empNo = '';
        $.ajax({
            type: 'GET',
            url: '/api/teacher/reservation/list',
            data: search,
            success: function(res) {
                res.forEach(function(n) {
                    n.lsnData = JSON.stringify(n);
                    n.rsvDt = (n.rsvDt == null) ?
                        '(예약없음)' :
                        n.rsvDt.substr(4, 2) + '.' + n.rsvDt.substr(6, 7);	// yy-mm-dd
                    n.rsvTm = (n.rsvTm == null) ?
                        '' :
                        n.rsvTm.substr(0, 2) + ':' + n.rsvTm.substr(2, 3);  // hh:mm
                    n.lsnStDt = (n.lsnStDt == null || n.lsnStDt == '') ?
                            '' :
                            ('`' + n.lsnStDt.substr(2, 2) + '.' +
                                n.lsnStDt.substr(4, 2) + '.' +
                                n.lsnStDt.substr(6, 7));	// yy-mm-dd
                    n.lsnEdDt = (n.lsnEdDt == null || n.lsnEdDt == '') ?
                        '' :
                        ('`' + n.lsnEdDt.substr(2, 2) + '.' +
                            n.lsnEdDt.substr(4, 2) + '.' +
                            n.lsnEdDt.substr(6, 7));	// yy-mm-dd
                    n.lsnTm = Number(n.lsnTm).toFixed(1);
                    n.dy = (n.dy == null) ? '' : '(' + n.dy + ')';
                });
                if ( opt1 == OPT_NO_RSVDT) {
                	let html = Mustache.render(reservation, {list: res});
                    $('#reservation-container').html(html);
                } else {
                	let html = Mustache.render(newReservation, {list: res});
                    $('#new-reservation-container').html(html);
                    // 정보가 불러지면 팝업을 띄울것
                    $('#exampleModalCenter').modal('toggle');
                }
                
            },
        });
    },

    getData: function(user) {
        return {
            storCd: user.storCd,
            memberNm: $('#filter').val(),
            empNo: $('#teacher').val(),
            sttDt: ax5.util.date(new Date(), {return: 'yyyyMMdd'}),
            endDt: '99991231',
        };
    },

    /*//선택된 회원의 레슨을 조회하여 리스트에 셋팅한다.
    setReservationList: function(items) {
        item.lsnData = JSON.stringify(item);
        item.lsnStDt = (isValidDate(item.lsnStDt) === false) ?
            '' :
            ('`' + item.lsnStDt.substr(2, 2) + '.' + item.lsnStDt.substr(4, 2) +
                '.' + item.lsnStDt.substr(6, 7));
        item.lsnEdDt = (isValidDate(item.lsnEdDt) === false) ?
            '' :
            ('`' + item.lsnEdDt.substr(2, 2) + '.' + item.lsnEdDt.substr(4, 2) +
                '.' + item.lsnEdDt.substr(6, 7));
        let html = Mustache.render(newReservation, {list: [item]});
        $('#new-reservation-container').html(html);
    },*/

    setLsnCd: function(mode, val) {
//		let option = '';
//		//todo: 레슨코드는 동적설정으로 변경하자 .. (지금은 하드코딩)
//		option += '<option value="01">' + '개인' + '</option> ';
//		option += '<option value="02">' + '듀엣' + '</option> ';
//		
//		$('#lsnCd').html(option);
//		$('#lsnCd').val(val);
        let target = $('#lsnCd');
        if (mode === 'update') {
            target = $('#update-lsnCd');
        }
    },

    //예약일자 셋팅 (현재일 ~ 90일 까지만 일단 셋팅)
    setRsvDate: function(mode, val) {
        let option = '';
        for (var i = 0; i <= 90; i++) {
            var date = ax5.util.date(new Date(), {add: {d: i}});
            var formattedDate = ax5.util.date(new Date(),
                {add: {d: i}, return: 'yyyyMMdd'});
            var day = WEEKS[date.getDay()];
            var selected = '';
            if ( formattedDate == val ) {
            	selected = 'selected';
            } else {
            	selected = '';
            }
            var d = /*'`' + formattedDate.substr(2, 2) + '.' + */formattedDate.substr(
                4, 2) + '.' + formattedDate.substr(6, 7);
            option += '<option value="' + formattedDate + '" ' + selected + '>' + d + ' (' +
                day + ')' + '</option> ';
        }

        let target = $('#rsvDt');
        if (mode === 'update') {
            target = $('#update-rsvDt');
        }
        target.html(option);
    },
    //예약시간 셋팅 (00 ~ 24)
    setRsvTime: function(mode, val) {
        let option = '';
        for (var i = 1; i < 24; i++) {
            //let prefix = (i < 12) ? 'am ' : 'pm ';
            let tm = ('0' + i).slice(-2) + '00';
            let formattedTm = /*prefix + */('0' + i).slice(-2) + ':' + '00';

            option += ' <option value="' + tm + '">' + formattedTm +
                '</option> ';
        }

        let now = new Date($.now());
        let target = $('#rsvTm');
        if (mode === 'update') {
            target = $('#update-rsvTm');
        }

        target.html(option);
        if (typeof val === 'undefined' || val === '' || val === null) {
            //기본값이 없으면 현재시각을 기본값으로 설정
            target.val(('0' + now.getHours()).slice(-2) + '00');
        } else {
            target.val(val);	//기존예약 시간을 기본값으로 설정
        }
    },
    //레슨시간 셋팅 (1.0, 1.5)
    setLsnTime: function(mode, val) {
//		let option = '';
//		for (var i = 0.5; i <= 4; i+= 0.5) {
//			option += ' <option value="' + i.toFixed(1) + '">' + i.toFixed(1) +
//            '</option> ';
//		}
//		$('#lsnTm').html(option);
//		$('#lsnTm').val('1.0');	//default 값
    	
    	if ( typeof Number(val)) {
    		let fixedVal = Number(val);
    		fixedVal = fixedVal.toFixed(1);
    		$('#update-lsnTm').val(fixedVal);
    	} else {
    		console.log('형식이 잘못되었습니다.');
    	}
    },
    //선생님 셋팅
    setTeacher: function(mode, user, empNo) {
        //강사목록 조회
        $.ajax({
            type: 'GET',
            url: '/api/teacher',
            data: {storCd: user.storCd},
            success: function(res) {
                let option = '<option value="">선택</option>';
                res.forEach(function(n) {
                    option += ' <option value="' + n.empNo + '">' + n.empNm +
                        '</option> ';
                });
                let target = $('#teacher');
                if (mode === 'update') {
                    target = $('#update-teacher');
                }
                target.html(option);
                target.val(empNo);
            },
        });
        return false;
    },

    //실제 예약등록 처리
    addPrivateLesson: function(user) {
        let item = '';

        $('#new-reservation-container tbody tr').each(function() {
            let selected = $(this).find('td').hasClass('selected');
            if (selected) {
                item = $(this).data('id');
            }
        });

        let empNo = $('#teacher').val();
        if (empNo == null || empNo == '') {
            alert('선생님을 선택해 주세요.');
            return false;
        }

        let data = [
            {
                compCd: user.compCd,
                storCd: item.storCd,
                memberNo: item.memberNo,
                empNo: empNo,
                lsnNo: item.lsnNo,
                lsnCd: item.lsnCd,
                rsvDt: $('#rsvDt').val(),
                rsvTm: $('#rsvTm').val(),
                lsnTm: $('#lsnTm').val(),
            }];

        /* 예약 confirm */
        let retReserv = confirm('예약하시겠습니까?');
        if (retReserv != true) {
            return false;
        }

        $.ajax({
            type: 'PUT',
            url: '/api/teacher/reservation/add',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('예약이 완료되었습니다.');
                //location.reload();
                fnObj.fn.getPrivateLesson(user, OPT_NO_RSVDT);
                $('#exampleModalCenter').modal('hide');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    updatePrivateLesson: function(user) {
        let item = $('#update-reservation-container tbody').
            find('tr').eq(0).data('id');
        console.log(JSON.stringify(item));
        let lsnEdDt = item.lsnEdDt;
        let lsnEndDate = new Date(lsnEdDt).getTime();
        let today = new Date().getTime();

        if (lsnEndDate !== 0 && (lsnEndDate < today)) {
            alert('유효기간이 경과하였습니다. 예약을 수정할 수 없습니다.');
            return false;
        }

        let empNo = $('#teacher option:selected').val();
        empNo = $('#update-teacher').val();
        if (empNo == null || empNo == '') {
            alert('선생님을 선택해 주세요.');
            return false;
        }
        
        let lsnData = JSON.parse($('#update-data').val());
        let data = [
            {
                compCd: lsnData.compCd,
                storCd: lsnData.storCd,
                memberNo: lsnData.memberNo,
                empNo: empNo,
                lsnNo: lsnData.lsnNo,
                lsnCd: lsnData.lsnCd,
                lsnSeq: lsnData.lsnSeq,
                rsvDt: $('#update-rsvDt').val(),
                rsvTm: $('#update-rsvTm').val(),
                lsnTm: $('#update-lsnTm').val(),
            }];

        /* 예약 confirm */
        let retReserv = confirm('예약을 수정하시겠습니까?');
        if (retReserv != true) {
            return false;
        }
        console.log(data);
        $.ajax({
            type: 'PUT',
            url: '/api/teacher/reservation/modify',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('예약수정이 완료되었습니다.');
                //location.reload();
                fnObj.fn.getPrivateLesson(user, OPT_NO_RSVDT);
            },
            error: function(error) {
                alert(error);
            },
        });
    },
};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    $('.username').text(user.username);

    fnObj.initView();
    fnObj.initEvent(user);

    //개인레슨 예약조회
    //fnObj.fn.getPrivateLesson(user);
    //선생님 목록은 예약현황 로드시 한번만 셋팅
    let mode = '';
    fnObj.fn.setTeacher(mode, user);
});

