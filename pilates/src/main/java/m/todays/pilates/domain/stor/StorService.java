package m.todays.pilates.domain.stor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StorService {
	
	@Autowired
	private SqlSession sqlSession;
	
	public List getStor() {
		StorMapper storMapper = sqlSession.getMapper(StorMapper.class);
		return storMapper.getStor();
	}
	
}
