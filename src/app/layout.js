import { Tajawal, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// فونت لوکس و مدرن عربی
const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-arabic",
  preload: true,
  weight: ["400", "500", "700", "800"],
});

// فونت مدرن و مینیمال انگلیسی
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-english",
  preload: true,
  weight: ["400", "600", "700", "800"],
});

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "المدرب عبدالرحمن الحوطي | تدريب شخصي وتأهيل رياضي معتمد",
  description:
    "تدريب شخصي وتأهيل إصابات مع الكابتن عبدالرحمن فيصل الحوطي، بكالوريوس تربية بدنية ورياضة، متخصص في تمارين المقاومة وتجهيز الرياضيين وتدريب الحالات الخاصة وكبار السن.",
  keywords: [
    "عبدالرحمن فيصل الحوطي",
    "المدرب عبدالرحمن الحوطي",
    "مدرب شخصي الكويت",
    "مدرب لياقة بدنية أونلاين",
    "تأهيل إصابات رياضية",
    "تمارين مقاومة وتضخيم",
    "تجهيز بطولات رياضية",
    "تدريب كبار السن ومرضى السكري",
    "Personal Trainer Kuwait",
    "Alhouti Fitness Coaching",
  ],
  authors: [{ name: "عبدالرحمن فيصل الحوطي" }],
  creator: "عبدالرحمن فيصل الحوطي",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "الكابتن عبدالرحمن الحوطي | تدريب شخصي، مقاومة وتأهيل بدني متقدم",
    description:
      "برامج تدريبية وتغذوية مبنية على أسس علمية مع أخصائي التربية البدنية والتأهيل الرياضي عبدالرحمن فيصل الحوطي.",
    locale: "ar_KW",
    type: "website",
    siteName: "Abdulrahman Al-Houti Coaching",
  },
  twitter: {
    card: "summary_large_image",
    title: "المدرب عبدالرحمن الحوطي | تدريب رياضي وتأهيل علمي",
    description:
      "خطط تدريب وتأهيل رياضي متقدمة مبنية على خبرة أكاديمية وميدانية مع الكابتن عبدالرحمن الحوطي.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-fitness-bg font-sans text-fitness-text selection:bg-fitness-primary selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
