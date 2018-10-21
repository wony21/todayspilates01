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
    //등록된 회원조회 (회원명으로 검색)
    getMember: function(user) {
        let filter = $.trim($('#filter').val());

        $.ajax({
            type: 'GET',
            url: '/api/member/list',
            data: {storCd: user.storCd, memberNm: filter},
            success: function(res) {
                var html = Mustache.render(memberTmpl, {list: res});
                $('#member-container').html(html);
            },
        });
        return false;
    },

    //검색된 회원의 수업조회
    getLesson: function(user) {
        let search = fnObj.fn.getData(user);

        $.ajax({
            type: 'GET',
            url: '/api/lesson/list',
            data: search,
            success: function(res) {
                var html = Mustache.render(lessonTmpl, {list: res});
                $('#lesson-container').html(html);
            },
        });
        return false;
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
        let data = [
            {
                "compCd": user.compCd,
                "storCd": user.storCd,
                "memberNo": $('#memberNo').data('id'),
                "lsnNo": $('#lsnNo').val(),      //수업번호 : 3자리, 1씩 증가하도록 처리 (화면 표시가 되어야 하므로...)
                "lsnCd": $('#lsnCd').val(),		    //수업코드: (/api/lesson?storCd=001&lsnFg=1)   여기서 사용되는 lsnFg는 (1:개인,2:그룹)
                "lsnTy": $('#lsnTy').val(),		    //1:신규, 2:재등록
                "lsnFg": $('#lsnFg').val(),		    //정상,체험, 쿠폰(CODE:003)
                "lsnAmt": $('#lsnAmt').val(),	    //결제금액
                "payTp": $('#payTp').val(),		    //결제방법코드
                "lsnCnt": $('#lsnCnt').val(),		    //레슨등록시간
                "lsnExpWk": $('#lsnExpWk').val(),		    //유효기간(주)
                "empNo": $('#teacher').val(),	  //강사코드
                "remark": $('#remark').val(),
                "entDt": ax5.util.date((new Date()), {return: 'yyyyMMdd'}),
            }];

        $.ajax({
            type: 'PUT',
            url: '/api/lesson/add',
            data: JSON.stringify(data),
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