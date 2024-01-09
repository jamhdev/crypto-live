type themeOption = "light" | "dark";
type pageOption = "home" | "portfolio";
type CoinOrConverterSelectorOption = "coins" | "converter";

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
