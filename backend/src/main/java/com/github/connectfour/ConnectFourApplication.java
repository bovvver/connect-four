package com.github.connectfour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class ConnectFourApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConnectFourApplication.class, args);
    }
}
