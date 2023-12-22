package com.test.CK.Auth;

import com.test.CK.User.User;
import com.test.CK.User.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthController {

    private final UserRepository repository;

    public AuthController(UserRepository repository) {
        this.repository = repository;
    }

    @PostMapping()
    public ResponseEntity<String> login(@RequestBody @Valid User user){
        Optional<User> userOptional=repository.findByUsername(user.getUsername());
        if (userOptional.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } else if ((!userOptional.get().getPassword().equals(user.getPassword()))) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        else {
            String username=userOptional.get().getUsername();
            String password=userOptional.get().getPassword();
            Long currentTime = System.currentTimeMillis();

            String token=AuthenticationService.getToken(username,password,currentTime);

            return new ResponseEntity<>(token, HttpStatus.OK);
        }

    }
}
