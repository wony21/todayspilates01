let fnObj = {};
let reportTmpl = $('#report-template').html();

//view 초기화 
fnObj.initView = function(user) {
    $('.username').text(user.username);

    let html = Mustache.render(reportTmpl, {list: [], sums: []});
    $('#report-container').html(html);

    fnObj.fn.setSearchYear();
    fnObj.fn.setSearchMonth();
    fnObj.fn.getLessonReport(user);
};

//이벤트 초기화 
fnObj.initEvent = function(user) {
    $(document.body).on('click', '#get-report', function(e) {
        fnObj.fn.getLessonReport(user);
    });
};

fnObj.fn = {
    // 수업실적조회
    getLessonReport: function(user) {
        let search = fnObj.fn.getData(user);

        $.ajax({
            type: 'GET',
            url: '/api/teacher/performance',
            data: search,
            success: function(res) {
                let sum = {
                    lsnCntDuet: 0,
                    lsnCntGroup: 0,
                    lsnCntKidD: 0,
                    lsnCntKidP: 0,
                    lsnCntPrivate: 0,
                };

                res.forEach(function(n) {
                    n.lsnCntSum = n.lsnCntDuet
                        + n.lsnCntGroup
                        + n.lsnCntKidD
                        + n.lsnCntKidP
                        + n.lsnCntPrivate;

                    sum.lsnCntDuet += n.lsnCntDuet;
                    sum.lsnCntGroup += n.lsnCntGroup;
                    sum.lsnCntKidD += n.lsnCntKidD;
                    sum.lsnCntKidP += n.lsnCntKidP;
                    sum.lsnCntPrivate += n.lsnCntPrivate;

                });

                sum.lsnCntSum = sum.lsnCntDuet
                    + sum.lsnCntGroup
                    + sum.lsnCntKidD
                    + sum.lsnCntKidP
                    + sum.lsnCntPrivate;
                if (res.length == 0) {
                    sum = {};
                }

                let html = Mustache.render(reportTmpl, {list: res, sums: sum});
                $('#report-container').html(html);

            },
        });
        return false;
    },

    setSearchYear: function() {
        let curDate = new Date();
        let y = curDate.getFullYear();

        let option = '';
        for (var i = y - 10; i <= y; i++) {
            option += ' <option value="' + i + '">' + i + '년' + '</option> ';
        }
        $('#report-year').html(option);
        $('#report-year').val(y);
    },

    setSearchMonth: function() {
        let option = '';
        let curDate = new Date();
        let m = curDate.getMonth() + 1;

        for (var i = 1; i <= 12; i++) {
            let formattedMon = ("00" + i).slice(-2);
            option += ' <option value="' + formattedMon + '">' + i + '월' + '</option> ';
        }
        $('#report-month').html(option);
        $('#report-month').val(("00" +m).slice(-2));
    },

    // 조회조건
    getData: function(user) {
        let storCd = user.storCd;
        let empNo = user.empNo;

        //관리자인경우 파라미터값 null 처리
        if (user.userLv === '01') {
            empNo = '';
            storCd = '';
        }

        return {
            storCd: storCd,
            empNo: empNo,
            schMonth: $('#report-year').val() + '' + $('#report-month').val(),
        };
    },
};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));

    fnObj.initView(user);
    fnObj.initEvent(user);
});


