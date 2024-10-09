import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Contact.module.css";
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

  return (
    <div className={`w-full h-screen relative ${styles.contactContainer}`}>
      <div style={{ height: "100vh" }}>
        <Row style={{ height: "100%" }} gutter={[0, 0]}>
          <Col
            className={styles.contactCol1}
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <video
                className={styles.backgroundVideo}
                src="https://res.cloudinary.com/dlxpea208/video/upload/v1727342704/test-Vbit-01_fwlgw0.mp4"
                autoPlay
                loop
                muted
                playsInline
              ></video>
              <section className={styles.mapSection}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55991.10808332078!2d77.0397095484314!3d28.70626655959539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d06a18fd99255%3A0x82d87d985b01ba3d!2sKrishan%20Vihar%2C%20Delhi%2C%20110086!5e0!3m2!1sen!2sin!4v1708196559261!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  className={styles.map}
                />
              </section>
            </div>
          </Col>

          <Col
            className={styles.contactCol2}
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ backgroundColor: "#fff" }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ffebcd",
                }}
              >
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <div
                    className={`absolute inset-0 flex justify-center items-center ${styles.formContainer}`}
                  >
                    <form
                      ref={form}
                      onSubmit={handleSubmit}
                      className={styles.formMain}
                    >
                      <div className={styles.contactMainBox}>
                        <div className={styles.contactInput}>
                          {/* Name field */}
                          <div className="mb-4">
                            <input
                              type="text"
                              name="name"
                              placeholder="Name"
                              className={`${styles.inputMain} w-full p-4 border rounded-lg focus:outline-none`}
                              onChange={handleChange}
                              value={formData.name}
                              required
                            />
                          </div>

                          {/* Email field */}
                          <div className="mb-4">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              className={`${styles.inputMain} w-full p-4 border rounded-lg focus:outline-none`}
                              onChange={handleChange}
                              value={formData.email}
                              required
                            />
                          </div>

                          {/* Message field */}
                          <div className="mb-6">
                            <textarea
                              name="message"
                              placeholder="Message"
                              className={`${styles.inputMain} ${styles.textArea} w-full p-4 border rounded-lg focus:outline-none`}
                              onChange={handleChange}
                              value={formData.message}
                              required
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className={`${styles.submitBtn} w-full p-4 rounded-lg`}
                            disabled={loading}
                          >
                            {loading ? "Sending..." : "Send Message"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Col>
                <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                  <section className={styles.socialMedia}>
                    {navbarData.socialMedia.map((item, i) => (
                      <FramerMagnetic key={i}>
                        <item.icon
                          className={styles.icons}
                          onClick={() => handleClick}
                        />
                      </FramerMagnetic>
                    ))}
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
