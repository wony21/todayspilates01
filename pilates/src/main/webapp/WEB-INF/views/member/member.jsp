<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>

<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Home</title>
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" >
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>
<body style="background-color: skyblue;">
	 <div class="container" style="margin-top: 5%;">
		<div class="row">
			<div class="col-1"></div>
			<div class="col">
				<span class="badge badge-secondary">회원( ${userLv} ) : ${username} 님 반갑습니다!</span>
				<br />
				<form name="form" method="POST" action="/logout">
					<button type="submit" class="btn btn-primary btn-sm">로그아웃</button>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col"></div>
			<div class="col"></div>
			<div class="col"></div>
		</div>
	</div>
</body>
</html>
