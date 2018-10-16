package m.todays.pilates.domain.reservation.teacher;

import java.util.List;
import java.util.Map;

public interface TeacherMapper {

	List getTeacher(Map<String, Object> parameter);
	List getTeacherPerformance(Map<String, Object> parameter);
	
}
