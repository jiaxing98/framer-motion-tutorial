import Lenis from 'lenis'
import { useEffect } from 'react'

const StickyFooter = () => {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div>
      <Intro />
      <Footer1 />
      {/* <Footer2 /> */}
    </div>
  )
}

const Intro = () => {
  return (
    <div className="h-screen flex text-[2vw] items-center justify-center">
      <h2 className="max-w-[45%] text-center leading-none">
        This is an example of a sticky footer made with CSS.
      </h2>
    </div>
  )
}

// The only downside here is we have to specify a height for the footer.
const Footer1 = () => {
  const height = '500px'

  return (
    <div
      className={`relative h-[${height}]`}
      style={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className={`fixed bottom-0 h-[${height}] w-full`}>
        <Content />
      </div>
    </div>
  )
}

// We have to specify a height for the footer too.
const Footer2 = () => {
  const height = '500px'

  return (
    <div
      className={`relative h-[${height}]`}
      style={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <div className={`relative h-[calc(100vh+${height})] -top-[100vh]`}>
        <div className={`sticky h-[${height}] top-[calc(100vh-${height})]`}>
          <Content />
        </div>
      </div>
    </div>
  )
}

const Content = () => {
  return (
    <div className="bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between">
      <Section1 />
      <Section2 />
    </div>
  )
}

const Section1 = () => {
  return (
    <div>
      <Nav />
    </div>
  )
}
const Section2 = () => {
  return (
    <div className="flex justify-between items-end">
      <h1 className="text-[14vw] leading-[0.8] mt-10">Sticky Footer</h1>
      <p>©copyright</p>
    </div>
  )
}

const Nav = () => {
  return (
    <div className="flex shrink-0 gap-20">
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[$ffffff80]">About</h3>
        <p>Home</p>
        <p>Projects</p>
        <p>Our Mission</p>
        <p>Contact Us</p>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-2 uppercase text-[$ffffff80]">Education</h3>
        <p>News</p>
        <p>Learn</p>
        <p>Certication</p>
        <p>Publications</p>
      </div>
    </div>
  )
}

export default StickyFooter
