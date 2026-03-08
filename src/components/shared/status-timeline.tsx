const STAGES = [
  { key: "approved",            label: "Submitted" },
  { key: "contacted",            label: "Contacted" },
  { key: "site_visit_scheduled", label: "Site Visit Scheduled" },
  { key: "site_visit_done",      label: "Site Visit Done" },
  { key: "booking_initiated",    label: "Booking Initiated" },
  { key: "down_payment_done",    label: "Down Payment Done" },
  { key: "final_sale_completed", label: "Final Sale Completed" },
];

export default function StatusTimeline2({ status }) {
  const currentIndex = STAGES.findIndex((s) => s.key === status);

  return (
    <div className="p-2">
      <p className="text-sm font-semibold text-gray-700 mb-2">Lead Progress</p>
      <div className="flex flex-col gap-2">
        {STAGES.map((stage, i) => {
          const isCompleted = i <= currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <div key={stage.key} className="flex items-center gap-2">
              {/* Circle */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? "bg-green-500" : "bg-gray-300"}
                  ${isCurrent ? "ring-2 ring-green-300 ring-offset-1" : ""}
                `}
              >
                {isCompleted && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-sm transition-all duration-300
                  ${isCurrent ? "font-bold text-green-700" : ""}
                  ${isCompleted && !isCurrent ? "font-semibold text-gray-800" : ""}
                  ${!isCompleted ? "text-gray-400" : ""}
                `}
              >
                {stage.label}
              </span>

              {/* Current badge */}
              {isCurrent && (
                <span className="ml-1 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                  Current
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}