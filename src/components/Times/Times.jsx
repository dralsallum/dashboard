import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  ContentSection,
  FiltersBar,
  FilterBtn,
  HeaderSection,
  ProvidersCount,
  DateRange,
  ArrowBtn,
  ProvidersList,
  ProviderCard,
  ProviderInfo,
  ProviderAvatar,
  AvatarImage,
  AvatarPlaceholder,
  ProviderDetails,
  ProviderHeader,
  ProviderName,
  SponsoredBadge,
  ProviderSpecialty,
  ProviderMeta,
  Rating,
  MetaItem,
  Badges,
  Badge,
  AvailabilityGrid,
  AvailabilityRow,
  AvailabilitySlot,
  DateLabel,
  SlotsCount,
  MoreBtn,
  LoadingWrapper,
  LoadingSp,
  LoadingBar,
  LoadingBarFill,
  FilterDropdown,
  FilterOption,
  FilterToggle,
  InputFilter,
} from "./Times.elements";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Times = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clinicians, setClinicians] = useState([]);
  const [filteredClinicians, setFilteredClinicians] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageLoadStates, setImageLoadStates] = useState({});
  const { major } = useParams();
  const loadingBarRef = useRef(null);

  // Filter states
  const [showCountryFilter, setShowCountryFilter] = useState(false);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableWithinWeek, setAvailableWithinWeek] = useState(false);

  // Refs for click outside detection
  const countryFilterRef = useRef(null);
  const cityFilterRef = useRef(null);

  const handleNavigate = (dir) => {
    navigate(dir);
  };

  // Read query parameters and set filters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const cityParam = searchParams.get("city");
    const countryParam = searchParams.get("country");

    if (countryParam) {
      setSelectedCountry(countryParam);
    }

    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, [location.search]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryFilterRef.current &&
        !countryFilterRef.current.contains(event.target)
      ) {
        setShowCountryFilter(false);
      }
      if (
        cityFilterRef.current &&
        !cityFilterRef.current.contains(event.target)
      ) {
        setShowCityFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Loading animation effect
  useEffect(() => {
    if (loading) {
      setLoadingProgress(0);
      const duration = 3000; // 3 seconds
      const startTime = Date.now();

      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);

        setLoadingProgress(progress);

        if (progress < 100 && loading) {
          requestAnimationFrame(animateProgress);
        }
      };

      requestAnimationFrame(animateProgress);
    }
  }, [loading]);

  // Filter clinicians based on selected filters
  useEffect(() => {
    let filtered = [...clinicians];

    // Filter by country
    if (selectedCountry) {
      filtered = filtered.filter(
        (clinician) => clinician.country === selectedCountry
      );
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter(
        (clinician) => clinician.city === selectedCity
      );
    }

    // Filter by availability within a week
    if (availableWithinWeek) {
      filtered = filtered.filter((clinician) => {
        // Check if any slot in the first 7 days has availability
        const hasWeekAvailability = clinician.availability
          .slice(0, 7)
          .some((slot) => slot.available && slot.slots > 0);
        return hasWeekAvailability;
      });
    }

    setFilteredClinicians(filtered);
  }, [clinicians, selectedCountry, selectedCity, availableWithinWeek]);

  // Helper function to generate availability slots for the next 14 days
  const generateAvailabilitySlots = (workingHours, holidays = []) => {
    const slots = [];
    const today = new Date();
    const dayNames = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const arabicDays = [
      "الأحد",
      "الإثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    const arabicMonths = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const dayName = dayNames[date.getDay()];
      const arabicDay = arabicDays[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = arabicMonths[date.getMonth()];

      // Check if it's a holiday
      const isHoliday = holidays.some((holiday) => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate.getTime() === date.getTime();
      });

      // Get working hours for this day
      const daySchedule = workingHours?.[dayName] || {
        isOpen: false,
        slots: [],
      };

      // Calculate available slots
      let availableSlots = 0;
      if (!isHoliday && daySchedule.isOpen && daySchedule.slots?.length > 0) {
        // Calculate slots based on time range and appointment duration (assuming 30 min slots)
        daySchedule.slots.forEach((slot) => {
          const [startHour, startMin] = slot.startTime.split(":").map(Number);
          const [endHour, endMin] = slot.endTime.split(":").map(Number);
          const startMinutes = startHour * 60 + startMin;
          const endMinutes = endHour * 60 + endMin;
          const duration = endMinutes - startMinutes;
          availableSlots += Math.floor(duration / 30); // Assuming 30-minute slots
        });
      }

      slots.push({
        date: `${arabicDay}\n${month} ${dayOfMonth}`,
        slots: availableSlots,
        available: availableSlots > 0,
      });
    }

    return slots;
  };

  // Helper function to map backend data to frontend format
  const mapCliniciansData = (backendClinicians) => {
    return backendClinicians.map((clinician) => {
      const fullName = `د. ${clinician.docFirstName || ""} ${
        clinician.docLastName || ""
      }`.trim();
      const displayName = fullName !== "د." ? fullName : clinician.username;

      // Generate availability based on working hours
      const availability = generateAvailabilitySlots(
        clinician.appointmentSettings?.workingHours,
        clinician.appointmentSettings?.holidays || []
      );

      // Split into two rows (7 days each)
      const firstRow = availability.slice(0, 7);
      const secondRow = availability.slice(7, 13);

      return {
        id: clinician._id,
        name: displayName,
        specialty: clinician.major || "ممارس عام",
        rating: clinician.appointmentSettings?.reviewSettings?.rating || 0,
        reviews: clinician.appointmentSettings?.reviewSettings?.reviews || 0,
        videoVisits: true, // Default to true, can be made configurable
        inNetwork: clinician.appointmentSettings?.requireInsurance || false,
        sponsored: false, // Default to false
        badges: generateBadges(clinician),
        availability: firstRow,
        slug: clinician.slug,
        secondRow: secondRow,
        profileImg: clinician.profileImg,
        country: clinician.country || "",
        city: clinician.city || "",
      };
    });
  };

  // Helper function to generate badges based on clinician data
  const generateBadges = (clinician) => {
    const badges = [];

    if (clinician.appointmentSettings?.acceptNewPatients) {
      badges.push("مواعيد للمرضى الجدد");
    }

    if (clinician.rating >= 4.5 && clinician.reviews >= 10) {
      badges.push("موصى به للغاية");
    }

    if (clinician.appointmentSettings?.minimumNoticeHours <= 2) {
      badges.push("وقت انتظار ممتاز");
    }

    return badges;
  };

  // Get unique countries and cities from clinicians
  const countries = [
    ...new Set(clinicians.map((c) => c.country).filter(Boolean)),
  ];
  const cities = selectedCountry
    ? [
        ...new Set(
          clinicians
            .filter((c) => c.country === selectedCountry)
            .map((c) => c.city)
            .filter(Boolean)
        ),
      ]
    : [...new Set(clinicians.map((c) => c.city).filter(Boolean))];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Build URL with query parameter
        const url =
          major && major !== "all"
            ? `https://theknot-30278e2ff419.herokuapp.com/api/business/category?major=${encodeURIComponent(
                major
              )}`
            : "https://theknot-30278e2ff419.herokuapp.com/api/business/category";

        const response = await axios.get(url);

        // Map backend data to frontend format (no filtering needed)
        const mappedClinicians = mapCliniciansData(response.data);
        setClinicians(mappedClinicians);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [major]); // Re-fetch when major changes

  if (loading)
    return (
      <LoadingWrapper>
        <LoadingSp>جاري التحميل…</LoadingSp>
        <LoadingBar>
          <LoadingBarFill />
        </LoadingBar>
      </LoadingWrapper>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <Container>
      <ContentSection>
        <HeaderSection>
          <ProvidersCount>
            {filteredClinicians.length} مقدمي خدمة
          </ProvidersCount>
          <DateRange>
            <ArrowBtn>‹</ArrowBtn>
            <span>اليوم، نوفمبر 7 - الخميس، نوفمبر 20</span>
            <ArrowBtn>›</ArrowBtn>
          </DateRange>
        </HeaderSection>

        <FiltersBar>
          {/* Country Filter */}
          <div ref={countryFilterRef} style={{ position: "relative" }}>
            <FilterBtn
              $active={selectedCountry !== ""}
              onClick={() => setShowCountryFilter(!showCountryFilter)}
            >
              <span>🌍</span> {selectedCountry || "الدولة"}
            </FilterBtn>
            {showCountryFilter && (
              <FilterDropdown>
                <FilterOption
                  onClick={() => {
                    setSelectedCountry("");
                    setSelectedCity("");
                    setShowCountryFilter(false);
                  }}
                  $selected={selectedCountry === ""}
                >
                  الكل
                </FilterOption>
                {countries.map((country) => (
                  <FilterOption
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setSelectedCity(""); // Reset city when country changes
                      setShowCountryFilter(false);
                    }}
                    $selected={selectedCountry === country}
                  >
                    {country}
                  </FilterOption>
                ))}
              </FilterDropdown>
            )}
          </div>

          {/* City Filter */}
          <div ref={cityFilterRef} style={{ position: "relative" }}>
            <FilterBtn
              $active={selectedCity !== ""}
              onClick={() => setShowCityFilter(!showCityFilter)}
            >
              <span>🏙️</span> {selectedCity || "المدينة"}
            </FilterBtn>
            {showCityFilter && (
              <FilterDropdown>
                <FilterOption
                  onClick={() => {
                    setSelectedCity("");
                    setShowCityFilter(false);
                  }}
                  $selected={selectedCity === ""}
                >
                  الكل
                </FilterOption>
                {cities.map((city) => (
                  <FilterOption
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCityFilter(false);
                    }}
                    $selected={selectedCity === city}
                  >
                    {city}
                  </FilterOption>
                ))}
              </FilterDropdown>
            )}
          </div>

          {/* Available Within Week Toggle */}
          <FilterToggle
            $active={availableWithinWeek}
            onClick={() => setAvailableWithinWeek(!availableWithinWeek)}
          >
            <span>📅</span> متاح خلال أسبوع
            <InputFilter
              type="checkbox"
              checked={availableWithinWeek}
              onChange={() => {}}
            />
          </FilterToggle>
        </FiltersBar>

        <ProvidersList>
          {filteredClinicians.map((provider) => (
            <ProviderCard
              key={provider.id}
              onClick={() => {
                handleNavigate(`/${provider.slug}`);
              }}
            >
              <ProviderInfo>
                <ProviderAvatar>
                  {provider.profileImg ? (
                    <AvatarImage
                      src={provider.profileImg}
                      alt={provider.name}
                      onLoad={() => {
                        setImageLoadStates((prev) => ({
                          ...prev,
                          [provider.id]: true,
                        }));
                      }}
                      style={{
                        opacity: imageLoadStates[provider.id] ? 1 : 0,
                        transition: "opacity 0.3s ease-in-out",
                      }}
                    />
                  ) : (
                    <AvatarPlaceholder />
                  )}
                </ProviderAvatar>

                <ProviderDetails>
                  <ProviderHeader>
                    <ProviderName>{provider.name}</ProviderName>
                    {provider.sponsored && (
                      <SponsoredBadge>
                        اعلان <span>ⓘ</span>
                      </SponsoredBadge>
                    )}
                  </ProviderHeader>
                  <ProviderSpecialty>{provider.specialty}</ProviderSpecialty>

                  <ProviderMeta>
                    {provider.rating > 0 && (
                      <Rating>
                        <span>⭐</span>
                        <span>{provider.rating.toFixed(1)}</span>
                        <span className="reviews">
                          · {provider.reviews} تقييم
                        </span>
                      </Rating>
                    )}
                    {provider.videoVisits && (
                      <MetaItem>
                        <span>🎥</span> زيارات فيديو
                      </MetaItem>
                    )}
                    {provider.inNetwork && (
                      <MetaItem>
                        <span>✓</span> تحقق مما إذا كانوا ضمن الشبكة
                      </MetaItem>
                    )}
                  </ProviderMeta>

                  {provider.badges.length > 0 && (
                    <Badges>
                      {provider.badges.map((badge, idx) => (
                        <Badge key={idx}>{badge}</Badge>
                      ))}
                    </Badges>
                  )}
                </ProviderDetails>
              </ProviderInfo>

              <AvailabilityGrid>
                <AvailabilityRow>
                  {provider.availability.map((slot, idx) => (
                    <AvailabilitySlot key={idx} $available={slot.available}>
                      <DateLabel>
                        {slot.date.split("\n")[0]}{" "}
                        <span className="calendar-icon">📅</span>
                        <br />
                        {slot.date.split("\n")[1]}
                      </DateLabel>
                      <SlotsCount>
                        {slot.available ? (
                          <>
                            <strong>{slot.slots}</strong>
                            <br />
                            موعد
                          </>
                        ) : (
                          <>
                            لا يوجد
                            <br />
                            مواعيد
                          </>
                        )}
                      </SlotsCount>
                    </AvailabilitySlot>
                  ))}
                </AvailabilityRow>

                <AvailabilityRow className="second-row">
                  {provider.secondRow.map((slot, idx) => (
                    <AvailabilitySlot
                      key={idx}
                      $available={slot.available && slot.slots > 0}
                    >
                      <DateLabel>
                        {slot.date.split("\n")[0]}{" "}
                        <span className="calendar-icon">📅</span>
                        <br />
                        {slot.date.split("\n")[1]}
                      </DateLabel>
                      <SlotsCount>
                        {slot.available && slot.slots > 0 ? (
                          <>
                            <strong>{slot.slots}</strong>
                            <br />
                            موعد
                          </>
                        ) : (
                          <>
                            لا يوجد
                            <br />
                            مواعيد
                          </>
                        )}
                      </SlotsCount>
                    </AvailabilitySlot>
                  ))}
                  <MoreBtn className="more-btn">المزيد</MoreBtn>
                </AvailabilityRow>
              </AvailabilityGrid>
            </ProviderCard>
          ))}
        </ProvidersList>
      </ContentSection>
    </Container>
  );
};

export default Times;
