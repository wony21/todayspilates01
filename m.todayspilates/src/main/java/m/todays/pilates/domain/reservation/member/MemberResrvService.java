package m.todays.pilates.domain.reservation.member;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.CommonData;
import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.common.CommonData.ATTEND;
import m.todays.pilates.common.api.ApiResponse;
import m.todays.pilates.domain.lesson.LessonMapper;

@Service
public class MemberResrvService extends BaseService {

	public List<HashMap<Object, Object>> getMemberReservation(String compCd, String storCd, String memberNo) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		return mapper.getRervation(parameter);
	}

	public List getLessonSummary(String compCd, String storCd, String memberNo) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		LessonMapper lsnMapper = sqlSession.getMapper(LessonMapper.class);
		String dynamicColumns = "";
		List<HashMap> result = lsnMapper.getLesson(parameter);
		for (HashMap map : result) {
			String lsnCd = (String) map.getOrDefault(ParamNames.lsnCd, "");
			String lsnNm = (String) map.getOrDefault(ParamNames.lsnNm, "");
			if (!StringUtils.isEmpty(lsnCd)) {
				dynamicColumns += "ISNULL(MAX(CASE WHEN A.LSN_CD = '" + lsnCd + "' THEN LSN_USE_CNT END), 0) AS LSN_"
						+ lsnCd + "_USE_CNT,";
				dynamicColumns += "'" + lsnNm + "' AS LSN_" + lsnCd + "_NM,";
				dynamicColumns += StringUtils.CR + StringUtils.LF;
			}
		}
		parameter.put(ParamNames.columns, dynamicColumns);
		return mapper.getLessonSummary(parameter);
	}

	public List getDetailUseLesson(String compCd, String storCd, String lsnCd, String memberNo) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.lsnCd, lsnCd);
		parameter.put(ParamNames.memberNo, memberNo);
		return mapper.getDetailUseLesson(parameter);
	}

	public List getWeeklyLesson(String compCd, String storCd, String memberNm, String empNo, String rsvDt, String sttDt,
			String endDt) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		// 처리가 없는 경우 오늘날짜로 서버에서 설정해준다.
//		if ( StringUtils.isEmpty(rsvDt)) {
//			rsvDt = DateFormatUtils.format(new Date(), "yyyyMMdd");
//		}
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		parameter.put(ParamNames.empNo, empNo);
		parameter.put(ParamNames.rsvDt, rsvDt);
		parameter.put(ParamNames.sttDt, sttDt);
		parameter.put(ParamNames.endDt, endDt);
		//return mapper.getWeeklyLesson(parameter);
		return mapper.getRervation(parameter);
	}

	public List getWeeklyDetail(String compCd, String storCd, String memberNm, String empNo, String sttDt,
			String endDt) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		parameter.put(ParamNames.empNo, empNo);
		parameter.put(ParamNames.sttDt, sttDt);
		parameter.put(ParamNames.endDt, endDt);
		return mapper.getWeeklyDetail(parameter);
	}
	
	public List getUserLesson(String compCd, String storCd, String memberNo, String empNo) {
		MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.empNo, empNo);
		return mapper.getUserLession(parameter);
	}

	@Transactional
	private ApiResponse SaveAttend(List<HashMap> requestParams, String atndFg) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd = SessionUtils.getCurrentUser().getUsername();

		for (HashMap map : requestParams) {

			String storCd = (String) map.getOrDefault(ParamNames.storCd, "");
			String memberNo = (String) map.getOrDefault(ParamNames.memberNo, "");
			String lsnCd = (String) map.getOrDefault(ParamNames.lsnCd, "");
			String lsnNo = (String) map.getOrDefault(ParamNames.lsnNo, "");
			String lsnTm = map.getOrDefault(ParamNames.lsnTm, "").toString();
			String rsvDt = (String) map.getOrDefault(ParamNames.rsvDt, "");
			String rsvTm = (String) map.getOrDefault(ParamNames.rsvTm, "");
			String empNo = (String) map.getOrDefault(ParamNames.empNo, "");

			if (StringUtils.isEmpty(storCd)) {
				return ApiResponse.error("KEY : [storCd] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(memberNo)) {
				return ApiResponse.error("KEY : [memberNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnCd)) {
				return ApiResponse.error("KEY : [lsnCd] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnNo)) {
				return ApiResponse.error("KEY : [lsnNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(rsvDt)) {
				return ApiResponse.error("KEY : [rsvDt] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(rsvTm)) {
				return ApiResponse.error("KEY : [rsvTm] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(empNo)) {
				return ApiResponse.error("KEY : [empNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnTm)) {
				return ApiResponse.error("KEY : [lsnTm] 가 존재하지 않습니다.");
			} 

			MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnTm, lsnTm);
			parameter.put(ParamNames.rsvDt, rsvDt);
			parameter.put(ParamNames.rsvTm, rsvTm);
			parameter.put(ParamNames.atndFg, atndFg);
			parameter.put(ParamNames.empNo, empNo);
			mapper.insertAttend(parameter);
			mapper.updateLessonUseCount(parameter);
		}
		return ApiResponse.success("ok");
	}
	
	@Transactional
	private ApiResponse UpdateAttend(List<HashMap> requestParams, String atndFg) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd = SessionUtils.getCurrentUser().getUsername();

		for (HashMap map : requestParams) {

			String storCd = (String) map.getOrDefault(ParamNames.storCd, "");
			String memberNo = (String) map.getOrDefault(ParamNames.memberNo, "");
			String lsnCd = (String) map.getOrDefault(ParamNames.lsnCd, "");
			String lsnNo = (String) map.getOrDefault(ParamNames.lsnNo, "");
			String lsnTm = map.getOrDefault(ParamNames.lsnTm, "").toString();
			String lsnSeq = map.getOrDefault(ParamNames.lsnSeq, "").toString();
			String empNo = (String) map.getOrDefault(ParamNames.empNo, "");

			if (StringUtils.isEmpty(storCd)) {
				return ApiResponse.error("KEY : [storCd] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(memberNo)) {
				return ApiResponse.error("KEY : [memberNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnCd)) {
				return ApiResponse.error("KEY : [lsnCd] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnNo)) {
				return ApiResponse.error("KEY : [lsnNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(empNo)) {
				return ApiResponse.error("KEY : [empNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnTm)) {
				return ApiResponse.error("KEY : [lsnTm] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnSeq)) {
				return ApiResponse.error("KEY : [lsnSeq] 가 존재하지 않습니다.");
			} 

			MemberResrvMapper mapper = sqlSession.getMapper(MemberResrvMapper.class);
			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnTm, lsnTm);
			parameter.put(ParamNames.lsnSeq, lsnSeq);
			parameter.put(ParamNames.atndFg, atndFg);
			parameter.put(ParamNames.empNo, empNo);
			mapper.updateAttend(parameter);
			mapper.updateLessonUseCount(parameter);
		}
		return ApiResponse.success("ok");
	}
	
	@Transactional
	public ApiResponse reservation(List<HashMap> requestParams) {
		return SaveAttend(requestParams, CommonData.ATND_FG.RESERVATION);
	}
	@Transactional
	public ApiResponse attend(List<HashMap> requestParams) {
		return UpdateAttend(requestParams, CommonData.ATND_FG.ATTEND);
	}
	@Transactional
	public ApiResponse absent(List<HashMap> requestParams) {
		return UpdateAttend(requestParams, CommonData.ATND_FG.ABSENT);
	}
	@Transactional
	public ApiResponse cancel(List<HashMap> requestParams) {
		return UpdateAttend(requestParams, CommonData.ATND_FG.CANCEL);
	}

}