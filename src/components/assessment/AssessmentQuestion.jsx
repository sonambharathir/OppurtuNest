export default function AssessmentQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrev,
  isLastQuestion,
}) {
  const isAnswered = selectedAnswer !== undefined && selectedAnswer !== null;

  return (
    <div className="assessment-card-panel assessment-question-panel">
      {/* Top Header of Card */}
      <div className="assessment-card-header-tag">
        <div className="question-type-tags">
          <span className="assessment-card-tag-pill">
            Q{questionIndex + 1} • {question.skill}
          </span>
          <span className={`question-badge ${question.type === "confidence" ? "badge-confidence" : "badge-knowledge"}`}>
            {question.type === "confidence" ? "Confidence Check-in" : "Practical Understanding"}
          </span>
        </div>
        <span className="assessment-card-icon">
          {question.type === "confidence" ? "🌿" : "💡"}
        </span>
      </div>

      {/* Question Content */}
      <div className="assessment-question-body">
        <h3 className="assessment-question-text">
          {question.question}
        </h3>

        {/* 3 to 4 Selectable Options */}
        <div className="assessment-options-list" role="radiogroup" aria-label="Question options">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const optionText = typeof option === "string" ? option : option.text;

            return (
              <button
                key={idx}
                type="button"
                className={`assessment-option-item ${isSelected ? "selected" : ""}`}
                onClick={() => onSelectAnswer(idx)}
                role="radio"
                aria-checked={isSelected}
              >
                <span className={`option-selector-circle ${isSelected ? "selected" : ""}`}>
                  {isSelected ? "●" : "○"}
                </span>
                <span className="option-label-text">{optionText}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="assessment-nav-row">
        <button
          type="button"
          className="assessment-secondary-btn"
          onClick={onPrev}
        >
          ← Back
        </button>

        <button
          type="button"
          className="assessment-primary-btn"
          onClick={onNext}
          disabled={!isAnswered}
        >
          {isLastQuestion ? "See My Results →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
