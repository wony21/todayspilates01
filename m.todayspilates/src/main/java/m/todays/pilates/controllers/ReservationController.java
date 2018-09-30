package m.todays.pilates.controllers;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import m.todays.pilates.common.BaseController;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.common.api.ApiResponse;
import m.todays.pilates.domain.reservation.member.MemberResrvService;
/**
 * 
 * 출결 및 예약API Controller
 * (회원, 선생님, 관리자)
 * @Author 	: User
 * @Date	: 2018. 6. 21.
 * @Version : 
 *
 */
@Controller
public class ReservationController extends BaseController {

	@Autowired
	MemberResrvService memberResrvService;
	
	/**
	 * 회원 - 예약현황 목록
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getMemberReservation
	 * @comment		: 
	 * @auth		: 회원
	 * @param storCd 매장코드
	 * @param memberNo 회원번호
	 * @return
	 */
	@RequestMapping(value = "/api/member/reservation", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getMemberReservation(
			@RequestParam String storCd, 
			@RequestParam String memberNo) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getMemberReservation(compCd, storCd, memberNo);
	}
	/**
	 * 회원 - 사용내역보기
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getDetailUseLesson
	 * @comment		: 
	 * @auth		: 회원
	 * @param storCd 매장코드
	 * @param lsnCd 레슨코드 
	 * @param memberNo 회원번호 
	 * @return
	 */
	@RequestMapping(value = "/api/member/reservation/detail", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getDetailUseLesson(
			@RequestParam String storCd,
			@RequestParam String lsnCd,
			@RequestParam String memberNo) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getDetailUseLesson(compCd, storCd, lsnCd, memberNo);
	}
	/**
	 * 회원 - 총 운동횟수
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getMemberLessonSummary
	 * @comment		: 
	 * @auth		: 회원
	 * @param storCd 매장정보
	 * @param memberNo 회원번호
	 * @return
	 */
	@RequestMapping(value = "/api/member/lesson/summary", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getMemberLessonSummary(
			@RequestParam String storCd,
			@RequestParam String memberNo) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getLessonSummary(compCd, storCd, memberNo);
	}
	/**
	 * 개인레슨출석부 (주별 레슨정보현황)
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getWeeklyLesson
	 * @comment		: 
	 * @auth		: 선생님, 관리자
	 * @param storCd 매장정보
	 * @param memberNm 회원이름
	 * @param empNo 선생님코드(select에서..)
	 * @param sttDt 조회시작일(YYYYMMDD)
	 * @param endDt 조회종료일(YYYYMMDD)
	 * @return
	 */
	@RequestMapping(value = "/api/teacher/reservation/weekly", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getWeeklyLesson(
			@RequestParam String storCd,
			@RequestParam(defaultValue="", required=false) String memberNm,
			@RequestParam(defaultValue="", required=false) String empNo,
			@RequestParam(defaultValue="", required=false) String rsvDt,
			@RequestParam String sttDt,
			@RequestParam String endDt) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getWeeklyLesson(compCd, storCd, memberNm, empNo, rsvDt, sttDt, endDt);
	}
	
	/**
	 * 개인레슨 - 등록정보 선택
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getUserLessons
	 * @comment		: 
	 * @auth		: 선생님, 관리자
	 * @param storCd 매장코드
	 * @param memberNo 회원번호
	 * @param empNo 선생님코드
	 * @return
	 */
	@RequestMapping(value = "/api/teacher/reservation/lessons", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getUserLessons(
			@RequestParam String storCd,
			@RequestParam(defaultValue="") String memberNo,
			@RequestParam(defaultValue="") String empNo) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getUserLesson(compCd, storCd, memberNo, empNo);
	}
	
	/**
	 * 개인레슨출석부 - 예약현황
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: getWeeklyDetail
	 * @comment		: 
	 * @auth		: 선생님, 관리자
	 * @param storCd 매장코드
	 * @param memberNo 회원번호
	 * @param empNo 선생님코드
	 * @param sttDt 조회시작일(YYYYMMDD)
	 * @param endDt 조회종료일(YYYYMMDD)
	 * @return
	 */
	@RequestMapping(value = "/api/teacher/reservation/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getWeeklyDetail(
			@RequestParam String storCd,
			@RequestParam(defaultValue="") String memberNm,
			@RequestParam(defaultValue="") String empNo,
			@RequestParam String sttDt,
			@RequestParam String endDt) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getWeeklyDetail(compCd, storCd, memberNm, empNo, sttDt, endDt);
	}
	/**
	 * 선생님 - 개인레슨예약(레슨목록)
	 * @param storCd
	 * @param memberNo
	 * @return
	 */
	@RequestMapping(value = "/api/teacher/reservation/lesson", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getMemberLesson(
			@RequestParam String storCd,
			@RequestParam String memberNo) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberResrvService.getMemberLesson(compCd, storCd, memberNo);
	}
	/**
	 * 개인레슨출석부 - 출석
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: editLessonAttand
	 * @comment		: /api/teacher/reservation/edit
	 * @auth		: 선생님, 관리자
	 * @param requestParams [
				   {
				        "lsnNm": "개인",
				        "empNm": "노미리",
				        "lsnTm": 1,
				        "empNo": "00005",
				        "lsnSeq": 4,
				        "lsnUseCnt": 0,
				        "compCd": "0001",
				        "lsnNo": "002",
				        "lsnCd": "01",
				        "lsnCnt": 20,
				        "storCd": "001",
				        "memberNo": "00008",
				        "rsvTm": "2000",
				        "memberNm": "김주영",
				        "dy": "금",
				        "atndFg": "2",
				        "rsvDt": "20180615",
				        "lsnEdDt": ""
				    }
				]
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/teacher/lesson/attend", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse lessonAttend(@RequestBody List<HashMap> requestParams) {
		return memberResrvService.attend(requestParams);
	}
	/**
	 * 개인레슨출석부 - 결석
	 * @param requestParams
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/teacher/lesson/absent", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse lessonAbsend(@RequestBody List<HashMap> requestParams) {
		return memberResrvService.absent(requestParams);
	}
	/**
	 * 개인레슨출석부 - 취소
	 * @param requestParams
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/teacher/lesson/cancel", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse lessonCancel(@RequestBody List<HashMap> requestParams) {
		return memberResrvService.cancel(requestParams);
	}
	/**
	 * 개인레슨출석부 - 예약처리
	 * @package 	: m.todays.pilates.controllers
	 * @file 		: ReservationController.java
	 * @method		: addReservation
	 * @comment		: /api/teacher/reservation/add
	 * @auth		: 선생님, 관리자
	 * @param requestParams [
				   {
				        "compCd":
				        "storCd":
				        "memberNo":
				        "lsnCd":
				        "lsnNo":
				        ------------------------ 여기까지가 key
				        "empNo":선생님코드(화면에서 선택된 값)
				        "lsnTm":시간(화면에서 설정한 값 1.0, 1.5 등)
				        "rsvDt":예약일(yyyyMMdd)
				        "rsvTm":예약시간(HHmm)
				    }
				]
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/api/teacher/reservation/add", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse addReservation(@RequestBody List<HashMap> requestParams) {
		return memberResrvService.reservation(requestParams);
	}
}