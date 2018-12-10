var common = {};
let fnObj = {};
let detail_template = $('#reservation-template').html();

$(function(e) {
    //console.log('memberNo:' + memberNo);
    let user = JSON.parse(window.localStorage.getItem('todays'));
    let empNm = user.empNm;
    let lsnNm = user.lsnNm;
    let lsnCd = user.lsnCd;
    let memberNm = user.username;

    $('.username').text(user.username);

    $.ajax({
        type: 'GET',
        url: '/api/member/reservation/detail', ///api/member/reservation/detail?storCd=001&memberNo=00001&lsnCd=01
        data: {storCd: user.storCd, memberNo: user.memberNo, lsnCd: user.lsnCd},
        success: function(res) {
            var regEx = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;
            res.forEach(function(n, idx) {
                //n.atndDt = ax5.util.date((n.atndDt == null) ? '' : n.atndDt, {return: 'yyyy/MM/dd'});
                n.atndDt = '`' + n.atndDt.substr(2, 2) + '.' +
                    n.atndDt.substr(4, 2) + '.' + n.atndDt.substr(6, 7);	// yy-mm-dd
                n.atndTm = (n.atndTm == null) ?
                    '' :
                    n.atndTm.substr(0, 2) + ':' + n.atndTm.substr(2, 3);  // hh:mm
                n.idx = idx + 1;
            });

            var html = Mustache.render(detail_template, {list: res});
            $('#reservation-container').append(html);
            $('#caption').text('( ' + empNm + '선생님 : ' + lsnNm + '레슨' + ' )');

            //console.log('memberNo:' + {memberNo})
        },
    });
});
