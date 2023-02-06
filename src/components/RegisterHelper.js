import React, { useState } from "react";

export const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [pvIcon, setPvIcon] = useState("eye-off-outline");

  const handlePasswordVisibility = () => {
    if (pvIcon === "eye-outline") {
      setPvIcon("eye-off-outline");
      setPasswordVisibility(!passwordVisibility);
    } else if (pvIcon === "eye-off-outline") {
      setPvIcon("eye-outline");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    pvIcon,
    handlePasswordVisibility,
  };
};

export const useToggleConfirmPasswordVisibility = () => {
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState(true);
  const [cpvIcon, setCpvIcon] = useState("eye-off-outline");

  const handleConfirmPasswordVisibility = () => {
    if (cpvIcon === "eye-outline") {
      setCpvIcon("eye-off-outline");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (cpvIcon === "eye-off-outline") {
      setCpvIcon("eye-outline");
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };

  return {
    confirmPasswordVisibility,
    cpvIcon,
    handleConfirmPasswordVisibility,
  };
};

export const useToggleModalVisibility = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return {
    isModalVisible,
    toggleModal,
  };
};
