import { Kanit, K2D } from "next/font/google";
 const kanit = Kanit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-kanit",
});

const k2d = K2D({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-k2d",
});

export {kanit, k2d}

