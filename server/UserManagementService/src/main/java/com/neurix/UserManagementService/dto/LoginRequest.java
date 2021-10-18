package com.neurix.UserManagementService.dto;

import org.springframework.data.annotation.Id;

public class LoginRequest {
	@Id
	private String _id;
	private String userName;
	private String password;
	public String get_id() {
		return _id;
	}
	public void set_id(String _id) {
		this._id = _id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}

