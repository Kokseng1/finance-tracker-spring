package com.finance.tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.tracker.dto.ExpenseCategoryDto;
import com.finance.tracker.services.ExpenseCategoryService;

@RestController
@RequestMapping("/expense_category")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseCategoryController {
    @Autowired
    ExpenseCategoryService expenseCategoryService;

    @GetMapping("allCategories")
    public ResponseEntity<List<ExpenseCategoryDto>> getAllCategories() {
        return ResponseEntity.ok(expenseCategoryService.getAllCategories());
    }

    @PostMapping("add")
    public ResponseEntity<String> addExpense(@RequestBody ExpenseCategoryDto expenseCategoryDto) {
        return expenseCategoryService.addExpenseCategory(expenseCategoryDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseCategoryDto> getExpenseCategory(@PathVariable Long id) {
        return expenseCategoryService.getExpenseCategory(id);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteExpenseCategory(@PathVariable Long id) {
        return expenseCategoryService.deleteExpenseCategory(id);
    }

    @PutMapping("edit")
    public ResponseEntity<ExpenseCategoryDto> editExpense(@RequestBody ExpenseCategoryDto expenseCategoryDto) {
        return expenseCategoryService.editExpenseCategory(expenseCategoryDto);
    }
}
