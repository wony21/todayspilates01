let common = {};
let fnObj = {};
let reservationTmpl = $('#reservation-template').html();
let newReservationTmpl = $('#new-reservation-template').html();
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

//view 초기화 
fnObj.initView = function(user) {
    $('.username').text(user.username);

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

    // 그룹레슨 등록 팝업창 호출
    $(document.body).on('click', '.btn-rsv-add', function(e) {

        let dy = WEEKS[$('#datepicker tbody tr .selected').index()];
        let rsvDt = ($('#datepicker tbody tr .selected').data('id')).toString();
        //let lsnData = $(this).data('id');
        let lsnData = $(this).parent().parent().data('id');
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
        $('#filter').val('');

        var html = Mustache.render(newReservationTmpl, {list: []});
        $('#new-reservation-container').html(html);

        $('#groupLessonModalCenter').modal('toggle');
    });

    //등록된 그룹레슨 예약(회원)삭제
    $(document.body).on('click', '.btn-rsv-del', function(e) {
        let lsnData = $(this).parent().data('id');
        let response = confirm('등록된 회원을 삭제하시겠습니까?');

        if (response) {
            fnObj.fn.delGroupLesson(user, lsnData);
        }
    });

    //신규 그룹레슨 예약등록
    $(document.body).on('click', '#group-lesson-add-btn', function(e) {

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
            ' (' +
            lsnData.lsnTm.toFixed(1) + ') ' + lsnData.empNm;
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

        var html = Mustache.render(newMemberTmpl, {list: []});
        $('#new-member-container').html(html);

    });

    // 회원명 검색버튼 조회
    $('#search-member').on('click', function(e) {
        fnObj.fn.getGroupLessonByMember(user);
    });

    //검색된 그룹레슨 클릭 이벤트
    $('#new-reservation-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');

        if (typeof lsnData === 'undefined') {
            return false;
        }
        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        if (!selected) {
            $('#new-reservation-container tbody tr').
                children('td').removeClass('selected');
            $(this).children('td').addClass('selected');
        }
    });

    $('#add-lesson').on('click', function(e) {
        fnObj.fn.addGroupLesson(user);
    });
};

fnObj.fn = {
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
    },

    //예약정보조회 (선택주, 선생님, 회원명, 일자)
    getGroupLesson: function(user) {
        let search = fnObj.fn.getData(user);

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

                    res.forEach(function(m, odx) {
                        let obj = $.extend(true, {}, m);	//object deep copy
                        delete obj.schedule;
                        m.lsnData = JSON.stringify(obj);
                        m.stTm = (isValidTime(m.stTm) === false) ?
                            '' :
                            m.stTm.substr(0, 2) + ':' + m.stTm.substr(2, 3);  // hh:mm
                        m.lsnTm = m.lsnTm.toFixed(1);

                        let arr = [];
                        let myObj = {};
                        let count  = 0;
                        // 추가 등록행이 필요한지 체크
                        if ((m.schedule.length % 3) === 0) {
                            m.schedule_length = 3;
                        }

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
                                    n.lsnEdDt.substr(4, 2) +
                                    '.' + n.lsnEdDt.substr(6, 7));	// yy-mm-dd

                            let tmpObj = {};
                            let rem = idx % 3;
                            //todo: 하나의 row에 3개씩 표시해야 하기때문에 idx % 3으로 인덱스를 재구성함.
                            //나머지가 0 일때 배열의 인덱스를 생성하고 아니면 배열의 인덱스값에 obj스트링을 concat 처리함.
                            if (rem === 0) {
                                //let tmpObj = {};
                                tmpObj['memberNm' + rem] = n.memberNm;
                                tmpObj['lsnData' + rem] = n.lsnData;
                                arr.push(tmpObj);
                                arr.push(tmpObj);
                            } else {
                                let curIdx = parseInt(idx / 3);
                                let curObj = arr[curIdx];
                                tmpObj['memberNm' + rem] = n.memberNm;
                                tmpObj['lsnData' + rem] = n.lsnData;
                                $.extend(curObj, tmpObj);

                                arr[curIdx] = curObj;
                            }
                        });
                        m.schedule = arr.slice(0);
                    });
                }

                let html = Mustache.render(reservationTmpl, {list: res});
                $('#reservation-container').html(html);
                /*// 출/결처리가 된 항목은 '취소'는 불가하도록 처리
                $('#sel-attend option[display-flag=\'0\']').each(function() {
                    $(this).remove();
                });*/
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
    addGroupLesson: function(user) {
        let selectedItem = {};
        let lsnData = $('#modal-caption').data('id');

        $('#new-reservation-container tbody tr').each(function() {
            let selected = $(this).find('td').hasClass('selected');
            if (selected) {
                selectedItem = $(this).data('id');
            }
        });

        //선택된 레슨이 있는지 체크
        if (typeof selectedItem === 'undefined') {
            alert('먼저 예약할 레슨을 선택하세요.');
            return false;
        }

        /* 예약 confirm */
        var retReserv = confirm('선택한 등록정보로 예약하시겠습니까?');
        if (retReserv != true) {
            return false;
        }

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
                fnObj.fn.getGroupLesson(user);
                alert('예약이 완료되었습니다.');
                $('#groupLessonModalCenter').modal('toggle');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    delGroupLesson: function(user, lsnData) {
        let data = [].concat(lsnData);

        $.ajax({
            type: 'PUT',
            url: '/api/teacher/lesson/cancel',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                console.log('Cancel lesson success....');
                //그룹레슨 재조회 처리
                fnObj.fn.getGroupLesson(user);
            },
        });
        return false;
    },

};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);

    //주차 datepicker 셋팅 (현재월을 기준으로 -3개월 ~ +3개월)
    makeWeekSelectOptions('week', 3);
    //var date = new Date("20181001".replace( /(\d{4})(\d{2})(\d{2})/, "$1/$2/$3"));
});
	


