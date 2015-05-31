package ua.com.sas.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Projections;
import org.springframework.stereotype.Component;

import ua.com.sas.model.User;

@Component
public class UsersDAO extends AbstractDAO implements Users{

	@Override
	public List<User> getList() {
		Session session = getSession();
	    return session.createCriteria(User.class).list();
	}

	@Override
	public List<String> getEmails() {
		Session session = getSession();
		Criteria criteria = session.createCriteria(User.class);
		return criteria.setProjection(Projections.property("email")).list();
	}

	@Override
	public void add(User user) {
		Session session = getSession();
		session.save(user);
	}

}
