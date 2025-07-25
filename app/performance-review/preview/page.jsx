"use client";

import React, { useEffect, useState } from "react";
import styles from "./preview.module.css";
import { useSearchParams } from "next/navigation";
import { getManagersList, getPerformanceEditData } from "@/api/fetchClient";
import { Rate } from "antd";

function PreviewReviewForm() {
  const searchParams = useSearchParams();
  const [managers, setManagers] = useState([]);
  const employeeId = searchParams.get("employeeId");
  const [TableData, setTableData] = useState([]);
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
    const fetchManagers = async () => {
      try {
        const resp = await getManagersList();
        if (resp?.status === 200) {
          setManagers(resp?.data);
        } else {
        }
      } catch (error) {}
    };
    fetchManagers();
  }, []);

  const manager = managers.find((m) => m.id == TableData?.supervisor);

  const headerSection = [
    {
      title: "Employee Name:",
      data: TableData?.employee_name,
    },
    {
      title: "Employee ID:",
      data: TableData?.employee_id,
    },
    {
      title: "Supervisor/Manager:",
      data: manager?.name,
    },
    {
      title: "Job Title:",
      data: TableData?.job_title,
    },
  ];

  return (
    <div className={styles.align_center}>
      <div className={styles.container}>
        <h3>ANNUAL PERFORMANCE REVIEW</h3>
        <div className={styles.main_container}>
          <div className={styles.header_container}>
            <div className={styles.header_section}>
              {headerSection.map((item) => {
                return (
                  <div className={styles.small_container}>
                    <label>{item?.title}</label>
                    <br />
                    <p className={styles.label_heading}>{item?.data}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>
              Describe the Job Duties, Goals, and Responsibilities for the
              Review Period:
            </label>
            <div className={styles.text_desc}>{TableData.jobDuties}</div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>
              Summarize the Performance Results. Indicate Whether the Goals Were
              Exceeded, Achieved, or Not Met
            </label>
            <div className={styles.text_desc}>
              {TableData.performanceSummary}
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.label}>
              Evaluate and describe performance and how work was accomplished
              using the following Performance Groupings. Summarize the overall
              performance for each area. Write "NA" in the box where the
              grouping does not apply to this position. The sub-headings for
              each group are partial suggested criteria only, and are not
              intended to be all-inclusive. The comments area for each should be
              used for expansion, explanation, description of strengths and/or
              problem area for each grouping. Specific improvement actions
              however, should be described in the next section. On a 5 point
              rating scale <br /> 1- Significantly below performance standards{" "}
              <br />
              2- Barely achieves performance standards <br />
              3- Achieves performance standards <br /> 4- Exceeds performance
              standards <br /> 5- Significantly exceeds performance standards
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>1. Planning</label>
                <div>
                  • Effective in planning to meet future needs. <br />
                  • Foresight in recognizing situations that could cause
                  problems in areas of responsibility. <br />• Foresees changes
                  and trends relevant to area of responsibility.
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.planning?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.planning?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.planning?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.planning?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.planning?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>2. Productivity</label>
                <div>
                  • Completion of assignments in time allocated or less. <br />
                  • Quantity of acceptable work produced such as numbers of
                  projects, reports, etc. <br />• Attainment of conclusive and
                  measurable results.
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.productivity?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.productivity?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.productivity?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.productivity?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.productivity?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>3. Quality</label>
                <div>
                  • • Completion of assignments in time allocated or less.{" "}
                  <br />• Completing high quality work according to
                  specifications. <br />
                  • The extent that standards and procedures are thoroughly
                  followed. <br />
                  • The completeness of record keeping or documentation. <br />
                  • Adequacy of attention to details. <br />• Attainment of
                  conclusive and measurable results.
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.quality?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.quality?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.quality?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={Number(TableData?.sections?.quality?.managerRating) || 0}
                className={`custom-rate-preview ${
                  TableData?.sections?.quality?.managerRating > 0 ? "rated" : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>4. Knowledge</label>
                <div>
                  • Technical knowledge. <br /> • Displays knowledge and
                  expertise of sound management practices. <br />• Extends
                  efforts toward personal improvement and growth of job
                  knowledge.
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.knowledge?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.knowledge?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.knowledge?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.knowledge?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.knowledge?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>5. Innovation And Creativity</label>
                <div>
                  • Generating workable ideas, concepts, and techniques <br /> •
                  Willingness to attempt new approaches <br /> • Simplifying
                  and/or improving procedures, and processes
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.innovation?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.innovation?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.innovation?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.innovation?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.innovation?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>6. Peer Communication and Working Relationships</label>
                <div>
                  • Demonstrates skill in communicating with others verbally and
                  in writing (conducting meets, reports speaking). <br /> •
                  Maintains good working relationships and cooperation with
                  other department members.
                  <br />• Uses appropriate assertiveness in expressing and
                  advocating points of view. <br /> • Maintains the respect of
                  others. <br /> • Keeps others informed of things they need to
                  know. <br /> • Uses feedback to improve organization.
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.peerComm?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.peerComm?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.peerComm?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.peerComm?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.peerComm?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>7. Team Relationships</label>
                <div>
                  • Effectiveness and participation in the work team <br /> •
                  Gaining the respect of others <br /> • Influencing others and
                  selling ideas • Help maintain and build team environment{" "}
                  <br /> • Supporting others when necessary
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.teamRel?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.teamRel?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.teamRel?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={Number(TableData?.sections?.teamRel?.managerRating) || 0}
                className={`custom-rate-preview ${
                  TableData?.sections?.teamRel?.managerRating > 0 ? "rated" : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>8. Writing</label>
                <div>
                  ∙ Writing concise, easily read reports, technical articles,
                  correspondence, etc. <br /> ∙ Preparing written
                  recommendations that can be readily understood by others{" "}
                  <br /> ∙ Submitting progress reports on a timely basis
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.writing?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.writing?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.writing?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={Number(TableData?.sections?.writing?.managerRating) || 0}
                className={`custom-rate-preview ${
                  TableData?.sections?.writing?.managerRating > 0 ? "rated" : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>9. Oral Communication</label>
                <div>
                  ∙ Articulates ideas in a clear, concise manner <br /> ∙ Skill
                  in preparing and giving presentations before groups <br /> ∙
                  Displaying appropriate assertiveness when advocating point of
                  view
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.oralComm?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.oralComm?.employeeRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.oralComm?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.oralComm?.managerRating) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.oralComm?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.flex_container}>
              <div className={styles.left_container}>
                <label>10. Self-Improvement</label>
                <div>
                  ∙ Responding to manager's counseling and feedback <br /> ∙
                  Attempting to keep knowledge current in their field
                </div>
              </div>
              <div className={styles.right_container}>
                {TableData?.sections?.selfImprovement?.employeeComment}
              </div>
            </div>
          </div>
          <div className={styles.ratingRow}>
            <div className={styles.rating_container}>
              <label>Employee Rating</label>
              <Rate
                allowHalf
                value={
                  Number(
                    TableData?.sections?.selfImprovement?.employeeRating
                  ) || 0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.selfImprovement?.employeeRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
            <div className={styles.rating_container}>
              <label>Manager Rating</label>

              <Rate
                allowHalf
                value={
                  Number(TableData?.sections?.selfImprovement?.managerRating) ||
                  0
                }
                className={`custom-rate-preview ${
                  TableData?.sections?.selfImprovement?.managerRating > 0
                    ? "rated"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>Other Performance Criteria:</label>
            <div className={styles.text_desc}>{TableData.otherCriteria}</div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>
              Future Goals and Performance Development Objectives:
            </label>
            <div className={styles.text_desc}>{TableData.futureGoals}</div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>
              Summary of Overall Performance:
            </label>
            <div className={styles.text_desc}>{TableData.overallSummary}</div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>Employee Comments:</label>
            <div className={styles.text_desc}>{TableData.employeeComments}</div>
          </div>
          <div className={styles.sub_container}>
            <label className={styles.label}>Manager Comments:</label>
            <div className={styles.text_desc}>{TableData.managerComments}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewReviewForm;
