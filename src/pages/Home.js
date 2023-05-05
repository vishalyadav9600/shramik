import React from "react";
import LeaderBoard from "../components/home/LeaderBoard";
import AboutSection from "../components/home/AboutSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Homemenu from "../components/home/Homemenu";
import Testimonialsection from "../components/home/Testimonialsection";
import gif1 from "../gifs/bounce-doesnt-bounce.gif";
import gif from "../gifs/samsung-samsung-galaxy.gif";

export default function Home() {
  return (
    <div>
      <LeaderBoard />
      <header>
        <img src={gif} alt="header gif" />
      </header>
      <AboutSection />
      <WhyChooseUs />
      <Homemenu />
      <Testimonialsection />
      <footer>
        <img src={gif} alt="footer gif" />
      </footer>
    </div>
  );
}
