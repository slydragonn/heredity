package heredity.backend.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import heredity.backend.app.entities.UserEntity;
import heredity.backend.app.service.UserEntityService;

@RestController
@RequestMapping("/users")
public class UserController {
@Autowired
    private UserEntityService userService;

    @PostMapping("/")
    public ResponseEntity<?> insert(@RequestBody UserEntity userEntity) {
        try {
            UserEntity newUserEntity = userService.insert(userEntity);
            return new ResponseEntity<>(newUserEntity, HttpStatus.CREATED);
        } catch (RuntimeException ex) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception ex) {
            return new ResponseEntity<>("An error occurred while creating the User.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<UserEntity>> getAllUserEntitys() {
        List<UserEntity> userEntities = userService.findAll();
        return ResponseEntity.ok(userEntities);
    }
}
