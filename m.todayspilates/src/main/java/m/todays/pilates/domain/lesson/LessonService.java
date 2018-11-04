package m.todays.pilates.domain.lesson;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.CamelCaseMap;
import m.todays.pilates.common.CommonData;
import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.api.ApiResponse;

@Service
public class LessonService extends BaseService {

	public List getLesson(String compCd, String storCd, String lsnFg) {
		LessonMapper mapper = sqlSession.getMapper(LessonMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.lsnFg, lsnFg);
		return mapper.getLesson(parameter);
	}

	public List getRegisterLessons(String compCd, String storCd, String memberNm, String memberNo) {
		LessonMapper mapper = sqlSession.getMapper(LessonMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.memberNm, memberNm);
		return mapper.getRegisterLessons(parameter);
	}
	
	public Integer parseInteger(Object item) {
		Integer returnValue;
		if ( item == null ) {
			return 0;
		}
		String strValue = item.toString();
		if ( StringUtils.isEmpty(strValue) ) {
			return 0;
		}
		returnValue = Integer.valueOf(strValue);
		return returnValue;
	}

	public ApiResponse addMemberLesson(List<HashMap> requestParams) {
		LessonMapper mapper = sqlSession.getMapper(LessonMapper.class);
		for (HashMap map : requestParams) {
			String compCd = (String) map.get(ParamNames.compCd);
			String storCd = (String) map.get(ParamNames.storCd);
			String memberNo = (String) map.get(ParamNames.memberNo);
			String lsnNo = (String) map.get(ParamNames.lsnNo);
			String lsnCd = (String) map.get(ParamNames.lsnCd);
			String lsnTy = (String) map.get(ParamNames.lsnTy);
			String lsnFg = (String) map.get(ParamNames.lsnFg);
			Integer lsnAmt = parseInteger(map.get(ParamNames.lsnAmt));
			String payTp = (String) map.get(ParamNames.payTp);
			Integer lsnCnt = parseInteger(map.get(ParamNames.lsnCnt));
			Integer lsnExpWk = parseInteger(map.get(ParamNames.lsnExpWk));
			String empNo = (String) map.get(ParamNames.empNo);
			String remark = (String) map.get(ParamNames.remark);
			String entDt = (String) map.get(ParamNames.entDt);
			//String clsFg = CommonData.CLS_FG.ING;
			String clsFg = (String) map.get(ParamNames.clsFg);
			Map<String, Object> parameter = new HashMap<String, Object>();
			System.out.println(parameter.toString());
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnTy, lsnTy);
			parameter.put(ParamNames.lsnFg, lsnFg);
			parameter.put(ParamNames.lsnAmt, lsnAmt);
			parameter.put(ParamNames.payTp, payTp);
			parameter.put(ParamNames.lsnCnt, lsnCnt);
			parameter.put(ParamNames.lsnExpWk, lsnExpWk);
			parameter.put(ParamNames.empNo, empNo);
			parameter.put(ParamNames.remark, remark);
			parameter.put(ParamNames.entDt, entDt);
			parameter.put(ParamNames.clsFg, clsFg);
			mapper.addMemberLesson(parameter);
		}
		return ApiResponse.success("ok");
	}
	
	public ApiResponse modifyMemberLesson(List<HashMap> requestParams) {
		LessonMapper mapper = sqlSession.getMapper(LessonMapper.class);
		for (HashMap map : requestParams) {
			String compCd = (String) map.get(ParamNames.compCd);
			String storCd = (String) map.get(ParamNames.storCd);
			String memberNo = (String) map.get(ParamNames.memberNo);
			String lsnNo = (String) map.get(ParamNames.lsnNo);
			String lsnCd = (String) map.get(ParamNames.lsnCd);
			String lsnTy = (String) map.get(ParamNames.lsnTy);
			String lsnFg = (String) map.get(ParamNames.lsnFg);
			Integer lsnAmt = parseInteger(map.get(ParamNames.lsnAmt));
			String payTp = (String) map.get(ParamNames.payTp);
			Integer lsnCnt = parseInteger(map.get(ParamNames.lsnCnt));
			Integer lsnExpWk = parseInteger(map.get(ParamNames.lsnExpWk));
			String empNo = (String) map.get(ParamNames.empNo);
			String remark = (String) map.get(ParamNames.remark);
			String entDt = (String) map.get(ParamNames.entDt);
			//String clsFg = CommonData.CLS_FG.ING;
			String clsFg = (String) map.get(ParamNames.clsFg);
			Map<String, Object> parameter = new HashMap<String, Object>();
			System.out.println(parameter.toString());
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnTy, lsnTy);
			parameter.put(ParamNames.lsnFg, lsnFg);
			parameter.put(ParamNames.lsnAmt, lsnAmt);
			parameter.put(ParamNames.payTp, payTp);
			parameter.put(ParamNames.lsnCnt, lsnCnt);
			parameter.put(ParamNames.lsnExpWk, lsnExpWk);
			parameter.put(ParamNames.empNo, empNo);
			parameter.put(ParamNames.remark, remark);
			parameter.put(ParamNames.entDt, entDt);
			parameter.put(ParamNames.clsFg, clsFg);
			mapper.updateMemberLesson(parameter);
		}
		return ApiResponse.success("ok");
	}
	
	public List relesson(String compCd, String storCd, String memberNo, String lsnCd) {
		LessonMapper mapper = sqlSession.getMapper(LessonMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.lsnCd, lsnCd);
		return mapper.checkReLesson(parameter);
	}

}
