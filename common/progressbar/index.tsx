import React from "react";

interface Props {
  progress_text: string;
  progress: number;
  color: string;
}

const ProgressBar: React.FC<Props> = (props) => {
  const { progress, progress_text, color } = props;

  const styles = {
    backgroundColor: `${color}`,
    width: `${progress}%`,
  };

  return (
    <>
      <div className={"progress"}>
        <div
          className={"progress-bar"}
          style={styles}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {progress_text}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
