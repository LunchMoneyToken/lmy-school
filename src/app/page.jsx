import Navbar from '../components/Layout/Navbar'
import Home from '../components/Home/Home'
import Footer from '../components/Layout/Footer'

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

