<%@page import="m.todays.pilates.common.SessionUtils"%>
<%@ page import="java.util.UUID"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<%
	String uuid = UUID.randomUUID().toString();
	request.setAttribute("uuid", uuid);
	String userLv = SessionUtils.getCurrentUser().getUserLv();
	String empNo = SessionUtils.getCurrentUser().getEmpNo();
	String storCd = SessionUtils.getCurrentUser().getStorCd();
	String username2 = SessionUtils.getCurrentUser().getUsername2();
	request.setAttribute("userLv", userLv);
	request.setAttribute("empNo", empNo);
	request.setAttribute("storCd", storCd);
	request.setAttribute("username2", username2);
	String userLvNm = "";
    if ( userLv.equals("01") ) {
   		userLvNm = "원장";
   	} else if (userLv.equals("02") ) {
   		userLvNm = "선생님";
   	} else if (userLv.equals("03")) {
   		userLvNm = "회원";
   	}
   	request.setAttribute("userLvNm", userLvNm);
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
<link href="//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700,300italic,400italic,700italic" rel="stylesheet" type="text/css">
<link href="/css/boot4/vendor/simple-line-icons.css" rel="stylesheet">
<!-- Custom CSS -->

<link href="/css/boot4/stylish-portfolio.css" rel="stylesheet">
<link href="/css/boot4/dashboard.css" rel="stylesheet">
<link href="/css/boot4/form-validation.css" rel="stylesheet">
</head>
<body id="page-top">
<!-- Navigation -->
<a class="menu-toggle rounded" href="#"> <i class="fa fa-bars"></i>
</a>
<nav id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <li class="sidebar-brand"><a class="js-scroll-trigger"
                                     href="#page-top">${userLvNm}<!--( ${userLv} )--> : <span
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
            <h4> 개인레슨 예약하기</h4>
            <div class="table-responsive">
                <div id="date-container">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="input-group">
                                <input type="text" class="form-control" id="filter" placeholder="회원명"
                                       style="width: 80px;  margin-left: 5px;">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" id="search-member">검색</button>
                                </div>
                            </div>
                        </div>

                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div class="input-group">
                                <button id="call-new-reservation" class="btn btn-primary" style="margin-right: 5px;">신규예약</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                            </tr>
                            </thead>
                            <tbody>
                            {{#list}}
                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                <td style="height:40px;">{{rsvDt}}{{dy}}<br>{{rsvTm}}</td>
								<td>{{lsnTm}}</td>
                                <td>{{memberNm}}</td>
                                <td>{{empNm}}</td>
                                <td>{{lsnUseCnt}}/{{lsnCnt}}</td> <!--횟차의분자 = 사용횟수 + 수업값 + 신규예약의 수업시-->
                                <td>{{lsnEdDt}}</td>
                            </tr>
                            {{/list}}
                            {{^list}}
                            <tr style="text-align: center;">
                                <td style="height:40px;" colspan="6">예약정보가 없습니다.</td>
                            </tr>
                            {{/list}}
                            </tbody>
                        </table>
                    </script>
                </div>
            </div>
            
            
            <!-- 등록 Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenterTitle">예약등록 (<span id="userInfo"></span> 님)
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0.5rem;">
                            <!-- 예약잡기 팝업body start -->
                            <div class="table-responsive" style="margin-top: 30px;">
                                <!--
                                <div class="container float-md-right">
                                    <button type="button" class="btn btn-md btn-default pull-right">개인레슨 예약등록</button>
                                </div>
                                 -->
                                <!--span> (예약을 원하시면 레슨을 선택하세요)</span-->
                                <div id="new-reservation-container">
                                    <script type="text/html" id="new-reservation-template">
                                        <table class="table table-striped table-sm">
                                            <thead>
                                            <tr style="text-align: center">
                                                <th>#구분</th>
                                                <th>종류</th>
                                                <th>회차</th>
                                                <th>시작일</th>
                                                <th>종료일</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {{#list}}
                                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                                <td>{{lsnNm}}</td>
                                                <td>{{lsnFgNm}}</td>
                                                <td>{{lsnUseCnt}}/{{lsnCnt}}</td>
                                                <td>{{lsnStDt}}</td>
                                                <td>{{lsnEdDt}}</td>
                                            </tr>
                                            {{/list}}
                                            {{^list}}
                                            <tr>
                                                <td colspan="5">조회된 예약이 존재하지 않습니다.</td>
                                            </tr>
                                            {{/list}}
                                            </tbody>
                                        </table>
                                    </script>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                                <div class="btn-toolbar mb-2 mb-md-0" id="new-reservation" data-id="">
                                    <!--
                                    <div class="input-group">
                                        <select class="custom-select" id="lsnCd" style="width: 58px;"></select>
                                    </div>
                                     -->
                                    <div class="input-group">
                                        <select class="custom-select" id="rsvDt" style="width: 90px;"></select>
                                    </div>
                                    <div class="input-group">
                                        <select class="custom-select" id="rsvTm"
                                                style="width: 80px; margin-left: 5px;"></select>
                                    </div>
                                    <div class="input-group">
                                        <select class="custom-select" id="lsnTm" style="width: 70px; margin-left: 5px;">
                                            <option value="1.0">1.0</option>
                                            <option value="1.5">1.5</option>
                                        </select>
                                    </div>
                                    <div class="input-group">
                                        <select class="custom-select" id="teacher"
                                                style="width: 80px; margin-left: 5px;"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 예약잡기 팝업body end -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-primary" id="add-lesson">등록</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="updateModalCenter" tabindex="-1" role="dialog"
                 aria-labelledby="updateModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="updateModalCenterTitle">예약수정 (<span id="up-userInfo"></span> 님)</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0.5rem;">
                            <!-- 예약잡기 팝업body start -->
                            <div class="table-responsive" style="margin-top: 30px;">
                                <!--
                                <div class="container float-md-right">
                                    <button type="button" class="btn btn-md btn-default pull-right">개인레슨 예약등록</button>
                                </div>
                                 -->
                                <!--span> (예약을 원하시면 레슨을 선택하세요)</span-->
                                <div id="update-reservation-container">
                                    <script type="text/html" id="update-reservation-template">
                                        <table class="table table-striped table-sm">
                                            <thead>
                                            <tr style="text-align: center">
                                                <th>#구분</th>
                                                <th>종류</th>
                                                <th>회차</th>
                                                <th>시작일</th>
                                                <th>종료일</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {{#list}}
                                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                                <td>{{lsnNm}}</td>
                                                <td>{{lsnFgNm}}</td>
                                                <td>{{lsnUseCnt}}/{{lsnCnt}}</td>
                                                <td>{{lsnStDt2}}</td>
                                                <td>{{lsnEdDt2}}</td>
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
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                                <div class="btn-toolbar mb-2 mb-md-0" id="update-reservation" data-id="">
                                    <!--
                                    <div class="input-group">
                                        <select class="custom-select" id="lsnCd" style="width: 58px;"></select>
                                    </div>
                                     -->
                                    <div class="input-group">
                                        <select class="custom-select" id="update-rsvDt" style="width: 90px;"></select>
                                    </div>
                                    <div class="input-group">
                                        <select class="custom-select" id="update-rsvTm"
                                                style="width: 80px; margin-left: 5px;"></select>
                                    </div>
                                    <div class="input-group">
                                    	<input type="hidden" id="update-data" value="" />
                                        <select class="custom-select" id="update-lsnTm" style="width: 70px; margin-left: 5px;">
                                            <option value="1.0">1.0</option>
                                            <option value="1.5">1.5</option>
                                        </select>
                                    </div>
                                    <div class="input-group">
                                        <select class="custom-select" id="update-teacher"
                                                style="width: 80px; margin-left: 5px;"></select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 예약잡기 팝업body end -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-primary" id="update-lesson">수정</button>
                        </div>
                    </div>
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
<script src="/js/boot4/js/bootstrap.min.js"></script>

<!-- Plugin JavaScript -->
<script src="/js/boot4/jquery.easing.min.js"></script>

<!-- Custom scripts for this template -->
<script src="/js/boot4/vendor/mustache.js"></script>
<script src="/js/boot4/vendor/ax5core.min.js"></script>
<script src="/js/boot4/vendor/ax5formatter.js"></script>
<script src="/js/boot4/vendor/holder.min.js"></script>
<script src="/js/boot4/stylish-portfolio.js"></script>
<script src="/js/common.js?=${uuid}"></script>
<script src="/js/teacher/private_reservation.js?=${uuid}"></script>
</body>

</html>
