import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import DPA from "../partials/allfoods/DPA";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "42vh",
    background: "#F4F6F8",
    padding: "40px 50px",
    display: "flex",
    borderBottom: "1px solid #ebebeb",
    "@media (max-width: 910px)": {
      "& $helper_name": {
        fontSize: "1.5rem",
      },
      "& $opening_time": {
        fontSize: ".8rem",
      },
      "& $location_container": {
        "& $location_icon": {
          fontSize: "1rem",
        },
        "& $helper_location": {
          fontSize: "0.9rem",
        },
      },
    },
    "@media (max-width: 850px)": {
      padding: "20px",
      "& $root_img": {
        maxHeight: "110px",
        maxWidth: "210px",
        marginRight: "20px",
      },
      "& $dpa_section": {
        gap: "10px",
        marginTop: "20px",
      },
    },
    "@media (max-width: 574px)": {
      padding: "17px",
      flexDirection: "column",
      height: "48vh",
      alignItems: "center",
      "& $root_img": {
        marginBottom: "7px",
      },
      "& $helper_name": {
        fontSize: "1.3rem",
      },
      "& $location_container": {
        alignItems: "flex-start",
        marginTop: "3px",
        "& $location_icon": {
          fontSize: "1.3rem",
          marginRight: "2px",
        },
        "& $helper_location": {
          fontSize: "0.9rem",
        },
      },
    },
  },
  root_img: {
    maxHeight: "190px",
    maxWidth: "320px",
    marginRight: "30px",
  },
  helper_name: {
    fontFamily: "Mulish",
    fontSize: "1.6rem !important",
    color: "#333333",
    fontWeight: "500",
    transition: "all 1s ease",
  },
  helper_description: {
    color: "#666666",
    fontSize: "0.8rem",
    visibility: "hidden",
    //fontFamily: 'Montserrat',
  },
  location_container: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Mulish",
  },
  helper_location: {
    color: "#666666",
    lineHeight: "15px",
    fontSize: ".9rem",
  },
  location_icon: {
    color: "#666666",
    fontSize: "1.2rem",
    marginLeft: "-5px",
    marginRight: "3px",
  },
  opening_time: {
    color: "#666666",
    fontSize: "0.8rem",
    marginTop: "30px",
  },
  dpa_section: {
    display: "flex",
    marginTop: "40px",
  },
}));

export default function Helperdetail() {
  const {
    root,
    root_img,
    helper_name,
    helper_description,
    helper_location,
    opening_time,
    location_container,
    location_icon,
    dpa_section,
  } = useStyles();
  return (
    <div className={root}>
      <img
        className={root_img}
        src="https://gumlet.assettype.com/freepressjournal/2022-09/58fa036c-d6c6-4ff3-956f-748485f313bf/somi_freepik_oct_2.jpg?format=webp&w=800&dpr=1.3"
      ></img>
      <div>
        <Typography className={helper_name} variant="h2" component="h1">
          Shramik Categories
        </Typography>
        <Typography className={helper_description} component="p">
          nigerian &nbsp; ghanian &nbsp; south-african &nbsp; delicacies
        </Typography>
        <div className={location_container}>
          <LocationOnOutlinedIcon className={location_icon} />
          <Typography className={helper_location} component="p">
            Abes Engineering College, Ghaziabad.
          </Typography>
        </div>
        <Typography className={opening_time} component="p">
          Booking Timings - 06:00 AM TO 11:00 PM
        </Typography>

        <div className={dpa_section}>
          {[
            { time: "30 MINS", min: "ARRIVAL TIME" },
            { time: "PAYMENT", min: "ONLINE PAYMENT" },
            { time: "₹1000", min: "AVG COST" },
          ].map((data, index) => (
            <DPA key={index} {...data} />
          ))}
        </div>
      </div>
    </div>
  );
}
