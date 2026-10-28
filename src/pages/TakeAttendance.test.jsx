import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import TakeAttendance from "./TakeAttendance";
import requestHandler from "../apiCalls/requestHandler";
import { CORE } from "../apiCalls/endpoints";
import { successToast } from "../components/utils/toastUtils";

// Factory mock so the real module (and axios, which CRA's Jest can't parse as ESM) is never loaded
jest.mock("../apiCalls/requestHandler", () => ({ __esModule: true, default: jest.fn() }));
jest.mock("../components/utils/userContext", () => ({
  useUser: () => ({ userStatus: { isApproved: true } }),
}));
jest.mock("../components/utils/toastUtils", () => ({
  successToast: jest.fn(),
  errorToast: jest.fn(),
}));

const classrooms = [{ id: 1, title: "SENIOR SECONDARY SCHOOL 1", stream: "A" }];
const students = [
  { id: 11, registration_number: "R11", user: { first_name: "Jane", last_name: "Doe" } },
  { id: 12, registration_number: "R12", user: { first_name: "John", last_name: "Smith" } },
];

const mockApi = (savedRecords) => {
  requestHandler.mockImplementation(async (method, url, data) => {
    if (url === CORE.CLASSROOM) return [classrooms];
    if (url.startsWith(CORE.GET_CLASSROOM_STUDENTS(1))) return [students];
    if (url.startsWith(CORE.ATTENDANCE + "?")) return [savedRecords];
    if (url === CORE.BULK_MARK_ATTENDANCE) return [{ created: 2, updated: 0, records: [] }];
    throw new Error(`unexpected ${method} ${url}`);
  });
};

const loadClass = async () => {
  render(<TakeAttendance />);
  fireEvent.mouseDown(screen.getByLabelText(/Classroom/));
  fireEvent.click(await screen.findByText("SENIOR SECONDARY SCHOOL 1 (Stream A)"));
  fireEvent.click(screen.getByRole("button", { name: "Load Class" }));
  await screen.findByText("Jane Doe");
};

afterEach(() => jest.clearAllMocks());

test("loads the class roster and submits every student's status", async () => {
  mockApi([]);
  await loadClass();

  expect(screen.getAllByText("PRESENT")).toHaveLength(2);
  fireEvent.click(screen.getByRole("button", { name: "Submit Record" }));

  await waitFor(() =>
    expect(requestHandler).toHaveBeenCalledWith("post", CORE.BULK_MARK_ATTENDANCE, {
      classroom: 1,
      date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      records: [
        { student: 11, status: "PRESENT" },
        { student: 12, status: "PRESENT" },
      ],
    })
  );
  expect(successToast).toHaveBeenCalledWith("Attendance saved: 2 new, 0 updated.");
  // Disabled after a successful save until a row changes, so it can't be double-submitted
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Submit Record" })).toBeDisabled()
  );
});

test("pre-fills statuses already saved for that day", async () => {
  mockApi([{ student: 12, status: "LATE" }]);
  await loadClass();

  const johnRow = screen.getByText("John Smith").closest('[role="row"]');
  expect(within(johnRow).getByText("LATE")).toBeInTheDocument();
  expect(screen.getByText(/already taken for this day/)).toBeInTheDocument();
});
