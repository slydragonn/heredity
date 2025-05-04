package heredity.backend.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {


        return  httpSecurity
                .csrf(csrf -> csrf.disable() ) //
                .authorizeHttpRequests(http -> {
                    http.requestMatchers("/public/**").permitAll();
                    http.requestMatchers("/products/**").permitAll();
                    http.requestMatchers("/users/**").permitAll();
                    http.requestMatchers("/css/**", "/js/**", "/img/**").permitAll();
                    http.requestMatchers("/").hasAuthority("USER");
                    http.requestMatchers("/edit/").hasAuthority("USER");
                    http.requestMatchers("/add/").hasAuthority("USER").anyRequest().authenticated();
                })
                .formLogin(httpSecurityFormLoginConfigurer -> {
                    httpSecurityFormLoginConfigurer.loginPage("/public/login")
                            .successHandler((request, response, authentication) -> {
                                if (authentication.getAuthorities().stream().anyMatch(grantedAuthority ->
                                        grantedAuthority.getAuthority().equals("USER"))) {
                                    response.sendRedirect("/");
                                }else{
                                    response.sendRedirect("/public/login");
                                }
                            });
                })
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/public/login")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .clearAuthentication(true)
                        .permitAll()
                )
                .build();
    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}