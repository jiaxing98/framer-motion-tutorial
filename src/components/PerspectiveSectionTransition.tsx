import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Picture1 from '../assets/images/1.jpg'
import Picture2 from '../assets/images/2.jpg'
import Lenis from 'lenis'

const PerspectiveSectionTransition = () => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)

      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main ref={container} className="relative h-[200vh]">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  )
}

const Section1 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  return (
    <motion.div
      style={{ scale, rotate }}
      className="h-screen sticky top-0 bg-[#C72626] text-[3.5vw] flex flex-col items-center justify-center text-white 
    pb-[10vh]"
    >
      <p>Scroll Perspective</p>
      <div className="flex gap-4">
        <p>Section</p>
        <div className="relative w-[12.5vw]">
          <img src={Picture1} alt="image1" />
        </div>
        <p>Transition</p>
      </div>
    </motion.div>
  )
}

const Section2 = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0])

  return (
    <motion.div style={{ scale, rotate }} className="relative h-screen">
      <img src={Picture2} alt="image2" className="w-full h-full" />
    </motion.div>
  )
}

export default PerspectiveSectionTransition
