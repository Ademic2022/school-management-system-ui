// Flattens a DRF error body into one line, e.g.
// {"date": ["Attendance cannot be marked for a future date."]} -> "date: Attendance cannot be marked for a future date."
// {"records": {"0": {"status": ["\"HOLIDAY\" is not a valid choice."]}}} -> "records 0 status: "HOLIDAY" is not a valid choice."
const flatten = (value, path) => {
  if (Array.isArray(value)) {
    return value.flatMap((item) => flatten(item, path));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, item]) =>
      flatten(item, key === "detail" || key === "non_field_errors" ? path : [...path, key])
    );
  }
  return [path.length ? `${path.join(" ")}: ${value}` : String(value)];
};

export const apiErrorMessage = (errorResponse, fallback) => {
  if (!errorResponse?.data) {
    return fallback;
  }
  return flatten(errorResponse.data, []).join(" ") || fallback;
};
