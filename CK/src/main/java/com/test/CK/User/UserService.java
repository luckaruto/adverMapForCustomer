package com.test.CK.User;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public User getById(Short id){
        Optional<User> optionalUser=repository.findById(id);
        if (optionalUser.isEmpty()){
            return  null;
        }
        return optionalUser.get();
    }

    public HttpStatus createUser(User user){
        repository.save(user);
        return  HttpStatus.OK;
    }

    public HttpStatus deleteById(Short id){
        Optional<User> optionalUser=repository.findById(id);
        if (optionalUser.isEmpty()){
            return  HttpStatus.NOT_FOUND;
        }
        else {
            repository.deleteById(id);
            return  HttpStatus.OK;
        }
    }

    public HttpStatus updateById(Short id,User updatedUser){
        Optional<User> optionalUser=repository.findById(id);
        if (optionalUser.isEmpty()){
            return  HttpStatus.NOT_FOUND;
        }
        else {
            User user=optionalUser.get();
            user.setUsername(updatedUser.getUsername());
            user.setPassword(updatedUser.getPassword());
            repository.save(user);
            return  HttpStatus.OK;
        }
    }
}
