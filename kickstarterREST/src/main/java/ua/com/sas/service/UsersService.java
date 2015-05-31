package ua.com.sas.service;

import java.util.List;

import ua.com.sas.model.User;

public interface UsersService {
	
	boolean authorize(User user);
	
	void add(User user);
	
	List<String> getEmails();
	
}