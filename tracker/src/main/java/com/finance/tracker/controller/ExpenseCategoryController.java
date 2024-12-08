package com.finance.tracker.controller;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finance.tracker.dto.ExpenseCategoryDto;
import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.entities.Expense;
import com.finance.tracker.entities.ExpenseCategory;
import com.finance.tracker.repositories.ExpenseCategoryRepository;
import com.finance.tracker.repositories.ExpenseRepository;
import com.finance.tracker.services.ExpenseCategoryService;
import com.finance.tracker.services.ExpenseService;

@RestController
@RequestMapping("/expense_category")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseCategoryController {
    @Autowired
    ExpenseCategoryService expenseCategoryService;

    @GetMapping("allCategories")
    public List<ExpenseCategoryDto> getAllCategories() {
        return expenseCategoryService.getAllCategories();
    }

    @PostMapping("add")
    public ResponseEntity<String> addExpense(@RequestBody ExpenseCategoryDto expenseCategoryDto) {
        return expenseCategoryService.addExpenseCategory(expenseCategoryDto);
    }

    @GetMapping("/{id}")
    public ExpenseCategoryDto getExpenseCategory(@PathVariable Long id) {
        return expenseCategoryService.getExpenseCategory(id);
    }
    
}
