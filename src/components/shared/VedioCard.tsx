import { useState } from "react";

const VerifiedBadge = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="10" fill="#22c55e" />
    <path d="M6 10.5l2.5 2.5 5.5-5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const PostIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

export default function FeatureCard({FeatureName}) {
  const [followed, setFollowed] = useState(false);

  return (
  
      <div style={{ background: "white" ,borderRadius: "24px", width: "370px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
        <div style={{ width: "100%", height: "370px", overflow: "hidden", background: "#d1dce8" }}>
          <video src="./Feature/budget.mp4" autoPlay loop muted alt="Sophie Bennett" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
        </div>
        <div style={{ padding: "18px 20px 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
            <span style={{ fontSize: "20px", fontWeight: "700", color: "#111827" }}>{FeatureName}</span>
            <VerifiedBadge />
          </div>
          <p style={{ fontSize: "13.5px", color: "#6b7280", lineHeight: "1.55", margin: "0 0 18px 0" }}>Product Designer who focuses<br/>on simplicity & usability.</p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><UserIcon /><span style={{ fontSize: "13.5px", fontWeight: "600", color: "#374151" }}>312</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}><PostIcon /><span style={{ fontSize: "13.5px", fontWeight: "600", color: "#374151" }}>48</span></div>
            <div style={{ flex: 1 }} />
            <button onClick={() => setFollowed(f => !f)} style={{ background: "#f3f4f6", color: followed ? "#6b7280" : "#111827", border: "none", borderRadius: "999px", padding: "9px 18px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
              {followed ? "Following ✓" : "Follow +"}
            </button>
          </div>
        </div>
      </div>
    
  );
}