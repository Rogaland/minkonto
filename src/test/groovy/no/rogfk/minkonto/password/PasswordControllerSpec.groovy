package no.rogfk.minkonto.password

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.spock.spring.utils.MockMvcSpecification
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc

import javax.naming.Name

class PasswordControllerSpec extends MockMvcSpecification {
    private MockMvc mockMvc
    private PasswordController controller
    private PasswordService passwordService

    void setup() {
        passwordService = Mock(PasswordService)
        controller = new PasswordController(passwordService: passwordService)
        mockMvc = standaloneSetup(controller)
    }

    def "Get user"() {
        when:
        def response = mockMvc.perform(get('/api/password').header('x-dn', 'test-dn'))

        then:
        1 * passwordService.getPasswordUser('test-dn') >> new PasswordUser(firstName: 'test', lastName: 'testesen')
        response.andExpect(status().isOk())
                .andExpect(jsonPathEquals('$.firstName', 'test'))
                .andExpect(jsonPathEquals('$.lastName', 'testesen'))
    }

    def "Set password, update successfully"() {
        given:
        def passwordUser = new PasswordUser(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
        def json = new ObjectMapper().writeValueAsString(passwordUser)

        when:
        def response = mockMvc.perform(put('/api/password').content(json).contentType(MediaType.APPLICATION_JSON))

        then:
        1 * passwordService.updatePassword(passwordUser) >> true
        response.andExpect(status().isOk())
    }

    def "Set password, update failed"() {
        given:
        def passwordUser = new PasswordUser(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
        def json = new ObjectMapper().writeValueAsString(passwordUser)

        when:
        def response = mockMvc.perform(put('/api/password').content(json).contentType(MediaType.APPLICATION_JSON))

        then:
        1 * passwordService.updatePassword(passwordUser) >> false
        response.andExpect(status().isConflict())
    }
}
