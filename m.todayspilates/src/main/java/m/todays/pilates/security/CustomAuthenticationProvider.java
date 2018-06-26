package m.todays.pilates.security;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import m.todays.pilates.common.CommonData;
import m.todays.pilates.common.CommonData.ROLE;
import m.todays.pilates.domain.user.User;
import m.todays.pilates.domain.user.UserService;

public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	UserService userService;

	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationProvider.class);

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String user_id = (String) authentication.getPrincipal();
		
//		if ( user_id.length() < 4) {
//			throw new InternalAuthenticationServiceException("아이디는 4자리 이상이어야 합니다.");
//		}
		
		String user_pw = user_id.substring(user_id.length() - 4, user_id.length());

		User userInfo = userService.getUserInfo(user_id, user_pw);

		if (userInfo != null) {
			List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
			if ( userInfo.userLv.equals(CommonData.UserLv.SYSTEM)) { // 관리자는 모든 권한부여
				roles.add(new SimpleGrantedAuthority(ROLE.ADMIN));
				roles.add(new SimpleGrantedAuthority(ROLE.TEACHER));
				roles.add(new SimpleGrantedAuthority(ROLE.USER));
			} else if ( userInfo.userLv.equals(CommonData.UserLv.TEACHER)) { // 선생님은 선생님권한만 부여
				roles.add(new SimpleGrantedAuthority(ROLE.TEACHER));
			} else { // 나머지는 일반권한만 부여
				roles.add(new SimpleGrantedAuthority(ROLE.USER));
			}
			
			UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(user_id, user_pw, roles);
			result.setDetails(new CustomUserDetails(userInfo));
			return result;
			
		} else {

			throw new BadCredentialsException("Bad credentials [" + user_id + "/" + user_pw + "]");
		}
	}
}