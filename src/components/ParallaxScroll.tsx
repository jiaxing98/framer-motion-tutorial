import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import Picture1 from '../assets/images/1.jpg'
import Picture2 from '../assets/images/2.jpg'
import Picture3 from '../assets/images/3.jpg'

const word = 'with framer-motion'

const ParallaxScroll = () => {
  const container = useRef(null)

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const sm = useTransform(scrollYProgress, [0, 1], [0, -50])
  const md = useTransform(scrollYProgress, [0, 1], [0, -150])
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250])

  const images = [
    { src: Picture1, y: 0 },
    { src: Picture2, y: lg },
    { src: Picture3, y: md },
  ]

  return (
    <div className="mt-[50vh] mb-[100vh]">
      <div
        ref={container}
        className="mt-[10vh] min-h-[100vh] font-['Young_Serif']"
      >
        <div className="ml-[10vw]">
          <motion.h1
            className="m-0 mt-[10px] text-[5vw] leading-[5vw] uppercase"
            style={{ y: sm }}
          >
            Parallax
          </motion.h1>
          <h1 className="m-0 mt-[10px] text-[5vw] leading-[5vw] uppercase">
            Scroll
          </h1>
          <div>
            <p className="m-0 mt-[10px] text-[3vw] text-white uppercase">
              {word.split('').map((e, i) => {
                const y = useTransform(
                  scrollYProgress,
                  [0, 1],
                  [0, Math.floor(Math.random() * -75) - 25]
                )
                return (
                  <motion.span
                    key={`letter_${i}`}
                    className="relative"
                    style={{ top: y }}
                  >
                    {e}
                  </motion.span>
                )
              })}
            </p>
          </div>
        </div>
        <div className="flex relative w-full justify-center mt-[5vh]">
          {images.map(({ src, y }, i) => {
            return (
              <motion.div key={`image_${i}`} className="images" style={{ y }}>
                <img
                  src={src}
                  alt={`image_${i}`}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ParallaxScroll
