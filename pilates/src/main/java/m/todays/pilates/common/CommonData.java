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

}
