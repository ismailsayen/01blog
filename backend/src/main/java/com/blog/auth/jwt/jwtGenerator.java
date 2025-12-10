package com.blog.auth.jwt;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class jwtGenerator {
    @Value("${SECRET_KEY}")
    private String JWT_KEY;

    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(email)
                .and()
                .signWith(Keys.hmacShaKeyFor(JWT_KEY.getBytes()))
                .compact();
    }
}
