package ua.com.sas.dao;

import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import ua.com.sas.model.Faq;
import ua.com.sas.service.*;

@Repository
public class FaqsDAO extends AbstractDAO implements Faqs {

	@Override
	public void add(Faq faq) {
		getSession().save(faq);
	}

	@Override
	public Faq get(int id) {
		return (Faq) getSession().get(Faq.class, id);
	}

	@Override
	public void addAnswer(String answer, int id) {
		Query query = getSession().createQuery("update Faq set answer = :answer where id = :id");
		query.setInteger("id", id);
        query.setString("answer", answer);
        query.executeUpdate();
	}
	
}
