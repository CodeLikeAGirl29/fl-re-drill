'use client';
import { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/app/lib/firebase/config';

export default function PhoneLogin() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    // Initialize invisible reCAPTCHA on the 'send-code-btn'
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'send-code-btn', {
        size: 'invisible'
      });
    }
  }, []);

  const requestOTP = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(result);
    } catch (err) {
      console.error("Error sending SMS", err);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      // User is now logged in! Redirect to the drill dashboard.
    } catch (err) {
      console.error("Invalid Code", err);
    }
  };

  return (
    
      {!confirmationResult ? (
        <>
           setPhone(e.target.value)} 
            className="p-2 border rounded"
          />
          
            Send Verification Code
          
        
      ) : (
        <>
           setOtp(e.target.value)} 
            className="p-2 border rounded"
          />
          
            Verify & Login
          
        
      )}
    
  );
}