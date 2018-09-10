<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
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
	content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>Todays pilates</title>

<!-- Bootstrap Core CSS -->
<link href="/css/boot4/css/bootstrap.min.css" rel="stylesheet">
<link href="/css/boot4/dashboard.css" rel="stylesheet">
<!-- Custom Fonts -->
<link href="/css/boot4/vendor/font-awesome.min.css" rel="stylesheet" type="text/css">
<link
	href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic"
	rel="stylesheet" type="text/css">
<link href="/css/boot4/vendor/simple-line-icons.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="/css/boot4/stylish-portfolio.css" rel="stylesheet">

<body id="page-top">
	<!-- Navigation -->
	<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i>
	</a>
	<nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">선생님<!--( ${userLv} )--> : <span class="username">${username}</span> 님
			</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/teacher/private_lesson">개인레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">그룹레슨 출석부</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#" id="reservation">그룹레슨 등록현황관리</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">회원등록/수업등록</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#">내수업실적</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/logout" id="logout">로그아웃</a></li>
		</ul>
	</nav>
	
	<!-- Header -->
	<div class="row">
        
		
        <main role="main" class="col-md ml-sm-auto col-lg px-4">
        <p>
          <h4>개인레슨 출석부</h4>
          <div class="table-responsive">
          	<div id="date-container">
          	<script type="text/html" id="date-template">
			<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
            <h1 class="h2">&nbsp;</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="input-group" style="">
              	<input type="text" class="form-control" placeholder="회원명" style="width: 80px;">
              	<div class="input-group-append">
                	<button type="submit" class="btn btn-primary">검색</button>
              	</div>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle" style="margin-left: 5px;">
                <span data-feather="calendar"></span>
                선생님 전체보기
              </button>
			  <button class="btn btn-sm btn-outline-secondary dropdown-toggle" style="margin-left: 5px;">
                <span data-feather="calendar"></span>
                2018년 9월 3주
              </button>	
            </div>
          </div>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align:center; height: 40px;">
                  <th>일</th>
                  <th>월</th>
                  <th>화</th>
                  <th>수</th>
                  <th>목</th>
                  <th>금</th>
                  <th>토</th>
                </tr>
              </thead>
              <tbody>
				
                <tr data-id="" style="text-align: center; vertical-align: middle; height: 40px;">
				{{#list}}
                  <td>{{key}}</td>
				{{/list}}
                </tr>
              </tbody>
            </table>
			</script>
			</div>
          </div>
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
	            <div class="btn-toolbar mb-2 mb-md-0">
	            </div>
          </div>
          <div class="table-responsive">
          	<div id="reservation-container">
          	<script type="text/html" id="reservation-template">
			<div style="text-align: right"><span>&nbsp;</span></div>
            <table class="table table-striped table-sm">
              <thead>
                <tr style="text-align:center">
                  <th>예약일시</th>
                  <th>시간</th>
                  <th>선생님</th>
                  <th>회차</th>
                  <th>종료일</th>
				  <th>출결처리</th>
                </tr>
              </thead>
              <tbody>
				{{#list}}
                <tr data-id="{{lsnCd}}" style="text-align: center">
                  <td>{{rsvDt}}</td>
                  <td>{{rsvTm}}</td>
                  <td>{{empNm}}</td>
                  <td>{{lsnTm}}/{{lsnCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                  <td>{{lsnEdDt}}</td>
				  <td><select class="attend-process">
					<option value="1" selected>출석</option>
						<option value="2">결석</option>
						<option value="3">취소</option>
					</select></td>
                </tr>
				{{/list}}	
				{{^list}}
                <tr>
                  <td>2018/09/01</td>
                  <td>09:00</td>
                  <td>홍길동</td>
                  <td>1회차</td>
                  <td>2018/12/31</td>
					<td><select class="attend-process">
						<option value="1" selected>출석</option>
						<option value="2">결석</option>
						<option value="3">취소</option>
					</select></td>
                </tr>
				{{/list}}
              </tbody>
            </table>
			</script>
			</div>
          </div>
        </main>
        <input type='hidden' id='memberNo'/ value=${memberNo}>
      </div>

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
	<script src="/js/boot4/stylish-portfolio.min.js"></script>
	<script src="/js/private_lesson.js"></script>
	<script src="/js/common.js"></script>
	<script src="/js/boot4/vendor/mustache.js"></script>
	<script src="/js/boot4/vendor/ax5core.min.js"></script>
	<script src="/js/boot4/vendor/ax5formatter.js"></script>
	<script>
		let memberNo = '<%=memberNo%>';
		let storCd = '<%=storCd%>';
		let username2 = '<%=username2%>';
		let user = {};
		user.memberNo = memberNo;
		user.storCd = storCd;
		user.lsnCd = '';
		user.username = username2;
		
		
		window.localStorage.setItem('todays', JSON.stringify(user));
	</script>
</body>

</html>
