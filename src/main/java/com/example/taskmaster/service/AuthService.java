package com.example.taskmaster.service;

import com.example.taskmaster.dto.AuthenticationRequest;
import com.example.taskmaster.dto.AuthenticationResponse;
import com.example.taskmaster.dto.RegisterRequest;

public interface AuthService {

    AuthenticationResponse register(RegisterRequest request);

    AuthenticationResponse login(AuthenticationRequest request);

}
