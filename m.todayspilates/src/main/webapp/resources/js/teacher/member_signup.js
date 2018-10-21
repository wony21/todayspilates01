var common = {};
let fnObj = {};
let memberTmpl = $('#member-template').html();
let newMemberTmpl = $('#new-member-template').html();
let lessonTmpl = $('#lesson-template').html();
let newLessonTmpl = $('#new-lesson-template').html();

//view 초기화
fnObj.initView = function(user) {
    let html;
    $('.username').text(user.username);

    html = Mustache.render(memberTmpl, {list: []});
    $('#member-container').html(html);

    html = Mustache.render(lessonTmpl, {list: []});
    $('#lesson-container').html(html);

    //가입경로조회
    fnObj.fn.setSignUpPath(user);
    //선생님조회
    fnObj.fn.setTeacher(user);
    //레슨코드조회(개인,그룹..)
    fnObj.fn.setLessonCd(user);
    //레슨종류조회 (정상,체험,쿠폰)
    fnObj.fn.setLessonType(user);
    //결제방법조회
    fnObj.fn.setPayType(user);
};

//이벤트 초기화
fnObj.initEvent = function(user) {
    // 회원명 조회
    $(document.body).on('click', '#search-member', function(e) {
        fnObj.fn.getMember(user);
    });

    // 회원등록(팝업창)
    $('#add-member').on('click', function(e) {
        console.log('add member...');
    });

    // 수업등록
    $('#add-lesson').on('click', function(e) {
        fnObj.fn.addLesson(user);
    });

    $('#member-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        selectedItem = $(this).index(); //selectedItem => 전역변수

        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        $('#member-container tbody tr').
            children('td').
            removeClass('selected');
        if (!selected) {
            $(this).children('td').addClass('selected');
        }

        //선택된 회원의 등록된 수업조회
        fnObj.fn.getLesson(user, lsnData);
    });

    $('#lesson-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        selectedItem = $(this).index(); //selectedItem => 전역변수

        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        $('#lesson-container tbody tr').
            children('td').
            removeClass('selected');
        if (!selected) {
            $(this).children('td').addClass('selected');
        }

        //선택된 회원의 등록된 수업조회
        fnObj.fn.setLessonData(lsnData);
        //수업등록 팝업 띄우기
        $('#lessonModalCenter').modal('toggle');
    });
};

fnObj.fn = {
    //등록된 회원조회 (회원명으로 검색)
    getMember: function(user) {
        let filter = $.trim($('#filter').val());

        $.ajax({
            type: 'GET',
            url: '/api/member/list',
            data: {storCd: user.storCd, memberNm: filter},
            success: function(res) {
                res.forEach(function(n) {
                    if (n.useYn === 'Y') {
                        n['useYnNm'] = '활동';
                    } else {
                        n['useYnNm'] = '미활동';
                    }
                    n['lsnData'] = JSON.stringify(n);
                });

                var html = Mustache.render(memberTmpl, {list: res});
                $('#member-container').html(html);
            },
        });
        return false;
    },

    //검색된 회원의 수업조회
    getLesson: function(user, lsnData) {
        $.ajax({
            type: 'GET',
            url: '/api/lesson/list',
            data: {storCd: user.storCd, memberNo: lsnData.memberNo},
            success: function(res) {
                res.forEach(function(n) {
                    n['lsnData'] = JSON.stringify(n);
                });

                var html = Mustache.render(lessonTmpl, {list: res});
                $('#lesson-container').html(html);
            },
        });
        return false;
    },

    //선택된 수업의 상세정보를 조회 (수업등록 팝업)
    setLessonData: function(lsnData) {
        let regDt = (isValidDate(lsnData.regDt) === false) ? '' :
            ax5.util.date(lsnData.regDt, {return: 'yyyy-MM-dd'});

        $('#memberNo').val(lsnData.memberNm);
        $('#memberNo').data('id', lsnData.memberNo);
        $('#teacher').val(lsnData.empNo);
        $('#lsnNo').val(lsnData.lsnNo);
        $('#lsnCd').val(lsnData.lsnCd);
        $('#lsnTy').val(lsnData.lsnRegTy);
        $('#lsnFg').val(lsnData.lsnFg);
        $('#lsnAmt').val(ax5.util.number(lsnData.lsnAmt, {money: true}));
        $('#payTp').val(lsnData.payTp);
        $('#lsnCnt').val(lsnData.lsnCnt);
        $('#lsnUseCnt').val(lsnData.lsnUseCnt);
        $('#lsnModCnt').val(lsnData.lsnModCnt);
        $('#lsnRestCnt').val(lsnData.lsnRestCnt);
        $('#lsnExpWk').val(lsnData.lsnExpWk);
        $('#lsnStDt').val(lsnData.lsnStDt);
        $('#lsnEdDt').val(lsnData.lsnEdDt);
        $('#regDt').val(regDt);
        $('#clsFg').val(lsnData.clsFg);
        $('#remark').val(lsnData.remark);
    },

    getLessonData: function(user) {
        return {
            compCd: user.compCd,
            storCd: user.storCd,
            memberNo: $('#memberNo').data('id'),
            empNo: $('#teacher').val(),
            //lsnNo: $('#lsnNo').val(), //자동생성
            lsnCd: $('#lsnCd').val(),
            lsnTy: $('#lsnTy').val(),
            lsnFg: $('#lsnFg').val(),
            lsnAmt: $('#lsnAmt').val().replace(/[^0-9]/g, ''), //str.replace(/[^d.,]+/,'')
            payTp: $('#payTp').val(),
            lsnCd: $('#lsnCnt').val(),
            lsnExpWk: $('#lsnExpWk').val(),
            entDt: ax5.util.date($('#regDt').val(), {return: 'yyyyMMdd'}),
            clsFg: $('#clsFg').val(),
            remark: $('#remark').val(),
        }
    },

    //회원가입경로 코드 조회
    setSignUpPath: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            data: {groupCd: '006'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.code + '">' + n.name +
                        '</option> ';
                });
                $('#signup-path').html(option);
            },
        });
        return false;
    },

    //수업등록 팝업 - 선생님리스트 조회
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

    //수업코드 조회 (개인,그룹,....)
    setLessonCd: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/lesson',
            data: { storCd: user.storCd, lsnFg: '1'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.lsnCd + '">' + n.lsnNm +
                        '</option> ';
                });
                $('#lsnCd').html(option);
            },
        });
    },

    //레슨종류 조회 (정상,체험,쿠폰...)
    setLessonType: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            data: { groupCd: '003'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.code + '">' + n.name +
                        '</option> ';
                });
                $('#lsnFg').html(option);
            },
        });
    },

    //결제방법 조회
    setPayType: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            data: { groupCd: '008'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.code + '">' + n.name +
                        '</option> ';
                });
                $('#payTp').html(option);
            },
        });
    },

    // 조회조건
    getData: function(user) {
        return {
            memberId: user.storCd,
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
    addLesson: function(user) {
        let gd = [].concat(this.getLessonData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/lesson/add',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('수업등록이 완료되었습니다.');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);
});