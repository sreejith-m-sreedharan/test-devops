package com.neurix.UserManagementService.clients;

import org.springframework.cloud.netflix.ribbon.RibbonClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "eureka-user-management", url="http://localhost:4000")
public interface UserManagementServiceClient {
	@GetMapping("/ValidateSessionToken/{sessId}")
	public ResponseEntity<Boolean> validateSessionToken(@PathVariable("sessId") String sessionId);
}
