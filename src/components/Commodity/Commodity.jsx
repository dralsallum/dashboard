// Commodity.jsx  (route: /item)
// Adding a product now happens in the dashboard's product editor
// (المنتجات → إضافة منتج), which saves to /api/packages.
// This page just forwards there so old links and buttons keep working.

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveTab } from "../../redux/tabRedux";

const PRODUCTS_TAB = "المنتجات";

const Commodity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActiveTab(PRODUCTS_TAB));
    navigate(`/control?tab=${encodeURIComponent(PRODUCTS_TAB)}&new=1`, {
      replace: true,
    });
  }, [dispatch, navigate]);

  return null;
};

export default Commodity;
