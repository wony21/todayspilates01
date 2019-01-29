package m.todays.pilates.common.api;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

public class ApiResponse {
	
	@Getter
	@JsonProperty("status")
	public int status;
	@Getter
	@JsonProperty("message")
	public String message;
	@Getter
	@JsonProperty("error")
	public String error;
	@Getter
	@JsonProperty("redirect")
	public String redirect;
	
	public ApiResponse() {

	}

	public ApiResponse(int code, String message, String error, String redirect) {
		this.status = code;
		this.message = message;
		this.error = error;
		this.redirect = redirect;
	}

	public static ApiResponse of(int code, String message) {
		return new ApiResponse(code, message, null, null);
	}

	public static ApiResponse error(int code, String error) {
		return new ApiResponse(code, null, error, null);
	}

	public static ApiResponse redirect(String redirect) {
		return new ApiResponse(302, null, null, redirect);
	}

	public static ApiResponse success(String message) {
		return new ApiResponse(200, message, null, null);
	}

	public static ApiResponse error(String message) {
		return new ApiResponse(500, null, message, null);
	}

}
