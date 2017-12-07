package no.rogfk.minkonto.userprofile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.NamingException;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private LdapTemplate ldapTemplate;

    public boolean updateUserProfile(UserProfile passwordUserProfile) {
        if (userProfileExists(passwordUserProfile)) {
            ldapTemplate.update(passwordUserProfile);
            return true;
        }
        return false;
    }

    private boolean userProfileExists(UserProfile passwordUserProfile) {
        try {
            ldapTemplate.lookup(LdapNameBuilder.newInstance(passwordUserProfile.getDn()).build());
            return true;
        } catch (NamingException e) {
            return false;
        }
    }

    public UserProfile getUserProfile(String dn) {
        try {
            return ldapTemplate.findByDn(LdapNameBuilder.newInstance(dn).build(), UserProfile.class);
        } catch (NamingException e) {
            return null;
        }
    }

}
