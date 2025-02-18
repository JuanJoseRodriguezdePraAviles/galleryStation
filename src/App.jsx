import Header from './header';
import SearchBar from './SearchBar';
import Dashboard from './Dashboard';
import Footer from './Footer';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos, searchPhotos } from './features/SearchSlice';

function App() {
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const updatedImages = useSelector((state) => state.search.images);
  const [filteredImages, setFilteredImages] = useState(images);
  const updatedFilteredImages = useSelector((state) => state.images);


  useEffect(() => {

    dispatch(fetchPhotos());
  }, [dispatch]);

  useEffect(() => {
    if (updatedImages && updatedImages.length > 0) {
      setImages(updatedImages);

      setFilteredImages(updatedFilteredImages);
    }
  }, [updatedImages]);



  const handleSearch = (event) => {

    const inputNode = event.target.previousElementSibling;
    console.log("input value");
    console.log(inputNode.value);
    dispatch(searchPhotos(inputNode.value));

    const imagesSearched = images;
    /*const imagesSearched = images.filter((image) => {
      return image.slug.includes(inputNode.value.toLowerCase());
    });*/
    console.log("images searched");
    console.log(imagesSearched);
    setFilteredImages(imagesSearched);
  }

  console.log("Filtered images");
  console.log(filteredImages);
  return (
    <>
      <Header>

      </Header>
      <SearchBar handleSearch={handleSearch}>

      </SearchBar>
      <Dashboard images={images} filteredImages={filteredImages}>
      </Dashboard>

      <Footer>

      </Footer>
    </>
  )
}

export default App;
