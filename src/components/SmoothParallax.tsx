import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef, useState } from 'react'

const images = [
  'poster1.jpg',
  'poster2.jpg',
  'poster3.jpg',
  'poster4.jpg',
  'poster5.jpg',
  'poster6.jpg',
  'poster7.jpg',
  'poster8.jpg',
  'poster9.jpg',
  'poster10.jpg',
  'poster11.jpg',
  'poster12.jpg',
]

const SmoothParallax = () => {
  const gallery = useRef(null)
  const [dimension, setDimension] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start'],
  })

  const { height } = dimension
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect(() => {
    const lenis = new Lenis()

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', resize)
    requestAnimationFrame(raf)
    resize()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <main className="my-[50vh]">
      <div
        ref={gallery}
        className="flex relative h-[175vh] box-border bg-[rgb(45,45,45)] gap-[2vw] p-[2vw] overflow-hidden"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
    </main>
  )
}

const Column = ({
  images,
  y,
}: {
  images: string[]
  y: MotionValue<number>
}) => {
  return (
    <motion.div
      style={{ y }}
      className="flex relative flex-col h-full w-[25%] min-w-[250px] gap-[2vw] [&:nth-of-type(1)]:top-[-45%] [&:nth-of-type(2)]:top-[-95%] [&:nth-of-type(3)]:top-[-45%] [&:nth-of-type(4)]:top-[-75%]"
    >
      {images.map((src, i) => {
        return (
          <div
            key={i}
            className="relative h-full w-full rounded-[1vw] overflow-hidden"
          >
            <img
              src={`/media/${src}`}
              alt="image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )
      })}
    </motion.div>
  )
}

export default SmoothParallax
