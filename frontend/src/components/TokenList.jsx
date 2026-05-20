// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { FACTORY_ABI } from "../contractABI";
// import { FACTORY_ADDRESS } from "../config";

// export default function TokenList({ refresh }) {
//    const [tokens, setTokens] = useState([]);

//    async function loadTokens() {
//       if (!window.ethereum) return;

//       const provider = new ethers.BrowserProvider(window.ethereum);

//       const contract = new ethers.Contract(
//          FACTORY_ADDRESS,
//          FACTORY_ABI,
//          provider,
//       );

//       const data = await contract.getAllTokens();

//       setTokens(data);
//    }

//    useEffect(() => {
//       loadTokens();
//    }, [refresh]);

//    return (
//       <div style={{ padding: 20 }}>
//          <h2>📦 Created Tokens</h2>

//          {tokens.map((t, i) => (
//             <p key={i}>
//                <a
//                   href={`https://sepolia.etherscan.io/address/${t}`}
//                   target="_blank"
//                >
//                   {t}
//                </a>
//             </p>
//          ))}
//       </div>
//    );
// }

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { FACTORY_ABI } from "../contractABI";
import { FACTORY_ADDRESS } from "../config";
import "./web3.css";

export default function TokenList({ refresh }) {
   const [tokens, setTokens] = useState([]);
   const [copied, setCopied] = useState(null);
   const [loading, setLoading] = useState(false);

   // ── UNTOUCHED BLOCKCHAIN LOGIC ──────────────────────────────────────────────
   async function loadTokens() {
      if (!window.ethereum) return;
      setLoading(true);
      try {
         const provider = new ethers.BrowserProvider(window.ethereum);
         const contract = new ethers.Contract(
            FACTORY_ADDRESS,
            FACTORY_ABI,
            provider,
         );
         const data = await contract.getAllTokens();
         setTokens(data);
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      loadTokens();
   }, [refresh]);
   // ── END BLOCKCHAIN LOGIC ────────────────────────────────────────────────────

   function copyAddress(addr) {
      navigator.clipboard.writeText(addr);
      setCopied(addr);
      setTimeout(() => setCopied(null), 2000);
   }

   function shortAddr(addr) {
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
   }

   // Generate a deterministic hue from an address for the avatar ring color
   function addrHue(addr) {
      const n = parseInt(addr.slice(2, 8), 16);
      return n % 360;
   }

   return (
      <div className="tl-panel">
         <div className="tl-header">
            <div>
               <div className="ct-badge">
                  <span className="ct-badge-dot" />
                  LIVE
               </div>
               <h2 className="ct-title" style={{ marginTop: 8 }}>
                  Token Registry
               </h2>
               <p className="ct-subtitle">
                  {tokens.length} contract{tokens.length !== 1 ? "s" : ""}{" "}
                  deployed
               </p>
            </div>
            <button
               className="tl-refresh-btn"
               onClick={loadTokens}
               title="Refresh"
            >
               <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="16"
                  height="16"
               >
                  <path
                     d="M23 4v6h-6M1 20v-6h6"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
                  <path
                     d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                  />
               </svg>
            </button>
         </div>

         {loading && (
            <div className="tl-empty">
               <span className="ct-spinner tl-spinner" />
               <p className="tl-empty-text">Fetching contracts...</p>
            </div>
         )}

         {!loading && tokens.length === 0 && (
            <div className="tl-empty">
               <div className="tl-empty-icon">
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="1.2"
                     width="40"
                     height="40"
                  >
                     <rect x="3" y="3" width="7" height="7" rx="1" />
                     <rect x="14" y="3" width="7" height="7" rx="1" />
                     <rect x="3" y="14" width="7" height="7" rx="1" />
                     <path
                        d="M17 14h.01M14 17h.01M20 17h.01M17 20h.01M14 14l3 3 3-3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </div>
               <p className="tl-empty-text">No tokens deployed yet</p>
               <p className="tl-empty-sub">
                  Create your first token to see it here
               </p>
            </div>
         )}

         <div className="tl-grid">
            {tokens.map((t, i) => (
               <div
                  className="tl-card"
                  key={i}
                  style={{ animationDelay: `${i * 60}ms` }}
               >
                  {/* Color avatar */}
                  <div
                     className="tl-avatar"
                     style={{
                        background: `linear-gradient(135deg, hsl(${addrHue(t)},80%,45%), hsl(${(addrHue(t) + 60) % 360},80%,35%))`,
                     }}
                  >
                     <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.8"
                        width="20"
                        height="20"
                     >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 3" strokeLinecap="round" />
                     </svg>
                  </div>

                  <div className="tl-card-body">
                     <div className="tl-index">
                        #{String(i + 1).padStart(3, "0")}
                     </div>
                     <p className="tl-addr">{shortAddr(t)}</p>
                     <p className="tl-full-addr">{t}</p>
                  </div>

                  <div className="tl-actions">
                     <button
                        className={`tl-action-btn${copied === t ? " tl-action-btn--copied" : ""}`}
                        onClick={() => copyAddress(t)}
                        title="Copy address"
                     >
                        {copied === t ? (
                           <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="14"
                              height="14"
                           >
                              <polyline points="20 6 9 17 4 12" />
                           </svg>
                        ) : (
                           <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              width="14"
                              height="14"
                           >
                              <rect x="9" y="9" width="13" height="13" rx="2" />
                              <path
                                 d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                 strokeLinecap="round"
                              />
                           </svg>
                        )}
                        {copied === t ? "Copied" : "Copy"}
                     </button>

                     <a
                        className="tl-action-btn tl-action-btn--link"
                        href={`https://sepolia.etherscan.io/address/${t}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on Etherscan"
                     >
                        <svg
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="currentColor"
                           strokeWidth="2"
                           width="14"
                           height="14"
                        >
                           <path
                              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                        Etherscan
                     </a>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
