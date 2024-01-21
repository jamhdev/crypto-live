type themeOption = "light" | "dark";
type pageOption = "home" | "portfolio";
type CoinOrConverterSelectorOption = "coins" | "converter";
type durationOption = "1D" | "7D" | "14D" | "1M" | "1Y";

interface CreateContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<themeOption>>;
  toggleTheme: () => void;
  coinsOrConverterSelector: string;
  setCoinsOrConverterSelector: React.Dispatch<
    React.SetStateAction<CoinOrConverterSelectorOption>
  >;
  colors: {
    [key: string]: string;
  };
  currencyFormat: Intl.NumberFormat;
}

interface GlobalMarketDataType {
  active_cryptocurrencies: number;
  markets: number;
  total_market_cap: {
    usd: number;
  };
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: {
    btc: number;
    eth: number;
  };
}
