type themeOption = "light" | "dark";
type pageOption = "home" | "portfolio" | "converter";
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
  marketCapCurrencyFormat: Intl.NumberFormat;
  percentFormat: Intl.NumberFormat;
  percentFormat4CharMax: Intl.NumberFormat;
  marketCapPercentageFormat: Intl.NumberFormat;
  percentageBarFormat: Intl.NumberFormat;
  isProd: boolean;
  isViewingCoinPage: boolean;
  setIsViewingCoinPage: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: pageOption;
  setCurrentPage: React.Dispatch<React.SetStateAction<pageOption>>;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  currencyCodes: string[];
  currencySymbols: { [key: string]: string };
  currencySymbol: string;
}
