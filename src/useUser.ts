import { useEffect, useReducer } from "react";
import { User } from "./types";

const ACTION_TYPES = {
  SET_USERS: "SET_USERS",
  SET_FILTER: "SET_FILTER",
};

type ActionType = {
  type: string;
  payload: any;
};

type StateType = {
  users: User[];
  filter: string;
  filteredUsers: User[];
};

const initalState = {
  users: [],
  filter: "",
  filteredUsers: [],
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case ACTION_TYPES.SET_USERS:
      return { ...state, users: action.payload, filteredUsers: action.payload };

    case ACTION_TYPES.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
        filteredUsers: state.users.filter((user) =>
          user.role
            .toLocaleLowerCase()
            .includes(action.payload.toLocaleLowerCase())
        ),
      };

    default:
      return state;
  }
};

export const useUsers = () => {
  const [state, dispatch] = useReducer(reducer, initalState);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => {
        const payload: User[] = data.users;
        dispatch({
          type: ACTION_TYPES.SET_USERS,
          payload,
        });
      })
      .catch((error) => console.error("Error fetching the user data: ", error));
  }, []);

  const setFilter = (filter: string) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTER,
      payload: filter,
    });
  };

  return {
    users: state.filteredUsers,
    filter: state.filter,
    setFilter,
  };
};
