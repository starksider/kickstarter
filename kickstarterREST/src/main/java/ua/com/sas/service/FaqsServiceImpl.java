package ua.com.sas.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ua.com.sas.dao.Faqs;
import ua.com.sas.dao.Projects;
import ua.com.sas.model.Faq;

@Service
@Transactional
public class FaqsServiceImpl implements FaqsService {
	
	@Autowired
	private Faqs faqs;
	
	@Autowired
	private Projects progects;

	@Override
	public List<Faq> getFaqs(int id) {
		List<Faq> result = progects.get(id).getFaqs();
		result.size();
		return result;
	}

	@Override
	public void addAnswer() {
		// TODO Auto-generated method stub
	}

	@Override
	public void addQuestion(Faq faq, int projectId) {
		faq.setProject(progects.get(projectId));
		faqs.add(faq);
	}

}
