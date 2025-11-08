import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/userRedux";

/* ====== Styled Components for Navigation Bar ====== */
const Header = styled.header`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #f8f6f2;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  background-color: #f8f6f1;
`;

const LogoImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 0.5rem;
  background-color: #f8f6f1;

  @media (max-width: 768px) {
    width: 100px;
  }

  @media (max-width: 480px) {
    width: 80px;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinkStyled = styled(Link)`
  text-decoration: none;
  color: #000;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const SubscribeButton = styled(Link)`
  background: #fece04;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: background 0.2s ease;

  &:hover {
    background: #e5b803;
    color: #fff;
  }

  &:focus {
    outline: none;
    color: #fff;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SignOutButton = styled.button`
  background: #fece04;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #e5b803;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fece04;
    color: #fff;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    font-size: 1.3rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:active {
      background: #e5b803;
    }
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

const MobileMenuContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    background: #fff;
    position: absolute;
    top: 65px;
    right: 1rem;
    left: 1rem;
    z-index: 999;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    max-height: calc(100vh - 90px);
    overflow-y: auto;
  }

  @media (max-width: 480px) {
    top: 60px;
    right: 0.5rem;
    left: 0.5rem;
    padding: 0.75rem;
  }
`;

const MobileMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileMenuItem = styled.li`
  margin: 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const MobileMenuLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  font-weight: 500;
  display: block;
  padding: 0.875rem 0.5rem;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f6f2;
  }

  &:active {
    background: #f0ede5;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.75rem 0.5rem;
  }
`;

const MobileAuthButton = styled(Link)`
  display: block;
  background: #fece04;
  color: #fff;
  padding: 0.875rem 1rem;
  margin-top: 0.75rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: #e5b803;
    color: #fff;
  }

  &:active {
    background: #d4a903;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
`;

const MobileSignOutButton = styled.button`
  display: block;
  width: 100%;
  background: #fece04;
  color: #fff;
  padding: 0.875rem 1rem;
  margin-top: 0.75rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  transition: background 0.2s ease;

  &:hover {
    background: #e5b803;
    color: #fff;
  }

  &:active {
    background: #d4a903;
  }

  @media (max-width: 480px) {
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
  }
`;

const NavTech = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    setIsMenuOpen(false);
  };

  return (
    <>
      <Header>
        <Logo to="/">
          <LogoImage src={logo} alt="شعار درس السلوم" />
        </Logo>

        <NavLinks>
          <NavLinkStyled to="/job">تصفّح</NavLinkStyled>
          <NavLinkStyled to="/audio">المساعدة</NavLinkStyled>
          <NavLinkStyled to="/personality">
            أضف عيادتك على منصة وقتنا
          </NavLinkStyled>
          <NavLinkStyled to="/main/إنتاجية%20عالية:%20مفتاح%20النجاح%20والتوازن%20في%20الحياة">
            جميع العيادات
          </NavLinkStyled>
        </NavLinks>

        {currentUser ? (
          <SignOutButton onClick={() => dispatch(signOut())}>
            تسجيل الخروج
          </SignOutButton>
        ) : (
          <SubscribeButton to="/login">
            تسجيل الدخول / حساب جديد
          </SubscribeButton>
        )}

        <MenuButton onClick={toggleMenu}>{isMenuOpen ? "✕" : "☰"}</MenuButton>
      </Header>

      {isMenuOpen && (
        <MobileMenuContainer>
          <MobileMenuList>
            <MobileMenuItem>
              <MobileMenuLink to="/job" onClick={toggleMenu}>
                تصفّح
              </MobileMenuLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileMenuLink to="/audio" onClick={toggleMenu}>
                المساعدة
              </MobileMenuLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileMenuLink to="/personality" onClick={toggleMenu}>
                أضف عيادتك على منصة وقتنا
              </MobileMenuLink>
            </MobileMenuItem>
            <MobileMenuItem>
              <MobileMenuLink
                to="/main/إنتاجية%20عالية:%20مفتاح%20النجاح%20والتوازن%20في%20الحياة"
                onClick={toggleMenu}
              >
                جميع العيادات
              </MobileMenuLink>
            </MobileMenuItem>
          </MobileMenuList>

          {currentUser ? (
            <MobileSignOutButton onClick={handleSignOut}>
              تسجيل الخروج
            </MobileSignOutButton>
          ) : (
            <MobileAuthButton to="/login" onClick={toggleMenu}>
              تسجيل الدخول / حساب جديد
            </MobileAuthButton>
          )}
        </MobileMenuContainer>
      )}
    </>
  );
};

export default NavTech;
