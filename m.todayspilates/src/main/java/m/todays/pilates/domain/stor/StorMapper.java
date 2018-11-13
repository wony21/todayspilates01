package m.todays.pilates.domain.stor;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StorMapper {
	
	List getStor();
}
