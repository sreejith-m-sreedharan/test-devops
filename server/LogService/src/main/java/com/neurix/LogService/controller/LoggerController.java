package com.neurix.LogService.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.neurix.LogService.service.LoggerService;

@RestController
public class LoggerController {
	
	@Autowired
	private LoggerService loggerService;
	@GetMapping("/log/{message}")
	public ResponseEntity<?>createLog(@PathVariable String message){
		return new ResponseEntity<Boolean>(loggerService.log(message),HttpStatus.OK);
	}
}
