<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>로그인 샘플</title>  
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" >
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" ></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
	<script src="https://unpkg.com/ionicons@4.1.2/dist/ionicons.js"></script>
	<link href="https://unpkg.com/ionicons@4.1.2/dist/css/ionicons.min.css" rel="stylesheet">
</head>

<body style="background-color: skyblue;">
	 <div class="container" style="margin-top: 5%;background-color: skyblue">
	 	<div class="row">
	 		<div class="col" style="height:43px;">
	 			<div style="margin-top: 1%;text-align: center;vertical-align: middle;">
				<label style="text-align: center;vertical-align: middle;"><h2>오늘의 필라테스</h2></label>
				</div>
	 		</div>
	 		<div class="w-100"><hr /></div>
	 		<div class="col">
				<form name="form" method="post" action="loginProcess">
					<div class="form-group">
						<label for="storCd">스튜디오</label> 
						<div class="dropdown">
						  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						    	스튜디오
						  </button>
						  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
						    <a class="dropdown-item" href="#"></a>
						    <a class="dropdown-item" href="#">Another action</a>
						    <a class="dropdown-item" href="#">Something else here</a>
						  </div>
						</div>
					</div>
					<div class="form-group">
						<label for="userId">사용자아이디</label> 
						<input type="text" class="form-control" name="id" id="id" aria-describedby="emailHelp" placeholder="아이디를 입력하세요.">
					</div>
					<div class="form-group">
						<label for="userPs">비밀번호</label> <input type="password"
							class="form-control" name="pw" id="pw" placeholder="비밀번호를 입력하세요.">
					</div>
					<button type="submit" class="btn btn-primary">로그인</button>
				</form>
			</div>
	 	</div> 
		
	</div>
</body>
</html>
