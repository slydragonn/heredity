package heredity.backend.app.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import heredity.backend.app.entities.UserEntity;


@Repository
public interface UserRepository extends MongoRepository<UserEntity, Long>{
    UserEntity findByUsername(String string);
}
