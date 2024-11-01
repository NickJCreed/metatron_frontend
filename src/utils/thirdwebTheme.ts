import { darkTheme, lightTheme } from "thirdweb/react";
import { useTheme } from "@/context/ThemeProvider"; // Adjust the import to match your file structure

export const generateThirdWebTheme = (type: string) => {
  const { theme } = useTheme();  
  const themeColors = {
    primaryText: theme.colors.primaryText,
    secondaryText: theme.colors.secondaryText,
    accentButtonBg: theme.colors.accentButtonBg,
    accentButtonText: theme.colors.accentButtonText,
    primaryButtonBg: theme.colors.primaryButtonBg,
    primaryButtonText: theme.colors.primaryButtonText,
    connectedButtonBg: theme.colors.connectedButtonBg,
    connectedButtonBgHover: theme.colors.connectedButtonBgHover,
    borderColor: theme.colors.borderColor,
    modalBg: theme.colors.modalBg,
    modalOverlayBg: theme.colors.modalOverlayBg,
    secondaryButtonBg: theme.colors.secondaryButtonBg,
    secondaryButtonHoverBg: theme.colors.secondaryButtonHoverBg,
    secondaryButtonText: theme.colors.secondaryButtonText,
    tooltipBg: theme.colors.tooltipBg,
    tooltipText: theme.colors.tooltipText,
    separatorLine: theme.colors.separatorLine,
  };

  return type === 'dark' ? darkTheme({ colors: themeColors }) : lightTheme({ colors: themeColors });
};
