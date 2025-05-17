import Header from "@/components/header"
import Main from "@/components/main"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { SoundProvider } from '@/context/SoundContext'

export default function Home() {
  return <SoundProvider>
    <Header />
    <Main />
    <Navigation />
    <Footer />
  </SoundProvider>
}