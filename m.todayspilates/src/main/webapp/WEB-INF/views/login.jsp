<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>로그인 샘플</title>
<link
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
	rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
<script src="https://unpkg.com/ionicons@4.1.2/dist/ionicons.js"></script>
<link href="https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css" rel="stylesheet">
<script src="js/login.js"></script> 
<style>
#layout {
	position: absolute;
	width: 100%;
	min-height: 100%;
	left: 0;
	top: 0;
	background: url('images/04_bg.jpg');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	opacity: 1;
}

.effect img {
	border-radius: 10px;
	opacity: 0.7;
}
</style>
</head>

<body>
	<div id="layout"></div>
	<div id="container" class="container" style="margin-top: 5%;">
		<div class="row">
			<div class="col" style="height: 33px; text-align: center;">
				<div class="effect">
					<img src="images/logo.png" />
				</div>
				<!-- 
	 			<div style="margin-top: 1%;text-align: center;vertical-align: middle;">
				<label style="text-align: center;vertical-align: middle;"><h3>Todayspilates</h3></label> 
				</div>
	 			 -->

			</div>
			<div class="w-100">
				<hr />
			</div>
			<div class="w-100">
				<hr />
			</div>
			<div class="w-100">
				<hr />
			</div>
			<div class="w-100">
				<hr />
			</div>
			<div class="w-100">
				<hr />
			</div>
			<div class="col">
				<form name="form" method="post" action="loginProcess">
					<div class="form-group">
						<select class="custom-select">
							<option selected>스튜디오</option>
							<option value="1">수내 본점</option>
							<option value="2">수원점</option>
							<option value="3">안양점</option>
						</select>
					</div>
					<div class="form-group">
						<input type="text" class="form-control" name="id" id="id"
							aria-describedby="emailHelp" placeholder="아이디를 입력하세요.">
					</div>
					<!-- 
					<div class="form-group" style="visibility: hidden;">
						<input type="password" class="form-control" name="pw" id="pw"
							placeholder="비밀번호를 입력하세요.">
					</div>
					 -->
					<button type="submit" class="btn btn-primary">로그인</button>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
