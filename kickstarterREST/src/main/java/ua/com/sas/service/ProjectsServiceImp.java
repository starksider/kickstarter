package ua.com.sas.service;

import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ua.com.sas.dao.Categories;
import ua.com.sas.dao.Projects;
import ua.com.sas.dao.Quotes;
import ua.com.sas.model.Category;
import ua.com.sas.model.Project;
import ua.com.sas.model.Quote;

@Service
@Transactional
public class ProjectsServiceImp implements ProjectsService{
	
	@Autowired
	private Projects projects;
	
	@Autowired
	private Categories categories;
	
	@Autowired
	private Quotes quotes;
	
	@Override
	public void addCategory(Category category) {
		categories.add(category);
	}

	@Override
	public Project getCurrent(int id) {
		Project project = projects.get(id);
		project.getCategory().getId();
		return project;
	}
	
	@Override
	public Category getWithProjects(int id) {
		Category category = categories.get(id);
		category.getProjects().size();
		return category;
	}

	@Override
	public List<Category> getAll() {
		return categories.getCategories();
	}

	@Override
	public Quote getRandomed(Random random) {
		int rand = random.nextInt(quotes.size()) + 1;
		return quotes.get(rand);
	}
	
}
