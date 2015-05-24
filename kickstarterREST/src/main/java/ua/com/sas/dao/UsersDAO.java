package ua.com.sas.dao;

import java.util.List;

import org.hibernate.Session;
import org.springframework.stereotype.Component;

import ua.com.sas.model.User;

@Component
public class UsersDAO extends AbstractDAO implements Users{

	@Override
	public List<User> getList() {
		Session session = getSession();
	    return session.createCriteria(User.class).list();
	}

}
