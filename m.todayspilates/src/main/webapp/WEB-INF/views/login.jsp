<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<html>

<head>
<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">

<title>오늘의 필라테스</title>

<!-- Bootstrap core CSS -->
<link href="css/boot4/css/bootstrap.min.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="css/boot4/signin.css" rel="stylesheet">
<!-- Custom icon library -->
<link href="https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css"
	rel="stylesheet">
<!-- Custom styles for this template -->
<link href="css/pilates.css" rel="stylesheet">
</head>
<body>
	<div id="layout"></div>
	<div id="container" class="container">
		<div class="row">
			<div class="col">
				<div id="login_layout" class="card w-100">
					<div class="card-body">
						<div class="effect">
							<img src="images/logo.png" />
						</div>
						<br />
						<form id="login-form" name="login-form" method="post"
							action="loginProcess">
							<div class="form-group">
								<div class="input-group mb-3">
									<div class="input-group-prepend">
										<span class="input-group-text"><ion-icon
												name="business"></ion-icon></span>
									</div>
									<select id="studio" class="custom-select">
										<option value="" selected>스튜디오를 선택하세요</option>
									</select>
								</div>

							</div>
							<div class="form-group">
								<div class="input-group">
									<div class="input-group-prepend">
										<span class="input-group-text"> <ion-icon
												name="phone-portrait"></ion-icon>
										</span> <select id="phone" class="custom-select">
											<option value="010" selected>010</option>
											<option value="011">011</option>
											<option value="017">017</option>
											<option value="018">018</option>
											<option value="019">019</option>
										</select>
									</div>

									<input type="text" id="phone2" class="form-control"
										placeholder="전화번호('-'제외)"> <input type="hidden"
										id="id" name="id">
								</div>
							</div>
							<div class="form-group form-check">
								<p align="center">
									<input type="checkbox" class="form-check-input" id="save_id">
									<label class="form-check-label" for="save_id">아이디 저장</label>
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
	<!-- Custom library -->
	<script src="js/boot4/jquery-3.3.1.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
	<script src="https://unpkg.com/ionicons@4.1.2/dist/ionicons.js"></script>
	<script src="js/boot4/js/bootstrap.min.js"></script>
	<script src="js/login.js"></script>
</body>
</html>
