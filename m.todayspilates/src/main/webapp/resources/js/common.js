(function() {
	
	/**
	 * @param {val} date
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
	
	goPage = function(page, params) {
		var protocol = document.location.protocol;
	    var hostname = window.location.hostname;
	    var port = document.location.port;

	    var url = protocol + '//' + hostname + ':' + port + '/' + page;
	    //window.location = "news_edit.html?article_id=" + articleId;
	    console.log('url:' + url);
		$(location).attr('href', url);
		return false;
	}
	
	$('#logout').bind('click', function() {
		$.ajax({
			type: 'POST',
			url: '/logout',
			success: function(res) {
				console.log('logout success...');
				goPage('login');
			}
		})
	});
	
})();


