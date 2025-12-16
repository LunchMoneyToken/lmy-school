import Navbar from '../components/Navbar'
import Home from '../components/Home'
import Footer from '../components/Footer'

export default function Page() {
  return (
    <>
      <Navbar />
      <div className='max-w-[1280px] mx-auto pt-8'>
        <Home />
      </div>
      <Footer />
    </>
  )
}

