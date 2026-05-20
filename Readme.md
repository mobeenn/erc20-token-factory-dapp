# 🚀 ERC20 Token Factory DApp

A decentralized application (DApp) that allows users to create and deploy their own ERC-20 tokens on the blockchain using a Factory Smart Contract.

Built with **Solidity**, **React**, and **Ethers.js**.

---

## 📌 Features

- 🪙 Create custom ERC-20 tokens (Name, Symbol, Supply)
- 🏭 Factory smart contract for token deployment
- 📜 View all deployed tokens
- 🔗 Direct links to Etherscan (Sepolia Testnet)
- ⚡ MetaMask integration

---

## 🏗️ Tech Stack

- Solidity ^0.8.20
- React.js
- Ethers.js v6
- MetaMask
- Sepolia Testnet

---

## 📂 Project Structure

- /contracts → Solidity Smart Contracts
- /frontend → React DApp UI
- /config → Contract address & ABI

---

## 🧠 Smart Contracts

### ERC20 Token

- Basic ERC-20 implementation
- Initial supply minted to deployer

### Factory Contract

- Deploys new tokens dynamically
- Stores all deployed token addresses
- Emits `TokenCreated` event

---

## ⚙️ How It Works

1. User enters token details (name, symbol, supply)
2. Factory contract deploys a new ERC-20 token
3. Token is minted to user wallet
4. Token address is stored in factory contract
5. UI fetches and displays all tokens

---

## 🚀 Setup Instructions

### 1. Clone Repo

```bash
git https://github.com/mobeenn/erc20-token-factory-dapp
cd erc20-token-factory-dapp
```
