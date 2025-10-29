import { Link } from "react-router-dom";
import styled from "styled-components";

export const MaFirst = styled.div`
  background-color: #f1f1f1;
  color: #000;
  overflow: hidden;
  height: 100vh;
  position: relative;
  direction: rtl;

  @media screen and (max-width: 768px) {
  }
`;

export const MaSec = styled.div``;

export const MaAll = styled.div`
  background-color: rgba(26, 26, 26, 1);
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const ContentSection = styled.div`
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const MainCon = styled.div`
  display: flex;
  background-color: rgba(26, 26, 26, 1);
  width: 100%;
  height: 100vh;
  position: relative;

  @media screen and (max-width: 768px) {
  }
`;

export const LogoCon = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  background-color: rgba(26, 26, 26, 1);
  z-index: 516;

  @media screen and (max-width: 768px) {
    position: relative;
    width: 100%;
  }
`;

export const LogoLink = styled(Link)`
  @media screen and (max-width: 768px) {
  }
`;

export const LogoGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns:
    1fr minmax(0, calc(40rem))
    1fr;
  overflow: clip;
  height: 3.5rem;
  align-items: flex-start;
`;

export const LogoDiv = styled.div`
  position: relative;
  display: flex;
  height: 3.5rem;
`;

export const LogoSubDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  height: 3.5rem;
`;

export const SearchWr = styled.div`
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: clip;
  max-width: calc(40rem + 0.875rem * 2);
  padding: 0 0.875rem;
  margin: 0 calc(0.875rem * -1);
`;

export const SearchCon = styled.div`
  display: flex;
  height: 3.5rem;
  align-items: center;
`;

export const SearchSu = styled.div`
  flex: 1 1;
  overflow: hidden;
  width: 100%;
`;

export const SearchSub = styled.div`
  width: 100%;
`;

export const SearchRe = styled.div`
  position: relative;
  max-height: 2.25rem;
  border-radius: 0.75rem;
  background: rgba(48, 48, 48, 1);
`;

export const SearchBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  min-width: 2.25rem;
  cursor: pointer;
  background: none;
  border-radius: 0.75rem;
  border: none;
  width: 100%;
  color: rgba(181, 181, 181, 1);
  appearance: none;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const NotDiv = styled.div`
  background: rgba(37, 232, 43, 1);
  color: rgba(3, 61, 5, 1);
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  margin-left: 5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 768px) {
  }
`;

export const InputWr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const InputCon = styled.div`
  display: flex;
  place-items: center;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
`;

export const InputSp = styled.span`
  display: flex;
  margin-right: auto;
  padding: 0.5rem 0 0.5rem 0.5rem;
`;

export const InputKbd = styled.kbd`
  box-shadow: none;
  line-height: 1rem;
  padding: 0.125rem 0.25rem;
  font-size: 0.75rem;
  height: 1.25rem;
  min-width: 1.25rem;
  display: inline-flex;
  justify-content: center;
  margin: 0 0.125rem 0.125rem;
  margin-bottom: 0;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 0.25rem;
  color: rgba(181, 181, 181, 1);
  font-weight: 550;
  text-align: center;
  user-select: none;
`;

export const LogoImg = styled.img`
  filter: grayscale(0%);
  cursor: pointer;
  transition: transform 0.2s, filter 0.3s;
  width: 5rem;
  height: 1.8rem;
`;

export const NavCon = styled.div``;

export const InputImg = styled.img`
  width: 18px;
  height: 18px;
  @media screen and (max-width: 768px) {
  }
`;

export const InputSpa = styled.span`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media screen and (max-width: 768px) {
  }
`;

export const InputSpan = styled.span`
  display: flex;
  margin-block: 0.0625rem;
  margin-inline: 0.0625rem calc(0.25rem - 0.0625rem);
  pointer-events: none;
  @media screen and (max-width: 768px) {
  }
`;

export const MainSubCon = styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;

  @media screen and (max-width: 768px) {
  }
`;

export const NotSpan = styled.span`
  font-size: 0.7rem;

  @media screen and (max-width: 768px) {
  }
`;

export const NotSp = styled.span`
  font-size: 0.75rem;
  font-weight: 550;

  @media screen and (max-width: 768px) {
  }
`;

export const NotifBtn = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.25rem;
  min-width: 2.25rem;
  cursor: pointer;
  background: none;
  border-radius: 0.75rem;
  border: none;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifBtnDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  @media screen and (max-width: 768px) {
  }
`;

export const NotifWr = styled.div`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifCon = styled.div`
  margin-left: 0.5rem;
  z-index: 1;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifSub = styled.div`
  z-index: 1;
  @media screen and (max-width: 768px) {
  }
`;

export const NotifStore = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  @media screen and (max-width: 768px) {
  }
`;

export const StartCon = styled.div`
  flex: 1;
  background-color: #f1f1f1;
  border-top-right-radius: 0rem;
  border-top-left-radius: 0.75rem;
  margin-top: 2.5rem;
  height: calc(100vh - 3.5rem);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-top: 0;
    height: auto;
    min-height: calc(100vh - 3.5rem);
  }
`;

export const StartDiv = styled.div`
  padding: 2rem;
  min-height: 100%;

  @media screen and (max-width: 768px) {
  }
`;
export const SettingWr = styled.div`
  width: 66.75rem;
  max-width: calc(100% - 18rem);
  display: inline-block;
  margin-bottom: 6.25rem;
  outline: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const SettingCon = styled.div`
  opacity: 1;
  transition: opacity 50ms;
  border-radius: 0.75rem;

  @media screen and (max-width: 768px) {
  }
`;

export const SettingPad = styled.div`
  padding: 0 1rem;
  max-width: calc(41.375rem + 20rem + 1rem);

  @media screen and (max-width: 768px) {
  }
`;

export const SettingTop = styled.div`
  padding: 1rem 0 1rem 0;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTop = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: normal;
  min-height: 1.75rem;
  min-width: 0;
  gap: 0;
  flex-wrap: nowrap;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopSub = styled.div`
  flex: 1 1 auto;
  align-self: center;
  min-width: 0;
  margin-top: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopSu = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopSuq = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  width: inherit;
  overflow: hidden;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopHe = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopUr = styled.div`
  margin-inline-start: calc(0.125rem * -1);
  padding-inline-start: 0;
  min-width: 0;

  @media screen and (max-width: 768px) {
  }
`;

export const SetTopImgCon = styled.div`
  padding: 0.25rem;
  border-radius: 0.375rem;

  @media screen and (max-width: 768px) {
  }
`;

export const SettingSp = styled.span`
  line-height: normal;

  @media screen and (max-width: 768px) {
  }
`;

export const SettingImg = styled.img`
  width: 18px;
  height: 18px;
  @media screen and (max-width: 768px) {
  }
`;

export const SettingMiddle = styled.div`
  display: block;
  unicode-bidi: isolate;
  @media screen and (max-width: 768px) {
  }
`;

export const SettingMiddles = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// New styled components for the settings content
export const SettingsSection = styled.div`
  background: #ffffff;
  border: 1px solid #e1e5e9;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 0.5rem;
  border-bottom: 1px solid #e1e5e9;
`;

export const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #202223;
  margin: 0;
`;

export const SectionContent = styled.div`
  padding: 1.5rem;
`;

export const StoreCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const StoreIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: #f6f6f7;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const StoreInfo = styled.div`
  flex: 1;
`;

export const StoreName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #202223;
  margin: 0 0 0.25rem 0;
`;

export const StoreEmail = styled.p`
  font-size: 0.875rem;
  color: #6d7175;
  margin: 0;
`;

export const AddressSection = styled.div`
  margin-top: 1rem;
`;

export const AddressLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const AddressIcon = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddressText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #202223;
`;

export const AddressValue = styled.p`
  font-size: 0.875rem;
  color: #6d7175;
  margin: 0;
  margin-right: 1.75rem;
`;

export const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #f1f2f3;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const SettingLabel = styled.div`
  flex: 1;
`;

export const SettingTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #202223;
  margin: 0 0 0.25rem 0;
`;

export const SettingDesc = styled.p`
  font-size: 0.875rem;
  color: #6d7175;
  margin: 0;
`;

export const SettingValue = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SettingSelect = styled.select`
  background: #ffffff;
  border: 1px solid #c9cccf;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #202223;
  min-width: 12rem;

  &:focus {
    outline: none;
    border-color: #005bd3;
    box-shadow: 0 0 0 1px #005bd3;
  }
`;

export const LinkText = styled.a`
  color: #005bd3;
  text-decoration: none;
  font-size: 0.875rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const InfoText = styled.p`
  font-size: 0.875rem;
  color: #6d7175;
  margin: 1rem 0 0 0;
`;

// Additional styled components to add to Setting.elements.js

export const OrderIdSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 24px;
`;

export const OrderIdHeader = styled.div`
  margin-bottom: 16px;
`;

export const OrderIdTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

export const OrderIdDesc = styled.p`
  color: #6b7280;
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

export const OrderIdInputs = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
`;

export const InputGroup = styled.div`
  flex: 1;
`;

export const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  background: white;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const OrderIdPreview = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

export const ProcessingSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 24px;
`;

export const ProcessingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
`;

export const ProcessingTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const InfoIcon = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  cursor: help;
`;

export const ProcessingGroup = styled.div`
  margin-bottom: 24px;
`;

export const ProcessingGroupTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 16px 0;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
  background-color: #fff;
`;

export const RadioBackground = styled.label`
  background-color: #fff;
`;

export const RadioInput = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  background-color: #fff;
`;

export const RadioLabel = styled.span`
  font-size: 14px;
  color: #374151;
`;

export const CheckboxOption = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  padding: 8px 0;
`;

export const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  margin-top: 2px;
`;

export const CheckboxContent = styled.div`
  flex: 1;
`;

export const CheckboxLabel = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
`;

export const CheckboxDesc = styled.span`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
`;

export const AssetsSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
`;

export const AssetsHeader = styled.div`
  margin-bottom: 24px;
`;

export const AssetsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

export const AssetsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AssetItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #d1d5db;
  }
`;

export const AssetIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;

export const AssetContent = styled.div`
  flex: 1;
`;

export const AssetName = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
  margin: 0 0 4px 0;
`;

export const AssetDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
`;

export const AssetArrow = styled.div`
  color: #9ca3af;
  font-size: 16px;
`;

// Additional styled components for Resources section

export const ResourcesSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 24px;
`;

export const ResourcesTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 24px 0;
`;

export const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const ResourceLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ResourceIcon = styled.div`
  width: 20px;
  height: 20px;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ResourceText = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 400;
`;

export const ResourceRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ResourceButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

export const ResourceArrow = styled.div`
  color: #9ca3af;
  font-size: 16px;
  cursor: pointer;
`;

export const OrganizationSection = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  padding: 24px;
  margin-bottom: 24px;
`;

export const OrganizationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const OrganizationContent = styled.div`
  flex: 1;
`;

export const OrganizationTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
`;

export const OrganizationDesc = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
`;

export const LearnMoreLink = styled.a`
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

export const ManageButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

export const SaveButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;

export const SaveButton = styled.button`
  padding: 12px 24px;
  background: #6b7280;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #4b5563;
  }
`;

export const SubWr = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  margin-top: calc(1rem * -1);
  margin-left: calc(1rem * -1);
`;

export const SubCon = styled.div`
  max-width: calc(100% - 1rem);
  margin-top: calc(1rem * -1);
  margin-left: calc(1rem * -1);
`;

export const SubRe = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

export const SubSe = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: initial;
  border-radius: initial;
`;

export const SubTop = styled.div`
  display: flex;
  align-items: initial;
`;

export const SubTopi = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

export const SubTopHe = styled.h2`
  font-size: 0.8125rem;
`;

export const MidWr = styled.div`
  display: flex;
  flex-direction: column;
  align-items: initial;
  justify-content: initial;
`;

export const MidCon = styled.div`
  border: 0.0625rem solid rgba(227, 227, 227, 1);
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

export const MidSt = styled.div`
  display: flex;
  justify-content: center;
`;

export const MidLe = styled.div`
  display: flex;
`;

export const MidRi = styled.div`
  display: flex;
`;

export const MidLeSp = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 0.5rem;
  background-color: rgba(4, 123, 93, 1);
  color: rgba(250, 255, 251, 1);
`;

// Add these styled components to your existing styles

export const PlanDetailsContainer = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1rem;
  margin: 20px 0;
  width: 800px;
`;

export const PlanDetailsTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 10px 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

export const TrialContainer = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const TrialLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TrialText = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: 500;
`;

export const TrialBadge = styled.span`
  background: #10b981;
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

export const TrialButtons = styled.div`
  display: flex;
  gap: 12px;
`;

export const CancelButton = styled.button`
  background: transparent;
  border: 1px solid #dc2626;
  color: #dc2626;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #dc2626;
    color: white;
  }
`;

export const ChoosePlanButton = styled.button`
  background: #1f2937;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #374151;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
`;

export const StyledLink = styled.a`
  color: #3b82f6;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

export const BillingProfileBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #f6f6f7;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #f0f0f1;
  }
`;

export const BillingProfileIcon = styled.span`
  font-size: 14px;
`;

export const BillingProfileText = styled.span`
  font-size: 14px;
  color: #303030;
`;

export const BillingSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  border: 1px solid #e1e1e1;
`;

export const BillingSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

export const BillingSectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #303030;
  margin: 0;
`;

export const BillingTotal = styled.div`
  text-align: right;
`;

export const BillingTotalLabel = styled.div`
  font-size: 14px;
  color: #6d6d6d;
  margin-bottom: 4px;
`;

export const BillingTotalAmount = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #303030;
`;

export const BillingDetails = styled.div`
  margin-bottom: 24px;
`;

export const BillingDate = styled.div`
  font-size: 14px;
  color: #6d6d6d;
`;

export const BillingLink = styled.span`
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
`;

export const PaymentMethodSection = styled.div`
  margin-bottom: 32px;
`;

export const PaymentMethodBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 16px;
  background: #f9f9fb;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #f3f4f6;
  }
`;

export const PaymentMethodIcon = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #6d6d6d;
`;

export const PaymentMethodText = styled.span`
  font-size: 14px;
  color: #303030;
  font-weight: 500;
`;

export const BillingThresholdNotice = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const NoticeIcon = styled.span`
  font-size: 16px;
  margin-top: 2px;
`;

export const NoticeText = styled.div`
  font-size: 14px;
  color: #6d6d6d;
  line-height: 1.5;
`;

export const PlanSettingsNote = styled.div`
  font-size: 14px;
  color: #6d6d6d;
`;

export const PastBillsEmpty = styled.div`
  font-size: 14px;
  color: #9ca3af;
  padding: 24px 0;
`;

export const SubscriptionsDesc = styled.div`
  font-size: 14px;
  color: #6d6d6d;
  margin-bottom: 24px;
`;

export const SubscriptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const SubscriptionIcon = styled.div`
  width: 40px;
  height: 40px;
  background: #16a34a;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const SubscriptionDetails = styled.div`
  flex: 1;
`;

export const SubscriptionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #303030;
  margin-bottom: 4px;
`;

export const SubscriptionDate = styled.div`
  font-size: 14px;
  color: #6d6d6d;
`;

export const SubscriptionsLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0 8px 0;
  cursor: pointer;

  &:hover {
    color: #2563eb;
  }
`;

export const SubscriptionsLinkText = styled.span`
  font-size: 14px;
  color: #303030;
`;

export const SubscriptionsArrow = styled.span`
  font-size: 18px;
  color: #9ca3af;
`;

export const PaymentSection = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const PaymentSectionHeader = styled.div`
  margin-bottom: 20px;
`;

export const PaymentSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

export const PaymentSectionDescription = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
`;

export const PaymentLink = styled.a`
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
`;

export const PaymentProviderBtn = styled.button`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  &:hover {
    background: #e5e7eb;
  }
`;

export const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PaymentMethodCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaymentMethodInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PaymentMethodDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PaymentMethodName = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

export const PaymentMethodFee = styled.div`
  font-size: 14px;
  color: #666;
`;

export const AddPaymentMethodBtn = styled.button`
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 16px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

export const AddPaymentMethodIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #6b7280;
`;

export const AddPaymentMethodText = styled.span`
  color: #374151;
  font-size: 14px;
`;

export const PaymentCaptureOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PaymentCaptureOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const PaymentRadio = styled.input`
  margin-top: 4px;
`;

export const PaymentCaptureLabel = styled.label`
  cursor: pointer;
  flex: 1;
`;

export const PaymentCaptureTitle = styled.div`
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

export const PaymentCaptureDesc = styled.div`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

export const ManualPaymentMethodBtn = styled.button`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  background: white;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  width: fit-content;
  &:hover {
    background: #f9fafb;
  }
`;

export const ManualPaymentMethodText = styled.span`
  color: #374151;
  font-size: 14px;
  font-weight: 500;
`;

export const CustomizationBtn = styled.button`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  &:hover {
    background: #e5e7eb;
  }
`;

export const AppleWalletHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const AppleWalletInfo = styled.div`
  flex: 1;
`;

export const CustomizeBtn = styled.button`
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

// Styled Components for the checkout settings
export const CheckoutSection = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`;

export const ContactOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContactOption = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const RadioButton = styled.input`
  margin-top: 0.25rem;
  accent-color: #3182ce;
`;

export const RadioText = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

export const RadioSubtext = styled.span`
  font-size: 0.85rem;
  color: #718096;
  line-height: 1.4;
`;

export const AppLink = styled.a`
  color: #3182ce;
  text-decoration: underline;

  &:hover {
    color: #2c5aa0;
  }
`;

export const CheckboxText = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

export const CheckboxSubtext = styled.span`
  font-size: 0.85rem;
  color: #718096;
  line-height: 1.4;
`;

export const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

export const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f7fafc;
`;

export const PaymentIcon = styled.span`
  font-size: 1.5rem;
`;

export const PaymentName = styled.span`
  font-weight: 500;
  color: #2d3748;
  flex: 1;
`;

export const PaymentStatus = styled.span`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;

  ${(props) =>
    props.active
      ? `
    background: #c6f6d5;
    color: #22543d;
  `
      : `
    background: #fed7d7;
    color: #742a2a;
  `}
`;

export const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const ShippingOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f7fafc;
`;

export const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ShippingName = styled.span`
  font-weight: 500;
  color: #2d3748;
`;

export const ShippingPrice = styled.span`
  font-size: 0.9rem;
  color: #3182ce;
  font-weight: 600;
`;

export const ShippingTime = styled.span`
  font-size: 0.85rem;
  color: #718096;
`;

export const SaveSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
`;

// Additional styled components for the new sections
export const CustomerInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InfoField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FieldLabel = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
`;

export const FieldOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-right: 1rem;
`;

export const FieldOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const RecommendedBadge = styled.span`
  background: #edf2f7;
  color: #718096;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
  margin-right: 0.5rem;
`;

export const MarketingLabel = styled.span`
  font-weight: 500;
  color: #2d3748;
  flex: 1;
`;

export const ToggleSwitch = styled.div`
  position: relative;
  display: inline-block;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export const ToggleSlider = styled.label`
  display: block;
  width: 44px;
  height: 24px;
  background: #cbd5e0;
  border-radius: 24px;
  cursor: pointer;
  transition: background 0.2s;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    right: 2px;
    transition: transform 0.2s;
  }

  ${ToggleInput}:checked + & {
    background: #3182ce;
  }

  ${ToggleInput}:checked + &:before {
    transform: translateX(-20px);
  }
`;

export const AdditionalSettings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SettingItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

export const CheckoutContainer = styled.div`
  margin: 0 auto;
`;

export const SectionCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const SectionDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
`;

export const RadioDescription = styled.p`
  font-size: 13px;
  color: #666;
  margin: 4px 0 0 0;
  line-height: 1.4;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 16px;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
  accent-color: #007cba;
`;

export const LinkAt = styled.a`
  color: #007cba;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const RecommendedTag = styled.span`
  background: #f0f0f0;
  color: #666;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 8px;
  font-weight: normal;
`;

export const MarketingSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const MarketingContent = styled.div`
  flex: 1;
`;

export const MarketingTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CustomizeButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

export const MarketingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MarketingOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
`;

export const MarketingOptionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MarketingIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #666;
`;

export const MarketingOptionLabel = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

export const Toggle = styled.div`
  width: 44px;
  height: 24px;
  background: ${(props) => (props.checked ? "#007cba" : "#ccc")};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${(props) => (props.checked ? "22px" : "2px")};
    transition: left 0.2s;
  }
`;

export const LanguageSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

export const LanguageInput = styled.div`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  color: #374151;
  font-size: 14px;
`;

export const AdvancedOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }
`;

export const AdvancedOptionLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
`;

export const AdvancedIcon = styled.div`
  font-size: 20px;
  margin-top: 2px;
`;

export const AdvancedOptionTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AdvancedOptionDescription = styled.div`
  font-size: 13px;
  color: #6b7280;
  line-height: 1.4;
`;

export const ArrowIcon = styled.div`
  font-size: 18px;
  color: #9ca3af;
  font-weight: 300;
`;

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToggleStatus = styled.span`
  font-size: 13px;
  color: #059669;
  font-weight: 500;
  background: #d1fae5;
  padding: 2px 8px;
  border-radius: 12px;
`;

export const ShippingSection = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const SectionSubtitle = styled.p`
  margin: 8px 0 16px;
  font-size: 14px;
  color: #6b7280;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* “GENERAL SHIPPING RATES” CARD                                             */
/* ────────────────────────────────────────────────────────────────────────── */

export const ShippingCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f3f4f6;
  padding-top: 16px;
`;

export const ShippingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ShippingRatesTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const ProductCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #6b7280;
`;

export const ProductIcon = styled.span`
  font-size: 16px;
  color: #9ca3af;
`;

export const ShippingRight = styled.div`
  display: flex;
  align-items: center;
  border-left: 1px solid #f3f4f6;
  padding-left: 16px;
  gap: 16px;
`;

export const RatesSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const RatesTitle = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const RateOption = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const RateIcon = styled.span`
  font-size: 16px;
`;

export const RateText = styled.span`
  font-size: 14px;
  color: #374151;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* CUSTOM PROFILE LINK                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export const CustomProfileLink = styled.a`
  display: block;
  margin-top: 16px;
  font-size: 14px;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* CALCULATE RATES BUTTON                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

export const CalculateButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 8px 16px;
  font-size: 14px;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* EXPECTED DELIVERY DATES                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

export const DeliveryOptions = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
`;

export const DeliveryOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 0;
  border-top: 1px solid #f3f4f6;

  &:first-child {
    border-top: none;
  }
`;

export const OptionLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const OptionTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

export const OptionDesc = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* SETUP BUTTONS FOR LOCAL DELIVERY & PICKUP                                   */
/* ────────────────────────────────────────────────────────────────────────── */

export const SetupButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  margin-inline-start: auto; /* pushes to the “start” edge in RTL */
  padding: 8px 16px;
  font-size: 14px;
  color: #374151;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* DELIVERY CUSTOMIZATIONS                                                     */
/* ────────────────────────────────────────────────────────────────────────── */

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
  color: #2563eb;
  background: none;
  border: none;
  cursor: pointer;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* SAVED PACKAGES                                                              */
/* ────────────────────────────────────────────────────────────────────────── */

export const PackageCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #f3f4f6;
`;

export const PackageIcon = styled.span`
  font-size: 20px;
  color: #9ca3af;
`;

export const PackageDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const PackageName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
`;

export const PackageDimensions = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

export const PackageStatus = styled.span`
  margin-left: auto;
  padding: 4px 8px;
  font-size: 12px;
  color: #6b7280;
  background: #f3f4f6;
  border-radius: 9999px;
`;

export const MoreOptions = styled.span`
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
`;

export const PackageNote = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 16px;
  padding: 12px;
  background: #eff8ff;
  border-radius: 6px;
  font-size: 14px;
  color: #0369a1;
`;

export const DomainSection = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* CARD HEADER (TITLE + ICON)                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export const DomainHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DomainTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
`;

export const DomainIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* CARD DESCRIPTION                                                           */
/* ────────────────────────────────────────────────────────────────────────── */

export const DomainDescription = styled.p`
  margin: 8px 0 16px;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* BUTTON GROUP (BUY / CONNECT)                                               */
/* ────────────────────────────────────────────────────────────────────────── */

export const DomainActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const PrimaryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background: linear-gradient(180deg, #363636, #111);
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

export const SecondaryButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* SEARCH + LIST CARD                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

export const SearchSection = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  outline: none;
  background-color: #fff;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* DOMAIN LIST                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export const DomainList = styled.ul`
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  border-top: 1px solid #f3f4f6;
`;

export const DomainListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-top: 1px solid #f3f4f6;

  &:first-child {
    border-top: none;
  }
`;

export const DomainListLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DomainListIcon = styled.span`
  font-size: 16px;
  color: #6b7280;
`;

export const DomainListText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const DomainName = styled.span`
  font-size: 14px;
  color: #1f2937;
`;

export const DomainSubtitle = styled.span`
  font-size: 12px;
  color: #6b7280;
`;

/* ────────────────────────────────────────────────────────────────────────── */
/* “CHANGE TO A NEW …” LINK                                                    */
/* ────────────────────────────────────────────────────────────────────────── */

export const ChangeLink = styled.a`
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #2563eb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const SenderEmailSection = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
`;

export const SectionDesc = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

export const EmailInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f9fafb;
`;

export const UnverifiedBadge = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
`;

export const VerificationText = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const ResendLink = styled.span`
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
`;

export const NotificationsSection = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
`;

export const NotificationItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: ${({ last }) => (last ? "none" : "1px solid #f3f4f6")};
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  flex: 1;
`;

export const InfoTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
`;

export const InfoDesc = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const ArrowWrapper = styled.div`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReturnRulesCard = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1.5rem;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const RuleIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const RuleTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const OffBadge = styled.span`
  background: #f3f4f6;
  color: #6b7280;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

export const RuleDesc = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0.5rem 0 1rem;
`;

export const WrittenPoliciesSection = styled.div`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem 0;
`;

export const PoliciesHeader = styled.div`
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
`;

export const PoliciesTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const PoliciesSub = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`;

export const FooterLink = styled.a`
  color: #2563eb;
  text-decoration: underline;
  cursor: pointer;
`;

export const PoliciesList = styled.div``;

export const PolicyItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-bottom: ${({ last }) => (last ? "none" : "1px solid #f3f4f6")};
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ItemIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const ItemText = styled.span`
  font-size: 0.875rem;
  color: #111827;
`;

export const ItemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusBadge = styled.span`
  background: ${({ automated, required }) =>
    automated ? "#dcfce7" : required ? "#fef3c7" : "#f3f4f6"};
  color: ${({ automated, required }) =>
    automated ? "#15803d" : required ? "#92400e" : "#6b7280"};
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
`;

export const Arrow = styled.img`
  width: 1rem;
  height: 1rem;
`;

export const SearchSections = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

export const ProFilter = styled.img`
  width: 25px;
  height: 15px;
  @media screen and (max-width: 768px) {
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 0;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  max-width: 600px;
`;

export const SearchInputs = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: white;

  &::placeholder {
    color: #6b7280;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #6b7280;
  font-size: 16px;
`;

export const FilterButton = styled.button`
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f9fafb;
  }
`;

export const ProvidersList = styled.div`
  background: white;
`;

export const ProviderItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ProviderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

export const ProviderIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: ${(props) => props.bgColor || "#f59e0b"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

export const ProviderInfo = styled.div`
  flex: 1;
`;

export const ProviderName = styled.h3`
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
`;

export const ProviderSubtext = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
`;

export const PaymentMethods = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 8px;
`;

export const PaymentIcons = styled.div`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: ${(props) => props.bgColor || "#f3f4f6"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: ${(props) => props.textColor || "#374151"};
  border: 1px solid #e5e7eb;
`;

export const MoreIcon = styled.div`
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  border: 1px solid #e5e7eb;
`;

export const ChevronRight = styled.div`
  color: #9ca3af;
  font-size: 16px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  flex-direction: column;
`;
export const ModalClose = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
export const ModalImg = styled.img`
  width: 50px;
`;

export const ModalContainer = styled.div`
  background: #fff; /* white card */
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const ModalHeader = styled.h2`
  margin: 0 0 16px;
  font-size: 1.25rem;
  text-align: center;
`;

export const StoreInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #007bff;
  color: #fff;
  &:hover {
    background: #0056b3;
  }
`;

export const WireAccountDisplay = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  margin-top: 16px;
`;

export const WireAccountItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;

  &:last-child {
    border-bottom: none;
  }
`;

export const WireAccountLabel = styled.span`
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
`;

export const WireAccountValue = styled.span`
  font-size: 14px;
  color: #111827;
  font-weight: 600;
`;

export const VerificationStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  background: ${(props) => (props.verified ? "#d1fae5" : "#fef3c7")};
  color: ${(props) => (props.verified ? "#065f46" : "#92400e")};
`;

export const EditButton = styled.button`
  margin-top: 16px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

// Form Components
export const WireAccountForm = styled.form`
  margin-top: 16px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: border-color 0.2s;
  direction: ${(props) => (props.name === "iban" ? "ltr" : "rtl")};
  text-align: ${(props) => (props.name === "iban" ? "left" : "right")};

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const FormHelper = styled.p`
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
  direction: rtl;
  text-align: right;
`;

export const FormActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const SaveBut = styled.button`
  padding: 10px 24px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #059669;
  }

  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

export const CanButton = styled.button`
  padding: 10px 24px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #e5e7eb;
  }
`;

export const MessageBox = styled.div`
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 14px;
  background: ${(props) => (props.type === "success" ? "#d1fae5" : "#fee2e2")};
  color: ${(props) => (props.type === "success" ? "#065f46" : "#991b1b")};
  border: 1px solid
    ${(props) => (props.type === "success" ? "#a7f3d0" : "#fecaca")};
`;
