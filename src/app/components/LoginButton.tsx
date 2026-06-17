"use client";

import { useEffect, useState } from "react";

export default function LoginButton() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem('isAdmin') === 'true');
  }, []);

  const handleLogin = () => {
    if (isAdmin) {
      if (confirm("로그아웃 하시겠습니까?")) {
        localStorage.removeItem('isAdmin');
        window.location.reload();
      }
    } else {
      const pwd = prompt("관리자 비밀번호를 입력하세요:");
      if (pwd === "admin1234") {
        localStorage.setItem('isAdmin', 'true');
        alert("로그인 성공");
        window.location.reload();
      } else if (pwd) {
        alert("비밀번호가 틀렸습니다.");
      }
    }
  };

  return (
    <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: 'transparent', cursor: 'pointer', padding: '10px' }}>
      {isAdmin ? "🔒" : "🔑"}
    </button>
  );
}
