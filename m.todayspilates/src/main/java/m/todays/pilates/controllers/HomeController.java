package m.todays.pilates.controllers;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import m.todays.pilates.common.CommonData;
import m.todays.pilates.common.SessionUtils;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		String userName = SessionUtils.getCurrentUser().getUsername2();
		String userLv = SessionUtils.getCurrentUser().getUserLv();
		String index = "/";
		// 사용자 권한별 접근페이지
		switch (userLv) {
		case CommonData.UserLv.SYSTEM:
			index = "admin/admin";
			break;
		case CommonData.UserLv.MEMBER:
			index = "member/member";
			break;
		case CommonData.UserLv.TEACHER:
			index = "teacher/teacher";
			break;
		default:
			index = "/";
			break;
		}
		model.addAttribute("username", userName);
		return index;
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		return "login";
	}
	
	@RequestMapping(value = "/test", method = RequestMethod.GET)
	public String test(Locale locale, Model model) {
		return "admin/test";
	}

	@RequestMapping(value = "/loginFail", method = RequestMethod.GET)
	public String loginFail(HttpServletRequest request, Locale locale, Model model) {
		String error = (String) request.getAttribute("error");
		model.addAttribute("error", error);
		return "loginFail";
	}
	
//	@RequestMapping(value = "/{path1}/{path2}", method = RequestMethod.GET)
//	public String requestPath(@PathVariable("path1") String path1, 
//							@PathVariable("path2") String path2) {
//		return String.format("%s/%s", path1, path2);
//	}
	
	@RequestMapping(value = "/member", method = RequestMethod.GET)
	public String member(Locale locale, Model model) {
		return "member/member";
	}
	
	@RequestMapping(value = "/teacher", method = RequestMethod.GET)
	public String teacher(Locale locale, Model model) {
		return "teacher/teacher";
	}
	
	@RequestMapping(value = "/admin", method = RequestMethod.GET)
	public String admin(Locale locale, Model model) {
		return "admin/admin";
	}
	
	@RequestMapping(value = "/member/{path}", method = RequestMethod.GET)
	public String memberRoute(@PathVariable("path") String path) {
		return String.format("member/%s", path);
	}
	@RequestMapping(value = "/teacher/{path}", method = RequestMethod.GET)
	public String teacherRoute(@PathVariable("path") String path) {
		return String.format("teacher/%s", path);
	}
	@RequestMapping(value = "/admin/{path}", method = RequestMethod.GET)
	public String adminRoute(@PathVariable("path") String path) {
		return String.format("admin/%s", path);
	}
}
