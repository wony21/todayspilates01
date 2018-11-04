package m.todays.pilates.domain.lesson;

import java.util.List;
import java.util.Map;

public interface LessonMapper {
	
	List getLesson(Map<String, Object> parameter);
	List getRegisterLessons(Map<String, Object> parameter);
	void addMemberLesson(Map<String, Object> parameter);
	void updateMemberLesson(Map<String, Object> parameter);
	List checkReLesson(Map<String, Object> parameter);
}
