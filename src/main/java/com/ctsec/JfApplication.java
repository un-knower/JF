package com.ctsec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.ctsec")
public class JfApplication {

	public static void main(String[] args) {
		SpringApplication.run(JfApplication.class, args);
	}
}
