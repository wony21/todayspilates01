var common = {};
let fnObj = {};
let reservationList = [];
let reservationTmpl = $('#reservation-template').html();
let newReservationTmpl = $('#new-reservation-template').html();
let selectedItem;
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

//view 초기화 
fnObj.initView = function(user) {
    $('.username').text(user.username);

    fnObj.fn.setTeacher(user);
    fnObj.fn.setDatePicker();
    fnObj.fn.getGroupLesson(user);
};

//이벤트 초기화 
fnObj.initEvent = function(user) {
    // 주차변경시 해당 주로 셋팅
    $(document.body).on('change', '#week', function(e) {
        fnObj.fn.setDatePicker($(this).val());
        //fnObj.fn.getGroupLesson(user);
    });

    // 선택한 일자의 그룹레슨을 조회
    $('#datepicker').on('click', ' tbody td', function(e) {
        let selected = $(this).hasClass('selected');
        $('#datepicker tbody td').removeClass('selected');
        if (!selected) {
            $(this).addClass('selected');
        }
        fnObj.fn.getGroupLesson(user);
    });

    // 예약에 대한 출결처리 선택
    $(document.body).on('change', '.attend-process', function(e) {
        // var optionSelected = $("option:selected", this);
        //let lsn = $(this).parent().parent().index();	// 선택된 예약정보
        let lsnData = $(this).parent().parent().data('id');
        let previous = $(this).parent().data('id');
        let value = $(this).val();
        let result = false;

        if (value === 0) {
            return false;
        }
        if (value === '1') {
            result = confirm('출석처리 하겠습니까?');
            if (result) {
                // 출석처리
                $.extend(lsnData, {atndFg: value});
                fnObj.fn.updateLessonAttendance(user, lsnData, value);
                alert('출석처리가 완료되었습니다.');
                //location.reload();
            }
        } else if (value === '2') {
            result = confirm('결석처리 하겠습니까?');
            if (result) {
                fnObj.fn.updateLessonAttendance(user, lsnData, value);
                alert('결석처리가 완료되었습니다.');
                //location.reload();
            }
        } else if (value === '3') {
            result = confirm('정말 삭제하겠습니까?');
            if (result) {
                fnObj.fn.updateLessonAttendance(user, lsnData, value);
                alert('예약을 삭제하였습니다');
                //location.reload();
            }
        }

        if (!result) {
            $(this).val(previous);
        } else {
            fnObj.fn.getGroupLesson(user);
        }
    });

    $(document.body).on('click', '#group-lesson-add-btn', function(e) {
        //fnObj.fn.getGroupLessonByMember(user);
        //예약일자,
        let dy = WEEKS[$('#datepicker tbody tr .selected').index()];
        let rsvDt = ($('#datepicker tbody tr .selected').data('id')).toString();
        let lsnData = $(this).data('id');
        let dt = rsvDt.substr(0, 4) + '년 ' + rsvDt.substr(4, 2) + '월 ' +
            rsvDt.substr(6, 2) + '일 ';
        let stTm = (isValidTime(lsnData.stTm) === false) ?
            '' :
            lsnData.stTm.substr(0, 2) + ':' + lsnData.stTm.substr(2, 3);  // hh:mm
        let caption = dt + '(' + dy + ') ' + stTm + ' ' + lsnData.lsnLvNm +
            ' (' + lsnData.lsnTm.toFixed(1) + ') ' + lsnData.empNm;
        let captionData = {
            rsvDt: rsvDt,
            dy: dy,
            stTm: lsnData.stTm,
            lsnTm: lsnData.lsnTm,
            lsnLv: lsnData.lsnLv,
            lsnLvNm: lsnData.lsnLvNm,
            empNo: lsnData.empNo,
        };

        $('#modal-caption').attr('data-id', JSON.stringify(captionData));
        $('#modal-caption').text(caption);

        var html = Mustache.render(newReservationTmpl, {list: []});
        $('#new-reservation-container').html(html);

    });

    // 회원명 검색버튼 조회
    $('#search-member').on('click', function(e) {
        fnObj.fn.getGroupLessonByMember(user);
    });
    //검색된 그룹레슨 클릭 이벤트
    $('#new-reservation-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        selectedItem = lsnData;
        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        $('#new-reservation-container tbody tr').
            children('td').removeClass('selected');
        if (!selected) {
            $(this).children('td').addClass('selected');
        }
    });

    $('#add-lesson').on('click', function(e) {
        fnObj.fn.addGroupLesson();
    });
};

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
                });
                $('#teacher').html(option);
                $('#teacher').val(user.empNo);	// 로그인한 선생님으로 선택
            },
        });
    },
    //주간 Datepicker 초기화
    setDatePicker: function(dateString) {
        let curr = new Date(); // get current date
        let getDay = curr.getDay();
        let sttDt = '';

        if (typeof dateString === 'undefined') {
            sttDt = ax5.util.date(curr,
                {add: {d: -curr.getDay()}, return: 'yyyyMMdd'});
        } else {
            sttDt = dateString;
        }
        let endDt = ax5.util.date(curr,
            {add: {d: 6 - getDay}, return: 'yyyyMMdd'});
        let thead = '<tr style="text-align:center; height: 40px;">';
        let tbody = '<tr data-id="" style="text-align: center; vertical-align: middle; height: 40px;">';
        let today = ax5.util.date(curr, {return: 'yyyyMMdd'});

        for (var i = 0; i <= 6; i++) {
            var date = ax5.util.date(sttDt, {add: {d: i}, return: 'yyyyMMdd'});
            var day = ax5.util.date(sttDt, {add: {d: i}, return: 'dd'});
            var d = ax5.util.date(sttDt, {add: {d: i}});
            if (date !== today) {
                thead += '<th>' + WEEKS[i] + '</th>';
                tbody += '<td data-id="' + date + '">' + day + '</td>';
            } else {
                thead += '<th class="today">' + WEEKS[i] + '</th>';
                tbody += '<td class="today" data-id="' + date + '">' + day +
                    '</td>';
            }
        }
        $('#datepicker thead').html(thead);
        $('#datepicker tbody').html(tbody);

        //선택된 주의 처음일자와 마지막 일자 조회 테스트
        //let firstDate = $('#datepicker tbody tr').find(":first").data('id');
        //let lastDate = $('#datepicker tbody tr').find(":last").data('id');
    },

    //예약정보조회 (선택주, 선생님, 회원명, 일자)
    getGroupLesson: function(user) {
        let search = fnObj.fn.getData(user);
        reservationList.length = 0;

        //검색일자가 유효하지 않으면 현재일자로 조회
        if (isValidDate(search.schDt) === false) {
            search.schDt = ax5.util.date((new Date()), {return: 'yyyyMMdd'});
        }

        $.ajax({
            type: 'GET',
            url: '/api/teacher/reservation/group/list',
            data: search,
            success: function(res) {
                if (res.length) {
                    res.forEach(function(m) {
                        let obj = $.extend(true, {}, m);	//object deep copy
                        delete obj.schedule;
                        m.lsnData = JSON.stringify(obj);
                        m.stTm = (isValidTime(m.stTm) === false) ?
                            '' :
                            m.stTm.substr(0, 2) + ':' + m.stTm.substr(2, 3);  // hh:mm
                        m.lsnTm = m.lsnTm.toFixed(1);
                        m.schedule.forEach(function(n, idx) {
                            n.empNo = m.empNo;
                            n.empNm = m.empNm;
                            n.lsnLv = m.lsnLv;
                            n.lsnLvNm = m.lsnLvNm;
                            n.lsnData = JSON.stringify(n);

                            n.idx = idx + 1;
                            n.lsnEdDt = (isValidDate(n.lsnEdDt) === false) ?
                                '' :
                                ('`' + n.lsnEdDt.substr(2, 2) + '.' +
                                    n.lsnEdDt.substr(4, 2) + '.' +
                                    n.lsnEdDt.substr(6, 7));	// yy-mm-dd

                            // 출/결처리가 된 항목은 '취소'불가 처리(렌더링 후 jquery를 위한 flag 처리)
                            if (n.atndFg == '1') {
                                n.sel1 = 'selected';
                                n.sel3 = 'hidden';
                                n.optFg3 = '0';
                            } else if (n.atndFg == '2') {
                                n.sel2 = 'selected';
                                n.sel3 = 'hidden';
                                n.optFg3 = '0';
                            } else if (n.atndFg == '3') {
                                n.sel3 = 'selected';
                            }
                        });
                    });
                }

                var html = Mustache.render(reservationTmpl, {list: res});
                $('#reservation-container').html(html);

                if (res.length) {
                    reservationList = res.slice(0); // res array deep copy
                }
                // 출/결처리가 된 항목은 '취소'는 불가하도록 처리
                $('#sel-attend option[display-flag=\'0\']').each(function() {
                    $(this).remove();
                });
            },
        });
        return false;
    },
    // 출결처리
    updateLessonAttendance: function(user, lsnData, val) {
        let data = [].concat(lsnData);
        let url = '/api/teacher/lesson/attend';

        if (val == '2') {
            url = '/api/teacher/lesson/absent';
        } else if (val == '3') {
            url = '/api/teacher/lesson/cancel';
        }

        $.ajax({
            type: 'PUT',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                console.log('update success....');
            },
        });
        return false;
    },

    // 조회조건
    getData: function(user) {
        return {
            storCd: user.storCd,
            schDt: $('#datepicker tbody tr .selected').data('id'),
        };
    },

    /**
     * 검색된 회원의 레슨목록 조회
     * @param storCd store code
     * @param memberNm member name
     */
    getGroupLessonByMember: function(user) {
        let memberNm = $.trim($('#filter').val());
        if (memberNm.length === 0) {
            alert('회원명을 입력해주세요 ');
            return false;
        }
        $.ajax({
            type: 'GET',
            url: '/api/teacher/reservation/group',
            data: {storCd: user.storCd, memberNm: memberNm},
            success: function(res) {
            	res.forEach(function(n){
            		n.lsnData = JSON.stringify(n);
            		n.lsnStDt = (isValidDate(n.lsnStDt) === false) ?
                            '' :
                            ('`' + n.lsnStDt.substr(2, 2) + '.' +
                                n.lsnStDt.substr(4, 2) + '.' +
                                n.lsnStDt.substr(6, 7));
            		n.lsnEdDt = (isValidDate(n.lsnEdDt) === false) ?
                            '' :
                            ('`' + n.lsnEdDt.substr(2, 2) + '.' +
                                n.lsnEdDt.substr(4, 2) + '.' +
                                n.lsnEdDt.substr(6, 7));
            	});
                var html = Mustache.render(newReservationTmpl, {list: res});
                $('#new-reservation-container').html(html);
            },
        });
    },

    //그룹레슨 예약등록 처리
    addGroupLesson: function() {
        let lsnData = $('#modal-caption').data('id');
        
        console.log(lsnData);
        let item = $('#new-reservation-container tbody tr .selected').
            data('id');
        
        console.log(selectedItem);
        //선택된 레슨이 있는지 체크
        if (typeof selectedItem === 'undefined') {
            alert('먼저 예약할 레슨을 선택하세요.');
            return false;
        }

        /* 예약 confirm */
        var retReserv = confirm('예약하시겠습니까?');
        if (retReserv != true) {
            return false;
        }

        //requestParams = compCd, storCd, memberNo, lsnCd, lsnNo, empNo, rsvDt, rsvTm, lsnTm;
        let data = [
            {
                compCd: selectedItem.compCd,
                storCd: selectedItem.storCd,
                memberNo: selectedItem.memberNo,
                lsnNo: selectedItem.lsnNo,
                lsnCd: selectedItem.lsnCd,
                empNo: lsnData.empNo,
                rsvDt: lsnData.rsvDt,
                rsvTm: lsnData.stTm,
                lsnTm: lsnData.lsnTm,
            }];

        $.ajax({
            type: 'PUT',
            url: '/api/teacher/reservation/add',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('예약이 완료되었습니다.');
                location.reload();
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

};

$(document).ready(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);

    //주차 datepicker 셋팅 (현재월을 기준으로 -3개월 ~ +3개월)
    makeWeekSelectOptions('week', 3);
    //var date = new Date("20181001".replace( /(\d{4})(\d{2})(\d{2})/, "$1/$2/$3"));
});
	


