let fnObj = {};

//view 초기화
fnObj.initView = function(user) {
    //localStorage 에서 아이디저장 값을 읽어 체크박스 처리
    let checked = (user === null || typeof user === 'undefined') ? false : user.checked;
    $('#save_id').prop('checked', checked);

    //스튜디오 리스트 조회 & 셋팅
    fnObj.fn.setStudio(user);
    //핸드폰번호 조회 & 셋팅
    fnObj.fn.setMobile(user);
    //하단 링크 아이콘 url 연동처리
    fnObj.fn.setLinkIcon();
};

//이벤트 초기화
fnObj.initEvent = function(user) {
    //로그인 처리
    $('#btn_login').on('click', function() {
        let formData = fnObj.fn.getData();

        if (!formData.storCd) {
            alert('스튜디오를 선택하세요.');
            $('#studio').trigger('focus');
            return false;
        }

        if (!formData.phone) {
            alert('전화번호를 입력하세요.');
            $('#phone2').trigger('focus');
            return false;
        }

        $.ajax({
            type: 'GET',
            url: '/api/existUserInStor',
            data: formData,
            success: function(data) {
                let save = {};
                let exist = data[0].existFg;
                if (exist != -99999) {
                    $('#id').val(formData.userCd);
                    var checked = $('#save_id').is(':checked');
                    if (checked) {
                        save = {
                            studio: $('#studio').val(),
                            prefix: $('#phone').val(),
                            phone: $('#phone2').val(),
                            checked: checked,
                        };
                        window.localStorage.setItem('login', JSON.stringify(save));
                    } else {
                        //login key 삭제처리
                        window.localStorage.removeItem('login');
                    }

                    //$('#login-form').submit();
                    $('#login-form').trigger('submit');
                } else {
                    alert('스튜디오를 확인하세요.');
                }
            },
            error: function() {
            },
            complete: function() {
            },
        });
    });

};

fnObj.fn = {
    // 스튜디오 조회
    setStudio: function(user) {
        $.ajax({
            url: '/api/stor',
            type: 'GET',
            success: function(res) {
                let option = '';
                let defaultStudio = '';
                res.forEach(function(n) {
                    option += '<option value=' + n.storCd + '>' + n.storNm
                        + '</option>';

                    //todo: 이름으로 해야 할지? 코드로 해야할지 변경이 안되는 항목으로 처리하자...
                    if (n.storNm === '수내점') {
                        defaultStudio = n.storCd;
                    }
                });

                $('#studio').html(option);
                if (typeof user !== 'undefined' && user !== null) {
                    $('#studio').val(user.studio);
                } else {
                    $('#studio').val(defaultStudio);
                }
            },
        });
    },

    setMobile: function(user) {
        if (typeof user !== 'undefined' && user !== null) {
            $('#phone').val(user.prefix);
        }

        if (typeof user !== 'undefined' && user !== null) {
            $('#phone2').val(user.phone);
        }
    },

    setLinkIcon: function() {
        $.ajax({
            type: 'GET',
            url: '/api/common',
            success: function(data) {
                data.forEach(function(n) {
                    if (data.code == '01') {
                        window.localStorage.setItem('lnk-homepage', data.name);
                    } else if (data.code == '02') {
                        window.localStorage.setItem('lnk-instagram', data.name);
                    } else if (data.code == '03') {
                        window.localStorage.setItem('lnk-blog', data.name);
                    }
                });
            },
        });
    },
    // 조회조건
    getData: function() {
        return {
            storCd: $('#studio').val(),
            userCd: $('#phone').val() + '' + $.trim($('#phone2').val()),
            phone: $.trim($('#phone2').val()),
        };
    },

};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('login'));
    fnObj.initView(user);
    fnObj.initEvent(user);

});



