package no.rogfk.minkonto.password;


import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.google.common.collect.ImmutableMap.of;

@Slf4j
@RestController
@Api(tags = "UserProfile")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/password")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public PasswordUser getUser(@RequestHeader("x-dn") String dn) {
        return passwordService.getPasswordUser(dn);
    }

    @PutMapping
    public ResponseEntity setPassword(@RequestBody PasswordUser passwordUser) {
        if (passwordService.updatePassword(passwordUser)) {
            return ResponseEntity.status(HttpStatus.OK).body(of("status", "Passordet er oppdatert"));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(
                of("status", "Passordet ble ikke oppdatert. Sannsynligvis fordi passordet ikke tilfredstiller passordreglene.")
        );
    }


}
