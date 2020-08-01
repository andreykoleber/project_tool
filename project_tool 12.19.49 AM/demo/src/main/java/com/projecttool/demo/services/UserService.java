package com.projecttool.demo.services;

import com.projecttool.demo.domain.User;
import com.projecttool.demo.exeptions.UserNameAlreadyExistsException;
import com.projecttool.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User savedUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            newUser.setFullName(newUser.getFullName());
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch(Exception ex) {
            throw new UserNameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists");
        }
    }
}
