import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

const TextAlongPath = () => {
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
      <div className="h-[100vh]">
        <Footer />
      </div>
    </main>
  )
}

const Footer = () => {
  const container = useRef(null)
  const paths = useRef<(SVGTextPathElement | null)[]>([])

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  })

  useEffect(() => {
    scrollYProgress.on('change', (e) => {
      paths.current.forEach((path, i) => {
        path?.setAttribute('startOffset', `${-40 + i * 40 + e * 40}%`)
      })
    })
  }, [])

  return (
    <div ref={container}>
      <svg className="w-full mb-60" viewBox="0 0 250 90">
        <path
          fill="none"
          id="curve"
          d="m0,88.5c61.37,0,61.5-68,126.5-68,58,0,51,68,123,68"
        />
        <text className="text-[6px] uppercase" style={{ fill: 'red' }}>
          {[...Array(3)].map((_, i) => {
            return (
              <textPath
                key={i}
                ref={(ref) => {
                  paths.current[i] = ref
                }}
                startOffset={`${i * 40}%`}
                href="#curve"
              >
                Curabitur mattis efficitur velit
              </textPath>
            )
          })}
        </text>
      </svg>
      <Logos scrollYProgress={scrollYProgress} />
    </div>
  )
}

const Logos = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>
}) => {
  const y = useTransform(scrollYProgress, [0, 1], [-200, 0])

  return (
    <div className="h-[250px bg-black overflow-hidden]">
      <motion.div
        style={{ y }}
        className="h-full bg-black flex justify-center gap-10 items-center p-10"
      >
        {[...Array(5)].map((_, i) => {
          return (
            <img
              key={`img_${i}`}
              src={`/media/logo${i + 1}.jpg`}
              className="w-[80px] h-[80px]"
            />
          )
        })}
      </motion.div>
    </div>
  )
}

export default TextAlongPath
