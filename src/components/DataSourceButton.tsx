import { motion } from "framer-motion"
import { Dispatch, SetStateAction } from "react"

import { ease } from "@/utils/framer"

type Props = {
  currentDataSource: "projects" | "milestones"
  setCurrentDataSource: Dispatch<SetStateAction<"projects" | "milestones">>
}

export default function DataSourceButton({
  currentDataSource,
  setCurrentDataSource,
}: Props) {
  return (
    <motion.button
      key={currentDataSource + "-button"}
      onClick={() =>
        setCurrentDataSource(
          currentDataSource === "milestones" ? "projects" : "milestones"
        )
      }
      {...dataButtonProps}
    >
      {currentDataSource === "milestones" ? "Projects" : "Milestones"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        className="m-0 ml-1.5 mt-0.5 w-2.5 p-0 transition-colors duration-300 group-hover:fill-white"
      >
        <path d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path>
      </svg>
    </motion.button>
  )
}

const dataButtonProps = {
  exit: { opacity: 0, x: 30, transition: { ease } },
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { ease } },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  className:
    "pointer-events-auto rounded-full text-black px-6 py-3 font-medium bg-white border hover:bg-orange-200 hover:text-white transition-colors duration-300 flex items-center justify-center gap-1 group mx-auto sm:ml-auto sm:mr-0",
}
