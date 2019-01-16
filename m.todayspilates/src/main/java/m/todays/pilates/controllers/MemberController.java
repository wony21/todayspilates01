package m.todays.pilates.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import m.todays.pilates.common.BaseController;
import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.common.api.ApiResponse;
import m.todays.pilates.domain.member.MemberService;

@Controller
public class MemberController extends BaseController {
	
	@Autowired
	MemberService memberService;
	
	@RequestMapping(value = "/api/member", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getMember(@RequestParam String storCd, 
						  @RequestParam(required = false) String memberNo,
						  @RequestParam(required = false) String memberNm) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberService.getMember(compCd, storCd, memberNo, memberNm);
	}
	
	@RequestMapping(value = "/api/member/list", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List getMember(@RequestParam(required = false) String storCd, 
						  @RequestParam(required = false) String memberNm) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberService.getMemberList(compCd, storCd, memberNm);
	}
	
	@RequestMapping(value = "/api/member/check", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List existMember(@RequestParam String storCd, @RequestParam String mobile) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		List memberList = memberService.getExistMember(compCd, storCd, mobile);
		boolean bExist = !memberList.isEmpty();
		HashMap<String, Object> result = new HashMap();
		result.put(ParamNames.existMember, bExist);
		List array = new ArrayList();
		array.add(result);
		return array;
	}
	
	@RequestMapping(value = "/api/member/createMemberName", method = RequestMethod.GET, produces = APPLICATION_JSON)
	@ResponseBody
	public List createMemberName(@RequestParam String storCd, @RequestParam String memberNm) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		return memberService.createMemberName(compCd, storCd, memberNm);
	}
	
	public boolean FNexistMember(@RequestParam String storCd, @RequestParam String mobile) {
		
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		List memberList = memberService.getExistMember(compCd, storCd, mobile);
		return !memberList.isEmpty();
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/member/add", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse addMember(@RequestBody List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd =  SessionUtils.getCurrentUser().getUserCd();
		for(HashMap<String, Object> item : requestParams) {
			String storCd = (String)item.get(ParamNames.storCd);
			String mobile = (String)item.get(ParamNames.hp);
			String memberNm = (String)item.get(ParamNames.memberNm);
			String sex = (String)item.get(ParamNames.sex);
			String entFg = (String) item.get(ParamNames.entFg);
			String entDt = (String)item.get(ParamNames.entDt);
			String useYn = (String)item.get(ParamNames.useYn);
			String remark = (String)item.get(ParamNames.remark);
//			if ( FNexistMember(storCd, mobile) ) {
//				return ApiResponse.error("exist user");		
//			}
			return memberService.addMember(compCd, storCd, mobile, memberNm, sex, entFg, entDt, remark, userCd);
		}
		return ApiResponse.error("");
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/member/modify", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse updateMember(@RequestBody List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd =  SessionUtils.getCurrentUser().getMemberNo();
		for(HashMap<String, Object> item : requestParams) {
			String storCd = (String)item.get(ParamNames.storCd);
			String memberNo = (String)item.get(ParamNames.memberNo);
			String sex = (String)item.get(ParamNames.sex);
			String hp = (String)item.get(ParamNames.hp);
			String entFg = (String) item.get(ParamNames.entFg);
			String entDt = (String)item.get(ParamNames.entDt);
			String remark = (String)item.get(ParamNames.remark);
			String useYn = (String)item.get(ParamNames.useYn);
			memberService.updateMember(compCd, storCd, memberNo, useYn, hp, sex, entFg, entDt, remark);
		}
		return ApiResponse.success("ok");
	}
	
	@ResponseBody
	@RequestMapping(value = "/api/member/delete", method = RequestMethod.PUT, produces = APPLICATION_JSON)
	public ApiResponse deleteMember(@RequestBody List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd =  SessionUtils.getCurrentUser().getMemberNo();
		for(HashMap<String, Object> item : requestParams) {
			String storCd = (String)item.get(ParamNames.storCd);
			String mobile = (String)item.get(ParamNames.hp);
			String memberNo = (String)item.get(ParamNames.memberNo);
			memberService.deleteMember(compCd, storCd, mobile, memberNo);
		}
		return ApiResponse.success("ok");
	}
}

