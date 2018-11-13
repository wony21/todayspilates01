package m.todays.pilates.domain.common;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CommonMapper {
	
	List getCommonCode(Map<String, Object> parameter);

}
