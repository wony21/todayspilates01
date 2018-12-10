let common = {};
let fnObj = {};
let reservationTmpl = $('#reservation-template').html();
let newReservationTmpl = $('#new-reservation-template').html();
const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

//view 초기화 
fnObj.initView = function(user) {
    $('.username').text(user.username);
    //fnObj.fn.setDatePicker();
    //fnObj.fn.getGroupLesson(user);
    fnObj.fn.createEmptyTemplete();
    fnObj.fn.setSchMonth();
};

//이벤트 초기화 
fnObj.initEvent = function(user) {
    // 주차변경시 해당 주로 셋팅
    $(document.body).on('change', '#week', function(e) {
        fnObj.fn.setDatePicker($(this).val());
        //fnObj.fn.getGroupLesson(user);
    });

    // 선택한 일자의 그룹레슨을 조회
    $('#datepicker').on('click', ' tbody td', function(e) {
        let selected = $(this).hasClass('selected');
        if (!selected) {
            $('#datepicker tbody td').removeClass('selected');
            $(this).addClass('selected');
        }
        let schWeek = $(this).data('id');
        console.log('selected schedule week value : ' + schWeek);
        fnObj.fn.getGroupLesson(user);
    });
    
    // 등록버튼 활성/비활성화 
//    $(document.body).on('change', 'txtMember', function(e) {
//    	let memberNm = $(this).val();
//    	let seq = $(this).data('seq');
//    	console.log('member seq ----> ' + seq);
//    	if (memberNm) {
//    		$('#btnAdd' + seq).prop("disabled", true);	// 비활성화
//    	} else {
//    		$('#btnAdd' + seq).prop("disabled", false);	// 활성화
//    	}
//    });

    // 그룹레슨 등록 팝업창 호출
    $(document.body).on('click', '.btn-rsv-add', function(e) {
    	
        let dy = $('#datepicker tbody tr .selected').text();
        let dyFg = $('#datepicker tbody tr .selected').data('id');
        //let rsvDt = ($('#datepicker tbody tr .selected').data('id')).toString();
        let lsnData = $(this).parent().parent().data('id');
        let schNo = $(this).data('schno');
        let txtId = '#txtMember' + schNo;
        let txtValue = $(txtId).val();
        if ( txtValue ) {
        	alert('먼저 등록된 회원을 삭제하세요.');
        	return false;
        }
        //console.log('schno ----> ' + schNo);
        let dayOfWeek = $('#datepicker tbody tr td .selected').data('id');
        let today = new Date();
        let todayStr = ax5.util.date(today, {add: {d: -today.getDay()}, return: 'yyyy-MM'});

        let caption = todayStr + '(' + dy + ') ' + lsnData.lsnLvNm + ' ' + lsnData.empNm + '(' + lsnData.lsnTm + ')'; 
        let captionData = {
        		compCd:lsnData.compCd,
        		storCd:lsnData.storCd,
        		lsnMonth: lsnData.lsnMonth,
        		seq: lsnData.seq,
        		dyFg: dyFg,
            dy: dy,
            schNo : schNo,
            stTm: lsnData.stTm,
            lsnTm: lsnData.lsnTm,
            lsnLv: lsnData.lsnLv,
            lsnLvNm: lsnData.lsnLvNm,
            empNo: lsnData.empNo,
        };
        console.log(captionData);
        //$('#modal-caption').data('id', JSON.stringify(captionData));
        $('#modal-caption').attr('data-id', JSON.stringify(captionData));
        $('#modal-caption').text(caption);
        $('#filter').val('');

        var html = Mustache.render(newReservationTmpl, {list: []});
        $('#new-reservation-container').html(html);

        $('#groupLessonModalCenter').modal('toggle');
        
    });

    //등록된 그룹레슨 예약(회원)삭제
    $(document.body).on('click', '.btn-rsv-del', function(e) {
        let lsnData = $(this).parent().parent().data('id');
        let schNo = $(this).data('schno');
        if(schNo){
        	lsnData.schNo = schNo;
        }
        let schWeek = $('#datepicker tbody tr .selected').data('id');
        if(schWeek){
        	lsnData.schWeek = schWeek;
        }
        let response = confirm('등록된 회원을 삭제하시겠습니까?');
        if (response) {
            fnObj.fn.delGroupLesson(user, lsnData);
        }
    });

    //신규 그룹레슨 예약등록
    $(document.body).on('click', '#group-lesson-add-btn', function(e) {

        //예약일자,
        let dy = WEEKS[$('#datepicker tbody tr .selected').index()];
        let rsvDt = ($('#datepicker tbody tr .selected').data('id')).toString();
        let lsnData = $(this).data('id');
        let dt = rsvDt.substr(0, 4) + '년 ' + rsvDt.substr(4, 2) + '월 ' +
            rsvDt.substr(6, 2) + '일 ';
        let stTm = (isValidTime(lsnData.stTm) === false) ?
            '' :
            lsnData.stTm.substr(0, 2) + ':' + lsnData.stTm.substr(2, 3);  // hh:mm
        let caption = dt + '(' + dy + ') ' + stTm + ' ' + lsnData.lsnLvNm +
            ' (' +
            lsnData.lsnTm.toFixed(1) + ') ' + lsnData.empNm;
        let captionData = {
            rsvDt: rsvDt,
            dy: dy,
            schNo: lsnData.schNo,
            stTm: lsnData.stTm,
            lsnTm: lsnData.lsnTm,
            lsnLv: lsnData.lsnLv,
            lsnLvNm: lsnData.lsnLvNm,
            empNo: lsnData.empNo,
        };

        $('#modal-caption').attr('data-id', JSON.stringify(captionData));
        $('#modal-caption').text(caption);

        var html = Mustache.render(newMemberTmpl, {list: []});
        $('#new-member-container').html(html);

    });

    // 회원명 검색버튼 조회
    $('#search-member').on('click', function(e) {
        fnObj.fn.getGroupLessonByMember(user);
    });

    //검색된 그룹레슨 클릭 이벤트
    $('#new-reservation-container').on('click', 'tbody tr', function(e) {
        let lsnData = $(this).data('id');

        if (typeof lsnData === 'undefined') {
            return false;
        }
        //선택한 일자의 개인레슨을 조회
        let selected = $(this).children('td').hasClass('selected');
        if (!selected) {
            $('#new-reservation-container tbody tr').
                children('td').removeClass('selected');
            $(this).children('td').addClass('selected');
        }
    });

    $('#add-lesson').on('click', function(e) {
        fnObj.fn.addGroupLesson(user);
    });
};

fnObj.fn = {
    //주간 Datepicker 초기화
    setSchMonth: function() {
        let curr = new Date();
        let sYear = curr.getFullYear() - 1;
        let eYear = curr.getFullYear() + 1;
        let currMonth = curr.getFullYear() + '' + ("00" + (curr.getMonth() + 1)).slice(-2);

        let option = '';
        for (var y = sYear; y <= eYear; y++) {
            for (var m = 1; m <= 12; m++) {
                let val = y + '' + ("00" + m).slice(-2);
                option += ' <option value="' + val + '">' + y + '년 ' + m + '월'
                    '</option> ';
            }
        }

        $('#schMonth').html(option);
        $('#schMonth').val(currMonth);
    },

    setDatePicker: function(dateString) {
        let curr = new Date(); // get current date
        let getDay = curr.getDay();
        let sttDt = '';

        if (typeof dateString === 'undefined') {
            sttDt = ax5.util.date(curr,
                {add: {d: -curr.getDay()}, return: 'yyyyMMdd'});
        } else {
            sttDt = dateString;
        }
        let endDt = ax5.util.date(curr,
            {add: {d: 6 - getDay}, return: 'yyyyMMdd'});
        let thead = '<tr style="text-align:center; height: 40px;">';
        let tbody = '<tr data-id="" style="text-align: center; vertical-align: middle; height: 40px;">';
        let today = ax5.util.date(curr, {return: 'yyyyMMdd'});

        for (var i = 0; i <= 6; i++) {
            var date = ax5.util.date(sttDt, {add: {d: i}, return: 'yyyyMMdd'});
            var day = ax5.util.date(sttDt, {add: {d: i}, return: 'dd'});
            var d = ax5.util.date(sttDt, {add: {d: i}});
            if (date !== today) {
                thead += '<th>' + WEEKS[i] + '</th>';
                tbody += '<td data-id="' + date + '">' + day + '</td>';
            } else {
                thead += '<th class="today">' + WEEKS[i] + '</th>';
                tbody += '<td class="today selected" data-id="' + date + '">' + day +
                    '</td>';
            }
        }
        $('#datepicker thead').html(thead);
        $('#datepicker tbody').html(tbody);
    },
    
    createEmptyTemplete: function() {
    	// 동적회원등록영역생성
      	let childHtml = '';
      	for(var seq=1; seq<8; seq += 2) {
      		childHtml += ' <tr data-id="{{lsnData}}" style="text-align: center;"> ';
      		childHtml += ' 	<td width="26%"> ';
      		childHtml += ' 	<div class="input-group"> ';
      		childHtml += ' 	          <input type="text" class="form-control" id="txtMember' + seq + '" data-seq="' + seq + '"';
      		childHtml += ' 	                 style="width: 60px;  margin-left: 0px; text-align: center; background-color:white;" readonly=readonly value={{memberNm' + seq +'}}> ';
      		childHtml += ' 	      </div> ';
      		childHtml += ' 	</td> ';
      		childHtml += ' 	<td width="12%" class="select"> ';
      		childHtml += ' 	<button type="button" class="btn btn-sm btn-primary btn-rsv-add" id="btnAdd' + seq + '" data-schno="'+ seq +'" data-no="{{memberNo' + seq + '}}" data-seq="{{memberSeq' + seq + '}}" style="width: 40px">+</button> ';
      		childHtml += ' 	</td> ';
      		childHtml += ' 	  <td width="12%" class="select"> ';
      		childHtml += ' 	      <button type="button" class="btn btn-sm btn-secondary btn-rsv-del" id="btnRemove' + seq + '" data-schno="'+ seq +'" data-no="{{memberNo' + seq + '}}" data-seq="{{memberSeq' + seq + '}}" style="width: 40px">-</button> ';
      		childHtml += ' 	</td> ';
      		childHtml += '	<td width="26%"> ';
      		childHtml += '	<div class="input-group">    ';
      		childHtml += '	          <input type="text" class="form-control" id="txtMember' + (seq+1) + '" data-seq="' + (seq+1) + '"';
      		childHtml += '	                 style="width: 60px;  margin-left: 0px; text-align: center; background-color:white;" readonly=readonly value={{memberNm' + (seq+1) +'}}> ';
      		childHtml += '	      </div>  ';
      		childHtml += '	</td>   ';
      		childHtml += '	<td width="12%" class="select"> ';
      		childHtml += '	<button type="button" class="btn btn-sm btn-primary btn-rsv-add" id="btnAdd' + (seq+1) + '" data-schno="'+ (seq+1) +'" data-no="{{memberNo' + (seq+1) + '}}" data-seq="{{memberSeq' + (seq+1) + '}}" style="width: 40px">+</button> ';
      		childHtml += '	</td> ';
      		childHtml += '	  <td width="12%" class="select"> ';
      		childHtml += '	      <button type="button" class="btn btn-sm btn-secondary btn-rsv-del" id="btnRemove' + (seq+1) + '" data-schno="'+ (seq+1) +'" data-no="{{memberNo' + (seq+1) + '}}" data-seq="{{memberSeq' + (seq+1) + '}}" style="width: 40px">-</button>  ';
      		childHtml += '	</td>  ';
      		childHtml += '</tr>  ';
      	}
      	var readText = $('#reservation-template').text();
      	var changedText = readText.replace('%lesson-area%', childHtml);
      	$('#reservation-template').text(changedText);
      	reservationTmpl = $('#reservation-template').html();
    },

    //예약정보조회 (선택주, 선생님, 회원명, 일자)
    getGroupLesson: function(user) {
    	let search = fnObj.fn.getData(user);
		// test
		//search.schMonth = '201808';
		//console.log(search);
		
		let group = [];	// templete에 맞게 데이터타입을 재정의 한다.
		$.ajax({
			  type: 'GET',
			  url: '/api/teacher/reservation/group/schedule',
			  data: search,
			  success: function(res) {
				  	res.forEach(function(item, idx) {
				  		// console.log(item);
				  		// 현재 레슨의 대상이 존재하는 확인한다. (존재하면 index >= 0, 미존재하면 index == -1)
				  		let index = group.findIndex(function(m, i){
				  			return (m.compCd == item.compCd
				  					&& m.storCd == item.storCd
				  					&& m.stTm == item.stTm
				  					&& m.lsnLv == item.lsnLv
				  					&& m.empNo == item.empNo);
				  		});
				  		// 신규 건수인 경우, 데이터 생성.
				  		if ( index == -1 ) {
				  			let data = { };
				  			data.compCd = item.compCd;
				  			data.storCd = item.storCd;
				  			data.stTm = item.stTm;
				  			data.stTmNm = (data.stTm.length == 0 ) ? '' : data.stTm.substr(0, 2) + ':' + data.stTm.substr(2, 2);
				  			data.lsnLv = item.lsnLv;
				  			data.lsnLvNm = item.lsnLvNm;
				  			data.lsnTm = Number(item.lsnTm).toFixed(1);
				  			data.empNo = item.empNo;
				  			data.empNm = item.empNm;
				  			data.seq = item.seq;
				  			data.lsnMonth = search.schMonth;
				  			data.lsnData = JSON.stringify(data);
				  			data.members = [];
				  			if (item.memberNo) {
				  				data['memberNo' + item.schNo] = item.memberNo;
				  				data['memberNm' + item.schNo] = item.memberNm;
				  				data['memberSeq' + item.schNo] = item.seq;
				  			}
				  			group.push(data);
				  			
				  		} else {
				  			// 기존인 경우에는 기존데이터에 맴버 추가.
				  			if (item.memberNo) {
				  				group[index]['memberNo' + item.schNo] = item.memberNo;
				  				group[index]['memberNm' + item.schNo] = item.memberNm;
				  				group[index]['memberSeq' + item.seq] = item.seq;
				  			}
				  		}
				  	});
				  	var html = Mustache.render(reservationTmpl, {list: group});
	                $('#reservation-container').html(html);
	                
			      },
			  });
			  return false;
    },

    // 조회조건
    getData: function(user) {
        return {
            storCd: user.storCd,
            schMonth: $('#schMonth').val(),
            schWeek: $('#datepicker tbody tr .selected').data('id'),
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
            url: '/api/member/group',
            data: {storCd: user.storCd, memberNm: memberNm},
            success: function(res) {
                res.forEach(function(n){
                	n.member = JSON.stringify(n);
                });
                var html = Mustache.render(newReservationTmpl, {list: res});
                $('#new-reservation-container').html(html);
            },
        });
    },

    //그룹레슨 예약등록 처리
    addGroupLesson: function(user) {
        let selectedItem = {};
        //let lsnData = $('#modal-caption').data('id');
        let lsnData = JSON.parse($('#modal-caption').attr('data-id'));
        $('#new-reservation-container tbody tr').each(function() {
            let selected = $(this).find('td').hasClass('selected');
            if (selected) {
                selectedItem = $(this).data('id');
            }
        });

        //선택된 레슨이 있는지 체크
        if (typeof selectedItem === 'undefined') {
            alert('먼저 예약할 레슨을 선택하세요.');
            return false;
        }

        /* 예약 confirm */
        var retReserv = confirm('선택한 등록정보로 예약하시겠습니까?');
        if (retReserv != true) {
            return false;
        }

        let data = [
            {
                compCd: lsnData.compCd,
                storCd: lsnData.storCd,
                lsnMonth: lsnData.lsnMonth,
                schNo: lsnData.schNo,
                seq : lsnData.seq,
                stTm: lsnData.stTm,
                lsnTm: lsnData.lsnTm,
                lsnLv: lsnData.lsnLv,
                empNo: lsnData.empNo,
                schWeek: lsnData.dyFg,
                memberNo: selectedItem.memberNo,
            }
        ];
                
        $.ajax({
            type: 'PUT',
            url: '/api/teacher/schedule/add',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                fnObj.fn.getGroupLesson(user);
                alert('예약이 완료되었습니다.');
                $('#groupLessonModalCenter').modal('toggle');
            },
            error: function(error) {
                alert(error);
            },
        });
        return false;
    },

    delGroupLesson: function(user, lsnData) {
        let data = [].concat(lsnData);

        $.ajax({
            type: 'PUT',
            url: '/api/teacher/schedule/delete',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                console.log('Cancel lesson success....');
                //그룹레슨 재조회 처리
                fnObj.fn.getGroupLesson(user);
            },
        });
        return false;
    },

};

$(function() {
    let user = JSON.parse(window.localStorage.getItem('todays'));
    fnObj.initView(user);
    fnObj.initEvent(user);

    //주차 datepicker 셋팅 (현재월을 기준으로 -3개월 ~ +3개월)
    //makeWeekSelectOptions('week', 3);
    //var date = new Date("20181001".replace( /(\d{4})(\d{2})(\d{2})/, "$1/$2/$3"));
});
	


