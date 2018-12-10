<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page import="java.util.UUID" %>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%
	String uuid = UUID.randomUUID().toString();
	request.setAttribute("uuid", uuid);

	String userLv = SessionUtils.getCurrentUser().getUserLv();
	request.setAttribute("userLv", userLv);
%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
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
<link href="/css/boot4/dashboard.css" rel="stylesheet">

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
				href="#" id="logout">로그아웃</a></li>
		</ul>
	</nav>
	
	<!-- Header -->
	<header class="d-flex">
      <div class="container">
	<div class="row" style="padding-top: 48px; padding-left: 5px; padding-right: 5px;">
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
                  <td style="height:40px;">{{idx}}</td>
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
		</div>
		</header>
	<!-- Footer -->
	<footer class="footer text-center" style="padding: 0 100 0 0;">
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
	<script src="/js/boot4/jquery.min.js"></script>
	<script src="/js/boot4/js/bootstrap.bundle.min.js"></script>

	<!-- Plugin JavaScript -->
	<script src="/js/boot4/jquery.easing.min.js"></script>

	<!-- Custom scripts for this template -->
	<script src="/js/boot4/stylish-portfolio.min.js"></script>
	<script src="/js/member/reservation_detail.js?=${uuid}"></script>
	<script src="/js/common.js?=${uuid}"></script>
	<script src="/js/boot4/vendor/ax5core.min.js"></script>
	<script src="/js/boot4/vendor/ax5formatter.js"></script>
	<script src="/js/boot4/vendor/date.format.js"></script>
	<script src="/js/boot4/vendor/mustache.js"></script>
</body>

</html>
