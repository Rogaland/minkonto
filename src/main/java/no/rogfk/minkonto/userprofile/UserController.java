package no.rogfk.minkonto.userprofile;


import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@Api(tags = "UserProfile")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/userprofile")
public class UserController {

    @Autowired
    UserProfileService userProfileService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public UserProfile getUser(@RequestHeader(value = "x-dn") String dn) {

        return userProfileService.getUserProfile(dn);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity updateUser(@RequestBody UserProfile passwordUser) {
        log.info("UserProfile: {}", passwordUser);

        if (userProfileService.updateUserProfile(passwordUser)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
