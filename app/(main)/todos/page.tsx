import DataTable from "@/components/table/DataTable";
import BackButton from "@/components/BackButton";
import TablePagination from "@/components/table/TablePagination";

const PostsPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/" />
      <DataTable />
      <TablePagination />
    </>
  );
};

export default PostsPage;
