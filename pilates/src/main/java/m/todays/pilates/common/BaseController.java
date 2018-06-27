package m.todays.pilates.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class BaseController {
	protected static final String APPLICATION_JSON = "application/json; charset=UTF-8";
    protected static final String TEXT_PLAIN_UTF_8 = "text/plain; charset=UTF-8";
    private static final Logger logger = LoggerFactory.getLogger(BaseController.class);
}
