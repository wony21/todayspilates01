package m.todays.pilates.domain.lesson;

import java.util.List;
import java.util.Map;

public interface LessonMapper {
	
	List getLesson(Map<String, Object> parameter);

}
