import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import Picture1 from '../assets/images/bg1.jpg'
import Picture2 from '../assets/images/pic2.jpeg'
import Picture3 from '../assets/images/pic3.jpg'
import Picture4 from '../assets/images/pic4.jpg'
import Picture5 from '../assets/images/pic5.jpg'
import Picture6 from '../assets/images/pic6.jpg'
import Picture7 from '../assets/images/bg2.jpg'

const ZoomParallax = () => {
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
    offset: ['start start', 'end end'],
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ]

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky overflow-hidden top-0 h-[100vh]">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className="el">
              <div className="imageContainer">
                <img
                  src={src}
                  alt="image"
                  className="placeholder:blur-sm object-cover w-full h-full"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ZoomParallax
