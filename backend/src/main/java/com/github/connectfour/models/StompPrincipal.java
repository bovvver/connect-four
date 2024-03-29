package com.github.connectfour.models;

import java.security.Principal;

public record StompPrincipal(String name) implements Principal {
    @Override
    public String getName() {
        return this.name;
    }
}
