<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Kickstarter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        <link href='http://fonts.googleapis.com/css?family=Roboto:400,700,400italic,700italic&subset=latin,cyrillic'
         rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="resources/css/main.css">
    </head>
    <body>
    	<div id="popup">
    		<div>
    			<p></p>
    			<button class="button">Close</button>
    		</div>
    	</div>
    	<ul id="navigation" class="navigation">
    		<li>Kick</li>
    		<li><input type="text" id="search" placeholder="search"></li>
    		<li id="signin">Sign up
    		    <div id="signin-form" class="login-item">
    				<form method="post" action="/">
    					<label for="name">Enter your email:</label>
    					<input type="email" placeholder="Email" name="email" required>
    					<label for="firstName">Enter your first name:</label>
    					<input type="text" placeholder="First name" name="firstName" id="firstName" required>
    					<label for="lastName">Enter your last name:</label>
    					<input type="text" placeholder="Last name" name="lastName" id="lastName" required>
    					<label for="password">Enter your password:</label>
    					<input type="password" placeholder="Password" id="password" name="password" required>
    					<label for="confirm_password">Confirm your password:</label>
    					<input type="password" placeholder="Repeat password" name="password" id="confirm_password" required>
    					<input type="submit" value="Sign in">
    				</form>
    			</div>
    		</li>
    		<li id="login">
    			Log in
    			<div id="login-form" class="login-item">
    				<form method="post" action="/">
    					<label for="name">Enter your email:</label>
    					<input type="email" placeholder="email" name="email">
    					<label for="password">Enter your password:</label>
    					<input type="password" placeholder="password" name="password">
    					<input type="submit" value="Login">
    				</form>
    			</div>
    		</li>
    		<li id="logout" style="display:none;">Logout</li>
    	</ul>
    	<div id="quote"></div>
    	<div id="categories"></div>
    	<div id="projects"></div>
    	
    	<!-- Scripts -->
	    <script src=
	    "resources/js/jquery-2.1.3.js"></script>
        <script src="resources/js/login.js"></script>
        <script src="resources/js/main.js"></script>
    </body>
</html>