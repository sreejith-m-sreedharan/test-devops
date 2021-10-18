package com.neurix.api;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;
import java.util.Locale;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;
import com.neurix.api.clients.UserManagementServiceClient;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AuthenticationFilter extends ZuulFilter {
	
	private Logger logger = LoggerFactory.getLogger(AuthenticationFilter.class); 
	@Autowired
	Environment environment;
	
	
	@Autowired
	UserManagementServiceClient userManagementServiceClient;
	
	@Override
	public boolean shouldFilter() {
		logger.info("NAME "+environment.getProperty("spring.data.name"));
		HttpServletRequest request = RequestContext.getCurrentContext().getRequest();
	
		// TODO Auto-generated method stub
		for(String route:environment.getProperty("api.routes.auth.disabled").split(",")) {
			if(request.getRequestURL().toString().matches(route)) {
				logger.info("Logging should filter : {}",false);
				return false;
				
			}
		}
		logger.info("Logging should filter : {}",true);
		return true;
	}

	@Override
	public Object run() throws ZuulException {
		// TODO Auto-generated method stub
		logger.info("Logging run() : ");
		RequestContext context = RequestContext.getCurrentContext();
		HttpServletRequest request = context.getRequest();
		if(userManagementServiceClient.validateSessionToken(request.getHeader("Authorization")).getBody() != true) {
			logger.info("Invalid session");
			HttpServletResponse response = context.getResponse();
			try {
				response.sendError(HttpServletResponse.SC_FORBIDDEN);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	
		return null;
	}

	@Override
	public String filterType() {
		// TODO Auto-generated method stub
		return "pre";
	}

	@Override
	public int filterOrder() {
		// TODO Auto-generated method stub
		return 1;
	}

}
