package com.finance.tracker.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "expenses")
public class Expense {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;

    private int amount;
    private LocalDateTime createdDate;
    
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private ExpenseCategory category;

    @PrePersist
    private void onCreate() {
        this.createdDate = LocalDateTime.now();
    }
}
