<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%
	String userLv = SessionUtils.getCurrentUser().getUserLv();
	String empNo = SessionUtils.getCurrentUser().getEmpNo();
	String storCd = SessionUtils.getCurrentUser().getStorCd();
	String username2 = SessionUtils.getCurrentUser().getUsername2();
	String compCd = SessionUtils.getCurrentUser().getCompCd();
	request.setAttribute("userLv", userLv);
	request.setAttribute("empNo", empNo);
	request.setAttribute("storCd", storCd);
	request.setAttribute("compCd", compCd);
	request.setAttribute("username2", username2);
%>
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Stylish Portfolio - Start Bootstrap Template</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/boot4/css/bootstrap.min.css" rel="stylesheet">
	
    <!-- Custom Fonts -->
    <link href="css/boot4/vendor/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
    <link href="css/boot4/vendor/simple-line-icons.css" rel="stylesheet">
	<link href="css/boot4/dashboard.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/boot4/stylish-portfolio.css" rel="stylesheet">
    
  </head>

  <body id="page-top">
    <!-- Navigation -->
    <a class="menu-toggle rounded" href="#">
      <i class="fa fa-bars"></i>
    </a>
    <nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">선생님<!--( ${userLv} )--> : <span class="username">${username}</span> 님
			</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher">Home</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/private_lesson">개인레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/private_reservation">개인레슨 예약하기</a></li>	
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/group_lesson">그룹레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/group_lesson_status">그룹레슨 등록현황 관리</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/member_signup">회원등록/수업등록</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/my_lsesson_report">내수업실적</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#" id="logout">로그아웃</a></li>
		</ul>
	</nav>

    <!-- Header -->
    <!-- Header -->
    <header class="callout">
      <div class="container text-center mb-2">
        <h2 class="mx-auto mb-5">STOTT Todayspilates
        <em></em>
        </h2>
      </div>
      <div class="container text-center mb-1">
			<a href="/teacher/private_lesson"><button type="button" class="btn btn-primary" style="width: 150px;">개인레슨 출석부</button></a>
			<a href="/teacher/private_reservation"><button type="button" class="btn btn-primary" style="width: 150px;">개인레슨 예약하기</button></a>
      </div>
      <div class="container text-center mb-1">
			<a href="/teacher/group_lesson"><button type="button" class="btn btn-primary" style="width: 150px;">그룹레슨 출석부</button></a>
			<a href="/teacher/group_lesson_status"><button type="button" class="btn btn-primary" style="width: 150px;">그룹레슨 등록현황</button></a>
      </div>
      <div class="container text-center mb-1">
			<a href="/teacher/member_signup"><button type="button" class="btn btn-primary" style="width: 150px;">회원등록/수업등록</button></a>
			<a href="/teacher/my_lesson_report"><button type="button" class="btn btn-primary" style="width: 150px;">내 수업실적</button></a>
      </div>
    </header>
    
    <footer class="footer text-center">
      <div class="container">
			<ul class="list-inline mb-5">
				<li class="list-inline-item"><a id="lnk-home"
					class="social-link rounded-circle text-white mr-3" href="#"> <i
						class="icon-home"></i>
				</a></li>
				<li class="list-inline-item"><a id="lnk-instagram"
					class="social-link rounded-circle text-white mr-3" href="#"> <i
						class="icon-social-instagram"></i>
				</a></li>
				<li class="list-inline-item"><a id="lnk-blog"
					class="social-link rounded-circle text-white" href="#"> <i
						class="fa fa-bold"></i>
				</a></li>
			</ul>
		</div>
    </footer>

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded js-scroll-trigger" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>

    <!-- Bootstrap core JavaScript -->
    <script src="js/boot4/jquery.min.js"></script>
    <script src="js/boot4/js/bootstrap.bundle.min.js"></script>
    <!-- Plugin JavaScript -->
    <script src="js/boot4/jquery.easing.min.js"></script>
    <!-- Custom scripts for this template -->
    <script src="js/boot4/stylish-portfolio.min.js"></script>
    <script src="js/common.js"></script>
	<script>
		let empNo = '<%=empNo%>';
		let storCd = '<%=storCd%>';
		let username2 = '<%=username2%>';
		let compCd = '<%=compCd%>';
		let userLv = '<%=userLv%>';
		let user = {};
		user.empNo = empNo;
		user.compCd = compCd;
		user.storCd = storCd;
		user.lsnCd = '';
		user.username = username2;
		user.userLv = userLv;

		window.localStorage.setItem('todays', JSON.stringify(user));
	</script>
  </body>

</html>

