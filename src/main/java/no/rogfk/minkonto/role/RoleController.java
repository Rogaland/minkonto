package no.rogfk.minkonto.role;

import com.google.common.collect.ImmutableMap;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@Api(tags = "Role")
@CrossOrigin(origins = "*")
@RequestMapping(value = "/api/role", produces = MediaType.APPLICATION_JSON_VALUE)
public class RoleController {

    @GetMapping
    public ResponseEntity getRole(@RequestHeader(value = "x-role") String role) {
        return ResponseEntity.ok(ImmutableMap.of("role", role));
    }
}
