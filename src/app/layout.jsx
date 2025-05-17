import localFont from 'next/font/local'
import "@/style/main.scss";
import { ToastContainer } from 'react-toastify';
const proximaNova = localFont({
  src: [
    {
      path: './fonts/ProximaNova-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/ProximaNova-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/ProximaNova-BlackIt.otf',
      weight: '900',
      style: 'italic',
    },
  ],
})
export const metadata = {
  title: "TikTak",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={proximaNova.className}>
        <div className="wrapper">
          <div className="content">
            <ToastContainer />

            {children}
          </div>
        </div>
      </body>
    </html>
  );
}