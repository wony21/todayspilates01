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
import m.todays.pilates.domain.user.UserMapper;

@Service
public class MemberService {
	
	@Autowired
	private SqlSession sqlSession;
	
	@Autowired 
	private MemberMapper memberMapper;
	
	@Autowired
	private UserMapper userMapper;
	
	public List getMember(String compCd, String storCd, String memberNo, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNo, memberNo);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMember();
	}
	
	public List getMemberList(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMemberList(parameter);
	}
	
	public List getMemberFromName(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd,  storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMemberFromName(parameter);
	}
	
	public List getExistMember(String compCd, String storCd, String mobile) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd,  storCd);
		parameter.put(ParamNames.mobile, mobile);
		return memberMapper.getExistMember(parameter);
	}
	
	@Transactional
	public ApiResponse addMember(String compCd, String storCd, String mobile, String memberNm, String sex, String entFg, String entDt, String remark, String userCd) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.mobile, mobile);
		parameter.put(ParamNames.memberNm, memberNm);
		
		// 기존에 존재하는 휴대폰 번호는 등록하면 안된다.
		List existMobileList = memberMapper.getExistMember(parameter);
		if ( existMobileList.size() > 0 ) {
			return ApiResponse.error("이미 존재하는 휴대폰번호[" + mobile + "] 입니다.");
		}
		
		// 기존 존재하는 회원명인지 확인.
		List existList = memberMapper.existMemberName(parameter);
		if ( existList.size() > 0) {
			return ApiResponse.error("이미 존재하는 회원명[" + memberNm + "] 입니다.");
		}
		
		String sexCode = "F";
		if ( sex.equals("남")) {
			sexCode = "M";
		}
		Date today = new Date();
		String entDt2 = DateFormatUtils.format(today, "yyyyMMdd");
		parameter.put(ParamNames.entDt, entDt);
		if (StringUtils.isEmpty(entFg)) {
			entFg = "1"; //등록경로.
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
	public ApiResponse updateMember(String compCd, String storCd, String memberNo, String useYn, String hp,
									String sex, String entFg, String entDt, String remark) {
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
		parameter.put(ParamNames.hp, hp);
		parameter.put(ParamNames.useYn, useYn);
		parameter.put(ParamNames.remark, remark);
		try {
			memberMapper.updateMember(parameter);
			userMapper.updateUserInfo(parameter);
			return ApiResponse.success("ok");
		} catch (Exception e) {
			return ApiResponse.error("exist user");
		}
	}
	
	@Transactional
	public ApiResponse deleteMember(String compCd, String storCd, String mobile, String memberNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.mobile, mobile);
		parameter.put(ParamNames.memberNo, memberNo);
		try {
			memberMapper.deleteMember(parameter);
			memberMapper.deleteUser(parameter);
			return ApiResponse.success("ok");
		} catch (Exception e) {
			return ApiResponse.error("exist user");
		}
	}
	
	public List createMemberName(String compCd, String storCd, String memberNm) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.createMemberNm(parameter);
	}
	
}
