import axios from "axios";
import { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

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

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    style: {
      backgroundColor: "rgb(194 194 194 / 80%)",
      color: "black",
      fontWeight: "bold",
    },
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
      filter:textFilter(),
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: "Please enter a numeric value",
          };
        }
        return true;
      },
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      editable: false,
    },
    {
      dataField: "dropdown",
      text: "Dropdown",
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: "A",
            label: "A",
          },
          {
            value: "B",
            label: "B",
          },
        ],
      },
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
          mode: "dbclick",
          // nonEditableRows: () => [1, 2], // no permite editar las dos primeras filas de datos (sin contar el encabezado)
          blurToSave: true,
        })}
        selectRow={selectRow}
        filter={filterFactory()}
      />
    </div>
  );
};

export default App;
