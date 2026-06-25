"use client";
import { useState, useEffect } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client";

export default function PhoneLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "send-code-btn",
        {
          size: "invisible",
        },
      );
    }
  }, []);

  const requestOTP = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phone,
        (window as any).recaptchaVerifier,
      );
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    if (!confirmationResult) return;
    setError("");
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      router.push("/");
    } catch (err: any) {
      setError("Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded bg-slate-950 text-white border-slate-700"
          />
          <button
            id="send-code-btn"
            onClick={requestOTP}
            disabled={loading || !phone}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 py-2 px-4 rounded font-bold"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border rounded bg-slate-950 text-white border-slate-700"
          />
          <button
            onClick={verifyOTP}
            disabled={loading || !otp}
            className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-slate-950 py-2 px-4 rounded font-bold"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>
        </>
      )}

      {error && <p className="text-rose-400 text-sm font-medium">{error}</p>}
    </div>
  );
}
