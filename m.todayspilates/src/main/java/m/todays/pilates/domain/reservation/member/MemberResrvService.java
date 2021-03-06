package m.todays.pilates.domain.reservation.member;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.extern.slf4j.Slf4j;
import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.CamelCaseMap;
import m.todays.pilates.common.CommonData;
import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.SessionUtils;
import m.todays.pilates.common.CommonData.ATTEND;
import m.todays.pilates.common.api.ApiResponse;
import m.todays.pilates.domain.lesson.LessonMapper;
import m.todays.pilates.utils.PilatesUtils;

@Service
public class MemberResrvService extends BaseService {

	@Autowired
	private MemberResrvMapper memberResrvMapper;

	@Autowired
	private LessonMapper lessonMapper;

	public List<HashMap<Object, Object>> getMemberReservation(String compCd, String storCd, String memberNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		List<String> atndFgs = new ArrayList();
		atndFgs.add(CommonData.ATND_FG.RESERVATION);
		String[] atndFg = atndFgs.parallelStream().toArray(String[]::new);
		parameter.put(ParamNames.atndFg, atndFg);
		return memberResrvMapper.getRervation(parameter);
	}

	public List<HashMap<Object, Object>> getMemberReservation(String compCd, String storCd, String memberNo,
			String pravt) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		List<String> atndFgs = new ArrayList();
		atndFgs.add(CommonData.ATND_FG.RESERVATION);
		String[] atndFg = atndFgs.parallelStream().toArray(String[]::new);
		parameter.put(ParamNames.atndFg, atndFg);
		parameter.put(ParamNames.privt, pravt);
		return memberResrvMapper.getRervation(parameter);
	}

	public List getLessonSummary(String compCd, String storCd, String memberNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		String dynamicColumns = "";
		List<HashMap> result = lessonMapper.getLesson(parameter);
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
		return memberResrvMapper.getLessonSummary(parameter);
	}

	public List getDetailUseLesson(String compCd, String storCd, String lsnCd, String memberNo, String lsnNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.lsnCd, lsnCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.lsnNo, lsnNo);
		return memberResrvMapper.getDetailUseLesson(parameter);
	}

	public List getWeeklyLesson(String compCd, String storCd, String memberNm, String empNo, String rsvDt, String sttDt,
			String endDt) {
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
		parameter.put(ParamNames.opt1, "1");// 예약일이 없는 것은 보이지 않게 처리(선생님인 경우)
		parameter.put(ParamNames.lsnFg, CommonData.LSN_FG.PRIVATE); // 개인레슨만 본다.
		// return memberResrvMapper.getWeeklyLesson(parameter);
		List<String> atndFgs = new ArrayList();
		atndFgs.add(CommonData.ATND_FG.RESERVATION);
		atndFgs.add(CommonData.ATND_FG.ATTEND);
		atndFgs.add(CommonData.ATND_FG.ABSENT);
		String[] atndFg = atndFgs.parallelStream().toArray(String[]::new);
		parameter.put(ParamNames.atndFg, atndFg);
		return memberResrvMapper.getRervation(parameter);
	}

	public List getWeeklyDetail(String compCd, String storCd, String memberNm, String empNo, String sttDt, String endDt,
			String opt1) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		parameter.put(ParamNames.empNo, empNo);
		parameter.put(ParamNames.sttDt, sttDt);
		parameter.put(ParamNames.endDt, endDt);
		parameter.put(ParamNames.lsnFg, CommonData.LSN_FG.PRIVATE);
		List<String> atndFgs = new ArrayList();
		atndFgs.add(CommonData.ATND_FG.RESERVATION);
		String[] atndFg = atndFgs.parallelStream().toArray(String[]::new);
		parameter.put(ParamNames.atndFg, atndFg);
		parameter.put(ParamNames.opt1, opt1);
		return memberResrvMapper.getRervation(parameter);
	}

	public List getUserLesson(String compCd, String storCd, String memberNo, String empNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.empNo, empNo);
		return memberResrvMapper.getUserLession(parameter);
	}

	public List getMemberLesson(String compCd, String storCd, String memberNo, String lsnNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.lsnNo, lsnNo);
		parameter.put(ParamNames.lsnFg, CommonData.LSN_FG.PRIVATE);
		return memberResrvMapper.getMemberLesson(parameter);
	}

	public List getMemberGroupLesson(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		parameter.put(ParamNames.lsnFg, CommonData.LSN_FG.GROUP);
		return memberResrvMapper.getMemberGroupLesson(parameter);
	}

	public List getGroupLesson(String compCd, String storCd, String schDate) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.schDt, schDate);
		List<CamelCaseMap> lesson = memberResrvMapper.getGroupLesson(parameter);
		for (CamelCaseMap item : lesson) {
			String rsvDt = item.getString(ParamNames.schDt);
			String rsvTm = item.getString(ParamNames.stTm);
			parameter.put(ParamNames.rsvDt, rsvDt);
			parameter.put(ParamNames.rsvTm, rsvTm);
			List<CamelCaseMap> listDetail = memberResrvMapper.getGroupLessonDetail(parameter);
			item.put(ParamNames.schedule, listDetail);
		}
		return lesson;
	}

	public List getGroupMembers(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberResrvMapper.getGroupMembers(parameter);
	}

	public List getGroupLessonView(String compCd, String storCd, String schDate) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.schDt, schDate);
		return memberResrvMapper.getGroupLessonView(parameter);
	}

	public List getPersonalLesson(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberResrvMapper.getPersonalLesson(parameter);
	}

	public List getGroupSchedule(String compCd, String storCd, String schMonth, String schWeek) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.schMonth, schMonth);
		parameter.put(ParamNames.schWeek, schWeek);
		return memberResrvMapper.getGroupSchedule(parameter);
	}

	@Transactional
	public ApiResponse saveGroupSchedule(List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd = SessionUtils.getCurrentUser().getUsername();
		for (HashMap map : requestParams) {

			String storCd = (String) map.getOrDefault(ParamNames.storCd, "");
			String memberNo = (String) map.getOrDefault(ParamNames.memberNo, "");
			String empNo = (String) map.getOrDefault(ParamNames.empNo, "");
			String lsnTm = map.getOrDefault(ParamNames.lsnTm, "").toString();
			String lsnLv = (String) map.getOrDefault(ParamNames.lsnLv, "");
			String schWeek = map.getOrDefault(ParamNames.schWeek, "").toString();
			String stTm = (String) map.getOrDefault(ParamNames.stTm, "");
			String lsnMonth = (String) map.getOrDefault(ParamNames.lsnMonth, "");
			String schNo = map.getOrDefault(ParamNames.schNo, "").toString();
			String seq = map.getOrDefault(ParamNames.seq, "").toString();

			// int schWeekNum = Integer.parseInt(schWeek);
			// List weekOfDays = PilatesUtils.getWeekDays(schWeekNum, lsnMonth);
			Map<String, Object> parameter = new HashMap<String, Object>();
			// for(Object day : weekOfDays) {

			// String lsnDt = (String) day;
			if (StringUtils.isEmpty(storCd)) {
				return ApiResponse.error("KEY : [storCd] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(memberNo)) {
				return ApiResponse.error("KEY : [memberNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(stTm)) {
				return ApiResponse.error("KEY : [stTm] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(schWeek)) {
				return ApiResponse.error("KEY : [schWeek] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnMonth)) {
				return ApiResponse.error("KEY : [lsnMonth] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(memberNo)) {
				return ApiResponse.error("KEY : [memberNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(empNo)) {
				return ApiResponse.error("KEY : [empNo] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnTm)) {
				return ApiResponse.error("KEY : [lsnTm] 가 존재하지 않습니다.");
			} else if (StringUtils.isEmpty(lsnLv)) {
				return ApiResponse.error("KEY : [lsnLv] 가 존재하지 않습니다.");
			}

			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnMonth, lsnMonth);
			parameter.put(ParamNames.schWeek, schWeek);
			// parameter.put(ParamNames.lsnDt, lsnDt);
			parameter.put(ParamNames.stTm, stTm);
			parameter.put(ParamNames.seq, seq);
			parameter.put(ParamNames.empNo, empNo);
			parameter.put(ParamNames.lsnTm, lsnTm);
			parameter.put(ParamNames.lsnLv, lsnLv);
			parameter.put(ParamNames.schNo, schNo);

			// memberResrvMapper.insertGroupSchedule(parameter);
			// }
			memberResrvMapper.insertScheduleBoard(parameter);
		}
		return ApiResponse.success("ok");
	}

	@Transactional
	public ApiResponse deleteGroupSchedule(List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd = SessionUtils.getCurrentUser().getUsername();
		for (HashMap map : requestParams) {
			String storCd = (String) map.getOrDefault(ParamNames.storCd, "");
			String memberNo = (String) map.getOrDefault(ParamNames.memberNo, "");
			String empNo = (String) map.getOrDefault(ParamNames.empNo, "");
			String lsnTm = map.getOrDefault(ParamNames.lsnTm, "").toString();
			String lsnLv = (String) map.getOrDefault(ParamNames.lsnLv, "");
			String schWeek = map.getOrDefault(ParamNames.schWeek, "").toString();
			String stTm = (String) map.getOrDefault(ParamNames.stTm, "");
			String lsnMonth = (String) map.getOrDefault(ParamNames.lsnMonth, "");
			String schNo = map.getOrDefault(ParamNames.schNo, "").toString();
			String seq = map.getOrDefault(ParamNames.seq, "").toString();

			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.schMonth, lsnMonth);
			parameter.put(ParamNames.schWeek, schWeek);
			parameter.put(ParamNames.stTm, stTm);
			parameter.put(ParamNames.seq, seq);
			// parameter.put(ParamNames.schNo, schNo);
			parameter.put(ParamNames.memberNo, memberNo);

			memberResrvMapper.deleteScheduleBoard(parameter);
		}
		return ApiResponse.success("ok");
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
			String seq = "0";
			if (map.get(ParamNames.seq) != null) {
				seq = map.get(ParamNames.seq).toString();
			}
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

			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnTm, lsnTm);
			parameter.put(ParamNames.seq, seq);
			parameter.put(ParamNames.rsvDt, rsvDt);
			parameter.put(ParamNames.rsvTm, rsvTm);
			parameter.put(ParamNames.atndFg, atndFg);
			parameter.put(ParamNames.empNo, empNo);

			// 종료일자가 지난 레슨 확인
//			String tf = memberResrvMapper.isEndLesson(parameter);
//			if ( !tf.equals("T")) {
//				return ApiResponse.error("종료일자가 지난 등록정보입니다. 예약이 불가합니다");
//			}
			// 잔여횟수 비교
			if(!lessonAvailableCount(parameter)) {
				return ApiResponse.error("예약 횟수를 초과합니다.");
			}
			// 종료일 비교 
			try {
				if(!lessonExpireDate(parameter)) {
					return ApiResponse.error("종료일을 초과합니다.");
				}
			} catch (ParseException e) {
				e.printStackTrace();
			}

			memberResrvMapper.insertAttend(parameter);
			memberResrvMapper.recalculatorLessonNum(parameter);
			memberResrvMapper.updateLessonUseCount(parameter);
		}
		return ApiResponse.success("ok");
	}
	
	public boolean lessonAvailableCount(Map<String, Object> parameter) {
		List<CamelCaseMap> results = memberResrvMapper.getLessonAvailableCount(parameter);
		for(CamelCaseMap item : results) {
			BigDecimal lsnCnt = item.getDecimal(ParamNames.lsnCnt);
			BigDecimal lsnTm = item.getDecimal(ParamNames.lsnTm);
			double lsnAvailableCount = lsnCnt.doubleValue() - lsnTm.doubleValue();
			if ( lsnAvailableCount <= 0) {
				return false;
			}
		}
		return true;
	}
	
	public boolean lessonExpireDate(Map<String, Object> parameter) throws ParseException {
		List<CamelCaseMap> lessons = memberResrvMapper.getMemberlsnMaster(parameter);
		for(CamelCaseMap lesson : lessons) {
			String endDt = lesson.getString("lsnEdDt");
			if (StringUtils.isEmpty(endDt)) {
				endDt = "99991231";
			}
			String rsvDt = (String)parameter.get(ParamNames.rsvDt);
			Date endDate = DateUtils.parseDate(endDt, "yyyyMMdd");
			Date rsvDate = DateUtils.parseDate(rsvDt, "yyyyMMdd");
			int diffDate = endDate.compareTo(rsvDate);
			if(diffDate < 0) {
				return false;
			}
		}
		return true;
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
			memberResrvMapper.updateAttend(parameter);
			memberResrvMapper.recalculatorLessonNum(parameter);
			memberResrvMapper.updateLessonUseCount(parameter);
		}
		return ApiResponse.success("ok");
	}

	@Transactional
	private ApiResponse updateReservation(List<HashMap> requestParams) {
		String compCd = SessionUtils.getCurrentUser().getCompCd();
		String userCd = SessionUtils.getCurrentUser().getUsername();

		for (HashMap map : requestParams) {

			String storCd = (String) map.getOrDefault(ParamNames.storCd, "");
			String memberNo = (String) map.getOrDefault(ParamNames.memberNo, "");
			String lsnCd = (String) map.getOrDefault(ParamNames.lsnCd, "");
			String lsnNo = (String) map.getOrDefault(ParamNames.lsnNo, "");
			String lsnTm = map.getOrDefault(ParamNames.lsnTm, "").toString();
			String lsnSeq = map.getOrDefault(ParamNames.lsnSeq, "").toString();
			String rsvDt = (String) map.getOrDefault(ParamNames.rsvDt, "");
			;
			String rsvTm = (String) map.getOrDefault(ParamNames.rsvTm, "");
			;
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

			// 수정시 수업종료, 횟차초과 체크
			try {
				List<CamelCaseMap> lessons = memberResrvMapper.getMemberlsnMaster(map);
				if (lessons.size() == 0) {
					return ApiResponse.error("존재하지 않거나 사용하지 않는 레슨입니다.");
				}
				List<CamelCaseMap> attends = memberResrvMapper.getAttendMaster(map);
				if (attends.size() == 0) {
					return ApiResponse.error("존재하지 않거나 사용하지 않는 예약입니다.");
				}
				CamelCaseMap lesson = lessons.get(0);
				CamelCaseMap attend = attends.get(0);
				// 이미 종료된 레슨인 경우에는 수정 불가
				String clsFg = lesson.getString("clsFg");
				if (clsFg.equals("2")) {
					return ApiResponse.error("이미 종료된 레슨입니다.");
				}
				// 회차정보 넘어설 경우 수정 불가
				BigDecimal lsnCnt = lesson.getDecimal("lsnCnt");
				BigDecimal lsnUseCnt = lesson.getDecimal("lsnUseCnt");
				BigDecimal lsnModCnt = lesson.getDecimal("lsnModCnt");
				BigDecimal lsnAttendTm = attend.getDecimal("lsnTm");
				Double lsnTmDbl = Double.parseDouble(lsnTm);
				Double totLsnCnt = (lsnUseCnt.doubleValue() + lsnModCnt.doubleValue() + lsnTmDbl) - lsnAttendTm.doubleValue();
				if (totLsnCnt > lsnCnt.doubleValue()) {
					return ApiResponse.error("횟차를 초과합니다.");
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}

			Map<String, Object> parameter = new HashMap<String, Object>();
			parameter.put(ParamNames.compCd, compCd);
			parameter.put(ParamNames.storCd, storCd);
			parameter.put(ParamNames.userCd, userCd);
			parameter.put(ParamNames.memberNo, memberNo);
			parameter.put(ParamNames.lsnCd, lsnCd);
			parameter.put(ParamNames.lsnNo, lsnNo);
			parameter.put(ParamNames.lsnTm, lsnTm);
			parameter.put(ParamNames.lsnSeq, lsnSeq);
			parameter.put(ParamNames.empNo, empNo);
			parameter.put(ParamNames.rsvDt, rsvDt);
			parameter.put(ParamNames.rsvTm, rsvTm);

			// System.out.println("updateAttend mybatis called!");
			memberResrvMapper.updateReservation(parameter);
			memberResrvMapper.recalculatorLessonNum(parameter);
		}
		return ApiResponse.success("ok");
	}

	@Transactional
	public ApiResponse updateRservation(List<HashMap> requestParams) {
		return updateReservation(requestParams);
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

	@Transactional
	public void updateEndLesson() {
		Map<String, Object> parameter = new HashMap<String, Object>();
		memberResrvMapper.updateEndDate(parameter);
	}
	
	 

}