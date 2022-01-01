import React, { useEffect, useState } from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import Button from './Button';
import LoaderSpinner from './Loader';
import ModalWindow from './ModalWindow';
import { GalleryList } from './styled/ImageGallery.styled';
import fetchApi from '../service/fetch';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

export default function ImageGallery({imageName}) {
  
 const [status, setStatus] = useState('idle');
  const [image, setImage] = useState([]);
  const[page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    if (imageName === '') {
      return
    }

    setStatus('pending');
    setPage(1)

    fetchApi(imageName, 1).then(data => {
        if (data.total === 0) {
          toast.error(`Изображения не найдены.`);
          return setStatus('idle');
        } else {
          setImage(data.hits);
          setPage(prevState => prevState + 1);
          setStatus('resolved');
        }
      });
    },[imageName])


 function toggleModal (imageUrl){
    setLargeImage(imageUrl);
  };

  function handleLoadMore (e) {
    fetchApi(imageName, page)
      .then(data => {
        setPage(prevState => prevState + 1);
        setImage(prevState => [...prevState, ...data.hits]);
        setStatus('resolved');
      }).finally(handleScroll());
  };

  function handleScroll (){
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

    if (status === 'idle') {
      return <></>;
    }

    if (status === 'pending') {
      return <LoaderSpinner />;
    }

    if (status === 'resolved') {
      return (
        <>
          <GalleryList>
            {largeImage && (
              <ModalWindow onClose={toggleModal} imageUrl={largeImage} />
            )}
            <ImageGalleryItem onClick={toggleModal} data={image} />
          </GalleryList>
          {image.length >= 12 && (
            <Button onClick={handleLoadMore} />
          )}
        </>
      );
    }
  }

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};

