package com.group1.core.StudentManagement.repositories;

import com.group1.core.StudentManagement.models.Student;
import com.group1.core.StudentManagement.models.ClassYear;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles; // Optional: for specific test profiles

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat; // For fluent assertions

@DataJpaTest // Configures an in-memory database and Spring Data JPA repositories
@ActiveProfiles("test") // Optional: Use a specific application-test.properties for test DB setup
@DisplayName("StudentRepository Tests")
class StudentRepositoryTest {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TestEntityManager entityManager; // Used to manually persist entities for testing

    private Student student1, student2;

    @BeforeEach // Runs before each test method
    void setUp() {
        // Clear database before each test
        studentRepository.deleteAll();

        // Prepare test data
        student1 = new Student(1000001, "Alice Smith", "alice@example.com", ClassYear.ONE);
        student2 = new Student(1000002, "Bob Johnson", "bob@test.com", ClassYear.TWO);

        // Persist students using TestEntityManager to ensure they are in the database
        entityManager.persist(student1);
        entityManager.persist(student2);
        entityManager.flush(); // Flush pending changes to the database
    }

    @Test
    @DisplayName("Should find student by ID")
    void shouldFindStudentById() {
        Optional<Student> foundStudent = studentRepository.findById(student1.getId());
        assertThat(foundStudent).isPresent();
        assertThat(foundStudent.get().getName()).isEqualTo("Alice Smith");
    }

    @Test
    @DisplayName("Should find student by email")
    void shouldFindStudentByEmail() {
        Optional<Student> foundStudent = studentRepository.findByEmail("bob@test.com");
        assertThat(foundStudent).isPresent();
        assertThat(foundStudent.get().getName()).isEqualTo("Bob Johnson");
    }

    @Test
    @DisplayName("Should find students by name containing ignore case")
    void shouldFindStudentsByNameContainingIgnoreCase() {
        List<Student> students = studentRepository.findByNameContainingIgnoreCaseOrderByNameAsc("john");
        assertThat(students).hasSize(1);
        assertThat(students.get(0).getName()).isEqualTo("Bob Johnson");

        students = studentRepository.findByNameContainingIgnoreCaseOrderByNameAsc("smith");
        assertThat(students).hasSize(1);
        assertThat(students.get(0).getName()).isEqualTo("Alice Smith");

        students = studentRepository.findByNameContainingIgnoreCaseOrderByNameAsc("o"); // Both have 'o'
        assertThat(students).hasSize(2);
    }

    @Test
    @DisplayName("Should find students by year")
    void shouldFindStudentsByYear() {
        List<Student> studentsOne = studentRepository.findByYear(ClassYear.ONE);
        assertThat(studentsOne).hasSize(1);
        assertThat(studentsOne.get(0).getName()).isEqualTo("Alice Smith");

        List<Student> studentsTwo = studentRepository.findByYear(ClassYear.TWO);
        assertThat(studentsTwo).hasSize(1);
        assertThat(studentsTwo.get(0).getName()).isEqualTo("Bob Johnson");
    }

    @Test
    @DisplayName("Should search students by name and year")
    void shouldSearchStudentsByNameAndYear() {
        List<Student> students = studentRepository.searchStudentsByNameAndYear("smith", ClassYear.ONE);
        assertThat(students).hasSize(1);
        assertThat(students.get(0).getName()).isEqualTo("Alice Smith");
    }

    @Test
    @DisplayName("Should find students by email domain")
    void shouldFindStudentsByEmailDomain() {
        List<Student> students = studentRepository.findStudentsByEmailDomain("example.com");
        assertThat(students).hasSize(1);
        assertThat(students.get(0).getName()).isEqualTo("Alice Smith");
    }

    @Test
    @DisplayName("Should return empty optional for non-existent ID")
    void shouldReturnEmptyOptionalForNonExistentId() {
        Optional<Student> foundStudent = studentRepository.findById(9999999);
        assertThat(foundStudent).isNotPresent();
    }
}