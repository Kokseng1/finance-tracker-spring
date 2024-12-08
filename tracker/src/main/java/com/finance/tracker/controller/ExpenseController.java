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

import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.services.ExpenseService;

@RestController
@RequestMapping("/expense")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired
    ExpenseService expenseService;

    @GetMapping("allExpenses")
    public List<ExpenseDto> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExpenseDto> getAllExpenses(@PathVariable long id) {
        return expenseService.getExpenseById(id);
    }

    @PostMapping("add")
    public ResponseEntity<String> addExpense(@RequestBody ExpenseDto expenseDto) {
        return expenseService.addExpense(expenseDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> DeleteExpense(@PathVariable long id) {
        return expenseService.deleteExpense(id);
    }

    @PutMapping("edit")
    public ResponseEntity<ExpenseDto> EditExpense(@RequestBody ExpenseDto expenseDto) {
        return expenseService.editExpense(expenseDto);
    }
}
