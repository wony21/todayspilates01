<%@page import="m.todays.pilates.common.SessionUtils" %>
<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
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
        <div class="row" style="padding-top: 48px; padding-left: 5px; padding-right: 5px;">
            <h4>그룹레슨 등록현황 관리</h4>
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
            <div class="table-responsive" style="margin-top: 20px;">
                <div id="reservation-container">
                    <script type="text/html" id="reservation-template">
                        {{#list}}
                        <div class="input-group" style="vertical-align: bottom;" id="caption">
                            <label id="tbl-caption" class="group-lesson-tbl-caption">{{stTm}} {{lsnLvNm}} ({{lsnTm}})
                                {{empNm}}
                            </label>
                        </div>
                        <table class="table table-striped table-sm">
                            <thead>
                            <%--<tr style="text-align: center">
                              <th width="25%">회원명</th>
                              <th width="25%">등록처리</th>
                              <th width="25%">회원명</th>
                              <th width="25%">등록처리</th>
                            </tr>--%>
                            </thead>
                            <tbody>
                            {{#schedule}}
                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                <td width="15%">{{memberNm}}</td>
                                <td width="18%" class="select" data-id="{{lsnData}}">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                </td>
                                <td width="15%">{{memberNm}}</td>
                                <td width="18%" class="select" data-id="{{lsnData}}">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                </td>
                                <td width="15%">{{memberNm}}</td>
                                <td width="18%" class="select" data-id="{{lsnData}}">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                </td>
                            </tr>
                            {{/schedule}}
                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                <td width="15%">미등록</td>
                                <td width="18%" class="select" data-id="">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                </td>
                                <td width="15%">미등록</td>
                                <td width="18%" class="select" data-id="">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                </td>
                                <td width="15%">미등록</td>
                                <td width="18%" class="select" data-id="">
                                    <select class="custom-select member-process">
                                        <option value="0">선택</option>
                                        <option value="1">등록</option>
                                        <option value="2">삭제</option>
                                    </select>
                                    <%--<button type="button" id="group-lesson-add-btn" class="btn btn-sm btn-outline-secondary">등록</button>--%>
                                </td>
                            </tr>
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
    <!-- modal start -->
    <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">
                        그룹레슨 회원등록
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0.5rem;">
                    <!-- 예약잡기 팝업body start -->
                    <%--<div id="modal-caption" data-id="">test</div>--%>
                    <div class="table-responsive" style="margin-top: 0px;">
                        <div id="modal-date-container">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                                <div class="btn-toolbar mb-2 mb-md-0">
                                    <div class="input-group">
                                        <input type="text" class="form-control" id="filter" placeholder="회원명"
                                               style="width: 80px;  margin-left: 0px;">
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" id="search-member">검색</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="new-member-container">
                            <script type="text/html" id="new-member-template">
                                <table class="table table-striped table-sm">
                                    <thead>
                                    <tr style="text-align: center">
                                        <th width="12%">#구분</th>
                                        <th width="18%">회원명</th>
                                        <th>시작일</th>
                                        <th>종료일</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {{#list}}
                                    <tr data-id="{{lsnData}}" style="text-align: center;">
                                        <td>{{lsnNm}}</td>
                                        <td>{{memberNm}}</td>
                                        <td>{{lsnStDt}}</td>
                                        <td>{{lsnEdDt}}</td>
                                    </tr>
                                    {{/list}}
                                    {{^list}}
                                    <tr>
                                        <td colspan="4">등록정보가 없습니다.</td>
                                    </tr>
                                    {{/list}}
                                    </tbody>
                                </table>
                            </script>
                        </div>
                    </div>
                </div>
                <!-- 예약잡기 팝업body end -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">취소
                    </button>
                    <button type="button" class="btn btn-primary" id="add-member">등록</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal end -->
</header> <!-- d-flex -->
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
<script src="/js/teacher/group_lesson_status.js"></script>
</body>
</html>
