"use client";

import { useState } from "react";
import styles from "./create.module.css";
import { Rate } from "antd";

export default function BonusReviewForm() {
  const [formData, setFormData] = useState({
    employee_id: "",
    jobTitle: "",
    supervisor: "",
    department: "",
    jobDuties: "",
    performanceSummary: "",
    sections: {
      planning: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      productivity: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      quality: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      knowledge: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      innovation: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      peerComm: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      teamRel: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      writing: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      oralComm: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      selfImprovement: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
    },
    otherCriteria: "",
    futureGoals: "",
    overallSummary: "",
    employeeComments: "",
    managerComments: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  console.log(formData, "formdata");

  const handleSectionChange = (section, role, key, value) => {
    setFormData((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          [`${role}${key}`]: value,
        },
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      alert("Submitted Successfully!");
    } catch (err) {
      alert("Error submitting form.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Bonus Review Form</h1>
      <div className={styles.row}>
        <div className={styles.w_50}>
          <p>Employee Id</p>
          <input
            type="text"
            className={styles.input}
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={(e) => handleChange("employeeId", e.target.value)}
          />
        </div>
        <div className={styles.w_50}>
          <p>Job Title</p>
          <input
            type="text"
            placeholder="Job Title"
            value={formData.jobTitle}
            className={styles.input}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.w_50}>
          <p>Supervisor/Manager</p>
          <input
            type="text"
            className={styles.input}
            placeholder="Supervisor/Manager"
            value={formData.supervisor}
            onChange={(e) => handleChange("supervisor", e.target.value)}
          />
        </div>
        <div className={styles.w_50}>
          <p>Department</p>
          <input
            type="text"
            placeholder="Department"
            className={styles.input}
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
          />
        </div>
      </div>

      <div>
        <p>
          Describe the Job Duties, Goals, and Responsibilities for the Review
          Period:
        </p>
        <textarea
          placeholder="Type your answer here..."
          className={styles.input}
          value={formData.jobDuties}
          onChange={(e) => handleChange("jobDuties", e.target.value)}
        />
      </div>
      <div>
        <p>
          Summarize the Performance Results. Indicate Whether the Goals Were
          Exceeded, Achieved, or Not Met
        </p>
        <textarea
          placeholder="Type your answer here..."
          className={styles.input}
          value={formData.performanceSummary}
          onChange={(e) => handleChange("performanceSummary", e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>1. Planning</h3>
          <p>
            • Effective in planning to meet future needs. <br />
            • Foresight in recognizing situations that could cause problems in
            areas of responsibility. <br />• Foresees changes and trends
            relevant to area of responsibility.
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on Planning"
            value={formData.sections.planning.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "planning",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <select
                value={formData.sections.planning.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "planning",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.planning.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "planning",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>2. Productivity</h3>
          <p>
            • Completion of assignments in time allocated or less. <br />
            • Quantity of acceptable work produced such as numbers of projects,
            reports, etc. <br />• Attainment of conclusive and measurable
            results.
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on Productivity"
            value={formData.sections.productivity.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "productivity",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.productivity.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "productivity",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.productivity.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "productivity",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>3. Quality</h3>
          <p>
            • Completion of assignments in time allocated or less. <br />
            • Completing high quality work according to specifications. <br />•
            The extent that standards and procedures are thoroughly followed.{" "}
            <br />
            • The completeness of record keeping or documentation. <br />
            • Adequacy of attention to details. <br />• Attainment of conclusive
            and measurable results.
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on Quality"
            value={formData.sections.quality.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "quality",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.quality.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "quality",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.quality.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "quality",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>4. Knowledge</h3>
          <p>
            • Technical knowledge. <br /> • Displays knowledge and expertise of
            sound management practices. <br />• Extends efforts toward personal
            improvement and growth of job knowledge.
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on knowledge"
            value={formData.sections.knowledge.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "knowledge",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.knowledge.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "knowledge",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.knowledge.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "knowledge",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div>
          <h3>5. Innovation And Creativity</h3>
          <p>
            • Generating workable ideas, concepts, and techniques <br /> •
            Willingness to attempt new approaches <br /> • Simplifying and/or
            improving procedures, and processes
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on innovation"
            value={formData.sections.innovation.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "innovation",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.innovation.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "innovation",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.innovation.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "innovation",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>6. Peer Communication and Working Relationships</h3>
          <p>
            • Demonstrates skill in communicating with others verbally and in
            writing (conducting meets, reports speaking). <br /> • Maintains
            good working relationships and cooperation with other department
            members.
            <br />• Uses appropriate assertiveness in expressing and advocating
            points of view. <br /> • Maintains the respect of others. <br /> •
            Keeps others informed of things they need to know. <br /> • Uses
            feedback to improve organization.
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on peerComm"
            value={formData.sections.peerComm.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "peerComm",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.peerComm.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "peerComm",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.peerComm.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "peerComm",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>7. Team Relationships</h3>
          <p>
            • Effectiveness and participation in the work team <br /> • Gaining
            the respect of others <br /> • Influencing others and selling ideas
            • Help maintain and build team environment <br /> • Supporting
            others when necessary
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on teamRel"
            value={formData.sections.teamRel.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "teamRel",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.teamRel.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "teamRel",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.teamRel.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "teamRel",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>8. Writing</h3>
          <p>
            ∙ Writing concise, easily read reports, technical articles,
            correspondence, etc. <br /> ∙ Preparing written recommendations that
            can be readily understood by others <br /> ∙ Submitting progress
            reports on a timely basis
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on writing"
            value={formData.sections.writing.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "writing",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.writing.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "writing",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.writing.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "writing",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>9. Oral Communication</h3>
          <p>
            ∙ Articulates ideas in a clear, concise manner <br /> ∙ Skill in
            preparing and giving presentations before groups <br /> ∙ Displaying
            appropriate assertiveness when advocating point of view
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on oralComm"
            value={formData.sections.oralComm.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "oralComm",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.oralComm.employeeRating}
                onChange={(e) =>
                  handleSectionChange(
                    "oralComm",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.oralComm.managerRating}
                onChange={(e) =>
                  handleSectionChange(
                    "oralComm",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.w_50}>
          <h3>10. Self-Improvement</h3>
          <p>
            ∙ Responding to manager's counseling and feedback <br /> ∙
            Attempting to keep knowledge current in their field
          </p>
        </div>
        <div className={styles.container_right}>
          <textarea
            placeholder="Comments on selfImprovement"
            value={formData.sections.selfImprovement.employeeComment}
            className={styles.textarea}
            onChange={(e) =>
              handleSectionChange(
                "selfImprovement",
                "employee",
                "Comment",
                e.target.value
              )
            }
          />
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating:</label>
              <select
                value={formData.sections.selfImprovement}
                onChange={(e) =>
                  handleSectionChange(
                    "selfImprovement",
                    "employee",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating:</label>
              <select
                value={formData.sections.selfImprovement}
                onChange={(e) =>
                  handleSectionChange(
                    "selfImprovement",
                    "manager",
                    "Rating",
                    e.target.value
                  )
                }
                className={styles.select}
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <p>Other Performance Criteria:</p>
      <textarea
        placeholder="Type your answer here.."
        value={formData.otherCriteria}
        className={styles.textarea}
        onChange={(e) => handleChange("otherCriteria", e.target.value)}
      />
      <p>Future Goals and Performance Development Objectives:</p>
      <textarea
        placeholder="Type your answer here.."
        value={formData.futureGoals}
        className={styles.textarea}
        onChange={(e) => handleChange("futureGoals", e.target.value)}
      />
      <p>Summary of Overall Performance:</p>
      <textarea
        placeholder="Type your answer here.."
        value={formData.overallSummary}
        className={styles.textarea}
        onChange={(e) => handleChange("overallSummary", e.target.value)}
      />
      <p>Employee Comments:</p>
      <textarea
        placeholder="Type your answer here.."
        value={formData.employeeComments}
        className={styles.textarea}
        onChange={(e) => handleChange("employeeComments", e.target.value)}
      />
      <p>Manager Comments:</p>
      <textarea
        placeholder="Type your answer here.."
        value={formData.managerComments}
        className={styles.textarea}
        onChange={(e) => handleChange("managerComments", e.target.value)}
      />

      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
