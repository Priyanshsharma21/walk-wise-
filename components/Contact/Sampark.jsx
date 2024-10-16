import React from "react";
import { Row, Col } from "antd";
import styles from "./Sampark.module.css";
import Ticker from "./Ticker";
import { navbarData } from "@/constants";
import FramerMagnetic from "../FramerMagnetic";

const Sampark = () => {
  const handleRedirect = () => {
    window.open("https://lamarcaitaly.com/collections/oxford-2", "_blank");
  };
  return (
    <div className={styles.main}>
      <Row className="w-full h-full">
        <Col span={24}>
          <Ticker />
        </Col>
        <Row className="w-full h-full">
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="flex justify-center items-center"
          >
            <section className={styles.mapSection}>
              <div className={styles.experience}>Shop now</div>
              <div className={styles.shopImg}>
                <img
                  src="https://res.cloudinary.com/dlxpea208/image/upload/v1729075202/Screenshot_2024-10-16_160632_1_qskrn2.png"
                  width="100%"
                  height="450"
                  className={styles.map}
                  onClick={handleRedirect}
                />
              </div>
            </section>
          </Col>
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <section className="w-full h-full flex justify-center items-center">
              <section className={styles.mapSection}>
                <div className={styles.experience}>Experience in stores</div>
                <div className={styles.shopImg}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.695731528204!2d80.2166199!3d12.991302600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526765f770d9af%3A0x48653d3e62a674b8!2sLa%20Marca%20-%20Handcrafted%20Footwear%20%26%20Accessories!5e0!3m2!1sen!2sin!4v1728911229544!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    className={styles.map}
                  />
                </div>
              </section>
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
            </section>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default Sampark;
