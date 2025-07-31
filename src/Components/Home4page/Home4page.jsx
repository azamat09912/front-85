import React from 'react';
import './Home4page.css'; // убедись, что этот CSS-файл создан
import img3 from '../../assets/Bgfilm2.jpg';
import img4 from '../../assets/bx.jpg'; // центральное фото

export default function Home4page() {
  const handleClick = () => {
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  return (
    <div>
      <div className="home-container1">
        <div className="hero-section1">
          <div
            className="hero-background1"
            style={{ backgroundImage: `url(${img3})` }}
          ></div>
          <div className="hero-content1">
            <div className="center-image-wrapper">
              <img src={img4} alt="Центральное фото" className="center-image" />
            </div>

            <div className="hero-text11">
              <h1>Алғашқы қазақ киносыㅤ</h1>
              <p className="introduction1">
                Бала күнімде халық батыры Амангелді Иманов туралы түсірілген 
фильмді сан мәрте көрдім. Бірақ оның ұлттық кинотарихындағы
алғашқы қазақ фильмі екенінен хабарсыз едім Одан сол кездегі 
саясаттың «лебі» соғып тұрса да, қазақ киносының тарихы осы
туындыдан басталады.Фильм 1938 жылы түсіріліп, 1939 жылы
25 қаңтарда премьерасы өтті.
              </p>
              
              <button className="know-more1" onClick={handleClick}>
                Фильм қарау
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
