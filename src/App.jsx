import { useMemo, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Card from "./components/Card/Card";

function App() {
  const [data, setData] = useState([]);
  const [removeIds, setRemoveIds] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    (async function () {
      try {
        const url = "https://dummyjson.com/users";
        const resData = await fetch(url).then((res) => res.json());
        // const resData = await res.json();
        setData(resData.users);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const filteredData = useMemo(() => {
    if (searchString.length > 1) {
      const found = data.filter((item) => {
        return item.email.includes(searchString);
      });

      return found ? found : [];
    }
    return data;
  }, [searchString, data]);

  const deleteItems = (single = []) => {
    const arr = single.length === 0 ? removeIds : single;

    const found = data.filter((item) => {
      return !arr.includes(item.id);
    });

    if (found) setData(found);
  };

  const addItem = () => {
    const newObj = {
      id: 999999,
      firstName: "Akshay",
      lastName: "Lachake",
      maidenName: "Mahesh",
      age: 31,
      gender: "male",
      email: "akshay.lachake@x.dummyjson.com",
      image: viteLogo,
    };

    setData([...data, newObj]); // insert as a last value in array
    // setData([newObj, ...data]); // insert as a first value in array
    // setData([...data.slice(0, 2), newObj, ...data.slice(2)]); // insert value at 2nd index in array
  };

  const addRemoveFromRemoveIds = (isChecked, id) => {
    isChecked
      ? setRemoveIds([...removeIds, id])
      : setRemoveIds(
          removeIds.filter((i) => {
            return i !== id;
          })
        );
  };

  const updateData = (nameUpdate, id) => {
    if (nameUpdate !== "") {
      const found = data.find((item) => {
        if (item.id === id) {
          return (item.firstName = nameUpdate);
        }
      });

      if (found) {
        setData([...data]);
      }
    }
  };

  console.log(filteredData);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <button onClick={() => addItem()}>Add New Item</button>
      <button onClick={() => deleteItems()}>Remove Selected Item</button>
      Search by email{" "}
      <input type="text" onKeyUp={(e) => setSearchString(e.target.value)} />
      <br />
      {filteredData && (
        <Card
          data={filteredData}
          deleteItems={deleteItems}
          addRemoveFromRemoveIds={addRemoveFromRemoveIds}
          updateData={updateData}
        ></Card>
      )}
    </>
  );
}

export default App;
