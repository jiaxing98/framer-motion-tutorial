import { motion, useScroll, useTransform } from 'framer-motion'
import Bg1 from '../assets/images/bg1.jpg'
import Bg2 from '../assets/images/bg2.jpg'
import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

const BgImageParallax = () => {
  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main>
      <Intro />
      <Description />
      <Section />
      <div className="h-screen"></div>
    </main>
  )
}

const Intro = () => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '150vh'])

  return (
    <div className="h-screen overflow-hidden">
      <motion.div style={{ y }} className="relative h-full">
        <img src={Bg2} alt="image" className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}

const Description = () => {
  return (
    <div className="flex justify-center my-40">
      <p className="text-[7.5vw] uppercase text-center max-w-[50vw] leading-none">
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  )
}

const Section = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10vh', '10vh'])

  // The image container is in position fixed,
  // so we need to add a clip-path on the parent to crop that fixed div.
  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <Text />
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img src={Bg1} alt="image" className="object-cover w-full h-full" />
        </motion.div>
      </div>
    </div>
  )
}

const Text = () => {
  return (
    <div className="relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between">
      <p className="w-[50vw] text-[2vw] self-end uppercase mix-blend-difference">
        Beauty and quality need the right time to be conceived and realised even
        in a world that is in too much of a hurry.
      </p>
      <p className="text-[5vw] uppercase mix-blend-difference">
        Background Parallax
      </p>
    </div>
  )
}

export default BgImageParallax
