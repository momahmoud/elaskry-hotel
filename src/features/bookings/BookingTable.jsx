import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useCabins } from "./useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { isLoading, error, bookings, count } = useCabins();

  if (isLoading) return <Spinner />;
  if (error) return "An error has occurred: " + error.message;

  //client side filter
  // const filterValue = searchParams.get("status") || "all";
  // let filteredBookings =
  //   filterValue === "all"
  //     ? bookings
  //     : bookings.filter((booking) => {
  //         if (filterValue === "checked-out")
  //           return booking.status === "checked-out";
  //         if (filterValue === "checked-in")
  //           return booking.status === "checked-in";
  //         if (filterValue === "unconfirmed")
  //           return booking.status === "unconfirmed";
  //         return true;
  //       });

  // const sortValue = searchParams.get("sortBy") || "startDate-asc";
  // const [field, order] = sortValue.split("-");
  // const sortOrder = order === "asc" ? 1 : -1;
  // const sortedBookings = filteredBookings.sort(
  //   (a, b) => (a[field] - b[field]) * sortOrder
  // );

  return (
    <Menus>
      <Table columns="1.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination totalPages={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
