"use client";

import { themeConfig, type Theme } from "@/config/theme";
import { cn } from "@/lib/utils";
import {
  DesktopIcon,
  MoonIcon,
  SunIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { useState, useLayoutEffect } from "react";

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
}

const ThemeToggle = ({ theme, className, ...rest }: ThemeToggleProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme ?? "dark");

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const current =
      e.currentTarget.getAttribute("data-current-theme") ?? "dark";

    const getNewTheme = (prev: Theme) => {
      switch (prev) {
        case "light":
          return "dark";
        case "dark":
          return "system";
        case "system":
          return "light";
        default:
          return "dark";
      }
    };

    const newTheme = getNewTheme(current as Theme);

    setCurrentTheme(newTheme);

    document.documentElement.classList.remove("dark", "light", "system");
    document.documentElement.classList.add(newTheme);

    const newCookieTheme = `${themeConfig.cookie.name}=${newTheme}; path=/; max-age=${themeConfig.cookie.expires}; SameSite=Strict`;
    document.cookie = newCookieTheme;
  };

  return (
    <div className={cn("", className)} {...rest}>
      <button
        type="button"
        onClick={handleToggle}
        data-current-theme={currentTheme}
      >
        <CurrentThemeDisplay theme={currentTheme} />
      </button>
    </div>
  );
};

export default ThemeToggle;

export const CurrentThemeDisplay = ({
  theme,
}: {
  theme: Theme;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 650);
  }, []);

  return (
    <span className="flex items-center justify-center rounded-xl px-2 py-2 border-2">
      {loading && (
        <SymbolIcon className="animate-spin duration-1000 ease-in-out" />
      )}
      {!loading && (
        <>
          {theme === "light" ? (
            <SunIcon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <DesktopIcon />
          )}
        </>
      )}
    </span>
  );
};
