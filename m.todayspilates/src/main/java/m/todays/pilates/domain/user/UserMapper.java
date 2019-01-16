package m.todays.pilates.domain.user;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
	
	List getUser();
	List loginUser(Map<String, Object> parameter);
	User getUserInfo(Map<String, Object> parameter);
	List existUserInStor(Map<String, Object> parameter);
	void updateUserInfo(Map<String, Object> parameter);
}
