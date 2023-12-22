package com.test.CK.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Short id;

    @Column
    @NotNull(message = "username is not null")
    private String username;

    @Column
    @NotNull(message = "password is not null")
    private String password;

    public User(Short id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    public User() {

    }

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
