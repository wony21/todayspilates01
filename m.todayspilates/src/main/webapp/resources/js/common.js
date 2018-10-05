(function() {

	/**
	 * @param {val} date
	 * @param {dm} delimeter
	 */
	dateFormat = function(val, dm) {
		let date = new Date(val);
		return date.getMonth() + 1 + dm + date.getDate() + dm
				+ date.getFullYear();
	}
	
	/**
	 * 날짜형식이 올바른지 유효성 체크 (8자리)
	 * @param dateString yyyymmdd
	 */ 
	isValidDate = function(dateString) {
		var regEx = /^\d{4}\d{2}\d{2}$/;
		if (!regEx.test(dateString)) {
			return false; // Invalid format
		}
		return true;
	}
	
	isValidTime = function(timeString) {
		var regEx = /^\d{2}\d{2}$/;
		if (!regEx.test(timeString)) {
			return false; // Invalid format
		}
		return true;
	}
	
	/**
	 * 해당월의 주의 최대값
	 * @param dateString yyyymm
	 */
	getWeekCountOfMonth = function(dateString) {
	    var year  = Number(dateString.substring(0, 4));
	    var month = Number(dateString.substring(4, 6));
	    var nowDate = new Date(year, month-1, 1);
	    var lastDate = new Date(year, month, 0).getDate();
	    var monthSWeek = nowDate.getDay();
	    var weekSeq = parseInt((parseInt(lastDate) + monthSWeek - 1)/7) + 1;
	 
	    return weekSeq;
	}
	
	/**
	 * 기간내 월별 주차를 셋팅한다.
	 * @param target target element id
	 * @param period search period (-period ~ +period)
	 */
	makeWeekSelectOptions = function (target, period) {
		var today = new Date();
		let sttDt = ax5.util.date(today, { add:{d: -today.getDay()}, return: 'yyyyMMdd'});
		var seled = "";
		var obj = document.getElementById(target);
	    obj.options.length = 0;
	    
		for (var m = -period; m <= period; m++) {
			let formattedDate = ax5.util.date((today), {add:{m: m}, return:'yyyy/MM/dd'});
			let fdate = formattedDate.split('/');
			var year = fdate[0];
			var month = fdate[1];
		    
		    var sdate = new Date(year, month-1, 01);
		    var lastDay = (new Date(sdate.getFullYear(), sdate.getMonth()+1, 0)).getDate();
		    var endDate = new Date(sdate.getFullYear(), sdate.getMonth(), lastDay);
		    var week = sdate.getDay();
		    sdate.setDate(sdate.getDate() - week);
		    //각 달의 마지막주 시작일자
		    var edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
		    
		    var i = 1;
		    while(endDate.getTime() >= edate.getTime()) {
		        var sYear = sdate.getFullYear();
		        var sMonth = (sdate.getMonth()+1);
		        var sDay = sdate.getDate();
		 
		        sMonth = (sMonth < 10) ? "0"+sMonth : sMonth;
		        sDay = (sDay < 10) ? "0"+sDay : sDay;
		 
		        var stxt = sYear + '' + sMonth + '' + sDay;
		        edate.setDate(sdate.getDate() + 6);
		 
		        var eYear = edate.getFullYear();
		        var eMonth = (edate.getMonth()+1);
		        var eDay = edate.getDate();
		 
		        eMonth = (eMonth < 10) ? "0"+eMonth : eMonth;
		        eDay = (eDay < 10) ? "0"+eDay : eDay;
		        var etxt = eYear + "-" + eMonth + "-" + eDay;
		        if(sttDt === stxt) {
		        	seled = stxt;
		        }
		        //todo : 마지막주와 다음달 첫주의 중복된 경우 처리필요.... (주차로 인정되기 위한 조건은 한주에 4일이상이 표시되어야 한다)
		        obj.options[obj.options.length] = new Option(year+'년 ' + month + '월 ' + i++ +'주', stxt);
		        sdate = new Date(edate.getFullYear(), edate.getMonth(), edate.getDate() + 1);
		        edate = new Date(sdate.getFullYear(), sdate.getMonth(), sdate.getDate());
		    }
		}
		if(seled) obj.value = seled;
	}

	/**
	 * @param name parameter key
	 * @param url current page url
	 */
	getParameterByName = function(name, url) {
		if (!url)
			url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex
				.exec(url);
		if (!results)
			return null;
		if (!results[2])
			return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	goPage = function(page, params) {
		var protocol = document.location.protocol;
		var hostname = window.location.hostname;
		var port = document.location.port;

		var url = protocol + '//' + hostname + ':' + port + '/' + page;
		//window.location = "news_edit.html?article_id=" + articleId;
		$(location).attr('href', url);
		return false;
	}

	$('#logout').bind('click', function() {
		$.ajax({
			type : 'POST',
			url : '/logout',
			success : function(res) {
				goPage('login');
			}
		})
	});

})();
