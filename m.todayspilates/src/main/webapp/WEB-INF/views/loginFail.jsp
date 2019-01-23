<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false" pageEncoding="UTF-8"
	contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.UUID" %>
<%
	String uuid = UUID.randomUUID().toString();
	request.setAttribute("uuid", uuid);
%>
	
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
<div style="width:100%;padding:20px;">
	<div class="alert alert-danger" role="alert">
	  	<table style="color: #721c24">
	  		<tr>
	  			<td style="height:50px;"><ion-icon name="lock" size="large"></ion-icon></td>
	  			<td style="vertical-align: bottom;"><h4>로그인</h4></td>
	  		</tr>
	  	</table>
	  <p>사용자 인증에 실패하였습니다.</p>
	  <p class="mb-0">
	  	<div id="login_div">
			<button id="btn_goto_login" type="button" class="btn btn-info" style="width:100%;">돌아가기</button>
		</div>
	  </p>
	</div>
</div>	
	<!-- <div id="container" class="container">
		<div class="row">
			<div class="col">
				<div id="login_layout" class="card w-100">
					<div class="card-body">
						<div class="effect">
							<img src="images/logo.png" />
						</div>
						사용자 인증에 실패하였습니다.
						
						<br />
						<div>
							<a href="/login">로그인으로 돌아가기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div> -->
	<!-- Custom library -->
	<script src="js/boot4/jquery-3.3.1.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
	<script src="https://unpkg.com/ionicons@4.1.2/dist/ionicons.js"></script>
	<script src="js/boot4/js/bootstrap.min.js"></script>
	<script>
		$(function(){
			// 돌아가기 버튼 링크
			$('#btn_goto_login').click(function(){
				location.href='/login';
			});
		});
	</script>
</body>
</html>
