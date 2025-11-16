import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  AdCon,
  AdConSec,
  AgBut,
  AgCon,
  AgPa,
  ApConOn,
  ApConTw,
  ApFo,
  ApFoIn,
  ApFoNo,
  ApHe,
  ApHeBe,
  ApHeDi,
  ApNo,
  ApSubWrap,
  ApWrap,
  AqAra,
  AqAraOne,
  AqAraOnePa,
  AqAraTwo,
  AqCon,
  AqMain,
  AqSec,
  AqSubCon,
  AqSubSec,
  ConFi,
  ConFo,
  ConOn,
  ConTh,
  ConTo,
  HiFiLa,
  HiFiOp,
  HiFiSel,
  HiOnIn,
  HiOnLa,
  HiOnSp,
  HiTwLa,
  HiWraOn,
  MasterOne,
  MasterTwo,
  TmBut,
  TmCon,
  TmEq,
  TmIn,
  TmInCon,
  TmInLab,
  TmInSpan,
  TmInSubCon,
  WaitingSp,
} from "./Apply.elements";

// Animated Counter Component
const AnimatedCounter = ({ targetValue, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const startValue = isInitialMount.current ? 0 : previousValueRef.current;
    const difference = targetValue - startValue;

    if (difference === 0) return;

    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + difference * easedProgress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        previousValueRef.current = targetValue;
        startTimeRef.current = null;
        isInitialMount.current = false;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return <WaitingSp>{displayValue}</WaitingSp>;
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <div
      style={{
        width: "16px",
        height: "16px",
        border: "2px solid #ffffff40",
        borderTop: "2px solid #ffffff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <span>جاري الإرسال...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const Apply = () => {
  const [isMasterOneVisible, setIsMasterOneVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [level, setLevel] = useState("");
  const [patientsMonthly, setPatientsMonthly] = useState("");
  const [disciplineOptions, setDisciplineOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [waitingList, setWaitingList] = useState(1272);

  const navigate = useNavigate();

  const professionOptions = {
    طبيب: [
      "جراحة تجميل",
      "جلدية",
      "طبيب نفسي",
      "جراحة أنف وأذن وحنجرة",
      "جراحة عيون",
      "قلب",
      "اعصاب",
      "طبيب باطنة",
      "جراحة عظام",
      "أطفال",
      "نساء وولادة",
    ],
    "طبيب اسنان": ["جراحة", "عيادة"],
    ممرض: ["ممرض سريري", "ممرض جراحي"],
  };

  const levelOptions = ["استشاري", "اخصائي", "مقيم"];

  const patientsMonthlyOptions = [
    "0-50",
    "51-100",
    "101-200",
    "201-300",
    "301-500",
    "500+",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWaitingList((prev) => {
        const newValue = prev + 8;
        return newValue >= 1325 ? 1325 : newValue;
      });
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (profession) {
      setDisciplineOptions(professionOptions[profession] || []);
    }
  }, [profession]);

  const submitApplication = async () => {
    setIsLoading(true);
    const applicationData = {
      email,
      phone,
      firstName,
      lastName,
      profession,
      discipline,
      level,
      patientsMonthly,
    };

    try {
      const response = await fetch(
        "https://theknot-30278e2ff419.herokuapp.com/api/applies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(applicationData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const handleInputChange = (event, setterFunction) => {
    setterFunction(event.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleButtonClick = () => {
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setIsMasterOneVisible(!isMasterOneVisible);
  };

  return (
    <ApWrap>
      <ApSubWrap>
        <ApConOn>
          <ApHe>
            <span>
              <AnimatedCounter targetValue={waitingList} />
            </span>
            <span> مسجل في قائمة الانتظار</span>
          </ApHe>
          <ApHeBe>
            شريكك التقني الذي يساعدك على النمو والوصول إلى أكبر عدد ممكن من
            العملاء في أي مكان
          </ApHeBe>
          <ApHeDi></ApHeDi>
        </ApConOn>
        <ApConTw>
          <AqCon></AqCon>
          <AqMain>
            <AqSec>
              <AqSubSec>
                <AqAra>
                  <AqAraOne>
                    <AqAraOnePa>
                      عبّر عن اهتمامك وانضم إلى قائمة الانتظار
                    </AqAraOnePa>
                  </AqAraOne>
                  <AqAraTwo>
                    <ApFo onSubmit={(e) => e.preventDefault()}>
                      <ApFoIn type="text" />
                      <ApFoIn type="text" />
                      <ApFoIn type="text" />
                      <ApFoIn type="text" />
                      <ApFoIn type="text" />
                      <ApFoNo>
                        <ApNo></ApNo>
                      </ApFoNo>
                      <AdCon>
                        <AdConSec>
                          {isMasterOneVisible && (
                            <MasterOne>
                              <TmCon>
                                <ConOn>
                                  <svg></svg>
                                </ConOn>
                                <ConTo>
                                  <svg></svg>
                                </ConTo>
                                <ConTh>
                                  <svg></svg>
                                </ConTh>
                                <ConFo>
                                  <svg></svg>
                                </ConFo>
                                <ConFi>
                                  <svg></svg>
                                </ConFi>
                                <TmEq>
                                  <TmInCon>
                                    <TmInSubCon>
                                      <TmInLab htmlFor="emailInput"></TmInLab>
                                      <TmIn
                                        id="emailInput"
                                        type="email"
                                        placeholder="ايميل *"
                                        value={email}
                                        onChange={handleEmailChange}
                                      />
                                      {emailError && (
                                        <TmInSpan>{emailError}</TmInSpan>
                                      )}
                                    </TmInSubCon>
                                  </TmInCon>
                                  <TmBut onClick={handleButtonClick}>
                                    ابدا
                                  </TmBut>
                                </TmEq>
                                <a href=""></a>
                                <a href=""></a>
                                <a href=""></a>
                              </TmCon>
                            </MasterOne>
                          )}
                          {!isMasterOneVisible && (
                            <MasterTwo>
                              <HiWraOn>
                                <HiOnLa htmlFor="">ايميل *</HiOnLa>
                                <HiOnIn
                                  id="email"
                                  type="email"
                                  placeholder="Email"
                                  value={email}
                                  onChange={(e) =>
                                    handleInputChange(e, setEmail)
                                  }
                                  disabled={isLoading}
                                />
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiTwLa htmlFor="">رقم الجوال *</HiTwLa>
                                <HiOnIn
                                  id="phone"
                                  type="text"
                                  placeholder="رقم الجوال"
                                  value={phone}
                                  onChange={(e) =>
                                    handleInputChange(e, setPhone)
                                  }
                                  disabled={isLoading}
                                />
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiTwLa htmlFor="">الاسم الاول *</HiTwLa>
                                <HiOnIn
                                  id="firstName"
                                  type="text"
                                  placeholder="الاسم الاول"
                                  value={firstName}
                                  onChange={(e) =>
                                    handleInputChange(e, setFirstName)
                                  }
                                  disabled={isLoading}
                                />
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiTwLa htmlFor="">اسم العائلة *</HiTwLa>
                                <HiOnIn
                                  id="LastName"
                                  type="text"
                                  placeholder="اسم العائلة"
                                  value={lastName}
                                  onChange={(e) =>
                                    handleInputChange(e, setLastName)
                                  }
                                  disabled={isLoading}
                                />
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiFiLa>المهنة *</HiFiLa>
                                <HiFiSel
                                  id="profession"
                                  value={profession}
                                  onChange={(e) =>
                                    handleSelectChange(e, setProfession)
                                  }
                                  disabled={isLoading}
                                >
                                  <HiFiOp value="">-- اختر المهنة --</HiFiOp>
                                  {Object.keys(professionOptions).map((key) => (
                                    <HiFiOp key={key} value={key}>
                                      {key}
                                    </HiFiOp>
                                  ))}
                                </HiFiSel>
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiFiLa>الشهادة *</HiFiLa>
                                <HiFiSel
                                  id="discipline"
                                  value={discipline}
                                  onChange={(e) =>
                                    handleSelectChange(e, setDiscipline)
                                  }
                                  disabled={!profession || isLoading}
                                >
                                  <HiFiOp value="">-- اختر الشهادة --</HiFiOp>
                                  {disciplineOptions.map((option) => (
                                    <HiFiOp key={option} value={option}>
                                      {option}
                                    </HiFiOp>
                                  ))}
                                </HiFiSel>
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiFiLa>المستوى *</HiFiLa>
                                <HiFiSel
                                  id="level"
                                  value={level}
                                  onChange={(e) =>
                                    handleSelectChange(e, setLevel)
                                  }
                                  disabled={isLoading}
                                >
                                  <HiFiOp value="">-- اختر المستوى --</HiFiOp>
                                  {levelOptions.map((option) => (
                                    <HiFiOp key={option} value={option}>
                                      {option}
                                    </HiFiOp>
                                  ))}
                                </HiFiSel>
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiFiLa>عدد المرضى شهريا *</HiFiLa>
                                <HiFiSel
                                  id="patientsMonthly"
                                  value={patientsMonthly}
                                  onChange={(e) =>
                                    handleSelectChange(e, setPatientsMonthly)
                                  }
                                  disabled={isLoading}
                                >
                                  <HiFiOp value="">-- اختر النطاق --</HiFiOp>
                                  {patientsMonthlyOptions.map((option) => (
                                    <HiFiOp key={option} value={option}>
                                      {option}
                                    </HiFiOp>
                                  ))}
                                </HiFiSel>
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <HiFiLa>تصنيف الهيئة "اختياري" </HiFiLa>
                                <HiOnIn
                                  id="resume"
                                  type="file"
                                  placeholder="resume"
                                  onChange={(e) => setFile(e.target.files[0])}
                                  disabled={isLoading}
                                  accept=".pdf,.doc,.docx"
                                />
                                <HiOnSp></HiOnSp>
                              </HiWraOn>
                              <HiWraOn>
                                <AgCon>
                                  <AgPa>* حقول اجبارية</AgPa>
                                  <AgPa></AgPa>
                                  <AgPa>
                                    "أوافق على استلام البريد الإلكتروني،
                                    والرسائل النصية الآلية والمكالمات الهاتفية
                                    (بما في ذلك المكالمات التي تحتوي على محتوى
                                    مُسجل مُسبقًا) من ونيابةً عن اللميديكال،
                                    والشركات التابعة لها."
                                    <a href="">اريني المزيد</a>
                                  </AgPa>
                                </AgCon>
                              </HiWraOn>
                              <HiWraOn>
                                <AgBut
                                  type="button"
                                  onClick={submitApplication}
                                  disabled={isLoading}
                                  style={{
                                    opacity: isLoading ? 0.7 : 1,
                                    cursor: isLoading
                                      ? "not-allowed"
                                      : "pointer",
                                  }}
                                >
                                  {isLoading ? <LoadingSpinner /> : "ارسال!"}
                                </AgBut>
                              </HiWraOn>
                            </MasterTwo>
                          )}
                        </AdConSec>
                      </AdCon>
                    </ApFo>
                  </AqAraTwo>
                </AqAra>
              </AqSubSec>
            </AqSec>
          </AqMain>
          <AqSubCon></AqSubCon>
        </ApConTw>
      </ApSubWrap>
    </ApWrap>
  );
};

export default Apply;
