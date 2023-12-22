package com.test.CK.User;

import com.test.CK.User.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/users")
public class UserController {
    private  final  UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAll() {
        List<User> users = service.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getById(@PathVariable Short id) {
        User user = service.getById(id);
        if (user==null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<String> createUser(@RequestBody @Valid User user) {
        HttpStatus status = service.createUser(user);
        switch (status) {
            case OK -> {
                return new ResponseEntity<>("Create User Success", status);
            }
            default -> {
                return new ResponseEntity<>("Create User Failed", HttpStatus.BAD_REQUEST);
            }
        }
    }

    @PutMapping(path = "/{id}")
    ResponseEntity<String> updateUserById(@PathVariable Short id,@RequestBody @Valid User user){
        HttpStatus status = service.updateById(id,user);
        switch (status){
            case OK -> {
                return new ResponseEntity<>("Update User Success",status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("User is not existed",status);
            }
            default -> {
                return new ResponseEntity<>("Update User Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @DeleteMapping(path = "/{id}")
    ResponseEntity<String> deleteUserById(@PathVariable Short id){
        HttpStatus status = service.deleteById(id);
        switch (status){
            case OK -> {
                return new ResponseEntity<>("Delete User Success",status);
            }
            case NOT_FOUND -> {
                return new ResponseEntity<>("User is not existed",status);
            }
            default -> {
                return new ResponseEntity<>("Delete User Failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
}
