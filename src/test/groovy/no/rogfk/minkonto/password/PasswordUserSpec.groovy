package no.rogfk.minkonto.password

import spock.lang.Specification

import javax.naming.Name

class PasswordUserSpec extends Specification {

    def "Create with dn"() {
        when:
        PasswordUser passwordUser = new PasswordUser(dn: Mock(Name) {
            toString() >> 'mock=name'
        })
        def dn = passwordUser.getDn()

        then:
        dn == 'mock=name'
    }

    def "Create without dn"() {
        when:
        PasswordUser passwordUser = new PasswordUser()
        def dn = passwordUser.getDn()

        then:
        dn == null

    }
}
