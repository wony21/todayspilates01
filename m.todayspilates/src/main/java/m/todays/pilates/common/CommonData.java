package m.todays.pilates.common;

public class CommonData {
	// 권한 (Todaypilates)
	public class UserLv {
		public final static String SYSTEM = "01";
		public final static String TEACHER = "02";
		public final static String MEMBER = "03";
		
	}
	// 권한 (Security)
	public class ROLE {
		public final static String ADMIN = "ROLE_ADMIN";
		public final static String TEACHER = "ROLE_TEACHER";
		public final static String USER = "ROLE_ADMIN";
	}
	// 출석결석 Flag
	public class ATTEND {
		public final static String ATTENDANCE = "1";
		public final static String ABSENT = "2";
	}
	// 예약, 출석, 결석, 취소, 조정
	public class ATND_FG {
		// 예약 : 0
		public final static String RESERVATION = "0";
		// 출석 : 1
		public final static String ATTEND = "1";
		// 결석 : 2
		public final static String ABSENT = "2";
		// 취소 : 3
		public final static String CANCEL = "3";
		// 조정 : 4
		public final static String MODIFY = "4";
	}
	
	public class CLS_FG {
		public final static String ING = "1";
		public final static String RELEASE = "1";
	}
	
	public class LSN_FG {
		public final static String PRIVATE = "1";
		public final static String GROUP = "2"; 
	}
}
