package ua.com.sas.dao;

import java.util.List;

import ua.com.sas.model.User;

public interface Users {
	List<User> getList();
	
	void add(User user);
	
	List<String> getEmails();
}