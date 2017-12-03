package no.rogfk.minkonto.password;

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
public class PasswordUser {

    @ApiModelProperty(value = "DN of the client. This is automatically set.")
    @Id
    private Name dn;

    @Attribute(name = "userPassword")
    private String password;

    @Attribute(name = "cn")
    private String cn;

    @Attribute(name = "givenName")
    private String firstName;

    @Attribute(name = "sn")
    private String lastName;

    public String getDn() {
        if (dn != null) {
            return dn.toString();
        } else {
            return null;
        }
    }

    public void setDn(String dn) {
        this.dn = LdapNameBuilder.newInstance(dn).build();
    }

    public void setDn(Name dn) {
        this.dn = dn;
    }


}
