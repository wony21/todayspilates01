let fnObj = {};
let memberTmpl = $('#member-template').html();
let lessonTmpl = $('#lesson-template').html();

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
    fnObj.fn.setLessonType();
    //결제방법조회
    fnObj.fn.setPayType();
    //수업여부조회
    fnObj.fn.setLessonStatus();
};

//이벤트 초기화
fnObj.initEvent = function(user) {
    // 회원명 조회
    $(document.body).on('click', '#search-member', function(e) {
        fnObj.fn.getMember(user);
    });

    //회원등록버튼 처리
    $(document.body).on('click', '#call-add-member', function(e) {
        let data = {
            __created__: true,
            sex: "남",
            entFg: '1',
            useYn: 'Y',
        };

        $('#delete-member').hide();
        fnObj.fn.setMemberData(data);
        fnObj.fn.showMemberModal()
    });

    //정보수정버튼 처리
    $(document.body).on('click', '#call-update-member', function(e) {
        let data;
        let selected = fnObj.fn.isSelectedMember();

        if (selected === -1) {
            alert('회원을 선택해 주세요');
            return false;
        }

        $('#delete-member').show();
        //선택된 회원의 정보를 조회
        data = $('#member-container tbody').find('tr').eq(selected).data('id');
        //팝업창 데이터 초기화
        fnObj.fn.setMemberData(data);
        /*//팝업창 호출
        $('#memberModalCenter').modal('toggle');*/
        fnObj.fn.showMemberModal(data);
    });

    //회원중복체크 처리
    $('#check-member').on('click', function(e) {
        fnObj.fn.checkMember(user);
    });

    // 회원정보저장(수정/등록)
    $('#save-member').on('click', function(e) {
        let memberNo = $('#new-member-container #memberNm').data('id');
        if (memberNo === '') {
            fnObj.fn.addMember(user);
        } else {
            fnObj.fn.updateMember(user);
        }
    });
    // 회원삭제처리
    $('#delete-member').on('click', function(e) {
        fnObj.fn.deleteMember(user);
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
        let data;
        let selected = fnObj.fn.isSelectedMember();
        if (selected === -1) {
            alert('회원을 선택하신 후 수업을 등록해주세요');
            return false;
        }

        data = $('#member-container tbody').find('tr').eq(selected).data('id');
        let lsnData = {
            __created__: true,
            memberNo: data.memberNo,
            memberNm: data.memberNm,
            lsnCd: '01',
            lsnRegTy: 1,
            lsnFg: 1,
        };

        fnObj.fn.setLessonData(lsnData);
        $('#lessonModalCenter').modal('toggle');

    });

    $('#lesson-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');
        if (typeof lsnData === 'undefined') {
            return false;
        }
        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        if (!selected) {
            $('#lesson-container tbody tr').children('td').removeClass('selected');
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
    //회원중복체크
    checkMember: function(user) {
        let filter = $.trim($('#filter').val());
        $.ajax({
            type: 'GET',
            url: '/api/member/check',
            data: {storCd: user.storCd, mobile: $('#hp').val()},
            success: function(res) {
                if (res[0].existMember === false) {
                    alert('신규회원 입니다.');
                } else {
                    alert('이미 등록된 회원입니다. 변경하십시오');
                }
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
    //회원정보수정
    updateMember: function(user) {
        let gd = [].concat(this.getMemberData(user));

        $.ajax({
            type: 'PUT',
            url: '/api/member/modify',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                //alert('회원수정이 완료되었습니다.');
                $('#memberModalCenter').modal('toggle');
                //회원 재조회 처리
                $('#filter').val(gd[0].memberNm);
                fnObj.fn.getMember(user);
                fnObj.fn.getLesson(user, {memberNo: gd[0].memberNo});
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },
    //회원삭제
    deleteMember: function(user) {
        let gd = [].concat(this.getMemberData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/member/delete',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                //alert('회원삭제가 완료되었습니다.');
                $('#memberModalCenter').modal('toggle');
                //회원 재조회 처리
                $('#filter').val(gd[0].memberNm);
                fnObj.fn.getMember(user);
                fnObj.fn.getLesson(user, {memberNo: gd[0].memberNo});
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    //화면에 회원데이터 셋팅
    setMemberData: function(lsnData) {
        $('#memberNm').val(lsnData.memberNm);
        $('#memberNm').data('id', lsnData.memberNo);
        $('#hp').val(lsnData.hp);
        $('#sex').val(lsnData.sex);
        $('#entFg').val(lsnData.entFg);
        $('#member-remark').val(lsnData.remark);
        $('#useYn').val(lsnData.useYn);
    },

    //화면의 회원데이터 조회
    getMemberData: function(user) {
        let date = ax5.util.date((new Date()), {return: 'yyyyMMdd'});
        return {
            compCd: user.compCd,                    //key3
            storCd: user.storCd,                    //key1
            memberNo: $('#memberNm').data('id'),    //key2
            memberNm: $('#memberNm').val(),
            mobile: $('#hp').val(),
            hp: $('#hp').val(),
            sex: $('#sex').val(),
            entFg: $('#entFg').val(),
            entDt: date,
            useYn: $('#useYn').val(),
            remark: $('#member-remark').val(),
        }
    },

    showMemberModal: function(user) {
        $('#memberModalCenter').modal('toggle');
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
    //팝업화면의 수업 데이터 조회
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
    //수업신규등록
    addLesson: function(user) {
        let gd = [].concat(this.getLessonData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/lesson/add',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                //alert('수업등록이 완료되었습니다.');
                $('#lessonModalCenter').modal('toggle');
                //등록된 수업데이터를 재조회 처리
                fnObj.fn.getLesson(user, {memberNo: gd[0].memberNo})
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },
    //기존수업수정
    updateLesson: function(user) {
        let gd = [].concat(this.getLessonData(user));
        $.ajax({
            type: 'PUT',
            url: '/api/lesson/modify',
            data: JSON.stringify(gd),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                //alert('업데이트 완료되었습니다.');
                $('#lessonModalCenter').modal('toggle');
                //수정된 수업데이터를 재조회 처리
                fnObj.fn.getLesson(user, {memberNo: gd[0].memberNo})
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
    setLessonType: function() {
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
    setPayType: function() {
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

    setLessonStatus: function() {
        $('#useYn').val('Y');
    },
    // 조회조건
    getData: function(user) {
        return {
            memberId: user.storCd,
        };
    },
};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);
});