package m.todays.pilates.domain.member;

import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microsoft.sqlserver.jdbc.StringUtils;

import m.todays.pilates.common.ParamNames;
import m.todays.pilates.common.api.ApiResponse;

@Service
public class MemberService {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List getMember(String compCd, String storCd, String memberNo, String memberNm) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMember();
	}
	
	public List getMemberList(String compCd, String storCd, String memberNm) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMemberList(parameter);
	}
	
	public List getExistMember(String compCd, String storCd, String mobile) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd,  storCd);
		parameter.put(ParamNames.mobile, mobile);
		return memberMapper.getExistMember(parameter);
	}
	
	@Transactional
	public ApiResponse addMember(String compCd, String storCd, String mobile, String memberNm, String sex, String entFg, String entDt, String remark, String userCd) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.mobile, mobile);
		parameter.put(ParamNames.memberNm, memberNm);
		String sexCode = "F";
		if ( sex.equals("남")) {
			sexCode = "M";
		}
		Date today = new Date();
		String entDt2 = DateFormatUtils.format(today, "yyyyMMdd");
		parameter.put(ParamNames.entDt, entDt);
		if (StringUtils.isEmpty(entFg)) {
			entFg = "1"; // 활동.
		}
		parameter.put(ParamNames.entFg, entFg);
		parameter.put(ParamNames.sex, sexCode);
		parameter.put(ParamNames.remark, remark);
		parameter.put(ParamNames.userCd, userCd);
		try {
			memberMapper.addMember(parameter);
			return ApiResponse.success("ok");
		} catch (Exception e) {
			return ApiResponse.error("exist user");
		}
	}
	
	@Transactional
	public ApiResponse updateMember(String compCd, String storCd, String memberNo, 
									String sex, String entFg, String entDt, String remark) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		String sexCode = "F";
		if ( sex.equals("남")) {
			sexCode = "M";
		}
		Date today = new Date();
		String entDt2 = DateFormatUtils.format(today, "yyyyMMdd");
		/* 수정항목대상 */
		parameter.put(ParamNames.entDt, entDt);
		parameter.put(ParamNames.entFg, entFg);
		parameter.put(ParamNames.sex, sexCode);
		parameter.put(ParamNames.remark, remark);
		try {
			memberMapper.updateMember(parameter);
			return ApiResponse.success("ok");
		} catch (Exception e) {
			return ApiResponse.error("exist user");
		}
	}
	
	@Transactional
	public ApiResponse deleteMember(String compCd, String storCd, String mobile, String memberNo) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.mobile, mobile);
		parameter.put(ParamNames.memberNo, memberNo);
		try {
			memberMapper.deleteMember(parameter);
			return ApiResponse.success("ok");
		} catch (Exception e) {
			return ApiResponse.error("exist user");
		}
	}
}
