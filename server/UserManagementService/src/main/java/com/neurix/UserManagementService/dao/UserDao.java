package com.neurix.UserManagementService.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.neurix.UserManagementService.entity.User;
import com.neurix.UserManagementService.repository.UserRepository;

@Service
public class UserDao {
	@Autowired
	UserRepository userRepository;
	
	public User retrieveUser(String userName,String password) {			 
			return userRepository.findByUserNameAndPassword(userName,password);
		
	}
	public User getUser(String userName) {			 
		return userRepository.findByUserName(userName);
	
}
	public boolean validateSessionId(String sessionId) {			 
		return userRepository.existsById(sessionId);
	
}
}
