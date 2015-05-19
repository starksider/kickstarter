package ua.com.sas.dao;

import ua.com.sas.model.Faq;

public interface Faqs {

	void add(Faq faq);

	Faq get(int id);
	
	void addAnswer(String answer, int id);

}