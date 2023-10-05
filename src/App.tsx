import React, { useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { ElementType, PrintElement } from "./store/store";
import { DataState, fetchDataRequest, fetchIdRequest } from "./store/reducers";
import Rect from "./components/Rect";
import Ellipse from "./components/Ellipse";

function App() {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state: DataState) => state);
  const [id, setId] = useState<string>("");

  const handleFetchClick = () => {
    id ? dispatch(fetchDataRequest(id)) : dispatch(fetchIdRequest());
  };

  const renderElements = (elements?: PrintElement[]) => {
    return elements?.map((element) => {
      switch (element.type) {
        case ElementType.RECT:
          return <Rect key={element.id} {...element} />;
        case ElementType.ELLIPSE:
          return <Ellipse key={element.id} {...element} />;
        default:
          console.warn(`Add missing type ${element.type}`);
      }
    });
  };

  return (
    <div className="App">
      <div className="app-container">
        <div>
          <span>{`Project ID: `}</span>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="For random leave empty"
          />
          <button onClick={handleFetchClick}>Fetch</button>
          <hr />
        </div>
        <div className="home-header_data">
          {data?.project.name && <span>{`Name: ${data.project.name}`}</span>}
          {data?.project.id && <span>{`ID: ${data.project.id}`}</span>}
          {error && <span>{error}</span>}
        </div>
        <div className="app-content">
          {(data?.project.items.length && data?.project.items.length === 0) ||
          error ||
          loading ? (
            <div>{loading ? "Loading..." : "Empty"}</div>
          ) : (
            <svg width="100%" height="100%">
              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${data?.project.width} ${data?.project.height}`}
              >
                <rect fill="#efefef" width="100%" height="100%"></rect>
                {renderElements(data?.project.items)}
              </svg>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
