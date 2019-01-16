package m.todays.pilates.domain.reservation.teacher;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.ParamNames;

@Service
public class TeacherService extends BaseService {
	
	@Autowired
	private TeacherMapper teacherMapper;
	
	public List getTeacher(String compCd, String storCd, String empNm, String useYn) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.empNm, empNm);
		parameter.put(ParamNames.useYn, useYn);
		return teacherMapper.getTeacher(parameter);
	}
	
	public List getTeacherPerformance(String compCd, String storCd, String schMonth, String empNo) {
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.compCd, compCd);
		parameter.put(ParamNames.storCd, storCd);
		parameter.put(ParamNames.schMonth, schMonth);
		parameter.put(ParamNames.empNo, empNo);
		return teacherMapper.getTeacherPerformance(parameter);
	}

}
