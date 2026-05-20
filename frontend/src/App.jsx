// import { useState } from "react";
// import CreateToken from "./components/CreateToken";
// import TokenList from "./components/TokenList";

// export default function App() {
//    const [refresh, setRefresh] = useState(false);

//    return (
//       <div>
//          <CreateToken onTokenCreated={() => setRefresh(!refresh)} />
//          <TokenList refresh={refresh} />
//       </div>
//    );
// }

/**
 * App.jsx — Token Factory Launchpad
 * Drop-in layout wrapper showing how to compose the two upgraded components.
 * All blockchain logic lives in CreateToken / TokenList — untouched.
 */
import { useState, useEffect } from "react";
import CreateToken from "./components/CreateToken";
import TokenList from "./components/TokenList";
import "./components/web3.css";

export default function App() {
   const [refresh, setRefresh] = useState(0);
   const [walletAddr, setWalletAddr] = useState("");

   useEffect(() => {
      // Passive wallet address read for header badge — no forced connection
      if (window.ethereum) {
         window.ethereum
            .request({ method: "eth_accounts" })
            .then((accs) => accs[0] && setWalletAddr(accs[0]))
            .catch(() => {});

         window.ethereum.on("accountsChanged", (accs) =>
            setWalletAddr(accs[0] || ""),
         );
      }
   }, []);

   return (
      <div className="w3-root">
         {/* ── Header ─────────────────────────────────────────────────── */}
         <header className="w3-header">
            <div className="w3-logo">
               <div className="w3-logo-mark">
                  {/* Inline cube icon */}
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="white"
                     strokeWidth="1.8"
                     width="20"
                     height="20"
                  >
                     <path
                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </div>
               <div>
                  <p className="w3-logo-text">Token Factory</p>
                  <p className="w3-logo-sub">Launchpad · Sepolia</p>
               </div>
            </div>

            {walletAddr ? (
               <div className="w3-wallet-badge">
                  <span className="w3-wallet-dot" />
                  {walletAddr.slice(0, 6)}…{walletAddr.slice(-4)}
               </div>
            ) : (
               <div className="w3-wallet-badge">
                  <span
                     style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#475569",
                        display: "inline-block",
                     }}
                  />
                  Not connected
               </div>
            )}
         </header>

         {/* ── Two-column dashboard grid ─────────────────────────────── */}
         <main className="w3-grid">
            <CreateToken onTokenCreated={() => setRefresh((r) => r + 1)} />
            <TokenList refresh={refresh} />
         </main>
      </div>
   );
}
