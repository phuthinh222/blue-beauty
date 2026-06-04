"use client";

import { useState, useMemo } from "react";

export type AuthRole = "Khách hàng" | "Thợ trang điểm";

export type RegisterFormState = {
  username: string;
  displayName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: AuthRole | "";
  district: string;
  agreed: boolean;
  error: string | null;
  submitted: boolean;
};

export function useRegisterForm() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState<AuthRole | "">("");
  const [district, setDistrict] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const isMakeupArtist = role === "Thợ trang điểm";

  const canSubmit = useMemo(() => {
    const phoneDigits = phone.replace(/[^\d+]/g, "").trim();
    const baseOk =
      Boolean(username.trim()) &&
      Boolean(displayName.trim()) &&
      Boolean(phoneDigits) &&
      Boolean(email.trim()) &&
      Boolean(password) &&
      Boolean(passwordConfirm) &&
      role !== "" &&
      agreed &&
      password === passwordConfirm;
    if (!baseOk) return false;
    if (isMakeupArtist && !district.trim()) return false;
    return true;
  }, [agreed, district, displayName, email, isMakeupArtist, password, passwordConfirm, phone, role, username]);

  function onRoleChange(v: string) {
    const nextRole = v as AuthRole;
    setRole(nextRole);
    if (nextRole !== "Thợ trang điểm") setDistrict("");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!canSubmit) {
      if (!agreed) {
        setError("Vui lòng đồng ý với điều khoản & chính sách.");
      } else if (password !== passwordConfirm) {
        setError("Mật khẩu xác nhận không khớp.");
      } else if (isMakeupArtist && !district.trim()) {
        setError("Vui lòng chọn khu vực.");
      } else {
        setError("Vui lòng nhập đầy đủ thông tin đăng ký.");
      }
      return;
    }

    setSubmitted(true);
  }

  return {
    username, setUsername,
    displayName, setDisplayName,
    phone, setPhone,
    email, setEmail,
    password, setPassword,
    passwordConfirm, setPasswordConfirm,
    role, onRoleChange,
    district, setDistrict,
    agreed, setAgreed,
    isMakeupArtist,
    canSubmit,
    error,
    submitted,
    onSubmit,
  };
}
