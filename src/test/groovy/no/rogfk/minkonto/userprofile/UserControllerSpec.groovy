package no.rogfk.minkonto.userprofile

import com.fasterxml.jackson.databind.ObjectMapper
import com.github.spock.spring.utils.MockMvcSpecification
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc

import javax.naming.Name

class UserControllerSpec extends MockMvcSpecification {
    private MockMvc mockMvc
    private UserProfileService userProfileService
    private UserController controller

    void setup() {
        userProfileService = Mock(UserProfileService)
        controller = new UserController(userProfileService: userProfileService)
        mockMvc = standaloneSetup(controller)
    }

    def "Get user"() {
        when:
        def response = mockMvc.perform(get('/api/userprofile').header('x-dn', 'test-user'))

        then:
        1 * userProfileService.getUserProfile('test-user') >> new UserProfile()
        response.andExpect(status().isOk())
    }

    def "Update user successfully"() {
        given:
        def userProfile = new UserProfile(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
        def json = new ObjectMapper().writeValueAsString(userProfile)

        when:
        def response = mockMvc.perform(put('/api/userprofile').content(json).contentType(MediaType.APPLICATION_JSON))

        then:
        1 * userProfileService.updateUserProfile(userProfile) >> true
        response.andExpect(status().isOk())
    }

    def "Update user fails"() {
        given:
        def userProfile = new UserProfile(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
        def json = new ObjectMapper().writeValueAsString(userProfile)

        when:
        def response = mockMvc.perform(put('/api/userprofile').content(json).contentType(MediaType.APPLICATION_JSON))

        then:
        1 * userProfileService.updateUserProfile(userProfile) >> false
        response.andExpect(status().isNotFound())
    }
}
