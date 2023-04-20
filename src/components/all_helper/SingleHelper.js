import React from 'react';
import { makeStyles, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: '20px',

    'fontFamily': 'inter, sans-serif',
    '@media (max-width: 488px)': {
      margin: '10px',
      '& $helperimagecontainer': {
        height: '70px',
        width: '80px',
      },
      '& $helperinformation': {
        marginLeft: '10px',
        '& $helpername': {
          fontSize: '0.9rem',
        },
        '& $food_price': {
          fontSize: '0.8rem',
        },
        '& $helper_details': {
          fontSize: '0.8rem',
        },
      },
      '& $add_button': {
        maxHeight: '27px !important',
        maxWidth: '70px !important',
        padding: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  },
  helperimage: {
    height: '100%',
    //  border: '1px solid red',
    width: '100%',
  },
  helperimagecontainer: {
    height: '90px',
    width: '100px',
  },
  helperinformation: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: '10px',
    flex: 1,
    marginLeft: '20px',
  },
  helpername: {
    position: 'relative',
    fontFamily: 'Mulish',
    display: 'flex',
  },
  helper_details: {
    color: theme.palette.lightdark3,
    fontSize: '.9rem',
    marginTop: '4px',
  },
  food_price: {
    color: theme.palette.lightdark3,
    fontSize: '.9rem',
    color: 'tomato',
  },
  tag__red: {
    marginTop: '5px',
    marginLeft: '7px',
    border: '1px solid red',
    height: '12px',
    width: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& span': {
      height: '6px',
      width: '6px',
      background: 'red',
      borderRadius: '100%',
    },
  },
  tag__green: {
    marginTop: '5px',
    marginLeft: '7px',
    border: '1px solid green',
    height: '12px',
    width: '12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& span': {
      height: '6px',
      width: '6px',
      background: 'green',
      borderRadius: '100%',
    },
  },
  add_button: {
    // border: `1px solid ${theme.palette.primary.main}`,
    border: `1px solid rgb(76, 161, 70)`,
    height: '32px',
    width: '80px',
    color: 'rgb(76, 161, 70)',
    //fontSize: '0.9rem',

    '&:hover': {
      backgroundColor: 'rgb(76, 161, 70)',
      color: 'white',
      padding: '0px',
    },
  },
}));

export default function SingleHelper({
  onAdd,
  item,
  setClickData,
  showToast,
}) {
  const {
    root,
    helperimage,
    tag__red,
    helperinformation,
    helpername,
    tag__green,
    add_button,
    helper_details,
    food_price,
    helperimagecontainer,
  } = useStyles();
  const { title, price, image_path, available, sub_title } = item;

  const addItem = async (item) => {
    if (!item.available) {
      await setClickData({
        type: 'warning',
        content: 'this meal is currently out, sorry wait for a while',
      });
      showToast();
      return;
    }
    onAdd(item);
  };

  return (
    <div className={root}>
      <div className={helperimagecontainer}>
        <img className={helperimage} src={image_path} />
      </div>
      <div className={helperinformation}>
        <div>
          <Typography className={helpername}>
            {title}
            <span className={available ? tag__green : tag__red}>
              <span>&nbsp;</span>
            </span>
          </Typography>
          <Typography className={helper_details}>{sub_title}</Typography>
        </div>
        <Typography className={food_price}>#{price}</Typography>
      </div>
      <Button
        onClick={() => addItem(item)}
        className={add_button}
        startIcon={<AddIcon />}
      >
        ADD
      </Button>
    </div>
  );
}
