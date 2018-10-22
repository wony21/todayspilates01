<%@page import="m.todays.pilates.common.SessionUtils" %>
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

    <title>Todays pilates</title>

    <!-- Bootstrap Core CSS -->
    <link href="/css/boot4/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/css/boot4/vendor/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic"
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
                                        href="/teacher/group_lesson">그룹레슨 출석부</a></li>
        <li class="sidebar-nav-item"><a class="js-scroll-trigger"
                                        href="/teacher/group_lesson_status">그룹레슨 등록현황 관리</a></li>
        <li class="sidebar-nav-item"><a class="js-scroll-trigger"
                                        href="/teacher/member_signup">회원등록/수업등록</a></li>
        <li class="sidebar-nav-item"><a class="js-scroll-trigger"
                                        href="/teacher/my_lesson_report">내수업실적</a></li>
        <li class="sidebar-nav-item"><a class="js-scroll-trigger"
                                        href="#" id="logout">로그아웃</a></li>
    </ul>
</nav>

<!-- Header -->
<header class="d-flex">
    <div class="container">
        <div class="row" style="padding-top: 48px; padding-left: 5px; padding-right: 5px;"><p>
            <h4> 나의 수업실적</h4>
            <div class="table-responsive">
                <div id="date-container">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="input-group">
                                <select class="custom-select" id="report-year"
                                        style="width: 80px; margin-left: 5px;"></select>
                            </div>
                            <div class="input-group">
                                <select class="custom-select" id="report-month"
                                        style="width: 60px; margin-left: 5px;"></select>
                            </div>
                            <div class="input-group">
                                <select class="custom-select" id="teacher"
                                        style="width: 80px; margin-left: 5px;"></select>
                            </div>
                            <div class="input-group">
                                <button id="search-attend" class="btn btn-primary">검색</button>
                            </div>

                            <!--<div class="btn-group mr-2" style="float: right; margin-left: 5px;">
                              <button class="btn btn-outline-secondary">예약하기</button>
                            </div> -->
                        </div>
                    </div>
                    <table class="table table-striped table-sm" id="datepicker">
                        <thead><!-- 동적생성 --></thead>
                        <tbody><!-- 동적생성 --></tbody>
                    </table>
                </div><!-- end date-container -->
            </div>
            <div class="container">
                <div class="row" style="padding-top: 20px;"></div>
                <!--<a href="#"><button type="button" class="btn" style="width: 150px;">개인레슨 예약하기</button></a>-->
            </div>
            <div class="table-responsive" style="top-margin: 10px;">
                <div id="reservation-container">
                    <script type="text/html" id="reservation-template">
                        <table class="table table-striped table-sm">
                            <thead>
                            <tr style="text-align: center">
                                <th>예약일시</th>
                                <th>시간</th>
                                <th>회원</th>
                                <th>선생님</th>
                                <th>회차</th>
                                <th>종료일</th>
                                <th>출결처리</th>
                            </tr>
                            </thead>
                            <tbody>
                            {{#list}}
                            <tr data-id="{{lsnCd}}" style="text-align: center;">
                                <td style="height:40px;">{{rsvDt}}({{dy}})<br>{{rsvTm}}</td>
                                <td>{{lsnTm}}</td>
                                <td>{{memberNm}}</td>
                                <td>{{empNm}}</td>
                                <td>{{lsnNum}}/{{lsnCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                                <td>{{lsnEdDt}}</td>
                                <td class="select"><select id="sel-attend" class="custom-select attend-process"
                                                           style="width: 70px;">
                                    <option value="0" display-flag="{{optFg0}}" {{sel0}}>선택</option>
                                    <option value="1" display-flag="{{optFg1}}" {{sel1}}>출석</option>
                                    <option value="2" display-flag="{{optFg2}}" {{sel2}}>결석</option>
                                    <option value="3" display-flag="{{optFg3}}" {{sel3}}>취소</option>
                                </select></td>
                            </tr>
                            {{/list}}
                            {{^list}}
                            <!--
                                            <tr data-id="" style="text-align: center;">
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                              <td></td>
                                                <td><select class="attend-process">
                                                    <option value="0" selected>선택</option>
                                                    <option value="2">출석</option>
                                                    <option value="1">결석</option>
                                                    <option value="3">취소</option>
                                                </select></td>
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
<!-- Footer -->
<footer class="footer text-center" style="padding: 0 100 0 0">
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
<script src="/js/boot4/vendor/mustache.js"></script>
<script src="/js/boot4/vendor/ax5core.min.js"></script>
<script src="/js/boot4/vendor/ax5formatter.js"></script>
<script src="/js/boot4/stylish-portfolio.js"></script>
<script src="/js/common.js"></script>
<script src="/js/teacher/my_lesson_report.js"></script>
</body>

</html>
