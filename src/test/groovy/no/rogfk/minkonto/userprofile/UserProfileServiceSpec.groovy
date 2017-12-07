package no.rogfk.minkonto.userprofile

import org.springframework.ldap.NamingException
import org.springframework.ldap.core.LdapTemplate
import spock.lang.Specification

import javax.naming.Name
import javax.naming.ldap.LdapName

class UserProfileServiceSpec extends Specification {
    private UserProfileService userProfileService
    private LdapTemplate ldapTemplate

    void setup() {
        ldapTemplate = Mock(LdapTemplate)
        userProfileService = new UserProfileService(ldapTemplate: ldapTemplate)
    }

    def "Update user profile existing value"() {
        given:
        def userProfile = new UserProfile(dn: Mock(Name) {
            toString() >> 'mock=name'
        })

        when:
        def updated = userProfileService.updateUserProfile(userProfile)

        then:
        1 * ldapTemplate.lookup(_ as LdapName)
        1 * ldapTemplate.update(userProfile)
        updated
    }

    def "Update user profile, throw exception when user does not exist"() {
        given:
        def userProfile = new UserProfile(dn: Mock(Name) {
            toString() >> 'mock=name'
        })

        when:
        def updated = userProfileService.updateUserProfile(userProfile)

        then:
        1 * ldapTemplate.lookup(_ as LdapName) >> { throw new NamingException('test-exception') {} }
        0 * ldapTemplate.update(userProfile)
        !updated
    }

    def "Get user profile"() {
        given:
        def userProfile = new UserProfile()

        when:
        def returnedUserProfile = userProfileService.getUserProfile('mock=user')

        then:
        1 * ldapTemplate.findByDn(_ as Name, UserProfile) >> userProfile
        returnedUserProfile == userProfile
    }
}
