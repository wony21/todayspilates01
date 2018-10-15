<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
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
    
    <!--  <header class="masthead d-flex">
      <div class="container text-center my-auto">
        <h1 class="mb-1">Todayspilates</h1>
        <h3 class="mb-5">
          <em>A Free Bootstrap Theme by Start Bootstrap</em>
        </h3>
        <a class="btn btn-primary btn-xl js-scroll-trigger" href="/teacher/private_lesson">개인레슨 출석부</a>
      </div>
      <div class="overlay"></div>
    </header>
	-->
    <!-- About -->
    <!-- 
    <section class="content-section bg-light" id="about">
      <div class="container text-center">
        <div class="row">
          <div class="col-lg-10 mx-auto">
            <h2>Stylish Portfolio is the perfect theme for your next project!</h2>
            <p class="lead mb-5">This theme features a flexible, UX friendly sidebar menu and stock photos from our friends at
              <a href="https://unsplash.com/">Unsplash</a>!</p>
            <a class="btn btn-dark btn-xl js-scroll-trigger" href="#services">What We Offer</a>
          </div>
        </div>
      </div>
    </section>-->

    <!-- Services -->
    <!--<section class="content-section bg-primary text-white text-center" id="services">
      <div class="container">
        <div class="content-section-heading">
          <h3 class="text-secondary mb-0">Services</h3>
          <h2 class="mb-5">What We Offer</h2>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <span class="service-icon rounded-circle mx-auto mb-3">
              <i class="icon-screen-smartphone"></i>
            </span>
            <h4>
              <strong>Responsive</strong>
            </h4>
            <p class="text-faded mb-0">Looks great on any screen size!</p>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
            <span class="service-icon rounded-circle mx-auto mb-3">
              <i class="icon-pencil"></i>
            </span>
            <h4>
              <strong>Redesigned</strong>
            </h4>
            <p class="text-faded mb-0">Freshly redesigned for Bootstrap 4.</p>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 mb-md-0">
            <span class="service-icon rounded-circle mx-auto mb-3">
              <i class="icon-like"></i>
            </span>
            <h4>
              <strong>Favorited</strong>
            </h4>
            <p class="text-faded mb-0">Millions of users
              <i class="fa fa-heart"></i>
              Start Bootstrap!</p>
          </div>
          <div class="col-lg-3 col-md-6">
            <span class="service-icon rounded-circle mx-auto mb-3">
              <i class="icon-mustache"></i>
            </span>
            <h4>
              <strong>Question</strong>
            </h4>
            <p class="text-faded mb-0">I mustache you a question...</p>
          </div>
        </div>
      </div>
    </section>
-->
    <!-- Callout -->
   <!--  <section class="callout">
      <div class="container text-center">
        <h2 class="mx-auto mb-5">Welcome to
          <em>your</em>
          next website!</h2>
        <a class="btn btn-primary btn-xl" href="https://startbootstrap.com/template-overviews/stylish-portfolio/">Download Now!</a>
      </div>
    </section>
--> 
    <!-- Portfolio -->
    <!-- <section class="content-section" id="portfolio">
      <div class="container">
        <div class="content-section-heading text-center">
          <h3 class="text-secondary mb-0">Portfolio</h3>
          <h2 class="mb-5">Recent Projects</h2>
        </div>
        <div class="row no-gutters">
          <div class="col-lg-6">
            <a class="portfolio-item" href="#">
              <span class="caption">
                <span class="caption-content">
                  <h2>Stationary</h2>
                  <p class="mb-0">A yellow pencil with envelopes on a clean, blue backdrop!</p>
                </span>
              </span>
              <img class="img-fluid" src="css/boot4/images/stylish-portfolio/portfolio-1.jpg" alt="">
            </a>
          </div>
          <div class="col-lg-6">
            <a class="portfolio-item" href="#">
              <span class="caption">
                <span class="caption-content">
                  <h2>Ice Cream</h2>
                  <p class="mb-0">A dark blue background with a colored pencil, a clip, and a tiny ice cream cone!</p>
                </span>
              </span>
              <img class="img-fluid" src="css/boot4/images/stylish-portfolio/portfolio-2.jpg" alt="">
            </a>
          </div>
          <div class="col-lg-6">
            <a class="portfolio-item" href="#">
              <span class="caption">
                <span class="caption-content">
                  <h2>Strawberries</h2>
                  <p class="mb-0">Strawberries are such a tasty snack, especially with a little sugar on top!</p>
                </span>
              </span>
              <img class="img-fluid" src="css/boot4/images/stylish-portfolio/portfolio-3.jpg" alt="">
            </a>
          </div>
          <div class="col-lg-6">
            <a class="portfolio-item" href="#">
              <span class="caption">
                <span class="caption-content">
                  <h2>Workspace</h2>
                  <p class="mb-0">A yellow workspace with some scissors, pencils, and other objects.</p>
                </span>
              </span>
              <img class="img-fluid" src="css/boot4/images/stylish-portfolio/portfolio-4.jpg" alt="">
            </a>
          </div>
        </div>
      </div>
    </section>
 -->
    <!-- Call to Action -->
    <!-- 
    <section class="content-section bg-primary text-white">
      <div class="container text-center">
        <h2 class="mb-4">The buttons below are impossible to resist...</h2>
        <a href="#" class="btn btn-xl btn-light mr-4">Click Me!</a>
        <a href="#" class="btn btn-xl btn-dark">Look at Me!</a>
      </div>
    </section>
 -->
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
		let user = {};
		user.empNo = empNo;
		user.storCd = storCd;
		user.lsnCd = '';
		user.username = username2;
		
		
		window.localStorage.setItem('todays', JSON.stringify(user));
	</script>
  </body>

</html>

