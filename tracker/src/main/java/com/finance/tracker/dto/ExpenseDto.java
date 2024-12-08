package com.finance.tracker.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseDto {
    private String name;
    private String categoryName;
    private Long category_id;
    private int amount;
    private LocalDateTime createdDate;
}
