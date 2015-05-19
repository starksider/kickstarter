package ua.com.sas.service;

import java.util.List;

import ua.com.sas.model.Faq;

public interface FaqsService {
	
	List<Faq> getFaqs(int id);
	
	void addAnswer();
	
	void addQuestion(Faq faq, int projectId);
	
}