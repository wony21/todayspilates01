package m.todays.pilates;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
		
//		List<HashMap<String, Object>> maps = new ArrayList();
//		Random r = new Random();
//		String[] name = {"A","B","A","B"};
//		for(int i=0; i<5; i++) {
//			Integer in = r.nextInt();
//			System.out.println("rnd : " + in);
//			String n = name[i];
//			HashMap<String, Object> item = new HashMap<String, Object>();
//			item.put(n, i);
//			item.put("rnd", i);
//			maps.add(item);
//		}
//		
//		String compCd = "0001";
//		String storCd = "001";
//		String schMonth = "201807";
//		String schWeek = "2";
//		List<Map<String, Object>> result = memberResrvService.getGroupSchedule(compCd, storCd, schMonth, schWeek);
//		for(Map<String, Object> item : result) {
//			for(String key : item.keySet()) {
//				System.out.println("key : " + key + " value : " + item.get(key).toString());
//			}
//		}
		
		Calendar cal = Calendar.getInstance();
		Calendar dayCal = Calendar.getInstance();
		int endDay = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
		for(int day=1; day<=endDay; day++) {
			int year = cal.get(Calendar.YEAR);
			int month = cal.get(Calendar.MONTH);
			dayCal.clear();
			dayCal.set(year, month, day);
			int weekOfDay = dayCal.get(dayCal.DAY_OF_WEEK);
			String date = String.format("%d%02d%02d", year, month, day);
			if ( weekOfDay == Calendar.SUNDAY) {
				System.out.println(date);
			}
		}
	}
	
	
	

}
