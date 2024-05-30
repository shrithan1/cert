import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import Wallet from "../components/wallet";
import Swap from "../components/swap";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div>
        <Wallet isConnected={isConnected} />
        {isConnected ? (
          <Swap />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
