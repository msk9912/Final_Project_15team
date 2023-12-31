package com.example.Final_Project_mutso.repository;

import com.example.Final_Project_mutso.entity.Feed;
import com.example.Final_Project_mutso.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FeedRepository extends JpaRepository<Feed, Long> {
    @Override
    Optional<Feed> findById(Long id);

    Optional<Feed> findByUser(UserEntity user);

//    Feed findAllByHashtag(String content);
}

