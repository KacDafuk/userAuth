import { ToolbarActions, User } from "../useDashboard";
import { Button } from "react-bootstrap";
import { X, Key } from "react-bootstrap-icons";

type DashboardHeaderProps = {
  toolbarAction: (action: ToolbarActions) => void;
  selectAllUsers: () => void;
  users: User[];
};
const DashboardHeader = ({
  toolbarAction,
  selectAllUsers,
  users,
}: DashboardHeaderProps) => {
  return (
    <thead>
      <tr>
        <th colSpan={2}>
          <Button onClick={() => toolbarAction("block")}>BLOCK</Button>
        </th>
        <th colSpan={2}>
          <Button onClick={() => toolbarAction("unblock")}>
            <Key />
          </Button>
        </th>
        <th colSpan={2}>
          <Button onClick={() => toolbarAction("delete")}>
            <X />
          </Button>
        </th>
      </tr>
      <tr>
        <th>
          <button onClick={selectAllUsers}>SELECT ALL</button>
        </th>
        {Object.keys(users[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
    </thead>
  );
};

export default DashboardHeader;
