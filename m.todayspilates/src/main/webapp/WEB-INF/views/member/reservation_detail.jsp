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
<link href="css/boot4/css/bootstrap.min.css" rel="stylesheet">
<link href="css/boot4/dashboard.css" rel="stylesheet">
<!-- Custom Fonts -->
<link href="css/boot4/vendor/font-awesome.min.css" rel="stylesheet"
	type="text/css">
<link
	href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic"
	rel="stylesheet" type="text/css">
<link href="css/boot4/vendor/simple-line-icons.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/boot4/stylish-portfolio.css" rel="stylesheet">

<body id="page-top" style="max-width: 100%; overflow-x: hidden;">
	<!-- Navigation -->
	<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i>
	</a>
	<nav id="sidebar-wrapper">
		<ul class="sidebar-nav">
			<li class="sidebar-brand"><a class="js-scroll-trigger"
				href="#page-top">회원<!--( ${userLv} )--> : ${username} 님
			</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#page-top">Home</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#about">About</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#" id="reservation">Reservation</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#portfolio">Portfolio</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="#contact">Contact</a></li>
			<li class="sidebar-nav-item"><a class="js-scroll-trigger"
				href="/logout" id="logout">Logout</a></li>
		</ul>
	</nav>
	
	<!-- Header -->
	<div class="row">
        

        <main role="main" class="col-md ml-sm-auto col-lg px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">&nbsp;</h1>
            <!-- <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group mr-2">
                <button class="btn btn-sm btn-outline-secondary">Share</button>
                <button class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                This week
              </button>
            </div> -->
          </div>

          <h4>출석현</h4>
          <div class="table-responsive">
          	<div id="reservation-container">
          	<script type="text/html" id="reservation-template">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th>#순번</th>
                  <th>예약일시</th>
                  <th>요일</th>
                  <th>출석시간</th>
                  <th>출석여부</th>
                </tr>
              </thead>
              <tbody>
				{{#list}}
                <tr>
                  <td>{{index}}</td>
                  <td>{{atndDt}}</td>
                  <td>{{dy}}</td>
                  <td>{{rsvTm}}</td>
                  <td>{{atndNm}}</td>
                </tr>
				{{/list}}	
				{{^list}}
                <tr>
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
	<footer class="footer text-center">
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
			<p class="text-muted small mb-0">Copyright &copy; Your Website
				2017</p>
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
	<script src="js/reservation_detail.js"></script>
	<script src="js/boot4/vendor/mustache.js"></script>
	<script src="js/boot4/vendor/ax5core.min.js"></script>
	<script src="js/boot4/vendor/ax5formatter.js"></script>

</body>

</html>
