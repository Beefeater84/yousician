import { SongLevelType } from "@/entities/song/types/songs-types";
import styles from "./level.module.scss";

interface LevelProps {
  difficulty: SongLevelType;
}

export default function Level({ difficulty }: LevelProps) {
  let difficultyLevel = "Easy";
  const DIFFICULTY_POINT = 6;
  const FIRST_LINE_END = 30;
  const SECOND_LINE_END = 63.3;
  const THIRD_LINE_END = 96.6;
  const GREY_GAP = 3.3;

  switch (true) {
    case difficulty / 5 > 2:
      difficultyLevel = "Hard";
      break;
    case difficulty / 5 > 1:
      difficultyLevel = "Medium";
      break;
    default:
      difficultyLevel = "Easy";
  }

  let firstLine = `var(--color) 0 ${FIRST_LINE_END}%`;
  let secondLine = `var(--color) 0 ${SECOND_LINE_END}%`;
  let thirdLine = `var(--color) 0 ${THIRD_LINE_END}%`;

  if (difficultyLevel === "Easy") {
    const GREEN_LINE_END = DIFFICULTY_POINT * difficulty;

    firstLine = `var(--easyColor) 0 ${GREEN_LINE_END}%,
                 var(--color) 0 ${FIRST_LINE_END}%`;
  }

  if (difficultyLevel === "Medium") {
    firstLine = `var(--mediumColor) 0 ${FIRST_LINE_END}%`;

    const YELLOW_LINE_END = DIFFICULTY_POINT * difficulty + GREY_GAP;
    secondLine = `var(--mediumColor) 0 ${YELLOW_LINE_END}%, var(--color) 0 ${SECOND_LINE_END}%`;
  }

  if (difficultyLevel === "Hard") {
    firstLine = `var(--hardColor) 0 ${FIRST_LINE_END}%`;
    secondLine = `var(--hardColor) 0 ${SECOND_LINE_END}%`;
    const RED_LINE_END = DIFFICULTY_POINT * difficulty + GREY_GAP * 2;
    thirdLine = `var(--hardColor) 0 ${RED_LINE_END}%, var(--color) 0 ${THIRD_LINE_END}%`;
  }

  const conicGradient = `conic-gradient(
    ${firstLine},
    var(--black-color) 0 33.3%,
    ${secondLine},
    var(--black-color) 0 66.6%,
    ${thirdLine},
    var(--black-color) 0
  )`;

  return (
    <div className={styles.difficulty}>
      <div className={styles.palette} style={{ background: conicGradient }} />
      <div className={styles.level}>{difficulty}</div>
    </div>
  );
}
