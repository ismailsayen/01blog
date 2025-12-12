package com.blog.auth.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class JwtService {
    @Value("${SECRET_KEY}")
    private String JWT_KEY;
    public String generateToken(Long userID) {
        Map<String, Object> claims = new HashMap<>();
        
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(String.valueOf(userID))
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 3600000 * 24))
                .and()
                .signWith(getKey())
                .compact();
    }

    public String extractId(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private SecretKey getKey() {
        
        byte[] keyBytes = Decoders.BASE64.decode(JWT_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private <T> T extractClaim(String token, Function<Claims, T> ClaimResolver) {
        final Claims claims = extractAllClaim(token);
        return ClaimResolver.apply(claims);

    }

    private Claims extractAllClaim(String token) {
        return Jwts.parser().verifyWith(getKey()).build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validToken(String token, UserDetails userDetails) {
        return true;
    }
}
