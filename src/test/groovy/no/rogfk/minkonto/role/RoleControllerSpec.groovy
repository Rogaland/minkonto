package no.rogfk.minkonto.role

import com.github.spock.spring.utils.MockMvcSpecification
import org.springframework.test.web.servlet.MockMvc

class RoleControllerSpec extends MockMvcSpecification {
    private MockMvc mockMvc
    private RoleController controller

    void setup() {
        controller = new RoleController()
        mockMvc = standaloneSetup(controller)
    }

    def "Get role"() {
        when:
        def response = mockMvc.perform(get('/api/role').header('x-role', 'test-role'))

        then:
        response.andExpect(status().isOk())
                .andExpect(jsonPathEquals('$.role', 'test-role'))
    }
}
