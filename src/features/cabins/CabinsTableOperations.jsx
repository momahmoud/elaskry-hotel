import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

export default function CabinsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (Low to High)" },
          { value: "regularPrice-desc", label: "Sort by price (High to Low)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low to High)" },
          {
            value: "maxCapacity-desc",
            label: "Sort by capacity (High to Low)",
          },
        ]}
      />
    </TableOperations>
  );
}
