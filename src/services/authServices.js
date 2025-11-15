// src/services/authServices.js
import api from "./api";


// --------------------
// 📝 Step 1: Initiate Signup (Send OTP)
// --------------------
export const initiateSignup = async (signupData) => {
  try {
    console.log("➡️ Sending signup data:", signupData);
    const response = await api.post("/auth/initiate-signup", signupData);
    console.log("✅ OTP Sent:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Signup Request Failed:", err.response?.data || err.message);
    throw err;
  }
};

// --------------------
// 🔢 Step 2: Verify OTP
// --------------------
export const verifyOtp = async (otpData) => {
  try {
    console.log("➡️ Sending OTP verification data:", otpData);
    const response = await api.post("/auth/verify-otp", otpData);
    console.log("✅ OTP Verified:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ OTP Verification Failed:", err.response?.data || err.message);
    throw err;
  }
};

// --------------------
// 🎓 Step 3: Fetch Universities
// --------------------
export const fetchUniversities = async (country, query = "", limit = 6) => {
  try {
    console.log("🌍 Fetching universities:", { country, query, limit });
    const response = await api.get(
      `/universities?country=${country}&limit=${limit}&q=${query}`
    );
    console.log("✅ Universities Fetched:", response.data);
    return response.data;
  } catch (err) {
    console.error("❌ Fetch Universities Failed:", err.response?.data || err.message);
    throw err;
  }
};

// --------------------
// 🔁 Patch signup into existing callback lead
// --------------------
export const patchSignupToLead = async (data) => {
  try {
    console.log("➡️ Patching signup into existing lead:", data);
    const response = await api.post('/auth/patch-signup-to-lead', data);
    console.log('✅ Patch result:', response.data);
    return response.data;
  } catch (err) {
    console.error('❌ Patch signup failed:', err.response?.data || err.message);
    throw err;
  }
};

// --------------------
// ✉️ Signin helpers (Email OTP)
// --------------------
export const initiateSignin = async (email) => {
  try {
    const response = await api.post('/auth/initiate-signin', { email });
    return response.data;
  } catch (err) {
    console.error('❌ initiateSignin failed:', err.response?.data || err.message);
    throw err;
  }
};

export const verifySignin = async (data) => {
  try {
    const response = await api.post('/auth/verify-signin', data);
    return response.data;
  } catch (err) {
    console.error('❌ verifySignin failed:', err.response?.data || err.message);
    throw err;
  }
};

export const fetchStudentDashboard = async () => {
  try {
    const response = await api.get('/student/me');
    return response.data;
  } catch (err) {
    console.error('❌ Fetch Student Dashboard Failed:', err.response?.data || err.message);
    throw err;
  }
};
