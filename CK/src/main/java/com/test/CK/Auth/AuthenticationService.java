package com.test.CK.Auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;

import java.util.concurrent.TimeUnit;

import jakarta.servlet.http.HttpServletRequest;

public class AuthenticationService {
    public static final String SECRET_KEY = "SecretKey";
    public static final long MAX_TIME_DIFFERENCE_MINUTES = 30;

    public static String getToken(String username,String password,Long timestamp){
        String token = Jwts.builder()
                .claim("userName", username)
                .claim("password", password)
                .claim("time", timestamp)
                .signWith(SignatureAlgorithm.HS256, AuthenticationService.SECRET_KEY)
                .compact();
        return token;
    }

    public static boolean isTimeValid(long clientTime) {
        long currentTime = System.currentTimeMillis();
        long timeDifference = Math.abs(currentTime - clientTime);
        long timeDifferenceMinutes = TimeUnit.MILLISECONDS.toMinutes(timeDifference);

        return timeDifferenceMinutes <= MAX_TIME_DIFFERENCE_MINUTES;
    }

    public static Authentication getAuthentication(HttpServletRequest request) {

        if (request.getHeader("Authorization") != null) {
            String accessToken = request.getHeader("Authorization");
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(accessToken).getBody();

            String userName = claims.get("userName", String.class);
            String password = claims.get("password", String.class);
            long timestamp = claims.get("time", Long.class);

           String token=getToken(userName,password,timestamp);

            if (!accessToken.equals(token)) {
                throw new BadCredentialsException("Invalid Access Token");
            }
            if (!isTimeValid(timestamp)) {
                throw new BadCredentialsException("Invalid Time");
            }

            return new ApiKeyAuthentication(accessToken, AuthorityUtils.NO_AUTHORITIES);
        }
        throw new BadCredentialsException("No Access Token");

    }

}
