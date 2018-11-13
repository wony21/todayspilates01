package m.todays.pilates.domain.member;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {
	
	List getMember();
	List getMemberList(Map<String, Object> parameter);
	List getExistMember(Map<String, Object> parameter);
	List existMemberName(Map<String, Object> parameter);
	void addMember(Map<String, Object> parameter);
	void updateMember(Map<String, Object> parameter);
	void deleteMember(Map<String, Object> parameter);
	void deleteUser(Map<String, Object> parameter);
}
