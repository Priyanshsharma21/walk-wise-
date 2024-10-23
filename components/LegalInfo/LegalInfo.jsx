import React from "react";
import styles from "./LegalInfo.module.css";
import { RxCross1 } from "react-icons/rx";
import { useAnimeContext } from "@/context/animeContext";
import { FaHandPointRight } from "react-icons/fa";
import { VscDebugBreakpointData } from "react-icons/vsc";

const LegalInfo = ({ data, setOpen }) => {
  const { setEnableSmoothScroll } = useAnimeContext();
  const makeItRight = () => {
    setOpen(false);
    setEnableSmoothScroll(true);
  };
  return (
    <div className={styles.legalInfo}>
      <div
        className="w-full flex justify-end z-[9999999] p-10 crossBox"
        onClick={() => makeItRight()}
      >
        <RxCross1 className={styles.cross} />
      </div>

      <div className={styles.content}>
        <div className={styles.legalInfoHeadingBox}>
          <div className={styles.title}>{data.heading.title}</div>
          {data.heading.subTitle && (
            <div className={styles.subHead}>{data.heading.subTitle}</div>
          )}
          <div>
            {data.heading.description.map((desc, i) => (
              <div className={styles.desc}>{desc}</div>
            ))}
          </div>
        </div>
        {data.mainContent.map((info, i) => (
          <>
            <div className={styles.legalInformationMainContent}>
              {info.title && (
                <div className={`${styles.title} ${styles.titleMain}`}>
                  {info.title}
                </div>
              )}
            </div>
            <div>
              {info.description.map((desc, i) => (
                <div className={styles.desc}>{desc}</div>
              ))}
            </div>

            {info.points &&
              info.points.map((point, i) => (
                <>
                  <div className={styles.pointBox}>
                    <div>
                      <VscDebugBreakpointData className={styles.pointIcon} />
                    </div>
                    <div className={styles.point}>{point.point}</div>
                  </div>

                  {point.subPoints &&
                    point.subPoints.map((point, i) => (
                      <div className={styles.pointBox}>
                        <div className={styles.number}>{point.number}.</div>
                        <div className={styles.point}>{point.subPoint}</div>
                      </div>
                    ))}
                </>
              ))}

            {info.description2 && (
              <div>
                {info.description2.map((desc, i) => (
                  <div className={styles.desc}>{desc}</div>
                ))}
              </div>
            )}
          </>
        ))}

        {data.footerData.info.map((footerData, i) => (
          <div className={styles.point}>{footerData}</div>
        ))}

        {/* <div className="flex justify-between footLegal">
          {data.footerData.infoDetails.map((footerData, i) => (
            <div className={styles.footInformationBox}>
              <div>
                <footerData.icon className={styles.legalIcon} />
              </div>
              <div className={`${styles.point} ${styles.point2}`}>
                {footerData.title}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default LegalInfo;
