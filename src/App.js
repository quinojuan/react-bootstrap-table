import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  };

  const emailFormatter = (data, row) => {
    return <span>Email: {data}</span>;
  };
  const columns = [
    {
      dataField: "email",
      text: "Email",
      sort: true,
      formatter: emailFormatter,
    },
    {
      dataField: "postId",
      text: "Product ID",
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
  ];
  return (
    <div>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        striped
        hover
        condensed
        pagination={paginationFactory()}
        cellEdit={cellEditFactory({
          mode: "click",
        })}
      />
    </div>
  );
};

export default App;
