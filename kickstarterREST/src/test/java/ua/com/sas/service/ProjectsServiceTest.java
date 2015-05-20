package ua.com.sas.service;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ua.com.sas.dao.AbstractDAO;
import ua.com.sas.dao.Categories;
import ua.com.sas.dao.CategoriesDAO;
import ua.com.sas.model.Category;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:test-application-context.xml" })
public class ProjectsServiceTest {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	ProjectsService service;
	
	@After
	public void cleanDb(){
		Session session = sessionFactory.openSession();
		session.createQuery("delete from Category").executeUpdate();
		session.close();
	}
	
	@Test
	public void shouldBeEmptyBeforeAddingSomeCategory(){
		int size = service.getAll().size();
		assertEquals(0, size);
	}
	
	@Test
	public void shouldAddCategory() {
		//given
		List<Category> list = new ArrayList<Category>();
		Category category1 = new Category();
		category1.setName("Category1");

		// when
		list.add(category1);
		service.addCategory(category1);

		// then
		assertEquals(service.getAll().size(), list.size());
	}
	
	@Test 
	public void shouldReturnListOfCategories(){
		//given
		List<Category> list = new ArrayList<Category>();
		Category category1 = new Category();
		category1.setName("Category1");
		Category category2 = new Category();
		category2.setName("Category2");
		
		//when
		list.add(category1);
		list.add(category2);
		service.addCategory(category1);
		service.addCategory(category2);
		
		//then
		assertEquals(service.getAll(), list);
	}

}
