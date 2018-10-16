package m.todays.pilates.domain.reservation.teacher;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.ParamNames;

@Service
public class TeacherService extends BaseService {
	
	public List getTeacher(String compCd, String storCd, String empNm) {
		TeacherMapper mapper = sqlSession.getMapper(TeacherMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.empNm, empNm);
		return mapper.getTeacher(parameter);
	}
	
	public List getTeacherPerformance(String compCd, String storCd, String schMonth, String empNo) {
		TeacherMapper mapper = sqlSession.getMapper(TeacherMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.schMonth, schMonth);
		parameter.put(ParamNames.empNo, empNo);
		return mapper.getTeacherPerformance(parameter);
	}

}
