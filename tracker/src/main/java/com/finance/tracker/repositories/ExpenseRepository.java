package com.finance.tracker.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.tracker.entities.Expense;

import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByName(String name);
    Page<Expense> findAll(Pageable pageable);
    Page<Expense> findByNameContaining(String name, Pageable page);
}
