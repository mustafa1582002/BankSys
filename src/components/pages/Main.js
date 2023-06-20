import React, { useEffect, useState } from "react";
import "./Main.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import TransferPage from "./TransferPage";
import axios from "axios";
const Main = () => {
  const [View, SetView] = useState("View");
  const [CusID, setCusID] = useState(0);
  const [Customers, SetCustomers] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    SetCustomers({ ...Customers, loading: true });
    axios
      .get("https://localhost:7133/api/Customers/viewAll")//http://localhost:7133/api/Customers/viewAll
      .then((resp) => {
        SetCustomers({
          ...Customers,
          loading: false,
          results: resp.data,
          err: null,
        });
      })
      .catch((err) => {
        SetCustomers({
          ...Customers,
          loading: false,
          err: err.msg,
        });
      });
  }, [Customers.reload]);

  const HandleReload=()=>{
    SetCustomers({...Customers, reload:Customers.reload+1})

  }



  const HandleView = (id) => {
    setCusID(id);
 
    if (View === "View") {
      SetView("X");
    } else {
      SetView("View");
    }
  };
  return (
    <div className="Main con">
      <Container>
        <p className="">All Customers View </p>

        <Table className="table">
          {View === "View" ? (
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Balance</th>
                <th></th>
              </tr>
            </thead>
          ) : (
            <thead>
              <tr>
                <th>View Customer</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
          )}

          {View === "View" ? (
            Customers.results.map((Customer) => (
              <tbody key={Customer.id}>
                <tr key={Customer.id}>
                  <td>{Customer.id}</td>
                  <td>{Customer.name}</td>
                  <td>{Customer.email}</td>
                  <td>{Customer.balance} $</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => HandleView(Customer.id)}
                    >
                      {View}
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <TransferPage
                    CusID={CusID}
                    customers={Customers.results}
                    SetView={SetView}
                    SetCustomers={SetCustomers}
                    Customers={Customers}
                    HandleReload={HandleReload}
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={HandleView}>
                    {View}
                  </Button>
                </td>
                <td></td>
              </tr>
            </tbody>
          )}
        </Table>
      </Container>
    </div>
  );
};

export default Main;
