package ua.com.sas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ua.com.sas.dao.Users;
import ua.com.sas.model.User;

@Service
@Transactional
public class UsersServiceImpl implements UsersService {
	
	@Autowired
	private Users usersDAO;

	@Override
	public boolean authorize(User user) {
		List<User> users = usersDAO.getList();
		for (User userItem : users){
			if (userItem.getEmail().equalsIgnoreCase(user.getEmail())) {
				if (userItem.getPassword().equals(user.getPassword())){
					return true;
				}
			}
		}
		return false;
	}
	
}