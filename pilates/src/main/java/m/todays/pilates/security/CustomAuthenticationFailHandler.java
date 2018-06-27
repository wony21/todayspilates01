package m.todays.pilates.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class CustomAuthenticationFailHandler implements AuthenticationFailureHandler {

	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationFailHandler.class);   
	
	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException authenticationException)
			throws IOException, ServletException {
//		request.setAttribute("id", request.getParameter("id"));
//		request.getRequestDispatcher("/login").forward(request, response);
		String error = "unidentified";
		if(authenticationException instanceof InternalAuthenticationServiceException) {
            error = "internal";
        } else if(authenticationException instanceof BadCredentialsException) {
            error = "badCredential";
        } else if(authenticationException instanceof CredentialsExpiredException) { 
            error = "credentialsExpired";
        } else if(authenticationException instanceof LockedException) {
            error = "locked";
        } else if(authenticationException instanceof AccountExpiredException) {
            error = "accountExpired";
        }
		
		String errorMessage = authenticationException.getMessage();
		
		request.setAttribute("error", error);
		response.sendRedirect("/loginFail?error=" + error);
		
		logger.error("LOGIN FAILED : " + errorMessage);
	
	}

}
