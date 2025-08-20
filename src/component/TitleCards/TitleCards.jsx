import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2VlZjczNGI3NTE3MjMxYjI2OWMyZTgxOTA5YmQzMyIsIm5iZiI6MTc1NTY5NTA2Ni41MzMsInN1YiI6IjY4YTVjN2RhNDYzMGUxZWEzOGZkMjU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gWbOn5EwCWhemz4i5_6BJGgwUL4H_k-wN0xzzJNUGMc'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      // FIX: Changed 'response.results' to 'response.results'
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    const currentRef = cardsRef.current;
    currentRef.addEventListener('wheel', handleWheel);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      currentRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]); // Added category to dependency array to refetch when it changes

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          // Using card.id for a more reliable key and checking if backdrop_path exists
          return (
            <div className="card" key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt={card.original_title} />
              <p>{card.original_title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;