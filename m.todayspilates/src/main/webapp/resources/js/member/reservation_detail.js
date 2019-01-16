var common = {};
let fnObj = {};
let detail_template = $('#reservation-template').html();

//todo : 공통함수로 뺄 것..
function parse(str) {
    if (!/^(\d){8}$/.test(str)) return 'invalid date';
    var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
    return new Date(y + '-' + m + '-' + d);
}

//todo : 공통함수로 뺄 것..
function getDayOfWeek(day) {
    if (day == null) {
        return '';
    }
    var dat1 = parse(day);
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var dayOfWeek = week[dat1.getDay()];
    return dayOfWeek;
}

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
                
                n.rsvDate = (n.rsvDt == null) ? '' 
                			: '`' + n.rsvDt.substr(2, 2) + '.' + n.rsvDt.substr(4, 2) + '.' + n.rsvDt.substr(6, 7);
                n.rsvTime = (n.rsvTm == null) ? '' 
                			: n.rsvTm.substr(0, 2) + ':' + n.rsvTm.substr(2, 3);
                
                n.dy = (n.rsvDt == null) ? '' : getDayOfWeek(n.rsvDt);
                
                n.lsnTm = n.lsnTm.toFixed(1);
                
                n.idx = idx + 1;
            });

            var html = Mustache.render(detail_template, {list: res});
            $('#reservation-container').append(html);
            $('#caption').text('( ' + memberNm + '회원님 : ' + lsnNm + '레슨' + ' )');

            //console.log('memberNo:' + {memberNo})
        },
    });
});
