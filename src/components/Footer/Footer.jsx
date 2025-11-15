import React from "react";
import { FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Button } from "../../globalStyles";
import {
  FooterContainer,
  FooterSubscription,
  FooterSubText,
  Form,
  FormInput,
  FooterLinksContainer,
  FooterLinksWrapper,
  FooterLinksItems,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialIcons,
  SocialIconLink,
  NavLogo,
  NavbarContainerImg,
} from "./Footer.elements";
import { FaTiktok } from "react-icons/fa";
import Logo from "../../assets/logoWhite.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const LinkDis = [
    {
      title: "من نحن",
      path: {
        name1: "كيف يعمل",
        path1: "/howItWork",
        name2: "اخر الاخبار",
        path2: "/news",
      },
    },
    {
      title: "الشروط والاحكام",
      path: {
        name1: "اطلع عليها",
        path1: "/policy",
        name2: "سياسة الخصوصية",
        path2: "/privacy",
      },
    },
    {
      title: "تواصل معنا",
      path: {
        name1: "السوشل ميديا",
        path1: "/social",
        name2: "اتصل بنا",
        path2: "/contact",
      },
    },
    {
      title: "الخدمات",
      path: {
        name1: "حجز موعد",
        path1: "/book",
        name2: "جميع المزودين",
        path2: "/providers",
      },
    },
  ];

  return (
    <FooterContainer>
      <FooterSubscription>
        <FooterSubText>
          انضم لايميلنا الخاص واحصل على افضل المنتجات
        </FooterSubText>
        <Form>
          <FormInput name="email" type="email" placeholder="اكتب ايميلك" />
          <Button>اشترك</Button>
        </Form>
      </FooterSubscription>
      <FooterLinksContainer>
        {LinkDis.map((item, index) => {
          return (
            <FooterLinksWrapper key={index}>
              <FooterLinksItems>
                <FooterLinkTitle>{item.title}</FooterLinkTitle>
                <FooterLink to={item.path.path1}>{item.path.name1}</FooterLink>
                <FooterLink to={item.path.path2}>{item.path.name2}</FooterLink>
              </FooterLinksItems>
            </FooterLinksWrapper>
          );
        })}
      </FooterLinksContainer>
      <SocialMedia>
        <SocialMediaWrap>
          <NavLogo>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <NavbarContainerImg src={Logo} />
            </Link>
          </NavLogo>
          <SocialIcons>
            <SocialIconLink href="/" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIconLink>
            <SocialIconLink
              href={"https://www.youtube.com/@dralsallum"}
              target="_blank"
              aria-label="Youtube"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </SocialIconLink>
            <SocialIconLink href="/" target="_blank" aria-label="Tiktok">
              <FaTiktok />
            </SocialIconLink>
            <SocialIconLink
              href={"https://www.twitter.com/@dralsallum"}
              target="_blank"
              aria-label="Twitter"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
};

export default Footer;
