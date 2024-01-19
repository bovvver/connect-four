package com.github.connectfour.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
    private String nickname;
    private Integer score;

    public Player(String nickname) {
        this.nickname = nickname;
        this.score = 0;
    }
}
