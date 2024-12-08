package com.finance.tracker.controller;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.entities.Expense;
import com.finance.tracker.repositories.ExpenseRepository;

@RestController
@RequestMapping("/expense")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {
    @Autowired ExpenseRepository expenseRepository;

    @GetMapping("allExpenses")
    public List<ExpenseDto> getAllExpenses() { //change to list expenses
        return expenseRepository.findAll().stream().map(expense -> {
            ExpenseDto dto = new ExpenseDto();
            dto.setName(expense.getName());
            dto.setId(expense.getId());
            dto.setCategoryName(expense.getCategory().getName());
            dto.setCategory_id(expense.getCategory().getId());
            dto.setAmount(expense.getAmount());

            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping("add")
    public void test() {
        System.out.println("in h");
    }
}
