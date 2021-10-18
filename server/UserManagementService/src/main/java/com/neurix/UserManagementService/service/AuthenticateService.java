package com.neurix.UserManagementService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.neurix.UserManagementService.dao.UserDao;
import com.neurix.UserManagementService.dto.LoginRequest;
import com.neurix.UserManagementService.entity.User;

@Service
public class AuthenticateService {
	@Autowired
	UserDao userDao;
	
	@Autowired
	Environment environment;
	
	public User authenticate(LoginRequest loginRequest) {
			User user = userDao.retrieveUser(loginRequest.getUserName(), loginRequest.getPassword());	
			user.setServerPort(environment.getProperty("server.port"));
			return user;
	}
	public boolean validateSessionToken(String sessionId) {
		if(userDao.validateSessionId(sessionId)) {
			return true;
		}else {
			return false;
		}
	}
	public User getUser(String userName) {
		User user = userDao.getUser(userName);	
		user.setServerPort(environment.getProperty("server.port"));
		return user;
	}
}
