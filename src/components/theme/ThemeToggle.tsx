"use client";

import type { Theme } from "@/config/theme";
import { cn } from "@/lib/utils";
import {
  DesktopIcon,
  MoonIcon,
  SunIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  useState,
  useLayoutEffect,
} from "react";

type IconType = ForwardRefExoticComponent<
  IconProps & RefAttributes<SVGSVGElement>
>;

interface ThemeToggleProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
}

const ThemeToggle = ({ theme, className, ...rest }: ThemeToggleProps) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme ?? "dark");

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log("Theme changed to", currentTheme);
    setCurrentTheme((prev) => {
      switch (prev) {
        case "light":
          return "dark";
        case "dark":
          return "system";
        case "system":
          return "light";
      }
    });
  };

  return (
    <div className={cn("", className)} {...rest}>
      <button type="button" onClick={handleToggle}>
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
