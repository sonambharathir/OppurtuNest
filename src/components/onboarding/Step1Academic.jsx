import OnboardingNavigation from "./OnboardingNavigation";

export default function Step1Academic({
  formData,
  onChange,
  onNext,
  onCancel,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onNext();
  };

  return (
    <section className="academic-card">
      <div className="academic-card-heading">
        <div>
          <span className="card-step-label">STEP 1 OF 7</span>
          <h2>Academic Information</h2>
          <p>This helps us understand your current academic stage.</p>
        </div>
        <div className="academic-leaf">🌿</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-field full-width">
          <label htmlFor="college">College / University</label>
          <input
            id="college"
            name="college"
            type="text"
            value={formData.college}
            onChange={onChange}
            placeholder="Enter your college or university"
            required
          />
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="degree">Degree</label>
            <select
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={onChange}
              required
            >
              <option value="">Select degree</option>
              <option value="B.Tech">B.Tech</option>
              <option value="B.E.">B.E.</option>
              <option value="B.Sc">B.Sc</option>
              <option value="BCA">BCA</option>
              <option value="BBA">BBA</option>
              <option value="M.Tech">M.Tech</option>
              <option value="M.E.">M.E.</option>
              <option value="M.Sc">M.Sc</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="branch">Branch / Specialization</label>
            <input
              id="branch"
              name="branch"
              type="text"
              value={formData.branch}
              onChange={onChange}
              placeholder="e.g. Computer Science"
              required
            />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="currentYear">Current Year</label>
            <select
              id="currentYear"
              name="currentYear"
              value={formData.currentYear}
              onChange={onChange}
              required
            >
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="5">5th Year</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="semester">Current Semester</label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={onChange}
              required
            >
              <option value="">Select semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
        </div>

        <div className="form-field graduation-field">
          <label htmlFor="graduationYear">Graduation Year</label>
          <select
            id="graduationYear"
            name="graduationYear"
            value={formData.graduationYear}
            onChange={onChange}
            required
          >
            <option value="">Select graduation year</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
            <option value="2031">2031</option>
            <option value="2032">2032</option>
          </select>
        </div>

        <OnboardingNavigation
          onBack={onCancel}
          backLabel="Cancel"
          nextLabel="Continue"
          isSubmit={true}
        />
      </form>
    </section>
  );
}
