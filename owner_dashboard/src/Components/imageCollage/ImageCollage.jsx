import React, { useEffect, useState } from "react";
import { Gallery } from "react-grid-gallery";
import { Image, Modal } from "@mantine/core";
import { UilAngleLeftB, UilAngleRightB } from "@iconscout/react-unicons";
import Style from "./ImageCollage.module.css";

const ImageCollage = ({ data }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };
  const nextImage = () => {
    if (currentImageIndex + 1 === data.length) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(data.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <>
      {data && (
        <Gallery
          images={data}
          onClick={(index) => openModal(index)}
          enableImageSelection={false}
          maxRows={3}
          thumbnailStyle={{ objectFit: "cover" }}
          tileViewportStyle={{
            width: "150px",
          }}
          margin={"auto"}
        />
      )}

      <Modal
        classNames={{
          modal: `${Style.modal__Body}`,
          title: `${Style.modal__title}`,
          close: `${Style.modal__close}`,
        }}
        size="lg"
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className={Style.image__container}>
          <Image
            fit="contain"
            radius="md"
            src={data[currentImageIndex].src}
            alt={data[currentImageIndex].alt}
          />
          <div className={Style.arrow__buttons}>
            <span>
              <UilAngleLeftB onClick={prevImage} />
            </span>
            <span>
              <UilAngleRightB onClick={nextImage} />
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ImageCollage;
