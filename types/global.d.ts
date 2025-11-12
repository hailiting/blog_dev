declare global {
  interface Window {
    openverse: any;
    openwallet: any;
    solana: any;
    solanaBrige: any;
    isOpenWallet: boolean;
    phantom: { solana: any };
  }
}

export {}; 