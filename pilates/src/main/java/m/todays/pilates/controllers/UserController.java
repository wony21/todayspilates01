package m.todays.pilates.controllers;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import m.todays.pilates.common.BaseController;
import m.todays.pilates.domain.user.UserService;

@Controller
public class UserController extends BaseController  {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/api/user", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getUser() {
		return userService.getUser();
	}
	
	@RequestMapping(value = "/api/existUserInStor", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List existUserInStor(
			@RequestParam String storCd,
			@RequestParam String userCd) {
		return userService.exitUserInStor(storCd, userCd);
	}
	
}
