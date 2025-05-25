package com.group1.core.StudentManagement.repository;

import com.group1.core.StudentManagement.models.Student;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public class studentRepository extends JpaRepository<Student, Integer> {


    @Override
    public void flush() {

    }

    @Override
    public <S extends Student> S saveAndFlush(S entity) {
        return null;
    }

    @Override
    public <S extends Student> List<S> saveAllAndFlush(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public void deleteAllInBatch(Iterable<Student> entities) {

    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> integers) {

    }

    @Override
    public void deleteAllInBatch() {

    }

    @Override
    public Student getOne(Integer integer) {
        return null;
    }

    @Override
    public Student getById(Integer integer) {
        return null;
    }

    @Override
    public Student getReferenceById(Integer integer) {
        return null;
    }

    @Override
    public <S extends Student> Optional<S> findOne(Example<S> example) {
        return Optional.empty();
    }

    @Override
    public <S extends Student> List<S> findAll(Example<S> example) {
        return List.of();
    }

    @Override
    public <S extends Student> List<S> findAll(Example<S> example, Sort sort) {
        return List.of();
    }

    @Override
    public <S extends Student> Page<S> findAll(Example<S> example, Pageable pageable) {
        return null;
    }

    @Override
    public <S extends Student> long count(Example<S> example) {
        return 0;
    }

    @Override
    public <S extends Student> boolean exists(Example<S> example) {
        return false;
    }

    @Override
    public <S extends Student, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
        return null;
    }

    @Override
    public <S extends Student> S save(S entity) {
        return null;
    }

    @Override
    public <S extends Student> List<S> saveAll(Iterable<S> entities) {
        return List.of();
    }

    @Override
    public Optional<Student> findById(Integer integer) {
        return Optional.empty();
    }

    @Override
    public boolean existsById(Integer integer) {
        return false;
    }

    @Override
    public @NotNull List<Student> findAll() {
        return List.of();
    }

    @Override
    public List<Student> findAllById(@NotNull Iterable<Integer> integers) {
        return List.of();
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public void deleteById(@NotNull Integer integer) {

    }

    @Override
    public void delete(@NotNull Student entity) {

    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> integers) {

    }

    @Override
    public void deleteAll(@NotNull Iterable<? extends Student> entities) {

    }

    @Override
    public void deleteAll() {

    }

    @Override
    public List<Student> findAll(Sort sort) {
        return List.of();
    }

    @Override
    public Page<Student> findAll(Pageable pageable) {
        return null;
    }
}
