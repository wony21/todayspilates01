var common = {};
let fnObj = {};
let reservationList = [];
let reservationTmpl = $('#reservation-template').html();
let newReservationTmpl = $('#new-reservation-template').html();
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

//view 초기화
fnObj.initView = function(user) {
    $('.username').text(user.username);

    var html = Mustache.render(newReservationTmpl, {list: []});
    $('#new-reservation-container').html(html);
};

//이벤트 초기화
fnObj.initEvent = function(user) {
    // 회원명 조회
    $('#search-member').on('click', function(e) {
        console.log('search member clicked...');
        //fnObj.fn.getGroupLessonByMember(user);
    });

    // 회원등록(팝업창)
    $('#add-member').on('click', function(e) {
        console.log('add member...');
    });

    // 수업등록
    $('#add-lesson').on('click', function(e) {
        console.log('add-lesson');
    });
};

fnObj.fn = {
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
                var html = Mustache.render(newReservationTmpl, {list: res});
                $('#new-reservation-container').html(html);
            },
        });
    },

    //그룹레슨 예약등록 처리
    addGroupLesson: function() {
        let lsnData = $('#modal-caption').data('id');
        let item = $('#new-reservation-container tbody tr .selected').
            data('id');

        //선택된 레슨이 있는지 체크
        if (typeof item === 'undefined') {
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
                compCd: item.compCd,
                storCd: item.storCd,
                memberNo: item.memberNo,
                lsnNo: item.lsnNo,
                lsnCd: item.lsnCd,
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
});