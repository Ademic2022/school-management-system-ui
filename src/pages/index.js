import { lazy } from "react";

// Pages are lazy-loaded so each one is split into its own bundle chunk

export const Dashboard = lazy(() => import("./Dashboard"));
export const AdminDashboard = lazy(() => import("./AdminDashboard"));
export const Analytics = lazy(() => import("./Analytics"));
export const Transactions = lazy(() => import("./Transactions"));
export const Reviews = lazy(() => import("./Reviews"));
export const Settings = lazy(() => import("./Settings"));
export const Inbox = lazy(() => import("./Inbox"));
export const Timetable = lazy(() => import("./Timetable"));
export const StudentsTeachers = lazy(() => import("./StudentsTeachers"));
export const UserDetails = lazy(() => import("./UserDetails"));
export const Subjects = lazy(() => import("./Subjects"));
export const Classmates = lazy(() => import("./Classmates"));
export const SuccessPage = lazy(() => import("./Success"));
export const ExamResult = lazy(() => import("./ExamResult"));
export const ExamSchedule = lazy(() => import("./ExamSchedule"));
export const GeneralResult = lazy(() => import("./GeneralResult"));
export const Leave = lazy(() => import("./Leave"));
export const StudentLeaveApply = lazy(() => import("./StudentLeaveApply"));
export const NoticeBoard = lazy(() => import("./NoticeBoard"));
export const TeachersReviews = lazy(() => import("./TeachersReview"));
export const TeachersAddReview = lazy(() => import("./TeachersAddReview"));
export const ResetLinkSent = lazy(() => import("./ResetLinkSent"));
export const Classrooms = lazy(() => import("./Classrooms"));
export const CheckResult = lazy(() => import("./CheckResult"));
export const RecordStudentResult = lazy(() => import("./RecordStudentResult"));
export const TakeAttendance = lazy(() => import("./TakeAttendance"));
export const ViewAttendance = lazy(() => import("./ViewAttendance"));
export const LeaveRequests = lazy(() => import("./LeaveRequests"));
export const GeneralSettings = lazy(() => import("./GeneralSettings"));
export const TeachersDetails = lazy(() => import("../components/generalSettings/TeachersDetails"));
export const StudentDetails = lazy(() => import("../components/generalSettings/StudentDetails"));
export const InProgressPage = lazy(() => import("./InProgressPage"));
export const AllUsers = lazy(() => import("../components/generalSettings/AllUsers"));
export const ActivationComponent = lazy(() => import("./Activation"));
export const NewPassword = lazy(() => import("./NewPassword"));
