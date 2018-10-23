let fnObj = {};
let reportTmpl = $('#report-template').html();

//view 초기화 
fnObj.initView = function(user) {
    $('.username').text(user.username);
    var html = Mustache.render(reportTmpl, {list: [], sums : []});
    $('#report-container').html(html);
    fnObj.fn.setSearchYear();
    fnObj.fn.setSearchMonth();
    fnObj.fn.getLessonReport(user);
};

//이벤트 초기화 
fnObj.initEvent = function(user) {

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
        			lsnCntDuet : 0,
                	lsnCntGroup : 0,
                	lsnCntKidD : 0,
                	lsnCntKidP : 0,
                	lsnCntPrivate : 0
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
                if ( res.length == 0) {
                	sum = {};
                }
                var html = Mustache.render(reportTmpl, {list: res, sums: sum});
                $('#report-container').html(html);
                
                
            },
        });
        return false;
    },

    setSearchYear: function() {
        let curDate = new Date();
        let y = curDate.getFullYear();

        let option;
        for (var i = y - 10; i <= y; i++) {
            option += ' <option value="' + i + '">' + i + '년' + '</option> ';
        }
        $('#report-year').html(option);
        $('#report-year').val(y);
    },

    setSearchMonth: function() {
    	let option;
    	let curDate = new Date();
    	let m = curDate.getMonth() + 1;
    	console.log(m);
        for (var i = 1; i <= 12; i++) {
            option += ' <option value="' + i + '">' + i + '월' + '</option> ';
        }
        $('#report-month').html(option);
        $('#report-month').val(m);
    },

    // 조회조건
    getData: function(user) {
        let storCd = user.storCd;
        let empNo = user.empNo;
        let searchDate = $('#report-year').val() + '' + lpad($('#report-month').val(), 2);
        
        //관리자인경우 파라미터값 null 처리
        if (user.userLv === '01') {
            empNo = '';
            storCd = '';
        }
        
        empNo = '';
        storCd = '';

        return {
            storCd: storCd,
            empNo: empNo,           //선생님
            schMonth: searchDate,   //조회년월
        };
    },
};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);
    
    
    
    
    //console.log('max weeks:' + getWeekCountOfMonth('201810'));
    //var hp = "01040649971".replace( /(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    //console.log('hp:' + hp);
    
});

/**
 * 조회년도 선택시
 * 선택한 년도에 10년 이전 년도까지 출력
 * @returns
 */
$("#report-year").on('change', function(){
	let selectedYear = $(this).val();
	let curDate = new Date();
	let startYear = selectedYear - 10;
	let endYear = curDate.getFullYear();
	$("#report-year").children().remove();
	let option;
	for(var year=startYear; year<=endYear; year++) {
		option += ' <option value="' + year + '">' + year + '년' + '</option> ';
	}
	$('#report-year').html(option);
    $('#report-year').val(selectedYear);
});

/**
 * lpad 함수구현
 * @param n
 * @param width
 * @returns
 */
function lpad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

/**
 * 나의실적조회
 * @returns
 */
$('#search-attend').on('click', function(){
	let user = JSON.parse(window.localStorage.getItem('todays'));
	fnObj.fn.getLessonReport(user);
});


