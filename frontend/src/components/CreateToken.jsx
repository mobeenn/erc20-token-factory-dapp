// import { useState } from "react";
// import { ethers } from "ethers";
// import { FACTORY_ABI } from "../contractABI";
// import { FACTORY_ADDRESS } from "../config";

// export default function CreateToken({ onTokenCreated }) {
//    const [name, setName] = useState("");
//    const [symbol, setSymbol] = useState("");
//    const [supply, setSupply] = useState("");
//    const [loading, setLoading] = useState(false);
//    const [txHash, setTxHash] = useState("");

//    async function createToken() {
//       try {
//          setLoading(true);

//          if (!window.ethereum) {
//             alert("Install MetaMask");
//             return;
//          }

//          const provider = new ethers.BrowserProvider(window.ethereum);
//          const signer = await provider.getSigner();

//          const contract = new ethers.Contract(
//             FACTORY_ADDRESS,
//             FACTORY_ABI,
//             signer,
//          );

//          const tx = await contract.createToken(name, symbol, supply);

//          setTxHash(tx.hash);

//          const receipt = await tx.wait();

//          // Find event
//          const event = receipt.logs;

//          alert("Token Created Successfully!");

//          onTokenCreated(); // refresh list
//       } catch (err) {
//          console.error(err);
//          alert("Transaction Failed");
//       } finally {
//          setLoading(false);
//       }
//    }

//    return (
//       <div style={styles.card}>
//          <h2>🚀 Token Factory</h2>

//          <input
//             placeholder="Token Name"
//             onChange={(e) => setName(e.target.value)}
//             style={styles.input}
//          />

//          <input
//             placeholder="Symbol"
//             onChange={(e) => setSymbol(e.target.value)}
//             style={styles.input}
//          />

//          <input
//             placeholder="Supply"
//             type="number"
//             onChange={(e) => setSupply(e.target.value)}
//             style={styles.input}
//          />

//          <button onClick={createToken} style={styles.button}>
//             {loading ? "Creating..." : "Create Token"}
//          </button>

//          {txHash && (
//             <p>
//                Tx:{" "}
//                <a
//                   href={`https://sepolia.etherscan.io/tx/${txHash}`}
//                   target="_blank"
//                >
//                   View
//                </a>
//             </p>
//          )}
//       </div>
//    );
// }

// const styles = {
//    card: { padding: 20, border: "1px solid #ccc", margin: 10 },
//    input: { display: "block", margin: 10, padding: 8, width: 300 },
//    button: { padding: 10, cursor: "pointer" },
// };

import { useState } from "react";
import { ethers } from "ethers";
import { FACTORY_ABI } from "../contractABI";
import { FACTORY_ADDRESS } from "../config";
import "./web3.css";

export default function CreateToken({ onTokenCreated }) {
   const [name, setName] = useState("");
   const [symbol, setSymbol] = useState("");
   const [supply, setSupply] = useState("");
   const [loading, setLoading] = useState(false);
   const [txHash, setTxHash] = useState("");
   const [success, setSuccess] = useState(false);

   // ── UNTOUCHED BLOCKCHAIN LOGIC ──────────────────────────────────────────────
   async function createToken() {
      try {
         setLoading(true);
         setSuccess(false);
         if (!window.ethereum) {
            alert("Install MetaMask");
            return;
         }
         const provider = new ethers.BrowserProvider(window.ethereum);
         const signer = await provider.getSigner();
         const contract = new ethers.Contract(
            FACTORY_ADDRESS,
            FACTORY_ABI,
            signer,
         );
         const tx = await contract.createToken(name, symbol, supply);
         setTxHash(tx.hash);
         const receipt = await tx.wait();
         const event = receipt.logs;
         alert("Token Created Successfully!");
         setSuccess(true);
         onTokenCreated();
      } catch (err) {
         console.error(err);
         alert("Transaction Failed");
      } finally {
         setLoading(false);
      }
   }
   // ── END BLOCKCHAIN LOGIC ────────────────────────────────────────────────────

   return (
      <div className="ct-card">
         {/* Glow orbs */}
         <div className="ct-orb ct-orb-1" />
         <div className="ct-orb ct-orb-2" />

         <div className="ct-header">
            <div className="ct-badge">
               <span className="ct-badge-dot" />
               LAUNCHPAD
            </div>
            <h2 className="ct-title">Deploy Token</h2>
            <p className="ct-subtitle">Deploy your ERC-20 token on Sepolia</p>
         </div>

         <div className="ct-fields">
            <div className="ct-field-group">
               <label className="ct-label">Token Name</label>
               <div className="ct-input-wrap">
                  <svg
                     className="ct-field-icon"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="1.5"
                  >
                     <path
                        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  <input
                     className="ct-input"
                     placeholder="e.g. MyToken"
                     onChange={(e) => setName(e.target.value)}
                     autoComplete="off"
                  />
               </div>
            </div>

            <div className="ct-field-group">
               <label className="ct-label">Symbol</label>
               <div className="ct-input-wrap">
                  <svg
                     className="ct-field-icon"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="1.5"
                  >
                     <circle cx="12" cy="12" r="10" />
                     <path d="M12 6v12M8 10h8M8 14h8" strokeLinecap="round" />
                  </svg>
                  <input
                     className="ct-input"
                     placeholder="e.g. MTK"
                     onChange={(e) => setSymbol(e.target.value)}
                     autoComplete="off"
                  />
               </div>
            </div>

            <div className="ct-field-group">
               <label className="ct-label">Initial Supply</label>
               <div className="ct-input-wrap">
                  <svg
                     className="ct-field-icon"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="1.5"
                  >
                     <path
                        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  <input
                     className="ct-input"
                     placeholder="e.g. 1000000"
                     type="number"
                     onChange={(e) => setSupply(e.target.value)}
                     autoComplete="off"
                  />
               </div>
            </div>
         </div>

         <button
            className={`ct-btn${loading ? " ct-btn--loading" : ""}${success ? " ct-btn--success" : ""}`}
            onClick={createToken}
            disabled={loading}
         >
            {loading ? (
               <>
                  <span className="ct-spinner" />
                  Broadcasting...
               </>
            ) : success ? (
               <>
                  <svg
                     className="ct-btn-icon"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                  >
                     <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Token Deployed!
               </>
            ) : (
               <>
                  <svg
                     className="ct-btn-icon"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                  >
                     <path
                        d="M12 5v14M5 12l7-7 7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
                  Create Token
               </>
            )}
         </button>

         {txHash && (
            <div
               className={`ct-tx-panel${success ? " ct-tx-panel--success" : ""}`}
            >
               <div className="ct-tx-header">
                  <span className="ct-tx-label">
                     <span
                        className={`ct-tx-dot${success ? " ct-tx-dot--success" : " ct-tx-dot--pending"}`}
                     />
                     {success ? "Confirmed" : "Pending"}
                  </span>
                  <span className="ct-tx-network">Sepolia</span>
               </div>
               <p className="ct-tx-hash">
                  {txHash.slice(0, 20)}...{txHash.slice(-8)}
               </p>
               <a
                  className="ct-tx-link"
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  View on Etherscan
                  <svg
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     strokeWidth="2"
                     width="12"
                     height="12"
                  >
                     <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </a>
            </div>
         )}
      </div>
   );
}
