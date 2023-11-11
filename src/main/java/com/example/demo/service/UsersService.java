package com.example.demo.service;

import com.example.demo.dto.SignUpDto;
import com.example.demo.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entity.UsersEntity;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public void registerUser(SignUpDto signUpDto) {
        UsersEntity usersEntity = new UsersEntity(signUpDto);
        usersRepository.save(usersEntity);
    }
}
