<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%
	String userLv = SessionUtils.getCurrentUser().getUserLv();
	String empNo = SessionUtils.getCurrentUser().getEmpNo();
	String storCd = SessionUtils.getCurrentUser().getStorCd();
	String username2 = SessionUtils.getCurrentUser().getUsername2();
	request.setAttribute("userLv", userLv);
	request.setAttribute("empNo", empNo);
	request.setAttribute("storCd", storCd);
	request.setAttribute("username2", username2);
%>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="utf-8">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Todays pilates</title>

<!-- Bootstrap Core CSS -->
<link href="/css/boot4/css/bootstrap.min.css" rel="stylesheet">

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
</head>
<body id="page-top">
	<!-- Navigation -->
	<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i>
	</a>
	<nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">선생님<!--( ${userLv} )--> : <span
					class="username">${username}</span> 님
			</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher">Home</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/private_lesson">개인레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/private_reservation">개인레슨 예약하기</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">그룹레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#" id="reservation">그룹레슨 등록현황관리</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">회원등록/수업등록</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">내수업실적</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#" id="logout">로그아웃</a></li>
		</ul>
	</nav>

	<!-- Header -->
	<header class="d-flex">
		<div class="container">
			<div class="row" style="padding-top: 48px; padding-left: 5px; padding-right: 5px;">
				<h4>그룹레슨 출석부</h4>
				<div class="table-responsive">
					<div id="date-container">
						<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
							<div class="btn-toolbar mb-2 mb-md-0">
								<div class="input-group">
									<select class="custom-select" id="week"
										style="width: 140px; margin-left: 5px;"></select>
								</div>
							</div>
						</div>
						<table class="table table-striped table-sm" id="datepicker">
							<thead>
								<!-- 동적생성 -->
							</thead>
							<tbody>
								<!-- 동적생성 -->
							</tbody>
						</table>
					</div>
					<!-- end date-container -->
				</div>
				<div class="container">
					<div class="row" style="padding-top: 20px;"></div>
					<!--<a href="#"><button type="button" class="btn" style="width: 150px;">그룹레슨 예약하기</button></a>-->
				</div>
				<div class="table-responsive" style="top-margin: 10px;">
					<div id="reservation-container">
						<script type="text/html" id="reservation-template">
{{#list}}
			<div class="group-lesson-tbl-caption">{{stTm}} {{lsnLvNm}} ({{lsnTm}}) {{empNm}}</div>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align: center">
				  <th width="12%">#순번</th>
                  <th width="*">회원</th>
				  <th width="18%">회차</th>
                  <th width="25%">종료일</th>
				  <th width="22%">출결처리</th>
                </tr>
              </thead>
              <tbody>
				{{#schedule}}
                <tr data-id="{{lsnCd}}" style="text-align: center;">
				  <td style="height:40px;">{{idx}}</td>
                  <td>{{memberNm}}</td>
				  <td>{{lsnNum}}/{{lsnUseCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                  <td>{{lsnEdDt}}</td>
				  <td class="select"><select id="sel-attend" class="custom-select attend-process">
                  <option value="0" display-flag="{{optFg0}}" {{sel0}}>선택</option>
                  <option value="1" display-flag="{{optFg1}}" {{sel1}}>출석</option>
                  <option value="2" display-flag="{{optFg2}}" {{sel2}}>결석</option>
                  <option value="3" display-flag="{{optFg3}}" {{sel3}}>취소</option>
                </select></td>
                </tr>
				{{/schedule}}
				{{^schedule}}
					<tr" style="text-align: center;">
				  		<td colspan="5">그룹레슨 예약없음</td>
					</tr>
				{{/schedule}}
              </tbody>
            </table>
{{/list}}
{{^list}}
	<div class="group-lesson-tbl-caption-empty">그룹레슨 시간표가 없습니다</div>
{{/list}}
						</script>
					</div>
				</div> <!-- table responsive -->
			</div><!-- row -->
		</div><!-- container -->
	</header> <!-- d-flex -->
	<!-- Footer -->
	<footer class="footer text-center" style="padding: 0 100 0 0">
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
			<!-- <div class="text-muted small mb-0">Copyright &copy; Todayspilates
				2018</div> -->
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
	<script src="/js/boot4/vendor/mustache.js"></script>
	<script src="/js/boot4/vendor/ax5core.min.js"></script>
	<script src="/js/boot4/vendor/ax5formatter.js"></script>
	<script src="/js/boot4/stylish-portfolio.js"></script>
	<script src="/js/common.js"></script>
	<script src="/js/teacher/group_lesson.js"></script>
</body>

</html>
