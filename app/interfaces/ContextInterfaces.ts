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

interface CoinData {
  id: string;
  symbol: string;
  current_price: number;
  index: number;
  image: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  circulating_supply: number;
  total_supply: number;
  market_cap: number;
  total_volume: number;
  sparkline_in_7d: { price: [] };
}
