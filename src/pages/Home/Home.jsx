import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../component/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/Play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../../component/TitleCards/TitleCards'
import Footer from '../../component/Footer/Footer'
import { Link } from 'react-router-dom' // 1. Import Link

const Home = () => {
  // 2. Add state to hold the hero banner movie data
  const [heroData, setHeroData] = useState(null);

  // 3. Define the options for the API call
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Y2VlZjczNGI3NTE3MjMxYjI2OWMyZTgxOTA5YmQzMyIsIm5iZiI6MTc1NTY5NTA2Ni41MzMsInN1YiI6IjY4YTVjN2RhNDYzMGUxZWEzOGZkMjU4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gWbOn5EwCWhemz4i5_6BJGgwUL4H_k-wN0xzzJNUGMc'
    }
  };

  // 4. Fetch the data for "The Protector" (ID: 324552) when the component mounts
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/324552?language=en-US`, options)
      .then(response => response.json())
      .then(response => setHeroData(response))
      .catch(err => console.error(err));
  }, []);

  // Render a loading state or nothing until the data is fetched
  if (!heroData) {
    return null; // Or a loading spinner
  }

  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
        <img src={`https://image.tmdb.org/t/p/original${heroData.backdrop_path}`} alt="" className='banner-img'/>
        <div className="hero-caption">
           <img src={hero_title} alt="" className='caption-img'/>
           {/* 5. Use the description from the fetched data */}
           <p>{heroData.overview}</p>
           <div className="hero-btns">
            {/* 6. Wrap the Play button in a Link to the Player page */}
            <Link to={`/player/${heroData.id}`} className='btn'>
              <img src={play_icon} alt="" />Play
            </Link>
            {/* 7. (Optional) Make the More Info button do something, like log data */}
            <button className='btn dark-btn' onClick={() => console.log(heroData)}>
              <img src={info_icon} alt="" />More Info
            </button>
           </div>
           <TitleCards/>
        </div>
      </div>
      <div className="more-cards">
         <TitleCards title={"Blockbuster Movies"} category={"top_rated"}/>
         <TitleCards title={"Only on Netflix"} category={"popular"}/>
         <TitleCards title={"Upcoming"} category={"upcoming"}/>
         <TitleCards title={"Top Pics for You"} category={"now_playing"}/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home