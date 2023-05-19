import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  Dialog,
  DialogContent,
  Radio,
  FormControlLabel,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "../reusables/Snackbar";
import Modal from "../common/modal";
import axios from "axios";
// import booking from "../../../public/booking_pg.png";
import "./BookHelper.css";

export default function BookHeler() {
  const theme = useTheme();

  return (
    <div
      className="booking-wrapper"
      style={{ background: "url('booking_bg.png')" }}
    >
      <div className="booking-inner-wrapper">
        <div className="booking-header">My Bookings</div>
        <div className="booking-list-wrapper-outer">
          <div className="booking-list-wrapper">
            <div className="booking-list-name">Mukesh</div>
            <div className="booking-list-category">Category: Plumber</div>
            <div className="booking-list-rating">Rating: 4.5/5</div>
            <div className="booking-list-vacinated">Covid-19: Vaccinated</div>
            <div className="booking-list-age">Age: 27 yrs</div>
            <div className="booking-list-distance">
              Distance: 2 km from your location
            </div>
            <button className="rating-btn">Give Rating</button>
          </div>
          <div className="booking-list-wrapper">
            <div className="booking-list-name">Sarla Jain</div>
            <div className="booking-list-category">Category: Maid</div>
            <div className="booking-list-rating">Rating: 4.5/5</div>
            <div className="booking-list-vacinated">Covid-19: Vaccinated</div>
            <div className="booking-list-age">Age: 25 yrs</div>
            <div className="booking-list-distance">
              Distance: 2.3 km from your location
            </div>
          </div>
          <div className="booking-list-wrapper">
            <div className="booking-list-name">Pranay Verma</div>
            <div className="booking-list-category">Category: Electrician</div>
            <div className="booking-list-rating">Rating: 4.5/5</div>
            <div className="booking-list-vacinated">Covid-19: Vaccinated</div>
            <div className="booking-list-age">Age: 29 yrs</div>
            <div className="booking-list-distance">
              Distance: 2.5 km from your location
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
