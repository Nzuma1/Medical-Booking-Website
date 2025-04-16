import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiFillGithub,
  AiOutlineInstagram,
} from "react-icons/ai";

const socialLinks = [
  {
    path: "https://github.com/Nzuma1",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://x.com/killerman_jaro",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.youtube.com/channel/UC9G6ytGFCh_QwFVSbzVBgkg",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.linkedin.com/in/isadianzuma/",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  {
    path: "/",
    display: "About Us",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/",
    display: "Blog",
  },
];

const quickLinks02 = [
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/",
    display: "Request an Appointment",
  },
  {
    path: "/",
    display: "Find a Location",
  },
  {
    path: "/",
    display: "Get an Opinion",
  },
];

const quickLinks03 = [
  {
    path: "/",
    display: "Donate",
  },
  {
    path: "/",
    display: "Contact Us",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer pb-16 pt-10">
      <div className="container">
        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
          <div>
            <img src={logo} alt="" />

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 text-white border border-solid border-white rounded-full flex items-center
                justify-center group hover:bg-primaryColor hover:border-none"
                  onClick={handleScrollToTop}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-white">
              Quick Links
            </h2>

            <ul>
              {quickLinks01.map((item, index) => (
                <li key={index} className=" mb-4">
                  <Link
                    to={item.path}
                    onClick={handleScrollToTop}
                    className="text-[16px] leading-7 font-[400] text-white"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-white">
              I want to:
            </h2>

            <ul>
              {quickLinks02.map((item, index) => (
                <li key={index} className=" mb-4">
                  <Link
                    to={item.path}
                    onClick={handleScrollToTop}
                    className="text-[16px] leading-7 font-[400] text-white"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-white">
              Support
            </h2>

            <ul>
              {quickLinks03.map((item, index) => (
                <li key={index} className=" mb-4">
                  <Link
                    to={item.path}
                    onClick={handleScrollToTop}
                    className="text-[16px] leading-7 font-[400] text-white"
                  >
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-[12px] leading-7 font-[400] text-textColor mt-4 text-center">
          Copyright © {year} developed and designed by Isadia Nzuma all rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
