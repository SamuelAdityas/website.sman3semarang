"use client";

import { useState } from "react";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

  
    async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
        const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
        setError(result.error || "Login gagal.");
        return;
        }

        window.location.assign("/admin/dashboard");
    } catch {
        setError("Tidak dapat terhubung ke server.");
    } finally {
        setLoading(false);
    }
    }


  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-login-logo">S3</div>
          <div>
            <p className="admin-login-school">SMA NEGERI 3 SEMARANG</p>
            <p className="admin-login-caption">Administration Portal</p>
          </div>
        </div>

        <div className="admin-login-heading">
          <span className="admin-login-eyebrow">ADMINISTRATOR</span>
          <h1>Selamat Datang</h1>
          <p>Masuk untuk mengelola konten website sekolah.</p>
        </div>

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="email">Email Admin</label>
                <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukkan email admin"
                autoComplete="username"
                required
                />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Password</label>
            <div className="admin-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukkan password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Sembunyikan" : "Lihat"}
              </button>
            </div>
          </div>
        
        {error && <p role="alert" style={{ color: "#c62828" }}>{error}</p>}

        <button type="submit" disabled={loading} className="admin-login-submit">
            {loading ? "Memverifikasi..." : "Masuk ke Dashboard"}
            {!loading && <span aria-hidden="true"> →</span>}
        </button>
        </form>

        <a href="/" className="admin-login-back">
          ← Kembali ke website
        </a>
      </section>

      <p className="admin-login-footer">
        © {new Date().getFullYear()} SMA Negeri 3 Semarang
      </p>

      <style jsx>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 20px;
          box-sizing: border-box;
          background:
            radial-gradient(ellipse at top left, #e4efff 0%, transparent 48%),
            #f5f8fc;
          color: #142d4e;
        }

        .admin-login-card {
          width: 100%;
          max-width: 440px;
          padding: 36px;
          background: #fff;
          border: 1px solid #e4eaf2;
          border-radius: 20px;
          box-shadow: 0 18px 60px rgba(19, 48, 82, 0.09);
          box-sizing: border-box;
        }

        .admin-login-brand {
          display: flex;
          align-items: center;
          gap: 13px;
          padding-bottom: 28px;
          border-bottom: 1px solid #e9eef5;
        }

        .admin-login-logo {
          display: grid;
          place-items: center;
          width: 46px;
          height: 46px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #174a82;
          color: white;
          font-size: 18px;
          font-weight: 800;
        }

        .admin-login-school {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.7px;
        }

        .admin-login-caption {
          margin: 5px 0 0;
          color: #718198;
          font-size: 12px;
        }

        .admin-login-heading {
          margin: 30px 0 26px;
        }

        .admin-login-eyebrow {
          color: #4d80b7;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .admin-login-heading h1 {
          margin: 10px 0;
          font-size: 30px;
          letter-spacing: -0.8px;
        }

        .admin-login-heading p {
          margin: 0;
          color: #728096;
          font-size: 14px;
          line-height: 1.7;
        }

        .admin-login-form {
          display: grid;
          gap: 20px;
        }

        .admin-login-field label {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 700;
        }

        .admin-login-field input {
          width: 100%;
          min-width: 0;
          height: 46px;
          padding: 0 13px;
          box-sizing: border-box;
          border: 1px solid #d9e1eb;
          border-radius: 9px;
          outline: none;
          background: #fff;
          color: #142d4e;
          font: inherit;
          font-size: 14px;
        }

        .admin-login-field input:focus {
          border-color: #3879bd;
          box-shadow: 0 0 0 3px rgba(56, 121, 189, 0.12);
        }

        .admin-password-wrapper {
          display: flex;
          align-items: center;
          position: relative;
        }

        .admin-password-wrapper input {
          padding-right: 90px;
        }

        .admin-password-toggle {
          position: absolute;
          right: 10px;
          border: 0;
          background: transparent;
          color: #356ca7;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }

        .admin-login-submit {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 48px;
          margin-top: 4px;
          padding: 0 16px;
          border: 0;
          border-radius: 9px;
          background: #174a82;
          color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 700;
        }

        .admin-login-submit:hover {
          background: #103963;
        }

        .admin-login-back {
          display: block;
          margin-top: 24px;
          color: #52708f;
          text-align: center;
          text-decoration: none;
          font-size: 13px;
        }

        .admin-login-back:hover {
          color: #174a82;
        }

        .admin-login-footer {
          margin: 22px 0 0;
          color: #8290a3;
          text-align: center;
          font-size: 12px;
        }

        @media (max-width: 480px) {
          .admin-login-card {
            padding: 26px 22px;
          }

          .admin-login-heading h1 {
            font-size: 26px;
          }
        }
      `}</style>
    </main>
  );
}
