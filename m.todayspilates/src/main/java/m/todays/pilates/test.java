package m.todays.pilates;

import static org.hamcrest.CoreMatchers.instanceOf;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import m.todays.pilates.domain.reservation.member.MemberResrvService;

public class test {
	
	@Autowired
	private MemberResrvService memberResrvService; 
	
	@Test
	public void main() {
		
		List<HashMap<String, Object>> maps = new ArrayList();
		Random r = new Random();
		String[] name = {"A","B","A","B"};
		for(int i=0; i<5; i++) {
			Integer in = r.nextInt();
			System.out.println("rnd : " + in);
			String n = name[i];
			HashMap<String, Object> item = new HashMap<String, Object>();
			item.put(n, i);
			item.put("rnd", i);
			maps.add(item);
		}
		
		String compCd = "0001";
		String storCd = "001";
		String schMonth = "201807";
		String schWeek = "2";
//		List<Map<String, Object>> result = memberResrvService.getGroupSchedule(compCd, storCd, schMonth, schWeek);
//		for(Map<String, Object> item : result) {
//			for(String key : item.keySet()) {
//				System.out.println("key : " + key + " value : " + item.get(key).toString());
//			}
//		}
		
	
	}

}
