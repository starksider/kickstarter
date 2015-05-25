<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
    <head>
        <title>Kickstarter</title>
        <link rel="stylesheet" type="text/css" href="resources/css/main.css">
        <script src="resources/js/jquery-2.1.3.js"></script>
        <script src="resources/js/login.js"></script>
        <script src="resources/js/main.js"></script>
    </head>
    <body>
    	<ul id="navigation">
    		<li>Kick</li>
    		<li>Search</li>
    		<li>Sign up</li>
    		<li id="login">
    			Log in
    			<div id="login-form">
    				<form method="post" action="/">
    					<label for="name">Enter your email:</label>
    					<input type="email" placeholder="email" name="name">
    					<label for="password">Enter your password:</label>
    					<input type="password" placeholder="password" name="password">
    					<input type="submit" value="Log in">
    				</form>
    			</div>
    		</li>
    	</ul>
    	<div id="quote"></div>
    	<div id="categories"></div>
    	<div id="projects"></div>
    </body>
</html>