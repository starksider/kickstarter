$(document).ready(function() {
	var logout = function(){
		if (localStorage.getItem("authorize")){
			$("#login").hide();
			$("#navigation").append('<li id="logout">Logout</li>')
			$("#logout").click(function(){
				$(this).remove();
				$("#login").show();
				localStorage.removeItem("authorize");
			});
		}
	}
	
	logout();
	var $loginForm = $("#login-form");
	
	$("#login, #signin").on('click', function(){
		$(this).toggleClass("active");
		var hidePrevious = function(selector){
			$(selector).hide().parent().removeClass("active");
		}
		if($(this).is('#login')){
			hidePrevious("#signin-form");
			$loginForm.toggle();
		} else {
			hidePrevious("#login-form");
			$("#signin-form").toggle();
		}
		
	});
	
	$("#login, #signin").on('click', 'div', function(event){
		event.stopPropagation();
	});
	
	$(document).mouseup(function (event){
		var li = $("#login, #signin");
		
		if (!li.is(event.target)
				&& li.has(event.target).length === 0) {
			li.find("#login-form").hide().end().removeClass("active");
			li.find("#signin-form").hide().end().removeClass("active");
		}
	});
	
	$loginForm.on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="email"]').val();
		var password = $(this).find('input[type="password"]').val();
		var user = {"email": email, "password": password}
		sendAjax(user);
	});

	var access = function (data) {
		if (data === true){
			$loginForm.hide().parent().removeClass("active");
			$loginForm.find('p').remove().end().find('input').removeClass();
			localStorage.setItem("authorize", data);
			logout();
		} else {
			$loginForm.find("input")
				.not('input[type="submit"]').addClass("wrong-input");
			$loginForm.find('p').remove();
			$loginForm.prepend('<p class="wrong-input-text">Wrong email or password</p>');
			
		}
	}
	
	function sendAjax(user) {
		$.ajax({ 
		    url: "login/", 
		    type: 'POST', 
		    dataType: 'json', 
		    data: JSON.stringify(user), 
		    contentType: 'application/json',
		    mimeType: 'application/json',
	        success: access
		});
	}
});