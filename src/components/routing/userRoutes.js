// Define role-based route configurations
import {
  AdminDashboard,
  Attendance,
  AllUsers,
  CheckResult,
  Classmates,
  Classrooms,
  Dashboard,
  ExamResult,
  ExamSchedule,
  GeneralResult,
  Inbox,
  LeaveRequests,
  NoticeBoard,
  RecordStudentResult,
  Reviews,
  SalesAnalytics,
  Settings,
  StudentsTeachers,
  Leave,
  StudentLeaveApply,
  Subjects,
  GeneralSettings,
  TakeAttendance,
  TeachersAddReview,
  TeachersReviews,
  Timetable,
  Transactions,
  UserDetails,
  ViewAttendance,
  TeachersDetails,
  StudentDetails,
  InProgressPage,
  } from '../../pages';
  
export const roleRoutes = {
    Admin: [
      { id: "admin-dashboard", path: "/", element: <AdminDashboard /> },
      { id: "admin-settings", path: "/settings", element: <Settings /> },
      { id: "admin-inbox", path: "/inbox", element: <Inbox /> },
      { id: "admin-results", path: "/results", element: <CheckResult /> },
      { id: "admin-results", path: "/general-settings", element: <GeneralSettings /> },
      { id: "admin-teachers-details", path: "/teacher/:id", element: <TeachersDetails /> },
      { id: "admin-student-details", path: "/student/:id", element: <StudentDetails /> },
      { id: "admin-session-settings", path: "/session-settings", element: <InProgressPage pageName='Session Settings' /> },
      { id: "admin-notification-settings", path: "/notification-settings", element: <InProgressPage pageName='Notification Settings' /> },
      { id: "admin-admission-report", path: "/admission-report", element: <InProgressPage pageName='Admission Report' /> },
      { id: "admin-attendance-report", path: "/attendance-report", element: <InProgressPage pageName='Attendance Report' /> },
      { id: "admin-students-history", path: "/students-history", element: <InProgressPage pageName='Student History' /> },
      { id: "admin-teachers-history", path: "/teachers-history", element: <InProgressPage pageName='Teachers History' /> },
      { id: "admin-teachers-reviews", path: "/teachers-reviews", element: <InProgressPage pageName='Teachers-Reviews' /> },
      { id: "admin-students-reviews", path: "/students-reviews", element: <InProgressPage pageName='Students-Reviews' /> },
      { id: "admin-notifications", path: "/notifications", element: <NoticeBoard /> },
      { id: "admin-notice-board", path: "/notice-board", element: <InProgressPage pageName='Notice-Board' /> },
      { id: "admin-send-email", path: "/send-email", element: <InProgressPage pageName='Send-Email' /> },
      { id: "admin-notification-email-logs", path: "/notification-email-logs", element: <InProgressPage pageName='N-E-L' /> },
      { id: "admin-student-certificate", path: "/student-certificate", element: <InProgressPage pageName='Student-Certificate' /> },
      { id: "admin-generate-student-certificate", path: "/generate-student-certificate", element: <InProgressPage pageName='G-S-T' /> },
      { id: "admin-student-id-card", path: "/student-id-card", element: <InProgressPage pageName='S-I-D' /> },
      { id: "admin-generate-student-id-card", path: "/generate-student-id-card", element: <InProgressPage pageName='G-S-I-D' /> },
      { id: "admin-staff-id-card", path: "/staff-id-card", element: <InProgressPage pageName='Staff ID Card' /> },
      { id: "admin-exam-schedules", path: "/exam-schedules", element: <InProgressPage pageName='Exam Schedules' /> },
      { id: "admin-students", path: "/students", element: <InProgressPage pageName='Students' /> },
      { id: "admin-teachers", path: "/teachers", element: <InProgressPage pageName='Teachers' /> },
      { id: "admin-parent", path: "/parent", element: <InProgressPage pageName='Parent' /> },
      { id: "admin-timetable", path: "/timetable", element: <InProgressPage pageName='TimeTable' /> },
      { id: "admin-in-progress", path: "/users", element: <AllUsers /> },
    ],
    Teacher: [
      { id: "teacher-dashboard", path: "/", element: <Dashboard /> },
      { id: "teacher-subjects", path: "/subjects", element: <Subjects /> },
      { id: "teacher-settings", path: "/settings", element: <Settings /> },
      { id: "teacher-notice-board", path: "/notice_board", element: <NoticeBoard /> },
      { id: "teacher-attendance", path: "/attendance", element: <Attendance /> },
      { id: "teacher-timetable", path: "/timetable", element: <Timetable /> },
      { id: "teacher-leave", path: "/leave", element: <Leave /> },
      { id: "teacher-leave-apply", path: "/leave/apply", element: <StudentLeaveApply /> },
      { id: "teacher-inbox", path: "/inbox", element: <Inbox /> },
      { id: "teacher-students", path: "/students", element: <StudentsTeachers /> },
      { id: "teacher-classrooms", path: "/classrooms", element: <Classrooms /> },
      { id: "teacher-results", path: "/results", element: <CheckResult /> },
      { id: "teacher-results", path: "/record_result", element: <RecordStudentResult /> },
      { id: "teacher-exam-schedules", path: "/exam_schedules", element: <ExamSchedule /> },
      { id: "teacher-attendance", path: "/take_attendance", element: <TakeAttendance /> },
      { id: "teacher-view-attendance", path: "/view_attendance", element: <ViewAttendance /> },
      { id: "teacher-leave-requests", path: "/leave_requests", element: <LeaveRequests /> },
      { id: "teacher-single-student", path: "/student/:id", element: <UserDetails /> },
    ],
    
    Student: [
      { id: "student-dashboard", path: "/", element: <Dashboard /> },
      { id: "student-timetable", path: "/timetable", element: <Timetable /> },
      { id: "student-teachers", path: "/teachers", element: <StudentsTeachers /> },
      { id: "student-subjects", path: "/subjects", element: <Subjects /> },
      { id: "student-classmates", path: "/classmates", element: <Classmates /> },
      { id: "student-single-teacher", path: "/teacher/:id", element: <UserDetails /> },
      { id: "student-sales-analytics", path: "/sales/analysis", element: <SalesAnalytics /> },
      { id: "student-exam-result", path: "/exam_result", element: <ExamResult /> },
      { id: "student-attendance", path: "/attendance", element: <Attendance /> },
      { id: "student-transactions", path: "/transactions", element: <Transactions /> },
      { id: "student-leave", path: "/leave", element: <Leave /> },
      { id: "student-leave-apply", path: "/leave/apply", element: <StudentLeaveApply /> },
      { id: "student-reviews", path: "/reviews", element: <Reviews /> },
      { id: "student-settings", path: "/settings", element: <Settings /> },
      { id: "student-inbox", path: "/inbox", element: <Inbox /> },
      { id: "student-exam-schedules", path: "/exam_schedules", element: <ExamSchedule /> },
      { id: "student-results", path: "/results", element: <GeneralResult /> },
      { id: "student-notice-board", path: "/notice_board", element: <NoticeBoard /> },
      { id: "student-teachers-reviews", path: "/teachers_reviews", element: <TeachersReviews /> },
      { id: "student-review-teacher", path: "/review_teacher", element: <TeachersAddReview /> },
      { id: "admin-registration-information", path: "/registration-information", element: <InProgressPage pageName='Reg. Info' /> },
      { id: "admin-fees-breakdown", path: "/fees-breakdown", element: <InProgressPage pageName='Fees Breakdown' /> },
    ],
  };
