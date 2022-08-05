import Table from "react-bootstrap/Table";
import DashboardBody from "./dashboardBody/DashboardBody";
import DashboardHeader from "./dashboardHeader/DashboardHeader";
import useDashboard from "./useDashboard";
const Dashboard = () => {
  const { users, checkUser, isCheckedUser, selectAllUsers, toolbarAction } =
    useDashboard();

  return users ? (
    <>
      <Table striped bordered hover className="w-90">
        <DashboardHeader
          toolbarAction={toolbarAction}
          users={users}
          selectAllUsers={selectAllUsers}
        />
        <DashboardBody
          checkUser={checkUser}
          isCheckedUser={isCheckedUser}
          users={users}
        />
      </Table>
    </>
  ) : (
    <>
      <div> loading</div>
    </>
  );
};

export default Dashboard;
