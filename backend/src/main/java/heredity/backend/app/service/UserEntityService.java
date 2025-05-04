package heredity.backend.app.service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import heredity.backend.app.entities.UserEntity;
import heredity.backend.app.repository.UserRepository;

@Service
public class UserEntityService {

    @Autowired
    private UserRepository usersRepository;

    private final BCryptPasswordEncoder cryptPasswordEncoder = new BCryptPasswordEncoder(12);


    public UserEntity insert(UserEntity entity) throws RuntimeException {
        if (entity == null) {
            throw new RuntimeException("User information is missing");
        }
        checkExistence(entity.getUsername());
        entity.setId(Calendar.getInstance().getTimeInMillis());
        entity.setRole("USER");
        entity.setPassword(this.cryptPasswordEncoder.encode(entity.getPassword()));
        return usersRepository.save(entity);
    }

    public UserEntity findById(Long id) throws RuntimeException {
        return usersRepository.findById(id).orElseThrow(() -> {
            throw new RuntimeException("UserEntity not found by: " + id);
        });
    }

    public List<UserEntity> findAll() {
        return usersRepository.findAll();
    }

    public UserEntity update(UserEntity entity) throws RuntimeException {
        Optional<UserEntity> entityFound = usersRepository.findById(entity.getId());

        if (entityFound.isEmpty()) {
            throw new RuntimeException("UserEntity not found.");
        }else {
            UserEntity UserEntity = entityFound.get();

            if (entity.getId() != null) {
                UserEntity.setId(entity.getId());
            }
            if(entity.getName() != null){
                UserEntity.setName(entity.getName());
            }
            
            if (entity.getUsername() != null){
                UserEntity.setUsername(entity.getUsername());
            }
            if (entity.getPassword() != null){
                UserEntity.setPassword(this.cryptPasswordEncoder.encode(entity.getPassword()));
            }
            UserEntity.setRole("USER");
            return usersRepository.save(UserEntity);
        }
    }

    public void deleteById(Long id) throws RuntimeException {
        if (!usersRepository.existsById(id)){
            throw new RuntimeException("UserEntity not found");
        }
        usersRepository.deleteById(id);
    }

    private void checkExistence(String username) throws RuntimeException{
        for (UserEntity users: usersRepository.findAll()){
            if(users.getUsername().equalsIgnoreCase(username)){
                throw new RuntimeException("Existing user");
            }
        }
    }
}
