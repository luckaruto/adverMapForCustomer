package com.test.CK.Ward;

import jakarta.persistence.*;

@Entity
@Table(name = "ward")
public class Ward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Short id;

    @Column(name = "name")
    private String name;

    public Ward() {}


    public Ward(Short id){
       this.id = id;
   }

    public Ward(Short id, String name) {
        this.id = id;
        this.name = name;
    }
}
