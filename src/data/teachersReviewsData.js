import { Rating } from "@mui/material";
import { Avatar } from "@mui/material";
export const teachersReviewColumn = [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
  },
  {
    accessorKey: "img", //access nested data with dot notation
    header: "Image",
    size: 100,
    Cell: ({ cell }) => (
      <div>
        <Avatar src={cell.getValue()} sx={{ width: 30, height: 30 }}>{cell.row.original.name?.[0]}</Avatar>
      </div>
    ),
  },
  {
    accessorKey: "name", //access nested data with dot notation
    header: "Name",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rating", //normal accessorKey
    header: "Rating",
    Cell: ({ cell, row }) => (
      <Rating
        name="half-rating"
        defaultValue={cell.getValue()}
        precision={0.5}
        readOnly
      />
    ),
  },
];

export const teachersReviewData = [
  {
    id: 1,
    name: "John Smith",
    subject: "English Language",
    email: "johnsmith@example.com",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Jane Doe",
    subject: "Mathematics",
    email: "janedoe@example.com",
    rating: 3.6,
  },
  {
    id: 3,
    name: "Bob Johnson",
    subject: "Geography",
    email: "bobjohnson@example.com",
    rating: 2.8,
  },
  {
    id: 4,
    name: "Alice Williams",
    subject: "Economics",
    email: "alicewilliams@example.com",
    rating: 4.0,
  },
];
