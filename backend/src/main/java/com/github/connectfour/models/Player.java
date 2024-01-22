package com.github.connectfour.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Player {
    private String nickname;
    private Integer score;

    public Player(String nickname) {
        this.nickname = nickname;
        this.score = 0;
    }
}
