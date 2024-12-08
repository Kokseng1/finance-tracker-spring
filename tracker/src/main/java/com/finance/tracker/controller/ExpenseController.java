package com.finance.tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.services.ExpenseService;

@RestController
@RequestMapping("/expense")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired
    ExpenseService expenseService;

   @GetMapping("/allExpenses")
    public Page<ExpenseDto> getAllExpenses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size, 
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction,
            @RequestParam(defaultValue = "") String name) {
        Sort sort = direction.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return expenseService.getAllExpenses(pageable, name);
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

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseDto> EditExpense(@RequestBody ExpenseDto expenseDto, @PathVariable long id) {
        return expenseService.editExpense(expenseDto, id);
    }
}
