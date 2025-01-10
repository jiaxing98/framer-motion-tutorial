import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import Picture1 from '../assets/images/1.jpg'
import Picture2 from '../assets/images/2.jpg'
import Picture3 from '../assets/images/3.jpg'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'

type Direction = 'left' | 'right'

interface Props {
  src: string
  direction: Direction
  left: string
  progress: MotionValue<number>
}

const TextParallax = () => {
  const container = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
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
    // overflow:hidden - to remove the horizontal scroll created by the long slides.
    <main className="overflow-hidden">
      <div className="h-[100vh]" />
      <div ref={container}>
        <Slide
          src={Picture1}
          direction={'left'}
          left={'-40%'}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture2}
          direction={'right'}
          left={'-25%'}
          progress={scrollYProgress}
        />
        <Slide
          src={Picture3}
          direction={'left'}
          left={'-75%'}
          progress={scrollYProgress}
        />
      </div>
      <div className="h-[100vh]" />
    </main>
  )
}

const Slide = ({ src, direction, left, progress }: Props) => {
  const directionValue = direction === 'left' ? -1 : 1
  const translateX = useTransform(
    progress,
    [0, 1],
    [150 * directionValue, -150 * directionValue]
  )

  return (
    <motion.div
      style={{ x: translateX, left: left }}
      className="relative flex whitespace-nowrap"
    >
      {Array.from({ length: 5 }).map((_) => (
        <Phrase src={src} />
      ))}
    </motion.div>
  )
}

export const Phrase = ({ src }: { src: string }) => {
  return (
    <div className="px-5 flex gap-5 items-center">
      <p className="text-[7.5vw]">Front End Developer</p>
      <span className="relative h-[7.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <img src={src} alt="image" className="object-cover" />
      </span>
    </div>
  )
}

export default TextParallax
