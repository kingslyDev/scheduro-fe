import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = ({ value }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 rounded-lg p-2 md:p-4 w-full">
      {/* Progress Bar */}
      <div className="flex-1 w-full text-center md:text-left">
        <div className="text-xs md:text-sm font-medium text-gray-700">{value}% It will be complete soon</div>
        <div className="w-full md:w-36 h-2 bg-blue-300 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="w-12 h-12 mt-2 md:mt-0 md:ml-2">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            textSize: "32px",
            textColor: "#1E3A8A",
            pathColor: "#1E3A8A",
            trailColor: "#BFDBFE",
          })}
        />
      </div>
    </div>
  );
};

export default Progress;