(function() {
	
	/*
	 * @param {v} date
	 * @param {dm} delimeter
	 */
	dateFormat = function(val, dm) {
		let date = new Date(val);
		return date.getMonth() + 1 + dm + date.getDate() + dm + date.getFullYear();
	}
	
	/**
	 * @param {name} parameter key
	 * @url {url} default none
	 */
	getParameterByName = function(name, url) {
	        if (!url) url = window.location.href;
	        name = name.replace(/[\[\]]/g, "\\$&");
	        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	            results = regex.exec(url);
	        if (!results) return null;
	        if (!results[2]) return '';
	        return decodeURIComponent(results[2].replace(/\+/g, " "));
   	}
})();