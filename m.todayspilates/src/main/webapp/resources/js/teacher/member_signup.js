var common = {};
let fnObj = {};
let memberTmpl = $('#member-template').html();
let newMemberTmpl = $('#new-member-template').html();
let lessonTmpl = $('#lesson-template').html();
let newLessonTmpl = $('#new-lesson-template').html();
let selectedItem = -1;  //lesson
let selectedItem2 = -1; //member

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

    $(document.body).on('click', '#call-update-member', function(e) {
        let data;
        let selected = fnObj.fn.isSelectedMember();

        if (selected === -1) {
            alert('회원을 선택해 주세요');
            return false;
        }
        //선택된 회원의 정보를 조회
        data = $('#member-container tbody').find('tr').eq(selected).data('id');
        //팝업창 데이터 초기화
        fnObj.fn.setMemberData(data);
        //팝업창 호출
        $('#memberModalCenter').modal('toggle');

    });

    // 회원등록(팝업창)
    $('#save-member').on('click', function(e) {
        console.log('add member...');
        fnObj.fn.addMember(user);
    });

    $('#member-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        if (typeof lsnData === 'undefined') {
            return false;
        }

        let selected = $(this).children('td').hasClass('selected');
        if (!selected) {
            $('#member-container tbody tr').children('td').removeClass('selected');
            $(this).children('td').addClass('selected');
        }
        //선택된 회원의 등록된 수업조회
        fnObj.fn.getLesson(user, lsnData);
    });

    // 수업신규등록
    $(document.body).on('click', '#add-lesson', function(e) {
        // let lsnData = $(this).data('id');
        let lsnData = {};
        let selectedMember = $('#member-container tbody').
            find('tr').eq(selectedItem).data('id');

        if (typeof selectedMember === 'undefined' || selectedMember === '') {
            alert('회원을 선택하신 후 수업을 등록해주세요');
            return false;
        }

        lsnData = {
            __created__: true,
            memberNo: selectedMember.memberNo,
            memberNm: selectedMember.memberNm,
            lsnCd: '01',
            lsnRegTy: 1,
            lsnFg: 1,
        };

        fnObj.fn.setLessonData(lsnData);
        $('#lessonModalCenter').modal('toggle');

    });

    $('#lesson-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        //selectedItem = $(this).index(); //selectedItem => 전역변수

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

    // 수업저장 이벤트
    $('#save-lesson').on('click', function(e) {
        let lsnNo = $('#lsnNo').val();

        if (lsnNo === '') {                 //신규등록
            fnObj.fn.addLesson(user);
        } else {                            //수정
            fnObj.fn.updateLesson(user);
        }

        //todo: 팝업 닫을때 수업만 재조회 처리
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

    //신규회원등록 (팝업창에서 처리)
    addMember: function(user) {
        let gd = [].concat(this.getMemberData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/member/add',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                //alert('회원등록이 완료되었습니다.');
                $('#memberModalCenter').modal('toggle');
                //회원 재조회 처리
                $('#filter').val(gd[0].memberNm);
                fnObj.fn.getMember(user);
                fnObj.fn.getLesson(user, {memberNo: '-99999'});
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    updateMember: function(user) {
        let gd = [].concat(this.getMemberData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/member/modify',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('회원수정이 완료되었습니다.');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    setMemberData: function(lsnData) {
        $('#memberNm').val(lsnData.memberNm);
        $('#memberNm').data('id', lsnData.memberNo);
        $('#hp').val(lsnData.hp);
        $('#sex').val(lsnData.sex);
        $('#entFg').val(lsnData.entFg);
        $('#member-remark').val(lsnData.remark);
        $('#useYn').val(lsnData.useYn);
    },

    getMemberData: function(user) {
        let date = ax5.util.date((new Date()), {return: 'yyyyMMdd'});
        return {
            storCd: user.storCd,
            mobile: $('#hp').val(),
            memberNm: $('#memberNm').val(),
            sex: $('#sex').val(),
            entDt: date,
            remark: $('#member-remark').val(),
        }
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
            lsnNo: $('#lsnNo').val(),
            lsnCd: $('#lsnCd').val(),
            lsnTy: $('#lsnTy').val(),
            lsnFg: $('#lsnFg').val(),
            lsnAmt: parseInt($('#lsnAmt').val().replace(/[^0-9]/g, '')), //str.replace(/[^d.,]+/,'')
            payTp: $('#payTp').val(),
            lsnCnt: parseInt($('#lsnCnt').val()),
            lsnExpWk: parseInt($('#lsnExpWk').val()),
            entDt: ax5.util.date($('#regDt').val(), {return: 'yyyyMMdd'}),
            clsFg: $('#clsFg').val(),
            remark: $('#remark').val(),
        };
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
                $('#entFg').html(option);
                $('#entFg').val(1);
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
                let option = '<option value="">선택</option>';
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
            data: {storCd: user.storCd, lsnFg: '1'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.lsnCd + '">' + n.lsnNm +
                        '</option> ';
                });
                $('#lsnCd').html(option);
                $('#lsnCd').val('01');
            },
        });
    },

    //레슨종류 조회 (정상,체험,쿠폰...)
    setLessonType: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            data: {groupCd: '003'},
            success: function(res) {
                let option;
                res.forEach(function(n) {
                    option += ' <option value="' + n.code + '">' + n.name +
                        '</option> ';
                });
                $('#lsnFg').html(option);
                //$('#lsnFg').html('1');
            },
        });
    },

    //결제방법 조회
    setPayType: function(user) {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            data: {groupCd: '008'},
            success: function(res) {
                let option = '<option value="">선택</option>';
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

    //수업수정
    updateLesson: function(user) {
        let gd = [].concat(this.getLessonData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/lesson/modify',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                alert('업데이트 완료되었습니다.');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    //수업신규등록
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

    //회원리스트에서 선택된 회원이 있는지 체크. (true/false 반환)
    isSelectedMember: function() {
        let index = -1;

        //selected = $('#member-container tbody tr').find('td').hasClass('selected');
        $('#member-container tbody tr').each(function() {
           let selected = $(this).find('td').hasClass('selected');
           if (selected) {
               index = $(this).index();
           }
        });
        return index;
    },

};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);
});