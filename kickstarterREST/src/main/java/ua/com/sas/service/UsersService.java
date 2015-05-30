package ua.com.sas.service;

import ua.com.sas.model.User;

public interface UsersService {
	
	boolean authorize(User user);
	
	void add(User user);
	
}