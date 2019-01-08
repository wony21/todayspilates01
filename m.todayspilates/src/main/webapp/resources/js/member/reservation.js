var common = {};

// todo : 공통함수로 뺄 것..
function parse(str) {
    if (!/^(\d){8}$/.test(str)) return 'invalid date';
    var y = str.substr(0, 4),
        m = str.substr(4, 2),
        d = str.substr(6, 2);
    return new Date(y, m, d);
}

//todo : 공통함수로 뺄 것..
function getDayOfWeek(day) {
    if (day == null) {
        return '';
    }
    var dat1 = parse(day);
    var week = ['일', '월', '화', '수', '목', '금', '토'];
    var dayOfWeek = week[dat1.getDay()];
    return '(' + dayOfWeek + ')';
}

$(function() {
    var reservation = $('#reservation-template').html();
    var summary = $('#summary-template').html();
    var user = JSON.parse(window.localStorage.getItem('todays'));
    $('.username').text(user.username);

    $.ajax({
        type: 'GET',
        url: '/api/member/reservation',
        data: {storCd: user.storCd, memberNo: user.memberNo},
        success: function(res) {
            res.forEach(function(n) {
                n.dayOfWeek = getDayOfWeek(n.rsvDt);
                n.rsvDt = (n.rsvDt == null) ?
                    '(예약없음)' :
                    n.rsvDt.substr(4, 2) + '.' + n.rsvDt.substr(6, 7);		//mm.dd
                n.rsvTm = (n.rsvTm == null) ?
                    '' :
                    n.rsvTm.substr(0, 2) + ':' + n.rsvTm.substr(2, 3);  // hh:mm
                n.lsnEdDt = (n.lsnEdDt == null) ?
                    '' :
                    '`' + n.lsnEdDt.substr(2, 2) + '.' +
                    n.lsnEdDt.substr(4, 2) + '.' + n.lsnEdDt.substr(6, 7);	// yy-mm-dd
                if(n.lsnTm) {
                	n.lsnTm = n.lsnTm.toFixed(1);
                }
            });
            console.log(res);
            var html = Mustache.render(reservation, {list: res});
            $('#reservation-container').append(html);
        },
    });

    $.ajax({
        type: 'GET',
        url: '/api/member/lesson/summary',
        data: {storCd: user.storCd, memberNo: user.memberNo},
        success: function(res) {
            var html = Mustache.render(summary, {list: res});
            $('#summary-container').append(html);
            $('#lsnUseSum').text(res[0].lsnUseSum);
            //console.log('memberNo:' + {memberNo})
        },
    });
});

$('#reservation-container').on('click', 'tbody tr', function(e) {
    let lsnCd = $(this).data('id');
    let lsnNm = $(this).find('td').eq(0).text();
    let empNm = $(this).find('td').eq(3).text();
    let user = JSON.parse(window.localStorage.getItem('todays'));
    user.lsnCd = lsnCd;
    user.lsnNm = lsnNm;
    user.empNm = empNm;
    window.localStorage.setItem('todays', JSON.stringify(user));

    //goPage('member/reservation-detail');
    goPage('/member/reservation_detail');
});


