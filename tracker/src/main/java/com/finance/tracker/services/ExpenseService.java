package com.finance.tracker.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.entities.Expense;
import com.finance.tracker.entities.ExpenseCategory;
import com.finance.tracker.repositories.ExpenseCategoryRepository;
import com.finance.tracker.repositories.ExpenseRepository;

@Service
public class ExpenseService {
    ExpenseRepository expenseRepository;
    ExpenseCategoryRepository expenseCategoryRepository;

    @Autowired 
    ExpenseService(ExpenseRepository expenseRepository,  ExpenseCategoryRepository expenseCategoryRepository)
    {
        this.expenseRepository = expenseRepository;
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    public void addExpense(ExpenseDto expenseDto) {
        Expense newExpense = new Expense();
        newExpense.setAmount(expenseDto.getAmount());
        newExpense.setName(expenseDto.getName());
        ExpenseCategory expenseCategory = expenseCategoryRepository.findById(expenseDto.getCategory_id()).get();
        newExpense.setCategory(expenseCategory);
        expenseRepository.save(newExpense);
    }

    public List<ExpenseDto> getAllExpenses() {
        return expenseRepository.findAll().stream().map(expense -> {
                    ExpenseDto dto = new ExpenseDto();
                    dto.setName(expense.getName());
                    dto.setCategoryName(expense.getCategory().getName());
                    dto.setCategory_id(expense.getCategory().getId());
                    dto.setAmount(expense.getAmount());
                    dto.setCreatedDate(expense.getCreatedDate());

                    return dto;
            }).collect(Collectors.toList());
    }
    
}
