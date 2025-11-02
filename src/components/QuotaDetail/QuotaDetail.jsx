import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {
  ArrowRight,
  Calendar,
  User,
  Phone,
  MapPin,
  Users,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Edit,
  Save,
  X,
} from "lucide-react";

const BASE_URL = "https://theknot-30278e2ff419.herokuapp.com/api";

// Styled Components
const Container = styled.div`
  direction: rtl;
  text-align: right;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background: #f5f5f5;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
  margin-bottom: 20px;

  &:hover {
    background-color: #f0f0f0;
  }

  &:focus {
    outline: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

const StatusSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusBadge = styled.span`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;

  ${({ status }) => {
    switch (status) {
      case "مكتملة":
      case "completed":
        return `
          background: #d4edda;
          color: #155724;
        `;
      case "قيد المراجعة":
      case "pending":
        return `
          background: #fff3cd;
          color: #856404;
        `;
      case "ملغية":
      case "cancelled":
        return `
          background: #f8d7da;
          color: #721c24;
        `;
      default:
        return `
          background: #e2e3e5;
          color: #495057;
        `;
    }
  }}
`;

const EditStatusButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #007bff;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }
`;

const StatusUpdateModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  width: 90%;
  direction: rtl;
`;

const ModalTitle = styled.h3`
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #333;
`;

const StatusSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e3e5;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  margin-bottom: 20px;
  direction: rtl;
  color: #000;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;

  ${({ variant }) =>
    variant === "primary"
      ? `
    background: #28a745;
    color: white;
    border: none;
    &:hover {
      background: #218838;
    }
    &:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }
  `
      : `
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #dee2e6;
    &:hover {
      background: #e2e6ea;
    }
  `}

  &:focus {
    outline: none;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
`;

const InfoIcon = styled.div`
  color: #666;
  margin-top: 2px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

const InfoValue = styled.div`
  font-size: 16px;
  color: #333;
  font-weight: 500;
  word-wrap: break-word;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #dc3545;
`;

const ErrorText = styled.div`
  font-size: 18px;
  margin-bottom: 16px;
`;

const RetryButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const QuotaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [quotaData, setQuotaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const accessToken = currentUser?.accessToken;

  const statusOptions = [
    { value: "قيد المراجعة", label: "قيد المراجعة" },
    { value: "مكتملة", label: "مكتملة" },
    { value: "ملغية", label: "ملغية" },
  ];

  useEffect(() => {
    const fetchQuotaDetail = async () => {
      if (!accessToken || !id) {
        setError("معلومات المصادقة مفقودة");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError("");

        console.log("Fetching quota with ID:", id);
        console.log("API URL:", `${BASE_URL}/quota/${id}`);

        // First, let's try to get all quotas to see the structure
        console.log("First, fetching all quotas to debug...");
        const allQuotasResponse = await axios.get(`${BASE_URL}/quota`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("All quotas response:", allQuotasResponse.data);

        // Find the quota by ID in the response
        const quotaArray = allQuotasResponse.data;
        const foundQuota = quotaArray.find((quota) => quota._id === id);

        if (foundQuota) {
          console.log("Found quota:", foundQuota);
          setQuotaData(foundQuota);
          setSelectedStatus(foundQuota.status || "قيد المراجعة");
        } else {
          console.log(
            "Quota not found in array. Available IDs:",
            quotaArray.map((q) => q._id)
          );
          // Try the original API call anyway
          try {
            const response = await axios.get(`${BASE_URL}/quota/${id}`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            });
            setQuotaData(response.data);
            setSelectedStatus(response.data.status || "قيد المراجعة");
          } catch (singleQuotaErr) {
            console.error("Single quota fetch also failed:", singleQuotaErr);
            setError("لم يتم العثور على الطلب المحدد");
          }
        }
      } catch (err) {
        console.error("Error fetching quota detail:", err);
        console.error("Error response:", err.response);
        setError(
          err.response?.data?.message ||
            "تعذّر جلب بيانات الطلب. يرجى المحاولة مرة أخرى."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotaDetail();
  }, [accessToken, id]);

  const handleStatusUpdate = async () => {
    if (!selectedStatus || selectedStatus === quotaData.status) {
      setShowStatusModal(false);
      return;
    }

    try {
      setIsUpdatingStatus(true);

      const response = await axios.put(
        `${BASE_URL}/quota/${id}/status`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the local state with the new status
      setQuotaData((prevData) => ({
        ...prevData,
        status: selectedStatus,
      }));

      setShowStatusModal(false);

      // You could add a success toast notification here
      console.log("Status updated successfully:", response.data);
    } catch (err) {
      console.error("Error updating status:", err);
      setError(
        err.response?.data?.error ||
          "تعذّر تحديث حالة الطلب. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    try {
      // Use en-GB for Gregorian calendar with day/month/year format
      return new Date(dateString).toLocaleDateString("ar-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return "غير محدد";
    return `${amount} ريال`;
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>جاري تحميل بيانات الطلب...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <AlertCircle size={48} />
          <ErrorText>{error}</ErrorText>
          <RetryButton onClick={() => window.location.reload()}>
            المحاولة مرة أخرى
          </RetryButton>
        </ErrorContainer>
      </Container>
    );
  }

  if (!quotaData) {
    return (
      <Container>
        <ErrorContainer>
          <XCircle size={48} />
          <ErrorText>لم يتم العثور على الطلب</ErrorText>
        </ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={handleBack}>
        <ArrowRight size={16} />
        العودة إلى الطلبات
      </BackButton>

      <Header>
        <div>
          <Title>تفاصيل الطلب</Title>
          <div style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
            رقم الطلب: {quotaData._id?.slice(-8) || "غير محدد"}
          </div>
        </div>
        <StatusSection>
          <StatusBadge status={quotaData.status}>
            {quotaData.status || "قيد المراجعة"}
          </StatusBadge>
          <EditStatusButton
            onClick={() => setShowStatusModal(true)}
            disabled={isUpdatingStatus}
          >
            <Edit size={14} />
            تعديل الحالة
          </EditStatusButton>
        </StatusSection>
      </Header>

      {/* Status Update Modal */}
      {showStatusModal && (
        <StatusUpdateModal onClick={() => setShowStatusModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>تحديث حالة الطلب</ModalTitle>
            <StatusSelect
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </StatusSelect>
            <ModalActions>
              <ModalButton
                variant="primary"
                onClick={handleStatusUpdate}
                disabled={isUpdatingStatus}
              >
                <Save size={14} />
                {isUpdatingStatus ? "جاري التحديث..." : "حفظ"}
              </ModalButton>
              <ModalButton onClick={() => setShowStatusModal(false)}>
                <X size={14} />
                إلغاء
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </StatusUpdateModal>
      )}

      {/* Customer Information */}
      <Card>
        <CardTitle>
          <User size={20} />
          معلومات العميل
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoIcon>
              <User size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>الاسم</InfoLabel>
              <InfoValue>
                {`${quotaData.firstName || ""} ${
                  quotaData.lastName || ""
                }`.trim() || "غير محدد"}
              </InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Phone size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>رقم الهاتف</InfoLabel>
              <InfoValue>{quotaData.phoneNumber || "غير محدد"}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <MapPin size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>المدينة</InfoLabel>
              <InfoValue>{quotaData.city || "غير محددة"}</InfoValue>
            </InfoContent>
          </InfoItem>
        </InfoGrid>
      </Card>

      {/* Wedding Details */}
      <Card>
        <CardTitle>
          <Calendar size={20} />
          تفاصيل الزفاف
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoIcon>
              <Calendar size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>تاريخ الزفاف</InfoLabel>
              <InfoValue>{formatDate(quotaData.weddingDate)}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Users size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>عدد الضيوف</InfoLabel>
              <InfoValue>{quotaData.guestCount || "غير محدد"}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Clock size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>وقت الحفل</InfoLabel>
              <InfoValue>{quotaData.visitTime || "غير محدد"}</InfoValue>
            </InfoContent>
          </InfoItem>
        </InfoGrid>

        {quotaData.weddingDetails && (
          <InfoItem style={{ marginTop: 16 }}>
            <InfoIcon>
              <FileText size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>تفاصيل إضافية</InfoLabel>
              <InfoValue style={{ whiteSpace: "pre-wrap" }}>
                {quotaData.weddingDetails}
              </InfoValue>
            </InfoContent>
          </InfoItem>
        )}
      </Card>

      {/* Vendor Information */}
      {quotaData.vendor && (
        <Card>
          <CardTitle>
            <CheckCircle size={20} />
            معلومات المورد
          </CardTitle>
          <InfoGrid>
            <InfoItem>
              <InfoIcon>
                <User size={16} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>اسم المورد</InfoLabel>
                <InfoValue>{quotaData.vendor.name || "غير محدد"}</InfoValue>
              </InfoContent>
            </InfoItem>

            {quotaData.vendor.email && (
              <InfoItem>
                <InfoIcon>
                  <Phone size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>البريد الإلكتروني</InfoLabel>
                  <InfoValue>{quotaData.vendor.email}</InfoValue>
                </InfoContent>
              </InfoItem>
            )}
          </InfoGrid>
        </Card>
      )}

      {/* Order Timeline */}
      <Card>
        <CardTitle>
          <Clock size={20} />
          تواريخ مهمة
        </CardTitle>
        <InfoGrid>
          <InfoItem>
            <InfoIcon>
              <Calendar size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>تاريخ إنشاء الطلب</InfoLabel>
              <InfoValue>{formatDate(quotaData.createdAt)}</InfoValue>
            </InfoContent>
          </InfoItem>

          <InfoItem>
            <InfoIcon>
              <Calendar size={16} />
            </InfoIcon>
            <InfoContent>
              <InfoLabel>آخر تحديث</InfoLabel>
              <InfoValue>{formatDate(quotaData.updatedAt)}</InfoValue>
            </InfoContent>
          </InfoItem>
        </InfoGrid>
      </Card>

      {/* Additional Information */}
      {(quotaData.budget || quotaData.notes || quotaData.requirements) && (
        <Card>
          <CardTitle>
            <FileText size={20} />
            معلومات إضافية
          </CardTitle>
          <InfoGrid>
            {quotaData.budget && (
              <InfoItem>
                <InfoIcon>
                  <DollarSign size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>الميزانية</InfoLabel>
                  <InfoValue>{formatCurrency(quotaData.budget)}</InfoValue>
                </InfoContent>
              </InfoItem>
            )}

            {quotaData.requirements && (
              <InfoItem>
                <InfoIcon>
                  <FileText size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>المتطلبات الخاصة</InfoLabel>
                  <InfoValue style={{ whiteSpace: "pre-wrap" }}>
                    {quotaData.requirements}
                  </InfoValue>
                </InfoContent>
              </InfoItem>
            )}

            {quotaData.notes && (
              <InfoItem>
                <InfoIcon>
                  <FileText size={16} />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>ملاحظات</InfoLabel>
                  <InfoValue style={{ whiteSpace: "pre-wrap" }}>
                    {quotaData.notes}
                  </InfoValue>
                </InfoContent>
              </InfoItem>
            )}
          </InfoGrid>
        </Card>
      )}
    </Container>
  );
};

export default QuotaDetail;
