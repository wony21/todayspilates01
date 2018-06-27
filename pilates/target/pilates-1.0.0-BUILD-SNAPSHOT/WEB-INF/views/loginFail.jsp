<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>로그인 실패</title>  
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" >
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
</head>

<body style="background-color: skyblue;">
	</script>
	 <div class="container" style="margin-top: 5%;">
	 	<div class="alert alert-danger" role="alert">
  			<a href="/login" class="alert-link">사용자 로그인 인증</a>에 실패하였습니다.
		</div>
		<div class="alert alert-info" role="alert">
			${error}
		</div>
	</div>
</body>
</html>
