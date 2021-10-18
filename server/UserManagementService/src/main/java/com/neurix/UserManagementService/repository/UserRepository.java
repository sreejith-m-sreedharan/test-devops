package com.neurix.UserManagementService.repository;

import org.springframework.stereotype.Repository;

import com.neurix.UserManagementService.entity.User;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
		public User findByUserNameAndPassword(String userName,String password);
		public User findByUserName(String userName);
}
