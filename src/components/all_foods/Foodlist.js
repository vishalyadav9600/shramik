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
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "200vh",

    fontFamily: "inter, sans-serif",
    backgroundColor: "#F4F6F8",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      "& $menu_section": {
        flex: 1,
        marginTop: "10px",
        width: "100%",
        alignItems: "center",
        height: "auto",
        padding: "0px",

        "& h1": {
          // color: theme.palette.lightdark3,
          display: "none",
        },
        "& ul": {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginBottom: "0px",

          "& li": {
            marginTop: "0px",
            marginLeft: "25px",
            paddingTop: "10px",
            fontFamily: "Mulish",
            color: "inherit",
            fontSize: "1rem",
            cursor: "pointer",
          },
        },
      },
      "& $cart": {
        flex: 1,
        width: "100%",
      },
    },
  },
  // button {
  //   display: block;
  //   margin: 0 auto;
  //   padding: 10px 20px;
  //   background-color: #4CAF50;
  //   color: white;
  //   border: none;
  //   border-radius: 5px;
  //   cursor: pointer;
  //   font-size: 16px;
  // },
  // button:hover {
  //   background-color: #3e8e41;
  // },

  menu_section: {
    padding: "20px",
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    top: 0,
    alignSelf: "flex-start",
    flex: 2.5,
    width: "300px",
    //maxHeight: '80vh',
    // left: 0,
    "& h1": {
      // color: theme.palette.lightdark3,
      fontSize: "1.3rem",
      fontFamily: "Mulish",
      fontWeight: 600,
    },
    "& ul": {
      listStyleType: "none",
      textAlign: "end",
      marginBottom: "25px",
      "& li": {
        marginTop: "25px",
        fontFamily: "Mulish",
        color: "inherit",
        fontSize: "1rem",
        cursor: "pointer",
      },
    },
  },
  food_list: {
    borderLeft: "1px solid #ebebeb",
    borderRight: "1px solid #ebebeb",
    flex: 5,
  },
  fetchBtnStyles: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  fetchHelperStyle: {
    border: "1px solid #ccc",
    borderRadius: " 5px",
    padding: "10px",
    boxShadow: " 0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  popupContent: {
    position: "fixed",
    top: "50%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: " 20px",
    borderRadius: "5px",
  },
  searchSection: {
    height: "60px",
    display: "flex",
    borderBottom: "1px solid #ebebeb",
    alignItems: "center",
    paddingLeft: "15px",
    position: "sticky",
    zIndex: 999,
    background: "white",
    top: 7,
    "@media (max-width: 900px)": {
      border: "1px solid #ebebeb",
      marginTop: "20px",
    },

    "& input": {
      flex: 1,
      height: "100%",
      border: "none",
      outline: "none",
    },
    "& input::placeholder": {
      fontSize: ".9rem",
    },
  },
  searchIcon: {
    width: "40px",
    color: theme.palette.lightdark2,
  },
  cart: {
    position: "sticky",
    alignSelf: "flex-start",
    top: 0,
    maxHeight: "80vh",
    flex: 2.5,
    padding: "20px",
    "& h1": {
      color: theme.palette.lightdark3,
      fontSize: "1.3rem",
      fontFamily: "Mulish",
    },
  },
  submitbutton_section: {
    margin: "40px 0",

    "& :nth-child(1)": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& > :nth-child(2)": {
      height: "1px",
      margin: "10px 0",
    },
    "& :nth-child(3)": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "& :nth-child(4)": {
      width: "100%",
      backgroundColor: theme.palette.green,
      color: "white",
      padding: "15px 0",
      border: "none",
      margin: "20px 0px",
      cursor: "pointer",
    },
  },
  Sub_total: {
    color: theme.palette.lightdark3,
    fontSize: ".9rem",
  },
  Sub_total_value: {
    color: theme.palette.lightdark3,
    fontSize: ".9rem",
  },
  amount_payable: {
    fontSize: ".9rem",
    fontWeight: "600",
  },
  amount_payable_value: {
    fontSize: ".9rem",
    fontWeight: "600",
  },
  mealsGroup: {},
  mealsGroup_heading: {
    display: "flex",
    alignItems: "baseline",
    padding: "15px 28px",

    "& :nth-child(1)": {
      // color: theme.palette.lightdark3,
      fontSize: "1.3rem",
      fontFamily: "Mulish",
    },
    "& :nth-child(2)": {
      color: theme.palette.lightdark2,
      marginLeft: "20px",
      fontSize: "0.9rem",
      fontFamily: "Mulish",
    },
  },
  empty_cart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "30px",

    "& :nth-child(1)": {
      height: "80px",
      width: "130px",
    },
    "& :nth-child(2)": {
      color: theme.palette.lightdark2,
      marginTop: "20px",
      fontSize: "0.9rem",
      fontFamily: "Mulish",
    },
  },
  modal_content: {
    width: "600px",
    "@media (max-width: 600px)": {
      width: "auto",
      padding: "10px",
      "& $modal_quantity": {
        display: "none",
      },
      "& $items_button": {
        marginLeft: "0px",
      },
    },

    "& > div:nth-child(1)": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    },
    "& > div:nth-child(2)": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px",
    },
  },
  quantity_buttons: {
    display: "flex",
    alignItems: "center",
  },
  price_submit: {
    display: "flex",
    alignItems: "center",
    "& button": {
      background: theme.palette.green,
      border: "none",
      color: "white",
      fontFamily: "Mulish",
      padding: "10px 20px",
      marginLeft: "10px",
      cursor: "pointer",
    },
  },
  items_button: {
    display: "flex",
    marginLeft: "10px",

    "& button": {
      backgroundColor: theme.palette.green,
      fontWeight: "600",
      fontSize: "1rem",
      border: "none",
      height: "30px",
      width: "30px",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    "& h1": {
      fontWeight: "600",
      fontSize: "1rem",
      height: "30px",
      width: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  modal_quantity: {},
  backDrop: {
    background: "rgba(0,0,0,0.9)",
  },
}));

export default function Foodlist() {
  // hooks
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [allHelpers, setAllHelpers] = React.useState([]);
  const [helpersData, setHelpersData] = useState({});
  const [distanceData, setDistanceData] = useState({});
  const [nearestHelper, setNearestHelper] = useState({});
  const [activeItem, setActiveItem] = React.useState({
    price: 0,
    totalPrice: 0,
    quantity: 1,
  });
  const theme = useTheme();
  const inputEl = React.useRef("");
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [alertContent, setAlertContent] = React.useState({
    type: "error",
    content: "",
  });
  const [show, setShow] = React.useState(false);
  const [filteredData, setFilteredData] = useState(helpersData);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [cardId, setCardId] = useState(-1);
  const [showDistanceModal, setShowDistanceModal] = useState(false);
  const [showNearestHelper, setShowNearestHelper] = useState(false);

  const getHelpers = async () => {
    console.log("Hit get helpers");
    const resp = await axios
      .get("http://localhost:8080/search/getAllHelpers")
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("allHelpers", JSON.stringify(res.data)); // Store the data in local storage
        setAllHelpers(res.data);
      });
  };

  console.log(allHelpers, "allhelpers");

  const fetchHelpers = async () => {
    // const storedData = localStorage.getItem("helpersData"); // Check if the data is stored in local storage
    // if (storedData) {
    //   setHelpersData(JSON.parse(storedData)); // Set the data from local storage
    // } else {
    const categories = {};
    allHelpers.forEach((item) => {
      const category = item.subCategory.toLowerCase();
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });
    console.log(categories, "qwerty");
    setHelpersData(categories);
    //   localStorage.setItem("helpersData", JSON.stringify(categories)); // Store the data in local storage
    // }
  };

  useEffect(async () => {
    await getHelpers();
    await fetchHelpers();
  }, []);

  console.log(helpersData, "categories");

  const sendMessage = async (mob, wId) => {
    const body = {
      worker_id: wId,
      user_id: 1,
      user_mobile: mob,
    };
    const resp = await axios
      .post("https://shramik-location-apis.onrender.com/book_worker", body)
      .then((res) => console.log(res, "sms"));
  };

  const fetchNearestHelpers = async () => {
    const resp = await axios
      .post("https://shramik-location-apis.onrender.com/fetch_nearest_worker")
      .then((res) => {
        console.log(res);
        setNearestHelper(res.data);
      });
  };

  const distanceTime = async (cId) => {
    const resp = await axios
      .post(
        `https://shramik-location-apis.onrender.com/calculate_distance/${cId}`
      )
      .then((res) => {
        console.log(res.data);
        setDistanceData(res.data);
      });
  };

  console.log(distanceData, "distanceData");

  const handleClick = () => {
    setShow(true);
  };

  const handleCancel = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShow(false);
  };

  //  control modal open
  const openModal = (item) => {
    handleClickOpen();
    setActiveItem({ ...item, totalPrice: item.price, quantity: 1 });
  };

  // control search
  const searchHandler = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredCategories = {};

    Object.keys(helpersData).forEach((category) => {
      const filteredHelpers = helpersData[category].filter((helper) => {
        return helper.subCategory.toLowerCase().includes(query);
      });

      if (filteredHelpers.length > 0) {
        filteredCategories[category] = filteredHelpers;
      }
    });

    setFilteredData(filteredCategories);
  };

  //control cart quantities
  const controlCartQuantities = (type) => {
    if (type === "INC") {
      if (activeItem.quantity != 5) {
        setActiveItem({
          ...activeItem,
          totalPrice: activeItem.totalPrice + activeItem.price,
          quantity: activeItem.quantity + 1,
        });
      }
    } else {
      if (activeItem.quantity > 1) {
        setActiveItem({
          ...activeItem,
          totalPrice: activeItem.totalPrice - activeItem.price,
          quantity: activeItem.quantity - 1,
        });
      }
    }
  };

  //handle modal submit
  const handleModalSubmit = () => {
    dispatch({ type: "ADD_TO_CART", payload: { product: activeItem } });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    root,
    menu_section,
    modal_content,
    modal_quantity,
    Sub_total,
    Sub_total_value,
    amount_payable,
    amount_payable_value,
    food_list,
    cart,
    searchSection,
    searchIcon,
    mealsGroup,
    mealsGroup_heading,
    empty_cart,
    items_button,
    quantity_buttons,
    price_submit,
    backDrop,
    submitbutton_section,
    fetchBtnStyles,
    fetchHelperStyle,
    popupContent,
  } = useStyles();

  // network tab main abhi bhi shi se hit nhi ho rhi h api dekh lo
  //pdate nhi ho rhe numberstushar ka number anaa chahie
  return (
    <div className={root}>
      <Snackbar
        alertContent={alertContent}
        open={show}
        handleClose={handleCancel}
      />
      <div className={food_list}>
        <div className={searchSection}>
          <SearchIcon className={searchIcon} />
          <input
            ref={inputEl}
            onChange={searchHandler}
            placeholder="Search For Helpers"
          />
        </div>
        <button
          className={fetchBtnStyles}
          onClick={() => {
            setShowNearestHelper(!showNearestHelper);
            fetchNearestHelpers();
          }}
        >
          Fetch Nearest Helpers
        </button>

        {showNearestHelper && (
          <div>
            {Object.keys(nearestHelper).length > 0 && (
              <div>
                <div>Name: {nearestHelper.name}</div>
                <div>Distance: {nearestHelper.distance}</div>
              </div>
            )}
          </div>
        )}

        {/* meals section */}
        {Object.keys(filteredData).map((category) => (
          <div id="meals" className={mealsGroup}>
            <div className={mealsGroup_heading}>
              <Typography variant="h1">{category}</Typography>
              <Typography variant="h1">
                {filteredData[category].length}
                &nbsp;helper(s)
              </Typography>
            </div>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                gap: "10px",
              }}
            >
              {filteredData[category].map((helper) => (
                <>
                  <div
                    classname={fetchHelperStyle}
                    style={{
                      border: "1px solid grey",
                      padding: "20px",
                      gap: "5px",
                      flexWrap: "wrap",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setCardId(helper.id);
                      setShowConfirmModal(true);
                    }}
                  >
                    <div>Name: {helper.userName}</div>
                    <div>Mobile No.: {helper.mobNumber}</div>
                  </div>
                  {showConfirmModal && cardId === helper.id && (
                    <div>
                      <div>Are you Sure to book {helper.userName} ?</div>
                      <div>
                        <button
                          className={fetchBtnStyles}
                          onClick={() => {
                            setCardId(helper.id);
                            setShowDistanceModal(true);
                            setShowConfirmModal(false);
                            distanceTime(helper.id);
                            sendMessage(helper.mobNumber, helper.id);
                          }}
                        >
                          Yes
                        </button>
                        <button
                          className={fetchBtnStyles}
                          onClick={() => setShowConfirmModal(false)}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  )}

                  {showDistanceModal && cardId === helper.id && (
                    <div>
                      <div>{category} booked successfully !!</div>
                      {Object.keys(distanceData).length > 0 && (
                        <div>
                          <div>
                            {helper.userName} is {distanceData.distance} far.
                          </div>
                          <div> Arriving in {distanceData.time}.</div>
                        </div>
                      )}
                      <div>
                        <button
                          className={fetchBtnStyles}
                          onClick={() => {
                            setShowDistanceModal(false);
                          }}
                        >
                          close
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Dialog
        // style={{ position: 'relative' }}
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        BackdropProps={{
          classes: {
            root: backDrop,
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          {"Customize Your Order!"}
        </DialogTitle>

        <DialogContent className={modal_content}>
          <div>
            <div
              onClick={handleClose}
              style={{ position: "absolute", top: 20, right: 20 }}
            >
              <CancelOutlinedIcon
                style={{ color: "red", height: "20px", width: "20px" }}
              />
            </div>
            <FormControlLabel
              value="female"
              control={<Radio checked />}
              label="Full"
            />
            <Typography>#{activeItem.price}</Typography>
          </div>
          <div>
            <div className={quantity_buttons}>
              <Typography className={modal_quantity}>Quantity</Typography>
              <div className={items_button}>
                <button onClick={() => controlCartQuantities("DEC")}>-</button>
                <Typography variant="h1">{activeItem.quantity}</Typography>
                <button onClick={() => controlCartQuantities("INC")}>+</button>
              </div>
            </div>
            <div className={price_submit}>
              <Typography>Total: #{activeItem.totalPrice} </Typography>
              <button onClick={handleModalSubmit}>SUBMIT</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
