<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<%
	String userLv = SessionUtils.getCurrentUser().getUserLv();
	String memberNo = SessionUtils.getCurrentUser().getMemberNo();
	String storCd = SessionUtils.getCurrentUser().getStorCd();
	String username2 = SessionUtils.getCurrentUser().getUsername2();
	request.setAttribute("userLv", userLv);
	request.setAttribute("memberNo", memberNo);
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

<link href="/css/boot4/css/bootstrap.min.css" rel="stylesheet">
<link href="/css/boot4/dashboard.css" rel="stylesheet">
<link href="/css/boot4/vendor/font-awesome.min.css" rel="stylesheet"
	type="text/css">
<link
	href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic"
	rel="stylesheet" type="text/css">
<link href="/css/boot4/vendor/simple-line-icons.css" rel="stylesheet">
<link href="/css/boot4/stylish-portfolio.css" rel="stylesheet">
<link href="/css/boot4/dashboard.css" rel="stylesheet">
<!-- fontello -->
<link href="/css/fontello/footer.css" rel="stylesheet" >
<link href="/css/fontello/css/fontello.css" rel="stylesheet" >
<body id="page-top">
	<!-- Navigation -->
	<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i></a>
	<nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">회원<!--( ${userLv} )--> : <span class="username">${username}</span>
					님
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
			<div class="row"
				style="padding-top: 48px; padding-left: 5px; padding-right: 5px;">
				<p>
				<h4>
					<span class="username"></span>님 예약현황
				</h4>
				<div class="table-responsive">
					<div id="reservation-container">
						<script type="text/html" id="reservation-template">
			<div style="text-align: right"><span>&nbsp;</span></div>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align:center">
                  <th>#구분</th>
                  <th>예약일시</th>
                  <th>시간</th>
                  <th>선생님</th>
                  <th>회차</th>
                  <th>종료일</th>
                </tr>
              </thead>
              <tbody>
				{{#list}}
                <tr data-id="{{lsnCd}}" style="text-align: center">
                  <td>{{lsnNm}}</td>
                  <td style="height:45px;">{{rsvDt}}{{dayOfWeek}}<br>{{rsvTm}}</td>
                  <td>{{lsnTm}}</td>
                  <td>{{empNm}}</td>
                  <td>{{lsnNum}}/{{lsnCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                  <td>{{lsnEdDt}}</td>
                </tr>
				{{/list}}	
				{{^list}}
<!--
                <tr>
                  <td>개인</td>
                  <td>2018/09/01</td>
                  <!--<td>09:00</td>-->
                  <td>홍길동</td>
                  <td>1회차</td>
                  <td>2018/12/31</td>
                </tr>
-->
				{{/list}}
              </tbody>
            </table>
			</script>
					</div>
				</div>
				<div
					class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
					<div class="btn-toolbar mb-2 mb-md-0"></div>
				</div>
				<div class="table-responsive">
					<div id="summary-container">
						<script type="text/html" id="summary-template">
			<h4>총 운동횟수는 <span id="lsnUseSum"></span>회 입니다 </h4>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align: center">
                  <th>개인</th>
                  <th>듀엣</th>
                  <th>그룹</th>
                  <th>키즈P</th>
                  <th>키즈D</th>
                  <th>합계</th>
                </tr>
              </thead>
              <tbody>
				{{#list}}
                <tr data-id="{{lsnCd}}" style="text-align: center;">
                  <td>{{lsn01UseCnt}}</td>
                  <td>{{lsn02UseCnt}}</td>
                  <td>{{lsn03UseCnt}}</td>
                  <td>{{lsn04UseCnt}}</td>
                  <td>{{lsn05UseCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                  <td>{{lsnUseSum}}</td>
                </tr>
				{{/list}}	
				{{^list}}
<!--
                <tr>
                  <td>개인</td>
                  <td>2018/09/01</td>
                  <td>09:00</td>
                  <td>홍길동</td>
                  <td>1회차</td>
                  <td>2018/12/31</td>
                </tr>
-->
				{{/list}}
              </tbody>
            </table>
			</script>
					</div>
				</div>
			</div>
		</div>
	</header>

	<!-- Footer
	<footer class="footer text-center" style="padding: 0 100 0 0;">
		<div class="container">
			<ul class="list-inline mb-5">
	        <li class="list-inline-item">
	            <a class="social-link rounded-circle text-white" href="#">
	              <i class="icon-home"></i>
	            </a>
	          </li>
	          <li class="list-inline-item">
	            <a class="social-link rounded-circle text-white mr-3" href="#">
	              <i class="icon-social-instagram"></i>
	            </a>
	          </li>
	          <li class="list-inline-item">
	            <a class="social-link rounded-circle text-white mr-3" href="#">
	              <i class="icon-social-naver"></i>
	            </a>
	          </li>
	        </ul>
			<!-- <div class="text-muted small mb-0">Copyright &copy; Todayspilates
				2018</div> 
		</div>
	</footer>
	-->
	
	<footer class="footer text-center" style="padding: 0 100 0 0;">
		<a id="lnk-home" href="#"><i class="ficon icon-home"></i></a>
		<a id="lnk-instagram" href="#"><i class="ficon icon-instagram-filled"></i></a>
		<a id="lnk-blog" href="#"><i class="ficon icon-vkontakte-rect-1"></i></a>
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
	<script src="/js/boot4/stylish-portfolio.min.js"></script>
	<!-- Custom scripts for this template -->
	<script src="/js/member/reservation.js"></script>
	<script src="/js/common.js"></script>
	<script src="/js/boot4/vendor/mustache.js"></script>
	<script src="/js/boot4/vendor/ax5core.min.js"></script>
	<script src="/js/boot4/vendor/ax5formatter.js"></script>
	
</body>

</html>
