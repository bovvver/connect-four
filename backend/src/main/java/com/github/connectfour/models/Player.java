package com.github.connectfour.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Player {
    private String nickname;
    private String uuid;
    private Integer score;

    public Player(String nickname, String uuid) {
        this.nickname = nickname;
        this.uuid = uuid;
        this.score = 0;
    }
}
