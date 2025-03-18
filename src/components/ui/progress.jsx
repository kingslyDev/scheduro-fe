import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = ({ value }) => {
  return (
    <div className="flex items-center justify-between bg-blue-100 rounded-lg p-2">
      {/* Progress Bar */}
      <div className="flex-1">
        <div className="text-xs font-medium text-gray-700">{value}% It will be complete soon</div>
        <div className="w-36 h-2 bg-blue-300 rounded-full overflow-hidden mt-1">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>

      {/* Circular Progress (Kecil di Pojok Kanan) */}
      <div className="w-12 h-12 ml-2">
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
