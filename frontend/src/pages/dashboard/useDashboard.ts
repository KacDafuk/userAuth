import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AUTH_URL } from "../../Consts";

export type User = {
  email: string;
};
export type ToolbarActions = "block" | "unblock" | "delete";
const useDashboards = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<null | User[]>(null);
  function checkUser(email: string) {
    if (checkedUsers.includes(email)) {
      setCheckedUsers((prevCheckedUsers) =>
        prevCheckedUsers.filter((checkedEmail) => checkedEmail !== email)
      );
      return;
    }
    setCheckedUsers((prevCheckedUsers) => [...prevCheckedUsers, email]);
  }

  async function getUsers() {
    const resp = await fetch(AUTH_URL + pathname, {
      ...getFetchUsersOptions(),
    });
    console.log(resp);
    await handleUserData(resp);
  }
  function getFetchUsersOptions() {
    return {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token") as string,
      },
    };
  }

  async function handleUserData(resp: Response) {
    const { users, currentUser, status } = await resp.json();
    console.log(users, currentUser, status, "test");
    if (currentUser.blocked) {
      navigate("/login");
      localStorage.setItem("token", "");
      return;
    }
    if (status == 200) {
      setUsers(users);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUsers();
      return;
    }
    navigate("/login");
  }, []);

  function isCheckedUser(email: string) {
    return checkedUsers.includes(email);
  }

  async function toolbarAction(action: ToolbarActions) {
    try {
      const resp = await fetch(AUTH_URL + "/dashboard/" + action, {
        ...getToolbarFetchOptions(),
      });
      const { users: newUsers, userLogout } = await resp.json();
      console.log(newUsers, userLogout, "TEST");
      if (userLogout) {
        localStorage.setItem("token", "");
        navigate("/login");
        return;
      }
      setUsers(newUsers);
    } catch (e) {}
  }
  function getToolbarFetchOptions() {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token") as string,
      },
      body: JSON.stringify(checkedUsers),
    };
  }
  function selectAllUsers() {
    if (users) {
      setCheckedUsers(users.map(({ email }) => email));
    }
  }

  return { users, checkUser, isCheckedUser, selectAllUsers, toolbarAction };
};

export default useDashboards;
