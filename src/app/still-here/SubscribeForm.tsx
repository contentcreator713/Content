"use client";

export default function SubscribeForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        display: "flex",
        gap: 12,
        maxWidth: 440,
        margin: "0 auto",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <input
        type="email"
        placeholder="your@email.com"
        style={{
          flex: 1,
          minWidth: 220,
          padding: "14px 20px",
          borderRadius: 100,
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.05)",
          color: "#FFFFFF",
          fontSize: 14,
          outline: "none",
          fontFamily: "'Open Sans', sans-serif",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "14px 28px",
          borderRadius: 100,
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          border: "none",
          color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          cursor: "pointer",
          letterSpacing: "0.5px",
          boxShadow: "0 0 24px rgba(37,99,235,0.4)",
        }}
      >
        Subscribe
      </button>
    </form>
  );
}
