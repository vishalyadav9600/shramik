import React, { useEffect, useState, useContext } from "react";
import { Button, Grid, Box } from "@material-ui/core";
import Modal from "../common/modal";
import axios from "axios";
import { AuthContext } from "../../services/AuthContext";
import "./BookHelper.css";

export default function BookHeler() {
  const [allBookings, setAllBookings] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [giveRatingModal, setGiveRatingModal] = useState(false);
  const [workerId, setWorkerId] = useState(-1);
  const [messageText, setMessageText] = useState("");
  const [ratingText, setRatingText] = useState(-1);
  const { loggedInUserId } = useContext(AuthContext);
  const authToken = localStorage.getItem("user-auth");
  //   const history = useNavigate();

  const openRatingModal = () => {
    setGiveRatingModal(true);
  };

  const closeRatingModal = () => {
    setGiveRatingModal(false);
  };

  const getAllBooking = async () => {
    await axios
      .get(
        `https://shramik-location-apis.onrender.com/user_bookings/${loggedInUserId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "booking");
        const updatedBookings = res.data.bookings.map((booking) => {
          return {
            ...booking,
            worker_id: booking.worker_id, // Update the workerId for each booking
          };
        });
        setAllBookings(updatedBookings);

        // Assuming you want to set the workerId for the first booking in the array
        if (updatedBookings.length > 0) {
          const firstBookingWorkerId = updatedBookings[0].worker_id;
          setWorkerId(firstBookingWorkerId);
          getAllReviews(firstBookingWorkerId); // Pass the workerId to getAllReviews
        }
      });
  };

  const getAllReviews = async (workerId) => {
    await axios
      .get(
        `https://shramik-location-apis.onrender.com/worker_reviews/${workerId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res, "reviews");
        setAllReviews(res.data.reviews);
      });
  };

  useEffect(() => {
    getAllBooking();
  }, []);

  useEffect(() => {
    getAllReviews(workerId);
  }, [workerId]);

  const submitRating = async (wId) => {
    const body = {
      worker_id: wId,
      user_id: loggedInUserId,
      review: messageText,
      rating: parseInt(ratingText),
    };
    await axios
      .post("https://shramik-location-apis.onrender.com/review", body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => console.log(res, "sms"));
  };

  return (
    <>
      <div
        className="booking-wrapper"
        style={{ background: "url('booking_bg.png')" }}
      >
        <div className="booking-inner-wrapper">
          <div className="booking-header">My Bookings</div>
          <div className="booking-list-wrapper-outer">
            {allBookings.map((ele, index) => (
              <div className="booking-list-wrapper">
                <div className="booking-list-name">{ele.worker_name}</div>
                <div className="booking-list-category">Category: Plumber</div>
                <div className="booking-list-rating">Price: {ele.price}</div>
                <div className="booking-list-vacinated">
                  Covid-19: Vaccinated
                </div>
                <div className="booking-list-age">Status: {ele.status}</div>
                <div className="booking-list-distance">
                  Booked At: {new Date(ele.booked_at).toLocaleString()}
                </div>
                <button
                  className="rating-btn"
                  onClick={() => {
                    setWorkerId(ele.worker_id);
                    openRatingModal();
                  }}
                >
                  Give Rating
                </button>

                {giveRatingModal && workerId === ele.worker_id && (
                  <Modal isOpen={giveRatingModal} onClose={closeRatingModal}>
                    <div>
                      <div>{ele.worker_name}</div>
                      <div>
                        {/* <Form autoComplete="off"> */}
                        <Grid container>
                          <Grid xs={12} item>
                            <Box marginTop="10px">
                              <input
                                type="text"
                                placeholder="Give Rating message"
                                onChange={(e) => setMessageText(e.target.value)}
                                className="inputField"
                              />
                            </Box>

                            <Box marginTop="10px">
                              <input
                                type="number"
                                placeholder="Give Rating"
                                onChange={(e) =>
                                  setRatingText(parseInt(e.target.value))
                                }
                                className="inputField"
                              />
                            </Box>

                            <Box>
                              <Button
                                type="submit"
                                className="login_button"
                                onClick={() => {
                                  submitRating(ele.worker_id);
                                }}
                              >
                                Submit
                              </Button>
                            </Box>
                          </Grid>
                        </Grid>
                        {/* </Form> */}
                      </div>
                    </div>
                  </Modal>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="booking-wrapper"
        style={{ background: "url('booking_bg.png')" }}
      >
        <div className="booking-inner-wrapper">
          <div className="booking-header">My Reviews</div>
          <div className="booking-list-wrapper-outer">
            {allReviews.map((ele) => (
              <div className="booking-list-wrapper">
                <div className="booking-list-name">{ele.worker_name}</div>
                <div className="booking-list-category">Category: Plumber</div>
                <div className="booking-list-rating">Review: {ele.review}</div>
                <div className="booking-list-vacinated">
                  Rating: {ele.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
