import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("ChronoLink-theme") ||"coffee",

  setTheme : (theme)=>{
    localStorage.setItem("ChronoLink-theme", theme),
    set({theme})}
  
}))