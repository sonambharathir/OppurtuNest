export default function AssessmentProgress({ currentIndex, totalCount, skillAreaTitle }) {
  const currentNumber = currentIndex + 1;
  const progressRatio = (currentNumber / totalCount) * 100;

  return (
    <div className="assessment-progress-container" aria-label={`Progress: Question ${currentNumber} of ${totalCount}`}>
      <div className="progress-top-row">
        <div className="progress-text-group">
          <span className="progress-question-counter">
            Question {currentNumber} of {totalCount}
          </span>
          {skillAreaTitle && (
            <span className="progress-area-tag">
              • {skillAreaTitle}
            </span>
          )}
        </div>
        <span className="progress-calm-badge">Self-paced check-in</span>
      </div>

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressRatio}%` }}
        />
      </div>
    </div>
  );
}
