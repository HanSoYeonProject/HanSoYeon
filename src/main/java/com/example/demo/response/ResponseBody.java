package com.example.demo.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ResponseBody
 * @author WoodyK
 * @apiNote
 * This class was implemented to customize ResponseBody of ResponseEntity.
 * @see ResponseBuilder
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseBody {
    public int code;
    public String message;
    public Object data;
}
