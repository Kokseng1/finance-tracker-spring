package com.finance.tracker.services;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
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

    public ExpenseDto expenseToDto(Expense expense) {
        ExpenseDto expenseDto = new ExpenseDto();
        expenseDto.setAmount(expense.getAmount());
        expenseDto.setCategoryName(expense.getCategory().getName());
        expenseDto.setCategory_id(expense.getCategory().getId());
        expenseDto.setCreatedDate(expense.getCreatedDate());
        expenseDto.setId(expense.getId());
        expenseDto.setName(expense.getName());

        return expenseDto;
    }

    public Expense DtoToExpense(ExpenseDto expenseDto) {
        Expense expense = new Expense();
        expense.setAmount(expenseDto.getAmount());
        expense.setName(expenseDto.getName());
        ExpenseCategory expenseCategory = expenseCategoryRepository.findById(expenseDto.getCategory_id()).get();
        expense.setCategory(expenseCategory);

        return expense;

    }

    public ResponseEntity<String> addExpense(ExpenseDto expenseDto) {
        Expense newExpense = DtoToExpense(expenseDto);
        expenseRepository.save(newExpense);

        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() 
        .path("/{id}")    
        .buildAndExpand(newExpense.getId())
        .toUri();

        return ResponseEntity.created(location).build(); 
    }

    public ResponseEntity<ExpenseDto> getExpenseById(long id) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Expense expense = optionalExpense.get();
        ExpenseDto expenseDto = expenseToDto(expense);
        return ResponseEntity.ok(expenseDto);
    }



    public Page<ExpenseDto> getAllExpenses(Pageable pageable, String name) {
        return expenseRepository.findByNameContaining(name, pageable)
        .map(expense -> expenseToDto(expense));
    }

    public ResponseEntity<String> deleteExpense(long id) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Expense expense = optionalExpense.get();
        expenseRepository.delete(expense);
        return ResponseEntity.noContent().build();
    }

    public ResponseEntity<ExpenseDto> editExpense(ExpenseDto expenseDto, long id) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        
        if (optionalExpense.isEmpty()) {
            return ResponseEntity.notFound().build(); 
        }
    
        Expense expense = optionalExpense.get();
        expense.setAmount(expenseDto.getAmount());
        expense.setName(expenseDto.getName());
        ExpenseCategory expenseCategory = expenseCategoryRepository.findById(expenseDto.getCategory_id()).orElse(null);
        if (expenseCategory != null) {
            expense.setCategory(expenseCategory);
        }
    
        expenseRepository.save(expense);
        return ResponseEntity.ok(expenseDto);
    }
    
    
}
