import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Contact.module.css";
import btnStyle from "./Button.module.css";

import { Col, Row } from "antd";
import { navbarData } from "../../constants";
import FramerMagnetic from "../FramerMagnetic";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleClick = (url) => {
    window.open(url, "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        "service_wbrdcli",
        "template_ghdja7d",
        form.current,
        "gbPZu0yZl9NphdAfF"
      )
      .then(
        () => {
          toast.success("Details Submitted.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          resetForm();
          setLoading(false);
        },
        (error) => {
          toast.error("Oops! Something went wrong.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          });
          resetForm();
          setLoading(false);
        }
      );
  };

  const handleLamarca = () => {
    window.open("https://lamarcaitaly.com/", "_blank");
  };

  return (
    <div className={`w-full h-screen relative ${styles.contactContainer}`}>
      <div style={{ height: "100vh" }}>
        <Row style={{ height: "100%" }} gutter={[0, 0]}>
          <Col
            className={styles.contactCol2}
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
          >
            <Row className="w-full h-full">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <div className={btnStyle.showButton} onClick={handleLamarca}>
                  <span class="text">SHOP NOW</span>
                  <span>DISCOVER</span>
                </div>
              </div>
              <div>
                <section className={styles.socialMedia}>
                  {navbarData.socialMedia.map((item, i) => (
                    <FramerMagnetic key={i} link={item.link}>
                      <item.icon
                        className={styles.icons}
                        onClick={() => handleClick}
                      />
                    </FramerMagnetic>
                  ))}
                </section>
              </div>
            </Row>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.rightSide}>
              <video
                className={styles.backgroundVideo}
                src="https://res.cloudinary.com/dlxpea208/video/upload/v1727342704/test-Vbit-01_fwlgw0.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <Row className="w-full h-full absolute top-0">
                <Col span={24}>
                  <section className={styles.rightSideSection}>
                    <div className={styles.wrapper}>
                      <svg className={styles.svg}>
                        <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                          EXPERIENCE
                        </text>
                      </svg>
                    </div>

                    <div className={styles.wrapper}>
                      <svg className={styles.svg}>
                        <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                          IN SHOP
                        </text>
                      </svg>
                    </div>
                  </section>
                </Col>
                <Col span={24}>
                  <section className={styles.mapSection}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.695731528204!2d80.2166199!3d12.991302600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526765f770d9af%3A0x48653d3e62a674b8!2sLa%20Marca%20-%20Handcrafted%20Footwear%20%26%20Accessories!5e0!3m2!1sen!2sin!4v1728911229544!5m2!1sen!2sin"
                      width="100%"
                      height="450"
                      className={styles.map}
                    />
                  </section>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
