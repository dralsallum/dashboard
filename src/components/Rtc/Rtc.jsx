import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  PhoneOff,
  Monitor,
  Users,
  Video,
} from "lucide-react";
import axios from "axios";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1f36 0%, #0f1419 100%);
  font-family: "Cairo", "Tajawal", sans-serif;
  direction: rtl;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle,
      rgba(16, 185, 129, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const Header = styled.div`
  padding: 30px 40px;
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  animation: ${fadeIn} 0.6s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #10b981;
  font-size: 1.5rem;
  font-weight: 700;
`;

const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  color: #10b981;
  font-size: 0.9rem;
  position: relative;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
  }
`;

const VideoContainer = styled.div`
  max-width: 1400px;
  margin: 40px auto;
  padding: 0 40px;
  animation: ${fadeIn} 0.8s ease-out 0.2s backwards;

  @media (max-width: 768px) {
    padding: 0 20px;
    margin: 20px auto;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.isWaiting ? "1fr" : "2fr 1fr")};
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  background: #0a0e1a;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 16/9;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 25px 70px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(16, 185, 129, 0.4);
  }

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const VideoLabel = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
`;

const WaitingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  text-align: center;
  padding: 40px;

  svg {
    margin-bottom: 20px;
    animation: ${pulse} 2s infinite;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  animation: ${fadeIn} 1s ease-out 0.4s backwards;
`;

const ControlButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  background: ${(props) => {
    if (props.variant === "danger")
      return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
    if (props.isActive)
      return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    return "rgba(255, 255, 255, 0.1)";
  }};

  color: #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.1);
      animation: ${ripple} 0.6s ease-out;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
  }
`;

const InfoPanel = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px 40px;
  animation: ${fadeIn} 1.2s ease-out 0.6s backwards;

  @media (max-width: 768px) {
    padding: 0 20px 20px;
  }
`;

const InfoCard = styled.div`
  background: rgba(15, 20, 25, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 16px;
  padding: 25px 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  span {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ConnectionIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background: ${(props) => {
    if (props.quality === "excellent") return "rgba(16, 185, 129, 0.2)";
    if (props.quality === "good") return "rgba(234, 179, 8, 0.2)";
    return "rgba(239, 68, 68, 0.2)";
  }};
  border-radius: 8px;
  font-size: 0.85rem;
  color: ${(props) => {
    if (props.quality === "excellent") return "#10b981";
    if (props.quality === "good") return "#eab308";
    return "#ef4444";
  }};
`;

const Input = styled.input`
  padding: 12px 20px;
  border-radius: 12px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  margin-bottom: 20px;
  width: 250px;
  text-align: center;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #10b981;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled(ControlButton)`
  width: 120px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
`;

const API_BASE_URL = "theknot-30278e2ff419.herokuapp.com";
const WS_URL = "ws://theknot-30278e2ff419.herokuapp.com";

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [connectionQuality, setConnectionQuality] = useState("excellent");
  const [roomId, setRoomId] = useState("");
  const [isWaiting, setIsWaiting] = useState(true);
  const [error, setError] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const socketRef = useRef(null);
  const isInitiatorRef = useRef(false);

  // WebRTC Configuration
  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const initializeWebSocket = () => {
    return new Promise((resolve, reject) => {
      socketRef.current = new WebSocket(WS_URL);

      socketRef.current.onopen = () => {
        console.log("Connected to signaling server");
        resolve();
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
        setError("فشل الاتصال بالخادم");
        reject(error);
      };

      socketRef.current.onmessage = async (message) => {
        try {
          const data = JSON.parse(message.data);
          await handleSignalingMessage(data);
        } catch (error) {
          console.error("Error handling message:", error);
        }
      };

      socketRef.current.onclose = () => {
        console.log("Disconnected from signaling server");
      };
    });
  };

  const handleSignalingMessage = async (data) => {
    switch (data.type) {
      case "joined-room":
        console.log("Joined room:", data.roomId);
        if (data.userCount > 1) {
          // We're not the first, so we should wait for an offer
          isInitiatorRef.current = false;
        } else {
          // We're the first, we'll create the offer when someone joins
          isInitiatorRef.current = true;
        }
        break;

      case "user-joined":
        console.log("User joined room");
        setIsWaiting(false);
        if (isInitiatorRef.current && peerConnectionRef.current) {
          // Create and send offer
          await createOffer();
        }
        break;

      case "offer":
        await handleOffer(data.offer);
        break;

      case "answer":
        await handleAnswer(data.answer);
        break;

      case "ice-candidate":
        await handleIceCandidate(data.candidate);
        break;

      case "user-left":
        console.log("User left room");
        setIsWaiting(true);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = null;
        }
        break;

      default:
        console.log("Unknown message type:", data.type);
    }
  };

  const startCall = async () => {
    if (!roomId) {
      setError("الرجاء إدخال رمز الغرفة");
      return;
    }

    try {
      setError(null);

      // Initialize WebSocket
      await initializeWebSocket();

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: "user" },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      peerConnectionRef.current = new RTCPeerConnection(configuration);

      // Add local stream to peer connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current.addTrack(track, stream);
      });

      // Handle ICE candidates
      peerConnectionRef.current.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.send(
            JSON.stringify({
              type: "ice-candidate",
              candidate: event.candidate,
              roomId: roomId,
            }),
          );
        }
      };

      // Handle remote stream
      peerConnectionRef.current.ontrack = (event) => {
        console.log("Received remote track");
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
        setIsWaiting(false);
      };

      // Monitor connection state
      peerConnectionRef.current.onconnectionstatechange = () => {
        const state = peerConnectionRef.current.connectionState;
        console.log("Connection state:", state);

        if (state === "connected") {
          setConnectionQuality("excellent");
        } else if (state === "disconnected" || state === "failed") {
          setConnectionQuality("poor");
          setError("حدث خطأ في الاتصال");
        }
      };

      // Join room via WebSocket
      socketRef.current.send(
        JSON.stringify({
          type: "join-room",
          roomId: roomId,
        }),
      );

      setIsCallActive(true);
    } catch (error) {
      console.error("Error starting call:", error);
      setError("فشل الوصول إلى الكاميرا أو الميكروفون");
      cleanup();
    }
  };

  const createOffer = async () => {
    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);

      socketRef.current.send(
        JSON.stringify({
          type: "offer",
          offer: offer,
          roomId: roomId,
        }),
      );
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleOffer = async (offer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(offer),
      );

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      socketRef.current.send(
        JSON.stringify({
          type: "answer",
          answer: answer,
          roomId: roomId,
        }),
      );
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  const handleAnswer = async (answer) => {
    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription(answer),
      );
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  const handleIceCandidate = async (candidate) => {
    try {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate),
        );
      }
    } catch (error) {
      console.error("Error handling ICE candidate:", error);
    }
  };

  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const endCall = () => {
    if (socketRef.current && roomId) {
      socketRef.current.send(
        JSON.stringify({
          type: "leave-room",
          roomId: roomId,
        }),
      );
    }
    cleanup();
  };

  const cleanup = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsCallActive(false);
    setIsWaiting(true);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo>
            <Video size={32} />
            <span>عيادة الطب عن بُعد</span>
          </Logo>
          <StatusBadge>
            {isCallActive ? "الاتصال نشط" : "جاهز للاتصال"}
          </StatusBadge>
        </HeaderContent>
      </Header>

      <VideoContainer>
        {!isCallActive ? (
          <VideoWrapper>
            <WaitingState>
              <Users size={60} color="#10b981" />
              <h3>ابدأ استشارة طبية</h3>
              <p>اضغط على زر البدء لبدء مكالمة الفيديو مع الطبيب</p>
              <div style={{ marginTop: "30px" }}>
                <Input
                  type="text"
                  placeholder="أدخل رمز الغرفة"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <br />
                {error && (
                  <p style={{ color: "#ef4444", marginBottom: "15px" }}>
                    {error}
                  </p>
                )}
                <Button isActive onClick={startCall} disabled={!roomId}>
                  بدء المكالمة
                </Button>
              </div>
            </WaitingState>
          </VideoWrapper>
        ) : (
          <>
            <VideoGrid isWaiting={isWaiting}>
              <VideoWrapper>
                <video ref={remoteVideoRef} autoPlay playsInline />
                <VideoLabel>
                  <Users size={16} />
                  الطبيب
                </VideoLabel>
                {isWaiting && (
                  <WaitingState>
                    <Monitor size={48} color="#10b981" />
                    <h3>في انتظار الطبيب...</h3>
                    <p>يرجى الانتظار حتى ينضم الطبيب إلى المكالمة</p>
                  </WaitingState>
                )}
              </VideoWrapper>
              <VideoWrapper>
                <video ref={localVideoRef} autoPlay playsInline muted />
                <VideoLabel>
                  <Camera size={16} />
                  أنت
                </VideoLabel>
              </VideoWrapper>
            </VideoGrid>

            <Controls>
              <ControlButton isActive={isCameraOn} onClick={toggleCamera}>
                {isCameraOn ? <Camera size={24} /> : <CameraOff size={24} />}
              </ControlButton>
              <ControlButton isActive={isMicOn} onClick={toggleMic}>
                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
              </ControlButton>
              <ControlButton variant="danger" onClick={endCall}>
                <PhoneOff size={24} />
              </ControlButton>
            </Controls>
          </>
        )}
      </VideoContainer>

      {isCallActive && (
        <InfoPanel>
          <InfoCard>
            <InfoItem>
              <label>حالة الاتصال</label>
              <ConnectionIndicator quality={connectionQuality}>
                {connectionQuality === "excellent"
                  ? "● ممتازة"
                  : connectionQuality === "good"
                    ? "● جيدة"
                    : "● ضعيفة"}
              </ConnectionIndicator>
            </InfoItem>
            <InfoItem>
              <label>رمز الغرفة</label>
              <span>{roomId}</span>
            </InfoItem>
            <InfoItem>
              <label>الكاميرا</label>
              <span>{isCameraOn ? "مفعلة" : "متوقفة"}</span>
            </InfoItem>
            <InfoItem>
              <label>الميكروفون</label>
              <span>{isMicOn ? "مفعل" : "متوقف"}</span>
            </InfoItem>
          </InfoCard>
        </InfoPanel>
      )}
    </Container>
  );
};

export default VideoCall;
