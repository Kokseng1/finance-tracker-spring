package com.finance.tracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenseDto {
    private Long id;
    private String name;
    private String categoryName;
    private Long category_id;
    private int amount;
}
