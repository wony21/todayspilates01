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
	
	public List getMember(String compCd, String storCd, String memberNm) {
		MemberMapper memberMapper = sqlSession.getMapper(MemberMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.memberNm, memberNm);
		return memberMapper.getMember();
	}
}
