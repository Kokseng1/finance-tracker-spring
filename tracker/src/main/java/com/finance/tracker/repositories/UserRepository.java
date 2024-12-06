package com.finance.tracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.tracker.entities.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<com.finance.tracker.entities.User, Long> {

    Optional<User> findByUsername(String username);
}
