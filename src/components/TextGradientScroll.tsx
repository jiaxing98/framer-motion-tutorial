import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

const TextGradientScroll = () => {
  const paragraph =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum ratione deleniti modi aperiam consectetur, aspernatur id. Saepe tenetur corporis voluptate quae, doloremque quos pariatur quas delectus excepturi aperiam. Nulla, eos?'

  useEffect(() => {
    const lenis = new Lenis()

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <div className="my-[50vh]">
      <Paragraph paragraph={paragraph} />
      <div className="h-10"></div>
      <Word paragraph={paragraph} />
      <div className="h-10"></div>
      <Character paragraph={paragraph} />
    </div>
  )
}

const Paragraph = ({ paragraph }: { paragraph: string }) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.p ref={container} className="paragraph" style={{ opacity }}>
      {paragraph}
    </motion.p>
  )
}

const Word = ({ paragraph }: { paragraph: string }) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = paragraph.split(' ')

  return (
    <p ref={container} className="paragraph">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1])

        return (
          <span key={i} className="relative mt-3 mr-3">
            <span className="absolute opacity-[20%]">{word}</span>
            <motion.span style={{ opacity: opacity }}>{word}</motion.span>
          </span>
        )
      })}
    </p>
  )
}

const Character = ({ paragraph }: { paragraph: string }) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = paragraph.split(' ')

  return (
    <p ref={container} className="paragraph">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length

        const amount = end - start
        const step = amount / word.length

        return (
          <span key={`word_${i}`} className="relative mt-3 mr-3">
            {word.split('').map((char, i) => {
              const charStart = start + i * step
              const charEnd = start + (i + 1) * step
              const opacity = useTransform(
                scrollYProgress,
                [charStart, charEnd],
                [0, 1]
              )

              return (
                <span key={`char_${i}`}>
                  <span className="absolute opacity-[20%]">{char}</span>
                  <motion.span style={{ opacity: opacity }}>{char}</motion.span>
                </span>
              )
            })}
          </span>
        )
      })}
    </p>
  )
}

export default TextGradientScroll
