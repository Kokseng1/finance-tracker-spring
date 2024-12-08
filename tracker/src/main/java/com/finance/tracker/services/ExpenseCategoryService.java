package com.finance.tracker.services;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.finance.tracker.dto.ExpenseCategoryDto;
import com.finance.tracker.dto.ExpenseDto;
import com.finance.tracker.entities.Expense;
import com.finance.tracker.entities.ExpenseCategory;
import com.finance.tracker.repositories.ExpenseCategoryRepository;
import com.finance.tracker.repositories.ExpenseRepository;

@Service
public class ExpenseCategoryService {
    ExpenseRepository expenseRepository;
    ExpenseCategoryRepository expenseCategoryRepository;

    @Autowired 
    ExpenseCategoryService(ExpenseRepository expenseRepository,  ExpenseCategoryRepository expenseCategoryRepository)
    {
        this.expenseRepository = expenseRepository;
        this.expenseCategoryRepository = expenseCategoryRepository;
    }

    public ExpenseCategoryDto getExpenseCategory(@PathVariable Long id) {
        ExpenseCategory expenseCategory = expenseCategoryRepository.findById(id).get();
        ExpenseCategoryDto expenseCategoryDto = new ExpenseCategoryDto();
        expenseCategoryDto.setName(expenseCategory.getName());
        return expenseCategoryDto;
    }

    public ResponseEntity<String> addExpenseCategory(ExpenseCategoryDto expenseCategoryDto) {
        ExpenseCategory expenseCategory = new ExpenseCategory();
        expenseCategory.setName(expenseCategoryDto.getName());
        expenseCategoryRepository.save(expenseCategory);

        URI location = ServletUriComponentsBuilder
        .fromCurrentRequest() 
        .path("/{id}")    
        .buildAndExpand(expenseCategory.getId())
        .toUri();

        return ResponseEntity.created(location).build(); 
    }

    public List<ExpenseCategoryDto> getAllCategories() {
        return expenseCategoryRepository.findAll().stream().map(category -> {
                    ExpenseCategoryDto dto = new ExpenseCategoryDto();
                    dto.setName(category.getName());
                    dto.setId(category.getId());

                    return dto;
            }).collect(Collectors.toList());
    }
    
}
