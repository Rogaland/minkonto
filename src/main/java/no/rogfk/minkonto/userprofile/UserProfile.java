package no.rogfk.minkonto.userprofile;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import org.springframework.ldap.odm.annotations.Attribute;
import org.springframework.ldap.odm.annotations.Entry;
import org.springframework.ldap.odm.annotations.Id;
import org.springframework.ldap.support.LdapNameBuilder;

import javax.naming.Name;

@Data
@ApiModel
@Entry(objectClasses = {"inetOrgPerson", "organizationalPerson", "person", "top"})
public class UserProfile {

    @ApiModelProperty(value = "DN of the client. This is automatically set.")
    @Id
    private Name dn;

    @ApiModelProperty(value = "Username for the client.")
    @Attribute(name = "cn")
    private String cn;

    @Attribute(name = "givenName")
    private String firstName;

    @Attribute(name = "sn")
    private String lastName;

    @Attribute(name = "mail")
    private String mail;

    @Attribute(name = "brfkDisplayNameLocation")
    private String displayNameLocation;

    @Attribute(name = "title")
    private String title;

    @Attribute(name = "mobile")
    private String mobile;

    @Attribute(name = "brfkPublicMobile")
    private String publicMobile;

    @Attribute(name = "telephonenumber")
    private String officePhone;

    @Attribute(name = "brfkAGRessursnummer")
    private String employeeNumber;

    @Attribute(name = "brfkInternalPhone")
    private String internalPhone;

    public String getDn() {
        if (dn != null) {
            return dn.toString();
        } else {
            return null;
        }
    }

    public void setDn(Name dn) {
        this.dn = dn;
    }
    public void setDn(String dn) {
        this.dn = LdapNameBuilder.newInstance(dn).build();
    }

}
