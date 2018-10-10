package m.todays.pilates.controllers;

import java.util.HashMap;
import java.util.List;

import org.apache.log4j.lf5.viewer.categoryexplorer.CategoryExplorerModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import m.todays.pilates.common.BaseController;
import m.todays.pilates.common.CamelCaseMap;
import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.common.api.ApiResponse;
import m.todays.pilates.domain.lesson.LessonService;
import m.todays.pilates.domain.reservation.teacher.TeacherService;

@Controller
public class LessonController extends BaseController {
	
	@Autowired
	LessonService lessonService;
	
	@RequestMapping(value = "/api/lesson", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getLesson(@RequestParam String storCd,
						  @RequestParam String lsnFg) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return lessonService.getLesson(compCd, storCd, lsnFg);
	}
	
	@RequestMapping(value = "/api/lesson/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getRegisterLessons(@RequestParam String storCd,
							@RequestParam(required = false) String memberNm) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return lessonService.getRegisterLessons(compCd, storCd, memberNm);
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/lesson/add", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse addLesson(@RequestBody List<HashMap> requestParams) {
		return lessonService.addMemberLesson(requestParams);
	}
}
