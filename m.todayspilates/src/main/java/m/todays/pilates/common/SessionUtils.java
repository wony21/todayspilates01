package m.todays.pilates.common;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import m.todays.pilates.security.CustomUserDetails;

public class SessionUtils {
	
	public static UserDetails getUserDetails() {
		return (UserDetails) SecurityContextHolder.getContext().getAuthentication().getDetails();
	}
	
	public static CustomUserDetails getCurrentUser() {
		UserDetails userDetails = getUserDetails();
		
		if ( userDetails != null ) {
			if ( userDetails instanceof CustomUserDetails) {
				return (CustomUserDetails) userDetails;
			}
		}
		
		return null;
	}

}
