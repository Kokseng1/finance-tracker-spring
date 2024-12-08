package com.finance.tracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.finance.tracker.entities.ExpenseCategory;

import java.util.Optional;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {
    Optional<ExpenseCategory> findByName(String name);
}
