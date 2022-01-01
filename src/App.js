import React, { useState } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [resultImageName, setResultImageName] = useState('');

  function submitForm(imageName) {
   setResultImageName(imageName)
  };

    return (
      <div>
        <Toaster />
        <Searchbar onSubmit={submitForm} />
        <ImageGallery imageName={resultImageName} />
      </div>
    );
  }

