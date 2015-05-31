package ua.com.sas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ua.com.sas.model.User;
import ua.com.sas.service.UsersService;

@Controller
public class UserController {
	
	@Autowired 
	private UsersService service;
	
	@RequestMapping(value = "login/", method = RequestMethod.POST)
	public @ResponseBody boolean post(@RequestBody final User user) {
		return service.authorize(user);
	}
	
	@RequestMapping(value="add/", method = RequestMethod.POST)
	public @ResponseBody User add(@RequestBody final User user){
		service.add(user);
		return user;
	}
	
	@RequestMapping(value = "email/")
	public @ResponseBody List<String> emails(){
		return service.getEmails();
	}
}