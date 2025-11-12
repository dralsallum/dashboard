import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
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
import { useParams, useNavigate } from "react-router-dom";
const Increase = keyframes`
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  direction: rtl;
  color: #444;
  background: #f7f2e6;
  font-size: 1.2rem;
  font-weight: 600;
  min-height: 100dvh;
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 8px;
  background-color: rgba(246, 224, 94, 0.2);
  border-radius: 4px;
  overflow: hidden;

  position: relative;
`;
const LoadingSp = styled.span`
  margin-bottom: 12px;
`;

const LoadingBarFill = styled.div`
  height: 100%;
  background-color: #f6e05e;
  border-radius: 4px;
  animation: ${Increase} 3s ease-out forwards;
  width: 0%;
`;

const Review = ({ onClose, onSubmitSuccess }) => {
  const { slug, quota } = useParams();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);

  // Validate that the quota can be reviewed on component mount
  useEffect(() => {
    const checkReviewEligibility = async () => {
      try {
        const response = await fetch(
          `https://theknot-30278e2ff419.herokuapp.com/api/review/can-review/${quota}`
        );
        const data = await response.json();

        if (!data.canReview) {
          setError(data.message || "لا يمكنك تقييم هذا الموعد");
          setCanReview(false);
        } else {
          setCanReview(true);
        }
      } catch (err) {
        setError("حدث خطأ أثناء التحقق من صلاحية التقييم");
        setCanReview(false);
      } finally {
        setIsLoading(false);
      }
    };

    if (quota) {
      checkReviewEligibility();
    } else {
      setError("معلومات الموعد غير صحيحة");
      setIsLoading(false);
    }
  }, [quota]);

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
      const response = await fetch(
        "https://theknot-30278e2ff419.herokuapp.com/api/review",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quotaId: quota,
            businessId: slug,
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

      // Auto redirect after 2 seconds
      setTimeout(() => {
        if (onClose) {
          onClose();
        } else {
          // Redirect to business page or home
          navigate(`/business/${slug}`);
        }
      }, 2000);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء إرسال التقييم");
    } finally {
      setIsSubmitting(false);
      navigate("/");
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <LoadingWrapper>
        <LoadingSp>جاري التحميل…</LoadingSp>
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
      </LoadingWrapper>
    );
  }

  // Error state - cannot review
  if (!canReview && error) {
    return (
      <ReWrapper>
        <ReviewContainer>
          <ErrorMessage>{error}</ErrorMessage>
          <ButtonGroup>
            <SubmitButton type="button" onClick={handleCancel}>
              العودة
            </SubmitButton>
          </ButtonGroup>
        </ReviewContainer>
      </ReWrapper>
    );
  }

  // Success state
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
              أخبرنا المزيد عن تجربتك
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
