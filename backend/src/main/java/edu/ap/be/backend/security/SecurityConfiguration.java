package edu.ap.be.backend.security;

import edu.ap.be.backend.security.jwt.AuthEntryPointJwt;
import edu.ap.be.backend.security.jwt.AuthTokenFilter;
import edu.ap.be.backend.security.service.UserDetailsServiceImp;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration

/**
 * EnableWebSecurity allows Spring to find and automatically apply the class to the global web security
 */
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsServiceImp userDetailsService;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;
    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    /**
     * The configure(HttpSecurity http) method tells Spring Security how we configure CORS AND CSRF,
     * when we want to require all users to be authenticated or not, which filter and when we want it to work
     * and which Exception Handler is chosen.
     */
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/auth/*").permitAll()
                .antMatchers("/test/*").permitAll()
                .antMatchers("/users*").permitAll()
                .antMatchers("/users/*").permitAll()
                .antMatchers("/users/mail/*").permitAll()
                .antMatchers("/users/mail/*").permitAll()
                .antMatchers("/auth/*").permitAll()
                .antMatchers("/auth*").permitAll()
                .antMatchers("/api/kredietaanvragen*").permitAll()
                .antMatchers("/api/kredietaanvragen/*").permitAll()
                .antMatchers("/api/feedback*").permitAll()
                .antMatchers("/api/feedback/*").permitAll()
                .antMatchers("/api/jaarrekening/**").permitAll()
                .antMatchers("/api/jaarrekening/**").permitAll()
                .antMatchers("/api/ratio/**").permitAll()
                .antMatchers("/api/ratio/**").permitAll()
                .antMatchers("/api/whitelist/*").permitAll()
                .antMatchers("/api/whitelist*").permitAll()
                .antMatchers("/api/blacklist/*").permitAll()
                .antMatchers("/api/blacklist*").permitAll()
                
                .antMatchers("/api/kredietaanvragen/user/").permitAll()
                .antMatchers("/api/kredietaanvragen/user/*").permitAll()
                .anyRequest().authenticated();
        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    

}
