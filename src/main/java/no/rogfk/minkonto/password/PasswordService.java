package no.rogfk.minkonto.password;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.NamingException;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    @Autowired
    private LdapTemplate ldapTemplate;

    public boolean updatePassword(PasswordUser passwordUser) {
        if (passwordUserExists(passwordUser)) {
            try {
                ldapTemplate.update(passwordUser);
                return true;
            } catch (NamingException e) {
                return false;
            }
        }
        return false;
    }

    public PasswordUser getPasswordUser(String dn) {
        try {
            return ldapTemplate.findByDn(LdapNameBuilder.newInstance(dn).build(), PasswordUser.class);
        } catch (org.springframework.ldap.NamingException e) {
            return null;
        }
    }

    public boolean passwordUserExists(PasswordUser passwordUser) {
        try {
            ldapTemplate.lookup(LdapNameBuilder.newInstance(passwordUser.getDn()).build());
            return true;
        } catch (org.springframework.ldap.NamingException e) {
            return false;
        }
    }

}
