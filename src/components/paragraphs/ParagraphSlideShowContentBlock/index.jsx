import { graphql } from "gatsby";
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ImageViewer from "react-simple-image-viewer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import useScreenSize from "../../../hooks/useScreenSize";
import "./slideShowContentBlock.scss";

export const ParagraphSlideShowContentBlock = ({ node }) => {
  const {
    field_slideshow_title,
    relationships: { field_slide_reference },
  } = node;
  const [swiperRef, setSwiperRef] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCaption, setCurrentCaption] = useState({});
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const screenSize = useScreenSize();

  const openImageViewer = useCallback((index) => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const handleCaption = (c) => {
    const caption = field_slide_reference?.filter((item, index) => index === c);
    setCurrentCaption(caption?.[0]);
  };

  useEffect(() => {
    if (field_slide_reference?.length > 0) {
      handleCaption(currentSlide);
    }
  }, [field_slide_reference?.length]);

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  return (
    <div>
      <Container className="general-container p-0">
        {field_slide_reference && (
          <div className="slide-show">
            <div className="slide-show-title">{field_slideshow_title}</div>
            <div className="">
              <Swiper
                direction="horizontal"
                className="mySwiper"
                pagination={screenSize?.windowWidth < 767 ? true : false}
                modules={[Navigation, Pagination]}
                slidesPerView={"auto"}
                onSwiper={(swiper) => setSwiperRef(swiper)}
                onSlideChange={(c) => {
                  setCurrentSlide(c?.activeIndex);
                  handleCaption(c?.activeIndex);
                }}
              >
                {field_slide_reference?.map((item, key) => {
                  return (
                    <div>
                      <SwiperSlide
                        key={key}
                        className=" slide-show-swiper-slide"
                      >
                        <div className="img-div position-relative">
                          <img
                            loading="lazy"
                            className="img-slide"
                            height={
                              item?.relationships?.field_slide_image
                                ?.relationships?.field_media_image?.height
                            }
                            src={
                              item?.relationships?.field_slide_image
                                ?.relationships?.field_media_image?.url
                            }
                            onClick={() => openImageViewer(key)}
                            alt={
                              item?.relationships?.field_slide_image?.thumbnail
                                ?.alt
                            }
                          />
                        </div>
                      </SwiperSlide>
                    </div>
                  );
                })}
              </Swiper>
              <div className="slide-show-body ">
                <div className="slide-show-caption">
                  <div>
                    {currentCaption?.field_slide_image_caption && (
                      <>
                        <div>{currentCaption?.field_slide_image_caption}</div>
                      </>
                    )}
                    {currentCaption?.field_slide_image_credit && (
                      <div>{currentCaption?.field_slide_image_credit}</div>
                    )}
                  </div>
                </div>
                {field_slide_reference?.length > 1 && (
                  <div className=" slide-show-button">
                    <button className="slide-show-icon" onClick={prevHandler}>
                      <i class="bi bi-chevron-left d-flex justify-content-center align-items-center"></i>
                    </button>
                    <div className="slide-show-pagination">
                      {currentSlide + 1} of {field_slide_reference?.length}
                    </div>
                    <button className="slide-show-icon" onClick={nextHandler}>
                      <i class="bi bi-chevron-right d-flex justify-content-center align-items-center"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isViewerOpen && (
              <ImageViewer
                src={[
                  currentCaption?.relationships?.field_slide_image
                    ?.relationships?.field_media_image?.url,
                ]}
                currentIndex={0}
                disableScroll={false}
                closeOnClickOutside={true}
                onClose={closeImageViewer}
              />
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export const fragment = graphql`
  fragment ParagraphSlideShowContentBlock on paragraph__slideshow {
    field_slideshow_title
    relationships {
      field_slide_reference {
        relationships {
          field_slide_image {
            relationships {
              field_media_image {
                height
                url
              }
            }
            thumbnail {
              alt
            }
          }
        }
        field_slide_image_caption
        field_slide_image_credit
      }
    }
  }
`;

export default ParagraphSlideShowContentBlock;
