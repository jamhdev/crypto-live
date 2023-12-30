type themeOption = "light" | "dark";
type pageOption = "home" | "portfolio";

interface CreateContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<themeOption>>;
  toggleTheme: () => void;
  colors: {
    [key: string]: string;
  };
}
