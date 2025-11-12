import React, { useState } from "react";
import {
  ReWrapper,
  ReviewContainer,
  ReviewHeader,
  ReviewTitle,
  ReviewSubtitle,
  StarRatingContainer,
  StarButton,
  StarIcon,
  RatingText,
  FeedbackSection,
  FeedbackLabel,
  FeedbackTextarea,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  SuccessMessage,
  ErrorMessage,
} from "./Review.elements";

const Review = ({ appointmentId, businessId, onClose, onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleStarClick = (value) => {
    setRating(value);
    setError("");
  };

  const handleStarHover = (value) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const getRatingText = (value) => {
    const texts = {
      1: "سيء جداً",
      2: "سيء",
      3: "جيد",
      4: "جيد جداً",
      5: "ممتاز",
    };
    return texts[value] || "اختر التقييم";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (rating === 0) {
      setError("الرجاء اختيار تقييم");
      return;
    }

    if (feedback.trim().length < 10) {
      setError("الرجاء كتابة تعليق لا يقل عن 10 أحرف");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://theknot-30278e2ff419.herokuapp.com/api/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessId,
            rating,
            comment: feedback.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "فشل في إرسال التقييم");
      }

      setSuccess(true);

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess(data);
      }

      // Auto close after 2 seconds
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 2000);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء إرسال التقييم");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  if (success) {
    return (
      <ReWrapper>
        <ReviewContainer>
          <SuccessMessage>
            <div className="icon">✓</div>
            <div className="title">شكراً لك!</div>
            <div className="message">تم إرسال تقييمك بنجاح</div>
          </SuccessMessage>
        </ReviewContainer>
      </ReWrapper>
    );
  }

  return (
    <ReWrapper>
      <ReviewContainer>
        <ReviewHeader>
          <ReviewTitle>قيّم تجربتك</ReviewTitle>
          <ReviewSubtitle>
            ساعدنا في تحسين خدماتنا من خلال تقييمك
          </ReviewSubtitle>
        </ReviewHeader>

        <form onSubmit={handleSubmit}>
          <StarRatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={handleStarLeave}
                aria-label={`Rate ${star} stars`}
              >
                <StarIcon filled={(hoverRating || rating) >= star}>
                  {(hoverRating || rating) >= star ? "★" : "☆"}
                </StarIcon>
              </StarButton>
            ))}
          </StarRatingContainer>

          <RatingText>{getRatingText(hoverRating || rating)}</RatingText>

          <FeedbackSection>
            <FeedbackLabel htmlFor="feedback">
              أخبرنا المزيد عن تجربتك (اختياري)
            </FeedbackLabel>
            <FeedbackTextarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="شارك تجربتك مع الطبيب... ما الذي أعجبك؟ وما الذي يمكن تحسينه؟"
              rows={4}
              maxLength={500}
            />
            <div
              style={{
                textAlign: "right",
                fontSize: "12px",
                color: "#666",
                marginTop: "4px",
              }}
            >
              {feedback.length}/500
            </div>
          </FeedbackSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            <CancelButton type="button" onClick={handleCancel}>
              إلغاء
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
            </SubmitButton>
          </ButtonGroup>
        </form>
      </ReviewContainer>
    </ReWrapper>
  );
};

export default Review;
