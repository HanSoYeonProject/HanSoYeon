package com.example.demo.RequestBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeleteBlacklistRequestBody {
    public String providerId;
    public String userId;
}
