package m.todays.pilates.domain.reservation.member;

import java.util.List;
import java.util.Map;

public interface MemberResrvMapper {
	
	List getRervation(Map<String, Object> parameter);
	List getLessonSummary(Map<String, Object> parameter);
	List getDetailUseLesson(Map<String, Object> parameter);
	List getUserLession(Map<String, Object> parameter);
	List getWeeklyLesson(Map<String, Object> parameter);
	List getWeeklyDetail(Map<String, Object> parameter);
	void insertAttend(Map<String, Object> parameter);
	void updateAttend(Map<String, Object> parameter);
	void updateLessonUseCount(Map<String, Object> parameter);
	void deleteAttend(Map<String, Object> parameter);
	
}
