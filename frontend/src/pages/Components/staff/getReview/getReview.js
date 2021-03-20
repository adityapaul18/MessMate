import React, { useState, useEffect } from "react";
import { isAuthenticated, getFeedback } from "./../../../../util/staffApi";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

import "./getReview.css";
import { TextField } from "@material-ui/core";

const token = isAuthenticated() && isAuthenticated().stafftoken;

const GetReview = () => {
  const [feedback, setFeedback] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
  });

  const getFeedbackList = () => {
    getFeedback(token)
      .then((data) => {
        setFeedback({
          breakfast: data.breakfast,
          lunch: data.lunch,
          dinner: data.dinner,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFeedbackList();
  }, [token]);

  const renderBreakfast = () => {
    const reviews = feedback.breakfast.reviews;
    return (
      <div>
        <div className='menu_mealname'>
          <p className='size'>
            <p class='fontSize'>Breakfast</p>
          </p>
          <p className='size'>
            <Rating
              size='large'
              defaultValue={feedback.breakfast.rating.ratingAverage.toPrecision(
                3
              )}
              max={5}
              disabled={true}
              precision={0.1}
            />
            <span className='ratingno'>{`(${feedback.breakfast.rating.ratingAverage.toPrecision(
              3
            )})`}</span>
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='review_card'>
            <textarea readOnly contentEditable className='font-bold'>
              {reviewStu.review}
            </textarea>
          </div>
        ))}
      </div>
    );
  };
  const renderLunch = () => {
    const reviews = feedback.lunch.reviews;
    return (
      <div>
        <div className='menu_mealname'>
          <p className='size'>
            <p class='fontSize'>Lunch</p>
          </p>
          <p className='size'>
            <Rating
              size='large'
              defaultValue={feedback.lunch.rating.ratingAverage}
              max={5}
              disabled={true}
              precision={0.1}
            />
            <span className='ratingno'>{`(${feedback.lunch.rating.ratingAverage})`}</span>
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='review_card'>
            <textarea readOnly contentEditable className='font-bold'>
              {reviewStu.review}
            </textarea>
          </div>
        ))}
      </div>
    );
  };
  const renderDinner = () => {
    const reviews = feedback.dinner.reviews;
    return (
      <div>
        <div className='menu_mealname'>
          <p className='size'>
            <p class='fontSize'>Dinner</p>
          </p>
          <p className='size'>
            <Rating
              size='large'
              defaultValue={feedback.dinner.rating.ratingAverage}
              max={5}
              disabled={true}
              precision={0.1}
            />
            <span className='ratingno'>{`(${feedback.dinner.rating.ratingAverage})`}</span>
          </p>
        </div>
        {reviews.map((reviewStu) => (
          <div className='review_card'>
            <textarea readOnly contentEditable className='font-bold'>
              {reviewStu.review}
            </textarea>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div class='menu_grid '>
      {feedback?.breakfast?.rating && renderBreakfast()}
      {feedback?.lunch?.rating && renderLunch()}
      {feedback?.dinner?.rating && renderDinner()}
    </div>
  );
};

export default GetReview;
