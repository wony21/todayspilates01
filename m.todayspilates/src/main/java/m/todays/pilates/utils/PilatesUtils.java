package m.todays.pilates.utils;

import java.util.List;
import java.util.ArrayList;
import java.util.Calendar;

public class PilatesUtils {
	
	public static List getWeekDays(int week, String yyyyMM) {
		List result = new ArrayList();
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
			if ( weekOfDay == week) {
				result.add(date);
			}
		}
		return result;
	}

}
