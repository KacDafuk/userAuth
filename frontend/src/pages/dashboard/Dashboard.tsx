import DashboardBody from "./dashboardBody/DashboardBody";
import DashboardHeader from "./dashboardHeader/DashboardHeader";
import useDashboard from "./useDashboard";
import { Container } from "react-bootstrap";
const Dashboard = () => {
  const { users, checkUser, isCheckedUser, selectAllUsers, toolbarAction } =
    useDashboard();

  return users ? (
    <Container className="mx-auto mt-5 " fluid="sm">
      <table>
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
      </table>
    </Container>
  ) : (
    <>
      <div> loading</div>
    </>
  );
};

export default Dashboard;
