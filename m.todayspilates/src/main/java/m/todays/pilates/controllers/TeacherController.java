package m.todays.pilates.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import m.todays.pilates.common.BaseController;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.domain.reservation.teacher.TeacherService;

@Controller
public class TeacherController extends BaseController {
	
	@Autowired
	TeacherService teacherService;
	/**
	 * 선생님 정보 가져오기 api
	 * @param storCd 매장코드
	 * @param empNm 선생님이름(like)
	 * @return
	 */
	@RequestMapping(value = "/api/teacher", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getTeacher(@RequestParam String storCd,
							@RequestParam(required = false) String empNm) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return teacherService.getTeacher(compCd, storCd, empNm);
	}
	/**
	 * 선생님 실적조회
	 * @param storCd 매장코드 필수아님 (관리자레벨인 경우 : lv:01, 넘겨주지 않으면 모든 매장 검색됨)
	 * @param schMonth (필수: yyyyMM)
	 * @param empNo 선생님 코드(필수아님)
	 * @return
	 */
	@RequestMapping(value = "/api/teacher/performonce", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getTeacher(@RequestParam(required = false) String storCd,
							@RequestParam String schMonth,
							@RequestParam(required = false) String empNo) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return teacherService.getTeacherPerformance(compCd, storCd, schMonth, empNo);
	}
}
