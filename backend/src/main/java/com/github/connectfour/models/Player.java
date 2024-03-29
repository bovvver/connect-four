package com.github.connectfour.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Player {
    private String nickname;
    @JsonIgnore
    private String uuid;
    private Integer score;
    private boolean isReadyForRestart;

    public Player(String nickname, String uuid) {
        this.nickname = nickname;
        this.uuid = uuid;
        this.score = 0;
        this.isReadyForRestart = false;
    }

    public void incrementScore() {
        this.score++;
    }

    public void incrementScore() {
        this.score++;
    }
}
