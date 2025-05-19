package com.crud.to_do_task.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private final Key key;

    // Inject secret key from application.properties
    public JwtService(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // Generate JWT with id, username, email
    public String generateToken(Long id, String username, String email , String role ) {
        return Jwts.builder()
                .setSubject(String.valueOf(id))  // Set the user ID as the subject (ensure it's unique)
                .claim("username", username).claim("role" ,role)     // Add username as an additional claim
                .claim("email", email)           // Add email as an additional claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    // Extract username (subject)
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract email
    public String extractEmail(String token) {
        return extractAllClaims(token).get("email", String.class);
    }

    // Extract user ID
    public Long extractId(String token) {
        return extractAllClaims(token).get("id", Long.class);
    }

    // Extract all claims (helper)
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
