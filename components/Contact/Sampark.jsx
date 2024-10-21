import React, { useState } from "react";
import { Row, Col } from "antd";
import styles from "./Sampark.module.css";
import Ticker from "./Ticker";
import {
  footerData,
  navbarData,
  privacyPolityData,
  tAndCData,
} from "@/constants";
import FramerMagnetic from "../FramerMagnetic";
import { Drawer } from "antd";
import LegalInfo from "../LegalInfo/LegalInfo";
import { useAnimeContext } from "@/context/animeContext";

const Sampark = () => {
  const [open, setOpen] = useState(false);
  const [legalInfoData, setLegalInfoData] = useState(null); // State to hold the selected legal info data
  const { setEnableSmoothScroll, enableSmoothScroll } = useAnimeContext();
  const handleRedirect = (url) => {
    window.open(url, "_blank");
  };

  // Function to show the drawer and set the corresponding data
  const handleClick = (title) => {
    if (title === "Terms & Conditions") {
      setLegalInfoData(tAndCData);
    } else if (title === "Privacy Policy") {
      setLegalInfoData(privacyPolityData);
    }
    setOpen(true);
    setEnableSmoothScroll(false);
  };

  const onClose = () => {
    setOpen(false);
    setEnableSmoothScroll(true);
  };

  return (
    <div className={styles.main}>
      <Row className="w-full h-full">
        <Col span={24}>
          <Ticker word={"EXPLORE NOW"} />
        </Col>
        <Row className="w-full h-full">
          {/* Shop Now Section */}
          <Col
            xl={12}
            lg={12}
            md={12}
            sm={24}
            xs={24}
            className="flex justify-center items-center"
          >
            <section
              className={styles.mapSection}
              onClick={() =>
                handleRedirect("https://lamarcaitaly.com/collections/oxford-2")
              }
            >
              <div className={styles.shopImg}>
                <img
                  src="https://res.cloudinary.com/dlxpea208/image/upload/v1729075202/Screenshot_2024-10-16_160632_1_qskrn2.png"
                  alt="Shop"
                />
                <div className={styles.overlay}>
                  <div className={styles.experienceText}>Shop Now</div>
                </div>
              </div>
            </section>
          </Col>

          {/* Experience in Stores Section */}
          <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <section className="w-full h-full flex justify-center items-center">
              <section
                className={styles.mapSection}
                onClick={() =>
                  handleRedirect(
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.695731528204!2d80.2166199!3d12.991302600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526765f770d9af%3A0x48653d3e62a674b8!2sLa%20Marca%20-%20Handcrafted%20Footwear%20%26%20Accessories!5e0!3m2!1sen!2sin!4v1728911229544!5m2!1sen!2sin"
                  )
                }
              >
                <div className={styles.shopImg}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.695731528204!2d80.2166199!3d12.991302600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526765f770d9af%3A0x48653d3e62a674b8!2sLa%20Marca%20-%20Handcrafted%20Footwear%20%26%20Accessories!5e0!3m2!1sen!2sin!4v1728911229544!5m2!1sen!2sin"
                    className={styles.map}
                    width="100%"
                    height="450"
                  />
                  <div className={styles.overlay}>
                    <div className={styles.experienceText}>Experience Now</div>
                  </div>
                </div>
              </section>
            </section>
          </Col>
        </Row>

        <Col span={24}>
          <div className={styles.footerBox}>
            <section className={styles.legalInfoBox}>
              {footerData.legalInfo.map((item) => (
                <div
                  key={item.id}
                  className={styles.legalInfo}
                  onClick={() => handleClick(item.title)}
                >
                  {item.title}
                </div>
              ))}
            </section>
            <section className={styles.socialMedia}>
              {navbarData.socialMedia.map((item, i) => (
                <FramerMagnetic key={i} link={item.link}>
                  <item.icon className={styles.icons} />
                </FramerMagnetic>
              ))}
            </section>
          </div>
        </Col>
      </Row>

      <Drawer onClose={onClose} open={open} width="100%" height="100%">
        <div className={styles.gradientBackground}></div>
        <div className={styles.glassLayer}></div>
        <div className={styles.scrollContainer}>
          <LegalInfo data={legalInfoData} setOpen={setOpen} />
        </div>
      </Drawer>
    </div>
  );
};

export default Sampark;
