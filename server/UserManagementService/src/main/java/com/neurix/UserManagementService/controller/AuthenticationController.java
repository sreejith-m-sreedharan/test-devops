package com.neurix.UserManagementService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.neurix.UserManagementService.clients.UserManagementServiceClient;
import com.neurix.UserManagementService.dto.LoginRequest;
import com.neurix.UserManagementService.entity.User;
import com.neurix.UserManagementService.service.AuthenticateService;

import feign.FeignException.FeignClientException;

@RestController
public class AuthenticationController {
	
	@Autowired
	AuthenticateService authService;
	@Autowired
	UserManagementServiceClient userManagementServiceClient;
	
	@PostMapping("/login")
	public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
		return new ResponseEntity<User>(authService.authenticate(loginRequest), HttpStatus.OK);
		
	}
	
	@GetMapping("/ValidateSessionToken/{sessId}")
	public ResponseEntity<Boolean> validateSessionToken(@PathVariable("sessId") String sessionId) {
		return new ResponseEntity<Boolean>(authService.validateSessionToken(sessionId), HttpStatus.OK);
		
	}
	@GetMapping("/getUser")
	public ResponseEntity<User> getUser(@RequestParam("user") String userName) {
		return new ResponseEntity<User>(authService.getUser(userName), HttpStatus.OK);
		
	}
	
	@GetMapping("/errorservice")
	@HystrixCommand(fallbackMethod="fallbackMethod")
	public ResponseEntity<User> errorService() {
		throw new RuntimeException("not available");
		
	}
	public ResponseEntity<User> fallbackMethod(){
		User user = new User();
		user.set_id("1");
		user.setUserName("0");
		user.setFirstName("error");
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}
	
	
}
