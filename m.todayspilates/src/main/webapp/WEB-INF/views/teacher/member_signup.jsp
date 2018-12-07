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
    <link href="/css/boot4/css/bootstrap-datepicker.css" rel="stylesheet">
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
            <h4>회원등록</h4>
            <div class="table-responsive" style="margin-top: 20px;">
                <div id="member-container">
                    <script type="text/html" id="member-template">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" id="filter" placeholder="회원명" style="width: 80px;  margin-left: 5px;">
                                    <div class="input-group-append">
                                        <button id="search-member" class="btn btn-primary">검색</button>
                                    </div>

                                </div>
                            </div>

                            <div class="btn-toolbar mb-2 mb-md-0" style="margin-right: 5px;">
                                <button type="button" id="call-update-member" class="btn btn-primary"
                                        style="margin-right: 3px;">정보수정</button>
                                <button type="button" id="call-add-member" class="btn btn-primary">회원등록</button>
                                    <%--<div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label class="btn btn-primary">
                                            <input type="radio" name="options" id="option1" autocomplete="off" checked> 정보수정
                                        </label>
                                        <label class="btn btn-primary active">
                                            <input type="radio" name="options" id="option2" autocomplete="off"> 회원등록
                                        </label>
                                    </div>--%>
                            </div>
                        </div>
                        <table class="table table-striped table-sm">
                            <thead>
                            <tr style="text-align: center">
                                <%--<th width="12%">#순번</th>--%>
                                <th width="15%">회원명</th>
                                <th width="10%">성별</th>
                                <th width="25%">모바일(HP)</th>
                                <th width="*">메모</th>
                                <th width="12%">상태</th>
                            </tr>
                            </thead>
                            <tbody>
                            {{#list}}
                            <tr data-id="{{lsnData}}" style="text-align: center;">
                                <%--<td style="height:40px;">{{idx}}</td>--%>
                                <td style="height:40px;">{{memberNm}}</td>
                                <td>{{sex}}</td>
                                <td>{{hp}}</td>
                                <td>{{remark}}</td>
                                <td>{{useYnNm}}</td>
                            </tr>
                            {{/list}}
                            {{^list}}
                            <tr style="text-align: center;">
                                <td style="height:40px;" colspan="6">등록정보가 없습니다.</td>
                            </tr>
                            {{/list}}
                            </tbody>
                        </table>
                    </script>
                </div>
            </div> <!-- table responsive -->
        </div><!-- row -->
        <div class="row" style="padding-top: 48px; padding-left: 5px; padding-right: 5px;">
            <h4>수업등록</h4>
            <div class="table-responsive" style="margin-top: 0px;">
                <div id="lesson-container">
                    <script type="text/html" id="lesson-template">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3">
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div class="input-group"></div>
                            </div>
                            <div class="btn-toolbar mb-2 mb-md-0" style="margin-right: 5px;">
                                <button type="button" id="add-lesson" class="btn btn-primary" for="tbl-caption"
                                        data-id="{{lsnData}}">수업등록</button>
                            </div>
                        </div>
                        <table class="table table-striped table-sm">
                            <thead>
                            <tr style="text-align: center">
                                <%--<th width="12%">#순번</th>--%>
                                <th width="15%">회원명</th>
                                <th>수업</th>
								<th>종류</th>
                                <th>등록</th>
                                <th>사용</th>
                                <th>조정</th>
                                <th>잔여</th>
                                <th width="20%">종료일</th>
                                <th width="15%">선생님</th>
                            </tr>
                            </thead>
                            <tbody>
                            {{#list}}
                            <tr data-id="{{lsnData}}" style="text-align: center; {{cssText1}}">
                                <%--<td style="height:40px;">{{idx}}</td>--%>
                                <td style="height:40px;">{{memberNm}}</td>
                                <td>{{lsnNm}}</td>
								<td>{{lsnFgNm}}</td>
								<td>{{lsnCnt}}</td>
                                <td>{{lsnUseCnt}}</td>
                                <td>{{lsnModCnt}}</td>
                                <td>{{lsnRestCnt}}</td>
                                <td>{{lsnEdDt}}</td>
                                <td>{{empNm}}</td>
                            </tr>
                            {{/list}}
                            {{^list}}
                            <tr style="text-align: center;">
                                <td style="height:40px;" colspan="9">등록정보가 없습니다.</td>
                            </tr>
                            {{/list}}
                            </tbody>
                        </table>
                    </script>
                </div>
            </div> <!-- table responsive -->
        </div><!-- row -->
    </div><!-- container -->
    <!-- member modal start -->
    <div class="modal fade" id="memberModalCenter" tabindex="-1" role="dialog" aria-labelledby="memberModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="memberModalCenterTitle">
                        회원등록
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0.5rem;">
                    <!-- 예약잡기 팝업body start -->
                    <div class="table-responsive" style="margin-top: 0px;">
                        <div id="new-member-container">
                            <%--<script type="text/html" id="new-member-template">--%>
                                <table class="table table-striped table-sm">
                                    <thead>
                                    <%--<tr style="text-align: center">
                                        <th width="12%">#구분</th>
                                        <th width="18%">회차</th>
                                        <th>시작일</th>
                                        <th>종료일</th>
                                    </tr>--%>
                                    </thead>
                                    <tbody>
                                        <%--{{#list}}--%>
                                        <tr data-id="{{lsnData}}" style="text-align: center;">
                                            <td width="40%" style="height:40px;">회원명</td>
                                            <td width="60%">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="memberNm" data-id="" data-value=""
                                                           style="width: 80px;  margin-left: 0px;">
                                                    <div class="input-group-append">
                                                        <button class="btn btn-primary" id="check-member">중복확인</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="text-align: center;">
                                            <td width="40%" style="height:40px;">모바일(HP)</td>
                                            <td width="60%">
                                                <div class="input-group">
                                                    <select id="hp1" class="custom-select">
														<option value="010" selected>010</option>
														<option value="011">011</option>
														<option value="017">017</option>
														<option value="018">018</option>
														<option value="019">019</option>
													</select>
													&nbsp;
                                                     <input type="text" class="form-control" id="hp2"
                                                           style="width: 40px;  margin-left: 0px;">
                                                     &nbsp;
                                                     <input type="text" class="form-control" id="hp3"
                                                           style="width: 40px;  margin-left: 0px;">
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="text-align: center;">
                                            <td width="40%" style="height:40px;">성별</td>
                                            <td width="60%"><select id="sex" class="custom-select">
                                                <option value="남">남성</option>
                                                <option value="여">여성</option>
                                            </select></td>
                                        </tr>
                                        <tr style="text-align: center;">
                                            <td width="40%" style="height:40px;">가입경로</td>
                                            <td width="60%">
                                                <select id="entFg" class="custom-select"></select> <!--entFg -->
                                            </td>
                                        </tr>
                                        <tr style="text-align: center;">
                                            <td width="40%" style="height:40px;">상태</td>
                                            <td width="60%"><select id="useYn" class="custom-select">
                                                <option value="Y">활동</option>
                                                <option value="N">미활동</option>
                                            </select></td>
                                        </tr>
                                        <tr style="text-align: center;">
                                            <td width="100%" colspan="2">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" id="member-remark" placeholder="메모">
                                                </div>
                                            </td>
                                        </tr>
                                        <%--{{/list}}--%>
                                    </tbody>
                                </table>
                            <%--/*</script>*/--%>
                        </div>
                    </div>
                </div>
                <!-- 회원등록 팝업body end -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                    <button type="button" class="btn btn-primary" id="delete-member" style="display: none;">삭제</button>
                    <button type="button" class="btn btn-primary" id="save-member">저장</button>
                </div>
            </div>
        </div>
    </div>
    <!-- modal end -->
    <!-- lesson modal start -->
    <div class="modal fade" id="lessonModalCenter" tabindex="-1" role="dialog" aria-labelledby="lessonModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="lessonModalCenterTitle">
                        수업등록
                    </h5>
                    <span class="badge badge-pill badge-danger">* 사용횟수가 0인 수업만 삭제 가능합니다.</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style="padding: 0.5rem;">
                    <!-- 수업등록 팝업body start -->
                    <div class="table-responsive" style="margin-top: 0px;">
                        <div id="new-lesson-container">
                            <%--<script type="text/html" id="new-reservation-template">--%>
                            <table class="table table-striped table-sm">
                                <thead>
                                    <%--<tr style="text-align: center">
                                        <th width="12%">#구분</th>
                                        <th width="18%">회차</th>
                                        <th>시작일</th>
                                        <th>종료일</th>
                                    </tr>--%>
                                </thead>
                                <tbody>
                                    <%--{{#list}}--%>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">회원명</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="memberNo" data-id=""
                                                       style="width: 80px;  margin-left: 0px;">
                                            </div>
                                        </td>
                                        <td width="25%" style="height:40px;">수업번호</td>  <!--3자리 +1씩 증가 -->
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnNo"
                                                       style="width: 80px;  margin-left: 0px;" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">수업종류</td>
                                        <td width="25%"><select class="custom-select" id="lsnCd"></select></td> <!--조회시 lsnTy -->
                                        <td width="25%" style="height:40px;">선생님</td>
                                        <td width="25%"><select class="custom-select" id="teacher"></select></td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">등록구분</td>
                                        <td width="25%"><select class="custom-select" id="lsnTy"> <!--조회시 lsnRegTy -->
                                            <option value="1">신규</option>
                                            <option value="2">재등록</option>
                                        </select></td>
                                        <td width="25%" style="height:40px;">등록종류</td>
                                        <td width="25%"><select class="custom-select" id="lsnFg"></select></td> <!--정상/체험/쿠폰 -->
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">등록금액</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnAmt"
                                                       style="width: 80px;  margin-left: 0px;">
                                            </div>
                                        </td>
                                        <td width="25%" style="height:40px;">결제방법</td>
                                        <td width="25%"><select class="custom-select" id="payTp">
                                            <option value="1">카드</option>
                                            <option value="2">현금</option>
                                        </select></td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">등록횟수</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnCnt"
                                                       style="width: 80px;  margin-left: 0px;">
                                            </div>
                                        </td>
                                        <td width="25%" style="height:40px;">사용횟수</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnUseCnt"
                                                       style="width: 80px;  margin-left: 0px;" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">횟수조정</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnModCnt"
                                                       style="width: 80px;  margin-left: 0px;" readonly>
                                            </div>
                                        </td>
                                        <td width="25%" style="height:40px;">잔여횟수</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnRestCnt"
                                                       style="width: 80px;  margin-left: 0px;" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">유효기간(주)</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnExpWk"
                                                       style="width: 40px;  margin-left: 0px;">
                                                <div class="input-group-append">
                                                    <button class="btn btn-info" disabled>W</button>
                                                </div>
                                            </div>
                                        </td>
                                        <td width="25%" style="height:40px;">시작일</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnStDt"
                                                       style="width: 80px;  margin-left: 0px; padding-left: 5px; padding-right: 5px" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;"></td>
                                        <td width="25%"></td>
                                        <td width="25%" style="height:40px;">종료일</td>
                                        <td width="25%">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="lsnEdDt"
                                                       style="width: 80px;  margin-left: 0px; padding-left: 5px; padding-right: 5px" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">수업여부</td>
                                        <td width="25%"><select class="custom-select" id="clsFg">
                                            <option value="1">수업</option>
                                            <option value="2">종료</option>
                                            <option value="3">보류</option>
                                        </select></td>
                                        <td width="25%" style="height:40px;">등록일자</td>
                                        <td width="25%">
                                            <div class="input-group" id="datepicker">
                                                <%--<select class="custom-select" id="regDt" style="width: 80px;  margin-right: 0px; margin-left: 0px; padding-left: 2px; padding-right: 0px"></select>--%>
                                                <input type="text" class="form-control" id="regDt"
                                                       style="width: 80px;  margin-left: 0px; padding-left: 5px; padding-right: 5px" readonly>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td width="25%" style="height:40px;">메모</td>
                                        <td width="75%" colspan="3">
                                            <div class="input-group">
                                                <input type="text" class="form-control" id="remark"
                                                       style="width: 80px;  margin-left: 0px;">
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <%--/*</script>*/--%>
                        </div>
                    </div>
                </div>
                <!-- 수업등록 팝업body end -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary"
                            data-dismiss="modal">취소</button>
                    <button type="button" class="btn btn-danger" id="delete-lesson">삭제</button>
                    <button type="button" class="btn btn-primary" id="save-lesson">저장</button>
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
<script src="/js/boot4/js/bootstrap-datepicker.min.js"></script>
<script src="/js/boot4/js/bootstrap-datepicker.ko.min.js"></script>
<script src="/js/common.js"></script>
<script src="/js/teacher/member_signup.js"></script>
</body>
</html>
