package m.todays.pilates.domain.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import m.todays.pilates.common.BaseService;
import m.todays.pilates.common.ParamNames;

@Service
public class CommonService extends BaseService {
	
	public List getCommon(String groupCd) {
		CommonMapper mapper = sqlSession.getMapper(CommonMapper.class);
		Map<String, Object> parameter = new HashMap<String, Object>();
		parameter.put(ParamNames.groupCd, groupCd);
		return mapper.getCommonCode(parameter);
	}

}
