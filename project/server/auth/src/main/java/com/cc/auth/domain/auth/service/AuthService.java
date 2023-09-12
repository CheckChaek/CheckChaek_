package com.cc.auth.domain.auth.service;

import com.cc.auth.domain.auth.service.jwt.JwtProvider.JwtProvider;
import com.cc.auth.domain.member.domain.Member;
import com.cc.auth.domain.member.repository.MemberRepository;
import com.cc.auth.global.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtProvider jwtProvider;
    private final RedisUtil redisUtil;
    private final MemberRepository memberRepository;

    public String logout(Member member, Optional<String> optionalAccessToken) {

        String accessToken = optionalAccessToken.get();

        Long expiration = jwtProvider.getExpiration(accessToken);

        redisUtil.setBlackList(accessToken, "accessToken", expiration);

        member.deleteRefreshToken();
        memberRepository.save(member);

        return "로그아웃 완료";
    }

    public String deleteMember(Member member) {
        memberRepository.delete(member);
        return "회원탈퇴 완료";
    }
}