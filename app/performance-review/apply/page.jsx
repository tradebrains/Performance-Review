"use client";

import { useEffect, useState } from "react";
import styles from "./create.module.css";
import { message, Rate } from "antd";
import {
  getPerformanceData,
  getPerformanceEditData,
  postPerformanceReviewData,
  putPerformanceReviewData,
} from "@/api/fetchClient";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function BonusReviewForm() {
  const [TableData, setTableData] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    jobTitle: "",
    supervisor: "",
    department: "",
    jobDuties: "",
    performanceSummary: "",
    sections: {
      planning: { employeeRating: "", managerRating: "", employeeComment: "" },
      productivity: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      quality: { employeeRating: "", managerRating: "", employeeComment: "" },
      knowledge: { employeeRating: "", managerRating: "", employeeComment: "" },
      innovation: {
        employeeRating: "",
        managerRating: "",
        employeeComment: "",
      },
      peerComm: { employeeRating: "", managerRating: "", employeeComment: "" },
      teamRel: { employeeRating: "", managerRating: "", employeeComment: "" },
      writing: { employeeRating: "", managerRating: "", employeeComment: "" },
      oralComm: { employeeRating: "", managerRating: "", employeeComment: "" },
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
    }
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const employeeId = searchParams.get("employeeId");

  useEffect(() => {
    if (employeeId) {
      const fetchTableData = async () => {
        try {
          const res = await getPerformanceEditData(employeeId);
          setTableData(res?.data);
        } catch (err) {
          console.error("Failed to fetch leads:", err);
        } finally {
        }
      };

      fetchTableData();
    }
  }, [employeeId]);

  useEffect(() => {
    if (TableData) {
      setFormData({
        employee_id: TableData?.employee_id || "",
        jobTitle: TableData?.job_title || "",
        supervisor: TableData?.supervisor || "",
        department: TableData?.department || "",
        jobDuties: TableData?.jobDuties || "",
        performanceSummary: TableData?.performanceSummary || "",
        sections: {
          planning: {
            employeeRating: TableData?.sections?.planning?.employeeRating || "",
            managerRating: TableData?.sections?.planning?.managerRating || "",
            employeeComment:
              TableData?.sections?.planning?.employeeComment || "",
          },
          productivity: {
            employeeRating:
              TableData?.sections?.productivity?.employeeRating || "",
            managerRating:
              TableData?.sections?.productivity?.managerRating || "",
            employeeComment:
              TableData?.sections?.productivity?.employeeComment || "",
          },
          quality: {
            employeeRating: TableData?.sections?.quality?.employeeRating || "",
            managerRating: TableData?.sections?.quality?.managerRating || "",
            employeeComment:
              TableData?.sections?.quality?.employeeComment || "",
          },
          knowledge: {
            employeeRating:
              TableData?.sections?.knowledge?.employeeRating || "",
            managerRating: TableData?.sections?.knowledge?.managerRating || "",
            employeeComment:
              TableData?.sections?.knowledge?.employeeComment || "",
          },
          innovation: {
            employeeRating:
              TableData?.sections?.innovation?.employeeRating || "",
            managerRating: TableData?.sections?.innovation?.managerRating || "",
            employeeComment:
              TableData?.sections?.innovation?.employeeComment || "",
          },
          peerComm: {
            employeeRating: TableData?.sections?.peerComm?.employeeRating || "",
            managerRating: TableData?.sections?.peerComm?.managerRating || "",
            employeeComment:
              TableData?.sections?.peerComm?.employeeComment || "",
          },
          teamRel: {
            employeeRating: TableData?.sections?.teamRel?.employeeRating || "",
            managerRating: TableData?.sections?.teamRel?.managerRating || "",
            employeeComment:
              TableData?.sections?.teamRel?.employeeComment || "",
          },
          writing: {
            employeeRating: TableData?.sections?.writing?.employeeRating || "",
            managerRating: TableData?.sections?.writing?.managerRating || "",
            employeeComment:
              TableData?.sections?.writing?.employeeComment || "",
          },
          oralComm: {
            employeeRating: TableData?.sections?.oralComm?.employeeRating || "",
            managerRating: TableData?.sections?.oralComm?.managerRating || "",
            employeeComment:
              TableData?.sections?.oralComm?.employeeComment || "",
          },
          selfImprovement: {
            employeeRating:
              TableData?.sections?.selfImprovement?.employeeRating || "",
            managerRating:
              TableData?.sections?.selfImprovement?.managerRating || "",
            employeeComment:
              TableData?.sections?.selfImprovement?.employeeComment || "",
          },
        },
        otherCriteria: TableData?.otherCriteria || "",
        futureGoals: TableData?.futureGoals || "",
        overallSummary: TableData?.overallSummary || "",
        employeeComments: TableData?.employeeComments || "",
        managerComments: TableData?.managerComments || "",
      });
    }
  }, [TableData]);

  const postPerformanceReview = async () => {
    const data = {
      employee_id: formData.employee_id,
      job_title: formData.jobTitle,
      supervisor: formData.supervisor,
      department: formData.department,
      jobDuties: formData.jobDuties,
      performanceSummary: formData.performanceSummary,

      planning_employee_rating: formData.sections.planning.employeeRating,
      planning_manager_rating: formData.sections.planning.managerRating,
      productivity_comments: formData.sections.productivity.employeeComment,
      productivity_employee_rating:
        formData.sections.productivity.employeeRating,
      productivity_manager_rating: formData.sections.productivity.managerRating,
      quality_comments: formData.sections.quality.employeeComment,
      quality_employee_rating: formData.sections.quality.employeeRating,
      quality_manager_rating: formData.sections.quality.managerRating,
      knowledge_comments: formData.sections.knowledge.employeeComment,
      knowledge_employee_rating: formData.sections.knowledge.employeeRating,
      knowledge_manager_rating: formData.sections.knowledge.managerRating,
      innovation_comments: formData.sections.innovation.employeeComment,
      innovation_employee_rating: formData.sections.innovation.employeeRating,
      innovation_manager_rating: formData.sections.innovation.managerRating,
      peerComm_comments: formData.sections.peerComm.employeeComment,
      peerComm_employee_rating: formData.sections.peerComm.employeeRating,
      peerComm_manager_rating: formData.sections.peerComm.managerRating,
      teamRel_comments: formData.sections.teamRel.employeeComment,
      teamRel_employee_rating: formData.sections.teamRel.employeeRating,
      teamRel_manager_rating: formData.sections.teamRel.managerRating,
      writing_comments: formData.sections.writing.employeeComment,
      writing_employee_rating: formData.sections.writing.employeeRating,
      writing_manager_rating: formData.sections.writing.managerRating,
      oralComm_comments: formData.sections.oralComm.employeeComment,
      oralComm_employee_rating: formData.sections.oralComm.employeeRating,
      oralComm_manager_rating: formData.sections.oralComm.managerRating,
      selfImprovement_comments:
        formData.sections.selfImprovement.employeeComment,
      selfImprovement_employee_rating:
        formData.sections.selfImprovement.employeeRating,
      selfImprovement_manager_rating:
        formData.sections.selfImprovement.managerRating,
      otherCriteria: formData.otherCriteria,
      futureGoals: formData.futureGoals,
      overallSummary: formData.overallSummary,
      employeeComments: formData.employeeComments,
      managerComments: formData.managerComments,
      planning_comments: formData.sections.planning.employeeComment,
    };
    if (employeeId) {
      try {
        const resp = await putPerformanceReviewData(employeeId, data);

        if (resp?.message === "Performance review form updated successfully.") {
          message.success(resp?.message);
          router.push("/performance-review");
        } else {
          message.error("Failed to submit Performance Review.");
        }
      } catch (error) {
        if (error.response) {
          message.error("Failed to submit Performance Review.");
        } else {
          message.error("Something went wrong.");
        }
      }
    } else {
      await postPerformanceReviewData(data).then((resp) => {
        if (resp?.message === "Performance review form Created successfully.") {
          message.success(resp?.message);
          router.push("/performance-review");
        } else {
          message.error("Failed to submit Performance Review.");
        }
      });
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
            value={formData.employee_id}
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
                value={formData?.sections?.selfImprovement?.managerRating}
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
                value={formData?.sections?.selfImprovement?.managerRating}
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

      <div className={styles.buttonContainer}>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={postPerformanceReview}>
            Save Draft
          </button>
        </div>
        <div className={styles.buttonGroup}>
          <button className={styles.button} onClick={postPerformanceReview}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
