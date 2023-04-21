import React from "react";
import LeaderBoard from "../components/home/LeaderBoard";
import AboutSection from "../components/home/AboutSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Homemenu from "../components/home/Homemenu";
import Testimonialsection from "../components/home/Testimonialsection";
// import gif from "../gifs/bounce-doesnt-bounce.gif";
import gif from "../gifs/samsung-samsung-galaxy.gif";

export default function Home() {
  return (
    <div>
      <LeaderBoard />
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
