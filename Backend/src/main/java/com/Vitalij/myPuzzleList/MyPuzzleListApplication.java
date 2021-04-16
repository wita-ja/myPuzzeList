package com.Vitalij.myPuzzleList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MyPuzzleListApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyPuzzleListApplication.class, args);
	}
}
