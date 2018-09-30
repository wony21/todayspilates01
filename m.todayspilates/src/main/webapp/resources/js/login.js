// 로그인
$(document).ready(function() {
	var isSaved = window.localStorage.getItem('saveId');
	//console.log('read check state : ' + isSaved);
	var check = isSaved == 'true' ? true : false;
	$("input:checkbox[id='save_id']").attr('checked', check);
	var savedStudio = window.localStorage.getItem('studio');
	var savedPrefix = window.localStorage.getItem('prefix');
	var savedPhone = window.localStorage.getItem('phone');
	
	if (check == true) {
		if (savedPrefix.length == 0) {
			savedPrefix = '010';
		}
		$("#phone").val(savedPrefix);
		$("#phone2").val(savedPhone);
	}

	$.ajax({
		type : 'GET',
		url : '/api/stor',
		success : function(data) {
			var studio = $("#studio");
			data.forEach(function(n) {
				var selected = "";
				if ((check == true) && (n.storCd == savedStudio)) {
					selected = "selected";
				} else {
					selected = "";
				}
				studio.append("<option value='" + n.storCd + "' "
						+ selected + ">" + n.storNm
						+ "</option>");
			});
		},
		error : function() {
		},
		complete : function() {
		}
	});
});

$('#login_btn').bind('click', function() {
	var studio = $("#studio");
	var phone = $("#phone");
});

// 아이디 기억
$("input:checkbox[id='save_id']").bind('change', function() {
	var save = $("input:checkbox[id='save_id']").is(":checked");
	console.log('check state changed : ' + save);
	window.localStorage.setItem('saveId', save);
	
	console.log('studio: ' + studio + ', prefix: ' + prefix +  ', phone: ' + phone);
	if (save == false) {
		window.localStorage.setItem('studio', '');
		window.localStorage.setItem('prefix', '010');
		window.localStorage.setItem('phone', '');
	} else {
		window.localStorage.setItem('studio', studio);
		window.localStorage.setItem('prefix', prefix);
		window.localStorage.setItem('phone', phone);
	}
});

// 로그인
$('#btn_login').bind('click', function() {
	var studio = $("select[id='studio']").val();
	var phone = $("#phone2").val();
	var prefix = $("select[id='phone']").val();
	var phone_number = prefix + phone;

	if (!studio) {
		alert('스튜디오를 선택하세요.');
		$("select[id='studio']").focus();
		return;
	}

	if (!phone) {
		alert('전화번호를 입력하세요.');
		$("#phone2").focus();
		return;
	}

	var loginObj = {};
	loginObj.storCd = studio;
	loginObj.userCd = phone_number;
	$.ajax({
		type : 'GET',
		url : '/api/existUserInStor',
		data : loginObj,
		success : function(data) {
			var exist = data[0].existFg;
			if (exist != -99999) {
				console.log('exist user');
				$("#id").val(phone_number);
				var save = $("input:checkbox[id='save_id']").is(":checked");
				if (save) {
					window.localStorage.setItem('studio', studio);
					window.localStorage.setItem('prefix', prefix);
					window.localStorage.setItem('phone', phone);
				}
				$("#login-form").submit();
			} else {
				alert('스튜디오를 확인하세요.');
			}
		},
		error : function() {
		},
		complete : function() {
		}
	});
});