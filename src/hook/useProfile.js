// src/hook/useProfile.js
import { useEffect, useState } from "react";
import { getProfile, updateProfile, updatePassword, uploadAvatar } from "../services/auth";

const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      const data = res?.data || res;
      setUser(data);
    } catch (error) {
      console.error("Fetch Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const editProfile = async (profileData) => {
    try {
      const res = await updateProfile(profileData);
      await fetchProfile();
      return { success: true, data: res?.data || res };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error updating profile" 
      };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      const res = await updatePassword(passwordData);
      return { success: true, message: res?.message || "Password changed successfully" };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error changing password" 
      };
    }
  };

  const changeAvatar = async (file) => {
    try {
      const res = await uploadAvatar(file);
      await fetchProfile();
      return { success: true, data: res?.data || res };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Error uploading avatar" 
      };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    user,
    loading,
    fetchProfile,
    editProfile,
    changePassword,
    changeAvatar,
  };
};

export default useProfile;