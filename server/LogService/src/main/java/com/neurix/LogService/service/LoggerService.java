package com.neurix.LogService.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class LoggerService {
	private Logger logger = LoggerFactory.getLogger(LoggerService.class);
	
	public Boolean log(String message) {
		logger.info("THIS IS A LOG FROM LOGGER SERVICE");
		return true;
	}
}
