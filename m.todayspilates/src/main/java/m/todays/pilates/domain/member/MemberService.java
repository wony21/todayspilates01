package m.todays.pilates.domain.member;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import m.todays.pilates.common.ParamNames;

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
	/**
	public void addMember(String compCd, String storCd, String mobile, String memberNm, String sex, String entDt, String remark, String userCd) {
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
		parameter.put(ParamNames.sex, sexCode);
		parameter.put(ParamNames.remark, remark);
		parameter.put(ParamNames.userCd, userCd);
		memberMapper.addMemberM(parameter);
		
	}
	**/
}
