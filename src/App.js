import "./styles.css";
import { useState, useRef } from "react";

const initialGitUsers = [
  {
    id: 0,
    name: "Mircea"
  },
  {
    id: 1,
    name: "Florin"
  }
];

export default function App() {
  const [gitUsers, setGitUsers] = useState(initialGitUsers);
  const gitUserNameInput = useRef();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(gitUserNameInput.current.value);
          setGitUsers([
            ...gitUsers,
            {
              id: gitUsers.length + 1,
              name: gitUserNameInput.current.value
            }
          ]);
          console.log(gitUsers);
        }}
      >
        GitHub username:{" "}
        <input ref={gitUserNameInput} name="gitUserName" defaultValue="" />
        <button type="submit">Add Git user</button>
      </form>
      <GitUserList
        gitUsers={gitUsers}
        currentGitUser={(user) => console.log("Select user", user.id)}
      />
    </div>
  );
}

function GitUserList(gitUsers, currentGitUser) {
  return (
    <List
      items={gitUsers}
      renderItem={(gitUser) => (
        <GitListItem gitUser={gitUser} selectGitUser={currentGitUser} />
      )}
    />
  );
}

function GitListItem({ gitUser, currentGitUser }) {
  return (
    <div>
      {gitUser.id} {gitUser.name}
    </div>
  );
}

function List({ items, renderItem }) {
  const [showList, setShowList] = useState(false);
  return (
    <>
      <button onClick={() => setShowList(!showList)}>Show Git Users</button>
      {showList && (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{renderItem(item)}</li>
          ))}
        </ul>
      )}
    </>
  );
}
