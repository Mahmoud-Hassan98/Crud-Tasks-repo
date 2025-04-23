package com.crud.to_do_task;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ToDoTaskApplication {

	public static void main(String[] args) {

		SpringApplication.run(ToDoTaskApplication.class, args);
	}
}
