$(document).ready(function() {
	var logout = function(){
		if (localStorage.getItem("authorize")){
			$("#login").hide();
			$("#signin").hide();
			$("#navigation").append('<li id="logout">Logout</li>')
			$("#logout").click(function(){
				$(this).remove();
				$("#login").show();
				$("#signin").show();
				localStorage.removeItem("authorize");
			});
		}
	}
	
	logout();
	var $loginForm = $("#login-form");
	var $signinForm = $("#signin-form");
	
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
			$signinForm.toggle();
		}
		
	});
	
	$("#login, #signin").on('click', 'div', function(event){
		event.stopPropagation();
	});
	
	$(document).mouseup(function (event){
		var li = $("#login, #signin");
		
		if (!li.is(event.target)
				&& li.has(event.target).length === 0) {
			li.find("#login-form, #signin-form").hide().end().removeClass("active");
		}
	});
	
	$loginForm.on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="email"]').val();
		var password = $(this).find('input[type="password"]').val();
		var user = {"email": email, "password": password}
		sendAjax(user, "login/");
	});
	
	var emailExist = false;
	
	var setEmaliExist = function(state){
		emailExist = state;
	}
	
	var isEmailExist = function(){
		return emailExist;
	}
	
	$signinForm.on('blur', 'input[type="email"]', function(){
		var inEmail = $(this).val();
		if (inEmail != ''){
			$.get("email/", function(emails){
				for (var index in emails){
					var email = emails[index];
					if (inEmail.toUpperCase() === email.toUpperCase()){
						if (!$signinForm.has('p').length) {
							$signinForm.prepend('<p class="wrong-input-text">Email ' + 
									email + ' exist, please try another');
							setEmaliExist(true);
						}
						break;
					} else {
						$signinForm.find("p").remove();
						setEmaliExist(false);
					}
				}
			});
		}
	});
	
	$signinForm.on('submit', 'form', function(event){
		event.preventDefault();
		var email = $(this).find('input[type="email"]').val();
		var firstName = $("#firstName").val();
		var lastName = $("#lastName").val();
		var password = $(this).find('input[type="password"]')
		.filter(":first").val();
		var confirmPassword = $(this).find('input[type="password"]')
		.filter(":eq(1)").val();
		
		if (password === confirmPassword && !isEmailExist()){
			var user = {"email": email, "firstName": firstName,
					"lastName": lastName, "password": password}
			sendAjax(user, "add/");
		} else {
			if (!$(this).has('p').length && !isEmailExist()) {
				$(this).append("<p class=\"wrong-input-text\">Wrong repeated password</p>");
			}
		}
	});

	var access = function (data) {
		if (data === true){
			$loginForm.hide().parent().removeClass("active");
			$loginForm.find('p').remove().end().find('input').removeClass();
			localStorage.setItem("authorize", data);
			logout();
		} else if (data === false) {
			$loginForm.find("input")
				.not('input[type="submit"]').addClass("wrong-input");
			$loginForm.find('p').remove();
			$loginForm.prepend('<p class="wrong-input-text">Wrong email or password</p>');
		} else {
			$signinForm.hide().parent().removeClass("active");
			localStorage.setItem("authorize", true);
			logout();
			$("#popup").show().find("div").find("p").text("Thank you " + data.firstName + ", for registration!");
		}
	}
	
	function sendAjax(user, url) {
		$.ajax({
		    url: url, 
		    type: 'POST', 
		    dataType: 'json', 
		    data: JSON.stringify(user), 
		    contentType: 'application/json',
		    mimeType: 'application/json',
	        success: access
		});
	}
	
	$("#popup").on('click', 'button', function(){
		$("#popup").hide();
	});
});