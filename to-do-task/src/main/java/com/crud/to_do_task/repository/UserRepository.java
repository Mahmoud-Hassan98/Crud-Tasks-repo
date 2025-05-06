package com.crud.to_do_task.repository;

import com.crud.to_do_task.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User , Long> {

    boolean existsByEmail(String email);



}
