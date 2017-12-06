package no.rogfk.minkonto.password

import org.springframework.ldap.NamingException
import org.springframework.ldap.core.LdapTemplate
import spock.lang.Specification

import javax.naming.Name
import javax.naming.ldap.LdapName

class PasswordServiceSpec extends Specification {
    private PasswordService passwordService
    private LdapTemplate ldapTemplate
    private PasswordUser passwordUser

    void setup() {
        ldapTemplate = Mock(LdapTemplate)
        passwordService = new PasswordService(ldapTemplate: ldapTemplate)

        passwordUser = new PasswordUser(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
    }

    def "Update password successfully"() {
        when:
        def updated = passwordService.updatePassword(passwordUser)

        then:
        1 * ldapTemplate.update(passwordUser)
        updated
    }

    def "Update password failed with exception"() {
        when:
        def updated = passwordService.updatePassword(passwordUser)

        then:
        1 * ldapTemplate.update(passwordUser) >> { throw new NamingException('test exception') {} }
        !updated
    }

    def "Update password failed because user does not exist"() {
        when:
        def updated = passwordService.updatePassword(passwordUser)

        then:
        1 * ldapTemplate.lookup(_ as LdapName) >> { throw new NamingException('test exception') {} }
        !updated
    }

    def "Get password user"() {
        when:
        def response = passwordService.getPasswordUser('mock=name')

        then:
        1 * ldapTemplate.findByDn(_ as LdapName, _ as Class) >> passwordUser
        response == passwordUser
    }
}
