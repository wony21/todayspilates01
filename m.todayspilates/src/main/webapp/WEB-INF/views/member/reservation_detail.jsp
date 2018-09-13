<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%
	String userLv = SessionUtils.getCurrentUser().getUserLv();
	request.setAttribute("userLv", userLv);
%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Todays pilates</title>

<!-- Bootstrap Core CSS -->
<link href="/css/boot4/css/bootstrap.min.css" rel="stylesheet">
<link href="/css/boot4/dashboard.css" rel="stylesheet">
<!-- Custom Fonts -->
<link href="/css/boot4/vendor/font-awesome.min.css" rel="stylesheet"
	type="text/css">
<link
	href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic"
	rel="stylesheet" type="text/css">
<link href="/css/boot4/vendor/simple-line-icons.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="/css/boot4/stylish-portfolio.css" rel="stylesheet">

<body id="page-top" style="max-width: 100%; overflow-x: hidden;">
	<!-- Navigation -->
	<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i>
	</a>
	<nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">회원<!--( ${userLv} )--> : <span class="username">${username}</span> 님
			</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/member">Home</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/member/reservation">예약현황</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/logout" id="logout">로그아웃</a></li>
		</ul>
	</nav>
	
	<!-- Header -->
	<div class="row">
        

        <main role="main" class="col-md ml-sm-auto col-lg px-4">
        <p>
          <h4>사용내역보기 </h4>
          <div class="table-responsive">
          	<div id="reservation-container">
          	<script type="text/html" id="reservation-template">
			<div style="text-align: right"><span id="caption"></span></div>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align: center">
                  <th>#순번</th>
                  <th>예약일시</th>
                  <th>요일</th>
                  <th>출석시간</th>
                  <th>출석여부</th>
				  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
				{{#list}}
                <tr style="text-align: center">
                  <td>{{idx}}</td>
                  <td>{{atndDt}}</td>
                  <td>{{dy}}</td>
                  <td>{{atndTm}}</td>
                  <td>{{atndNm}}</td>
				  <td>{{cancRmk}}</td>
                </tr>
				{{/list}}	
				{{^list}}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
				{{/list}}
              </tbody>
            </table>
			</script>
			</div>
          </div>
        </main>
      </div>

	<!-- Footer -->
	<footer class="footer text-center" style="padding: 0 100 0 0;">
		<div class="container">
			<ul class="list-inline mb-5">
				<li class="list-inline-item"><a
					class="social-link rounded-circle text-white mr-3" href="#"> <i
						class="icon-social-facebook"></i>
				</a></li>
				<li class="list-inline-item"><a
					class="social-link rounded-circle text-white mr-3" href="#"> <i
						class="icon-social-twitter"></i>
				</a></li>
				<li class="list-inline-item"><a
					class="social-link rounded-circle text-white" href="#"> <i
						class="icon-social-github"></i>
				</a></li>
			</ul>
			<!--p class="text-muted small mb-0">Copyright &copy; Todayspilates
				2018</p-->
		</div>
	</footer>

	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded js-scroll-trigger" href="#page-top">
		<i class="fa fa-angle-up"></i>
	</a>

	<!-- Bootstrap core JavaScript -->
	<script src="/js/boot4/jquery.min.js"></script>
	<script src="/js/boot4/js/bootstrap.bundle.min.js"></script>

	<!-- Plugin JavaScript -->
	<script src="/js/boot4/jquery.easing.min.js"></script>

	<!-- Custom scripts for this template -->
	<script src="/js/boot4/stylish-portfolio.min.js"></script>
	<script src="/js/member/reservation_detail.js"></script>
	<script src="/js/boot4/vendor/mustache.js"></script>
	<script src="/js/boot4/vendor/ax5core.min.js"></script>
	<script src="/js/boot4/vendor/ax5formatter.js"></script>
	<script src="/js/boot4/vendor/date.format.js"></script>

</body>

</html>
