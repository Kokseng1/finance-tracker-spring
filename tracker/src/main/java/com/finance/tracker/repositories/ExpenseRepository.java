package com.finance.tracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.finance.tracker.entities.Expense;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    Optional<Expense> findByName(String name);
}
