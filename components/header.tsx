"use client";

import { Email, Phone } from "@mui/icons-material";
import { LogoutButton } from "./logoutButton";

export const Header = () => {
  return (
    <header className="bg-[#8BC53F] h-20 flex items-center">
      <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-lg">
          <span className="text-2xl">TI</span>
          <span>
            innovation
            <br />
            BRINDES
          </span>
        </div>

        <div className="flex items-center gap-8 text-white text-sm">
          <div className="relative">
            <Email />
            <span className="absolute -top-2 -right-3 bg-white text-[#8BC53F] text-xs font-bold rounded-full px-1">
              11
            </span>
          </div>

          <div className="relative">
            <Phone />
            <span className="absolute -top-2 -right-3 bg-white text-[#8BC53F] text-xs font-bold rounded-full px-1">
              11
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white text-sm">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-10 h-10 rounded-full"
          />
          <div className="text-right leading-tight">
            <p className="font-semibold">Ana Carol Machado</p>
            <p className="text-xs">Quarta, 23/09/2020</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
