import { useRef } from "react";

import "./Card.scss";

function Card(props) {
  const nameUpdate = useRef([]);

  return (
    <ul className="user-box-container">
      {props.data.length >= 1 ? (
        props.data.map((item) => (
          <li className="user-box" key={item.id}>
            <input
              type="checkbox"
              value={item.id}
              onChange={(e) =>
                props.addRemoveFromRemoveIds(e.target.checked, item.id)
              }
            />
            <button onClick={() => props.deleteItems([item.id])}>Remove</button>
            <input
              type="text"
              ref={(el) => (nameUpdate.current[item.id] = el)}
            />
            <button
              onClick={() =>
                props.updateData(nameUpdate.current[item.id].value, item.id)
              }
            >
              Update
            </button>
            <div>
              <img src={item.image} loading="lazy" />
            </div>
            <div>{item.firstName}</div>
            <div>{item.lastName}</div>
            <div>{item.age}</div>
            <div>{item.email}</div>
          </li>
        ))
      ) : (
        <li className="user-box">"No Data Found"</li>
      )}
    </ul>
  );
}

export default Card;
