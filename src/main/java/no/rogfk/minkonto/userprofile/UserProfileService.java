package no.rogfk.minkonto.userprofile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ldap.core.LdapTemplate;
import org.springframework.ldap.support.LdapNameBuilder;
import org.springframework.stereotype.Service;

import javax.naming.directory.SearchControls;

@Service
public class UserProfileService {

    private final SearchControls searchControls;

    @Autowired
    private LdapTemplate ldapTemplate;

    public UserProfileService() {
        searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    }

    public boolean updateUserProfile(UserProfile passwordUserProfile) {
        if (userProfileExists(passwordUserProfile)) {
            ldapTemplate.update(passwordUserProfile);
            return true;
        }
        return false;
    }

    public boolean userProfileExists(UserProfile passwordUserProfile) {
        try {
            ldapTemplate.lookup(LdapNameBuilder.newInstance(passwordUserProfile.getDn()).build());
            return true;
        } catch (org.springframework.ldap.NamingException e) {
            return false;
        }
    }

    public UserProfile getUserProfile(String dn) {
        try {
            return ldapTemplate.findByDn(LdapNameBuilder.newInstance(dn).build(), UserProfile.class);
        } catch (org.springframework.ldap.NamingException e) {
            return null;
        }
    }

}
