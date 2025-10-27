import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ApFoInput,
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
} from "./Apply.elements";

const Apply = () => {
  const [isMasterOneVisible, setIsMasterOneVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [otherSpecialty, setOtherSpecialty] = useState("");
  const [salaryRange, setSalaryRange] = useState(""); // New state for salary range
  const [disciplineOptions, setDisciplineOptions] = useState([]);
  const [specialtyOptions, setSpecialtyOptions] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const professionOptions = {
    ممرض: ["ممرض سريري", "ممرض جراحي"],
    طبيب: ["قلب", "اعصاب"],
    dentist: ["جراحة", "عيادة"],
    allies: ["قلب", "اعصاب"],
    leadership: ["قلب", "اعصاب"],
    language: ["قلب", "اعصاب"],
  };

  const disciplineOptionsMapping = {
    "ممرض سريري": ["Adult Health", "Pediatrics"],
    "ممرض جراحي": ["Orthopedics", "Neurosurgery"],
    قلب: ["قلب تدخلي", "كهربت القلب"],
    اعصاب: ["Stroke Care", "Epilepsy"],
  };

  // Salary range options
  const salaryRanges = [
    "أقل من 5,000 ريال",
    "5,000 - 10,000 ريال",
    "10,000 - 15,000 ريال",
    "15,000 - 20,000 ريال",
    "20,000 - 30,000 ريال",
    "أكثر من 30,000 ريال",
  ];

  const submitApplication = async () => {
    setIsLoading(true);
    const applicationData = {
      email,
      phone,
      firstName,
      lastName,
      profession,
      discipline,
      specialty,
      otherSpecialty,
      salaryRange, // Include salary range in submission
    };

    try {
      // Make the API call to submit the application
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

      // Handle the response
      const result = await response.json();
      console.log(result);
      // Maybe show a success message or redirect the user
      navigate("/");
    } catch (error) {
      // Handle any errors
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

  // Handle specialty selection with locking logic
  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    setSpecialty(value);

    // If a main specialty is selected, clear other specialty
    if (value) {
      setOtherSpecialty("");
    }
  };

  // Handle other specialty selection with locking logic
  const handleOtherSpecialtyChange = (e) => {
    const value = e.target.value;
    setOtherSpecialty(value);

    // If other specialty is selected, clear main specialty
    if (value) {
      setSpecialty("");
    }
  };

  const validateEmail = (email) => {
    // Regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleButtonClick = () => {
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }

    setIsMasterOneVisible(!isMasterOneVisible);
  };

  useEffect(() => {
    if (profession) {
      setDisciplineOptions(professionOptions[profession] || []);
    }
  }, [profession]);

  useEffect(() => {
    if (discipline) {
      setSpecialtyOptions(disciplineOptionsMapping[discipline] || []);
    }
  }, [discipline]);

  // Loading spinner component
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
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      <ApWrap>
        <ApSubWrap>
          <ApConOn>
            <ApHe>حان الوقت للارتقاء بمستوى مهنتك إلى المستوى التالي</ApHe>
            <ApHeBe>
              بغض النظر عن المكان الذي ترغب في الذهاب إليه، لدينا فرص في مواقع
              متعددة في جميع أنحاء البلاد
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
                        خُذ الخطوة الأولى لبدء مسيرتك المهنية الجديدة
                      </AqAraOnePa>
                    </AqAraOne>
                    <AqAraTwo>
                      <ApFo onSubmit={(e) => e.preventDefault()}>
                        <ApFoIn type="text" />
                        <ApFoIn type="text" />
                        <ApFoIn type="text" />
                        <ApFoIn type="text" />
                        <ApFoIn type="text" />
                        <ApFoInput type="text" />
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
                                    {Object.keys(professionOptions).map(
                                      (key) => (
                                        <HiFiOp key={key} value={key}>
                                          {key}
                                        </HiFiOp>
                                      )
                                    )}
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
                                  <HiFiLa>التخصص *</HiFiLa>
                                  <HiFiSel
                                    id="specialty"
                                    value={specialty}
                                    onChange={handleSpecialtyChange}
                                    disabled={
                                      !discipline ||
                                      isLoading ||
                                      otherSpecialty !== ""
                                    }
                                  >
                                    <HiFiOp value="">-- اختر التخصص --</HiFiOp>
                                    {specialtyOptions.map((option) => (
                                      <HiFiOp key={option} value={option}>
                                        {option}
                                      </HiFiOp>
                                    ))}
                                  </HiFiSel>
                                  <HiOnSp></HiOnSp>
                                </HiWraOn>
                                <HiWraOn>
                                  <HiFiLa>تخصصات اخرى *</HiFiLa>
                                  <HiFiSel
                                    id="otherSpecialty"
                                    value={otherSpecialty}
                                    onChange={handleOtherSpecialtyChange}
                                    disabled={isLoading || specialty !== ""}
                                  >
                                    <HiFiOp value="">-- تخصصات اخرى --</HiFiOp>
                                    <HiFiOp value="nursing">تمريض</HiFiOp>
                                    <HiFiOp value="allies">استقبال</HiFiOp>
                                    <HiFiOp value="physician">طبيب</HiFiOp>
                                    <HiFiOp value="leadership">اداري</HiFiOp>
                                    <HiFiOp value="dentist">طبيب اسنان</HiFiOp>
                                    <HiFiOp value="language">فني</HiFiOp>
                                  </HiFiSel>
                                  <HiOnSp></HiOnSp>
                                </HiWraOn>
                                <HiWraOn>
                                  <HiFiLa>النطاق المرتب المطلوب *</HiFiLa>
                                  <HiFiSel
                                    id="salaryRange"
                                    value={salaryRange}
                                    onChange={(e) =>
                                      handleSelectChange(e, setSalaryRange)
                                    }
                                    disabled={isLoading}
                                  >
                                    <HiFiOp value="">
                                      -- اختر النطاق المرتبي --
                                    </HiFiOp>
                                    {salaryRanges.map((range, index) => (
                                      <HiFiOp key={index} value={range}>
                                        {range}
                                      </HiFiOp>
                                    ))}
                                  </HiFiSel>
                                  <HiOnSp></HiOnSp>
                                </HiWraOn>
                                <HiWraOn>
                                  <HiTwLa htmlFor="">السيرة *</HiTwLa>
                                  <HiOnIn
                                    id="resume"
                                    type="file"
                                    placeholder="resume"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    disabled={isLoading}
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
    </>
  );
};

export default Apply;
