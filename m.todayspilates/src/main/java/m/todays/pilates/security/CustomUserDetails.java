package m.todays.pilates.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import m.todays.pilates.common.CommonData;
import m.todays.pilates.domain.user.User;

public class CustomUserDetails implements UserDetails {
	 
    private static final long serialVersionUID = -4450269958885980297L;
    private String username;
    private String username2;
    private String password;
    private String compCd;
    private String storCd;
    private String userLv;
    private String misMenuTy;
    private String misUserGrp;
    private String memberNo;
    private String empNo;
    private String hpNo;
    
    public String getCompCd() {
		return compCd;
	}

	public String getHpNo() {
		return hpNo;
	}

	public void setHpNo(String hpNo) {
		this.hpNo = hpNo;
	}

	public void setCompCd(String compCd) {
		this.compCd = compCd;
	}

	public String getStorCd() {
		return storCd;
	}

	public void setStorCd(String storCd) {
		this.storCd = storCd;
	}

	public String getUserLv() {
		return userLv;
	}

	public void setUserLv(String userLv) {
		this.userLv = userLv;
	}

	public String getMemberNo() {
		return memberNo;
	}

	public void setMemberNo(String memberNo) {
		this.memberNo = memberNo;
	}

	public String getEmpNo() {
		return empNo;
	}

	public void setEmpNo(String empNo) {
		this.empNo = empNo;
	}

	
    
    public CustomUserDetails(User user) {
    	this.compCd = user.compCd;
    	this.storCd = user.storCd;
    	this.userLv = user.userLv;
    	this.username = user.userCd;
    	this.username2 = user.userNm;
    	this.password = user.userPs;
    	this.misMenuTy = user.misMenuTy;
    	this.misUserGrp = user.misUserGrp;
    	this.memberNo = user.memberNo;
    	this.empNo = user.empNo;
    	this.hpNo = user.hpNo;
    }
     
    public CustomUserDetails(String userName, String password)
    {
        this.username = userName;
        this.password = password;
    }
     
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority(this.userLv));
        if ( this.userLv.equals(CommonData.UserLv.SYSTEM)) { // 관리자
        	authorities.add(new SimpleGrantedAuthority(CommonData.ROLE.ADMIN));
        	authorities.add(new SimpleGrantedAuthority(CommonData.ROLE.TEACHER));
			authorities.add(new SimpleGrantedAuthority(CommonData.ROLE.USER));
		} else if ( this.userLv.equals(CommonData.UserLv.TEACHER)) { // 선생님
			authorities.add(new SimpleGrantedAuthority(CommonData.ROLE.TEACHER));
		} else { // 회원
			authorities.add(new SimpleGrantedAuthority(CommonData.ROLE.USER));
		}
        return authorities;
    }
  
    @Override
    public String getPassword() {
        return password;
    }
  
    @Override
    public String getUsername() {
        return username;
    }
  
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }
  
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }
  
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }
  
    @Override
    public boolean isEnabled() {
        return true;
    }
    
    public String getUsername2() {
    	return this.username2;
    }
    
    public String getMisMenuTy() {
    	return this.misMenuTy;
    }
    
    public String getMisUserGrp() {
    	return this.misUserGrp;
    }
 }