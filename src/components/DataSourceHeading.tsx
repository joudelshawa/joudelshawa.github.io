import TextMask from "./TextMask"

type Props = {
  currentDataSource: "projects" | "milestones"
}

export default function DataSourceHeading({ currentDataSource }: Props) {
  return (
    <TextMask
      key={currentDataSource + "-heading"}
      type="letter"
      className="text-3xl"
    >
      {currentDataSource.at(0)?.toUpperCase() + currentDataSource.slice(1)}
    </TextMask>
  )
}
