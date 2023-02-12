import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import EcoIcon from '@material-ui/icons/Eco';
import BusinessIcon from '@material-ui/icons/Business';
const useStyles = makeStyles((theme) => ({
  leaderBoard_left_h1: {
    lineHeight: '40px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  icon_box_h1: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  why_choose_us: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '60vh',
    height: 'max-content',
    overflow: 'hidden',
    // background: "url('bg.jpg')",
    background: "url('data:image/jpeg;base64,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')",
    backgroundRepeat: 'no-repeat',
    objectFit: 'contain',
    backgroundPosition: 'calc(100vw - 170px) 160px',
    backgroundSize: '200px',
  },
  icon_boxes: {
    display: 'flex',
    justifyContent: 'center',
    padding: '30px 30px',
    flexWrap: 'wrap',
  },
  icon_box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '15px',
    marginTop: '15px',
  },
  icon_box_icon: {
    fontSize: '50px',
    color: '#212121',
  },
  icon_box_p: {
    fontFamily: 'Inter, sans-serif',
    textAlign: 'center',
    marginTop: '2px',
  },
  wcu_service: {
    fontFamily: 'Inter, sans-serif',
    padding: '0 20px',
    fontSize: '.9rem',
  },
}));

export default function WhyChooseUs() {
  const {
    why_choose_us,
    leaderBoard_left_h1,
    icon_boxes,
    icon_box_icon,
    icon_box,
    icon_box_h1,
    icon_box_p,
    wcu_service,
  } = useStyles();
  const Iconbox = ({ details1, details2, Icon, title }) => (
    <div className={icon_box}>
      {Icon}
      <Typography className={icon_box_h1} variant="h2" component="h1">
        {title}
      </Typography>
      <Typography className={icon_box_p} component="p">
        {details1} <br /> {details2}
      </Typography>
    </div>
  );

  return (
    <div className={why_choose_us}>
      <Typography className={leaderBoard_left_h1} variant="h2" component="h1">
        Why choose us?
      </Typography>
      <Typography className={wcu_service} component="p">
        Easy booking fair prices
      </Typography>

      <div className={icon_boxes}>
        <Iconbox
          Icon={<EcoIcon className={icon_box_icon} />}
          
          title="Skilled Worker"
          details1="We serve the best and experienced"
          details2="expert workers"
        />
        <Iconbox
          Icon={<BusinessIcon className={icon_box_icon} />}
          title="Best offer"
          details1="We give the best offer for our"
          details2="valuable customers"
        />
        <Iconbox
          Icon={<LocalShippingIcon className={icon_box_icon} />}
          title="Fast Arrival"
          details1="We Choose th"
          details2="fast delivery"
        />
      </div>
    </div>
  );
}
