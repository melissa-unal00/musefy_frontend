import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Input } from "../..";
import { UserContext } from "../../../context/UserContext";
import "./ReviewsList.scss";

const ReviewsList = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [input, setInput] = useState("");
  const userContextData = useContext(UserContext);

  const getAllReviews = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND}/api/review/allReviews`)
      .then((res: any) => setReviews(res.data.data));
  };

  const handleSubmitReview = async () => {
    const username = userContextData.username;
    if (input !== "") {
      await axios
        .post(`${process.env.REACT_APP_BACKEND}/api/review/submitReview`, {
          username,
          input,
        })
        .then((res: any) => {
          setReviews(res.data.data);
          setInput("");
        });
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div className="reviews">
      <h1 className="reviews-title">The voice of our community...</h1>
      {reviews.map((value: any) => {
        return (
          <div className="reviews-list">
            <div style={{ paddingBottom: "0.5rem" }}>
              <span className="reviews__username">{value.username}</span> says:
            </div>
            <div className="reviews__review">
              <i>"{value.review}"</i>
            </div>
          </div>
        );
      })}
      <div className="reviews__write">
        <Input
          value={input}
          className="reviews__write-input"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmitReview()}
        ></Input>
        <Button className="reviews__write-button" onClick={handleSubmitReview}>
          Leave review
        </Button>
      </div>
    </div>
  );
};

export default ReviewsList;
