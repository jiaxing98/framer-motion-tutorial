import { useEffect, useRef } from 'react'
import { projects } from '../data/data'
import { Project } from '../types/Project'
import Lenis from 'lenis'
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'

interface Props {
  index: number
  progress: MotionValue<number>
  targetScale: number
  range: number[]
  project: Project
}

const CardParallax = () => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
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
    <main ref={container} className="my-50vh">
      <Hint />
      {projects.map((e, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05

        return (
          <Card
            key={`p_${i}`}
            index={i}
            progress={scrollYProgress}
            targetScale={targetScale}
            range={[i * 0.25, 1]}
            project={e}
          />
        )
      })}
    </main>
  )
}

const Hint = () => {
  const hint = 'Scroll UP'
  const regex = /(?=\s)|(?<=\s)|/

  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['end end', 'end 0.6'],
  })

  //   useMotionValueEvent(scrollYProgress, 'change', (latest) => {
  //     console.log('Value:', latest)
  //   })

  return (
    <div ref={container} className="flex h-screen justify-center items-center">
      <p className="text-9xl font-['Young_Serif']">
        {hint.split(regex).map((char, i) => {
          const start = i / hint.length
          const end = start + 1 / hint.length
          const opacity = useTransform(scrollYProgress, [start, end], [0, 1])

          console.log(char, start, end, opacity)

          return (
            <span key={`char_${i}`} className="relative">
              <span className="absolute opacity-[20%]">{char}</span>
              <motion.span style={{ opacity }}>{char}</motion.span>
            </span>
          )
        })}
      </p>
    </div>
  )
}

const Card = ({ index, progress, range, targetScale, project }: Props) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1])
  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div
      ref={container}
      className="flex sticky h-screen items-center justify-center top-0 font-['Bebas_Neue']"
    >
      <motion.div
        className="flex relative flex-col h-[70vh] w-[60vw] rounded-[25px] p-[50px] origin-top"
        style={{
          backgroundColor: project.color,
          top: `calc(-5vh + ${index * 25}px)`,
          scale,
        }}
      >
        <h2 className="text-center m-0 text-5xl">{project.title}</h2>
        <div className="flex h-full mt-[50px] gap-[50px]">
          <div className="relative w-[40%] top-[10%]">
            <p className="text-2xl first-letter:text-5xl">
              {project.description}
            </p>
            <span className="flex items-center gap-[5px]">
              <a
                href={project.link}
                target="_blank"
                className="text-xl underline cursor-pointer"
              >
                See more
              </a>
              <svg
                width="22"
                height="12"
                viewBox="0 0 22 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>

          <div className="relative w-[60%] h-full rounded-[25px] overflow-hidden">
            <motion.div className="h-full w-full" style={{ scale: imageScale }}>
              <img
                src={`/media/${project.src}`}
                alt="image"
                className="absolute inset-0 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CardParallax
