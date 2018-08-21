<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>로그인 샘플</title>
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/ionicons@4.1.2/dist/ionicons.js"></script>
<link href="https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css" rel="stylesheet">
<link href="css/pilates.css" rel="stylesheet">
<script src="js/login.js"></script>
<style>
</style>
</head>

<body>
	<div id="layout"></div>
	<div id="container" class="container" style="margin-top: 5%;">
		<div class="row">
			<div class="col">
				<div id="login_layout" class="card w-100">
					<div class="card-body">
						<div class="effect">
							<img src="images/logo.png" />
						</div>
						<br />
						<form id="login-form" name="login-form" method="post" action="loginProcess">
							<div class="form-group">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text"><ion-icon name="business"></ion-icon></span>
									</div>
									<select id="studio" class="custom-select">
										<option value="" selected>스튜디오를 선택하세요</option>
									</select>
								</div>

							</div>
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-prepend">
										<span class="input-group-text"> <ion-icon name="phone-portrait"></ion-icon>
										</span> <select id="phone" class="custom-select">
											<option value="010" selected>010</option>
											<option value="011">011</option>
											<option value="017">017</option>
											<option value="018">018</option>
											<option value="019">019</option>
										</select>
									</div>

									<input type="text" id="phone2" class="form-control" placeholder="전화번호('-'제외)">
									<input type="hidden" id="id" name="id">
								</div>
							</div>
							<div class="form-group form-check">
								<p align="center">
									<input type="checkbox" class="form-check-input" id="save_id">
									<label class="form-check-label" for="remember_me">아이디 저장</label>
								</p>
							</div>
							<!-- 
								<div class="form-group" style="visibility: hidden;">
									<input type="password" class="form-control" name="pw" id="pw"
										placeholder="비밀번호를 입력하세요.">
								</div>
								 -->
							<div id="login_div">
								<button id="btn_login" type="button" class="btn btn-danger">로그인</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<script>
		$(document).ready(function(){
			
			var isSaved = localStorage.getItem('saveId');
			console.log('read check state : ' + isSaved);
			var check = isSaved == 'true' ? true : false;
			$("input:checkbox[id='save_id']").attr('checked', check);
			var savedStudio = localStorage.getItem('studio');
			var savedPrefix = localStorage.getItem('prefix');
			var savedPhone = localStorage.getItem('phone');
			if ( check == true ) {
				if ( savedPrefix.length == 0 ) {
					savedPrefix = '010';
				}
				$("#phone").val(savedPrefix);
				$("#phone2").val(savedPhone);
			}
			
			$.ajax({
				url:'/api/stor',
				type:'GET',
				success: function(data) {
					var studio = $("#studio");
					data.forEach(function (n) {
						var selected = "";
						if ( (check == true) && (n.storCd == savedStudio)) {
							selected = "selected";
						} else {
							selected = "";
						}
						studio.append("<option value='"+ n.storCd  + "' " + selected + ">[" + n.storCd + "] " + n.storNm + "</option>");
					});
				},
				error: function(){
					
				},
				complete: function() {
					
				}
			});
		});
		
		// 아이디 기억
		$("input:checkbox[id='save_id']").bind('change', function(){
			var save = $("input:checkbox[id='save_id']").is(":checked");
			console.log('check state changed : ' + save);
			localStorage.setItem('saveId', save);
			if ( save == false ) {
				localStorage.setItem('studio', '');
				localStorage.setItem('prefix', '010');
				localStorage.setItem('phone', '');
			} else {
				localStorage.setItem('studio', studio);
				localStorage.setItem('prefix', prefix);
				localStorage.setItem('phone', phone);
			}
		});
	
		// 로그인
		$('#btn_login').bind('click', function(){
			
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
				url:'/api/existUserInStor',
				type:'GET',
				data: loginObj,
				success: function(data) {
					var exist = data[0].existFg;
					if ( exist != -99999 ) {
						console.log('exist user');
						$("#id").val(phone_number);
						var save = $("input:checkbox[id='save_id']").is(":checked");
						if(save) {
							localStorage.setItem('studio', studio);
							localStorage.setItem('prefix', prefix);
							localStorage.setItem('phone', phone);
						}
						$("#login-form").submit();
					} else {
						alert('스튜디오를 확인하세요.');
					}
				},
				error: function(){
					
				},
				complete: function() {
					
				}
			});
		});
		
	</script>
</body>
</html>
