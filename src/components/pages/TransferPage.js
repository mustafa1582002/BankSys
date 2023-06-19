import React, { useEffect, useState } from "react";
import "./Main.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";

const TransferPage = (props) => {
  const [SecCustomer, setSecCustomer] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [Valid, SetValid] = useState(false);
  const [Customer, SetCustomer] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const HandleSubmit = (e) => {
    e.preventDefault();

    if (
      Balance > Customer.results.balance ||
      Balance < 1 ||
      !Number(Balance) ||
      props.CusID == SecCustomer
    ) {
      SetValid(false);
    } else {
      SetValid(true);
    }
  };

  useEffect(() => {
    if (Valid) {
      let data = new FormData();
      data.append("SenderId", props.CusID);
      data.append("RecevierId", SecCustomer);
      data.append("quantity", Balance);

      SetCustomer({ ...Customer, loading: true });
      axios
        .post("http://localhost:5249/api/Customers", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          props.SetView("View");
          props.HandleReload();

          SetCustomer({
            ...Customer,
            loading: false,
            err: null,
          });
        })
        .catch((err) => {
          SetCustomer({
            ...Customer,
            loading: false,
            err: err.msg,
          });
        });
    }
  }, [Valid]);

  useEffect(() => {
    SetCustomer({ ...Customer, loading: true });
    axios
      .get("http://localhost:5249/api/Customers/" + props.CusID)
      .then((resp) => {
        SetCustomer({
          ...Customer,
          loading: false,
          results: resp.data,
          err: null,
        });
      })
      .catch((err) => {
        SetCustomer({
          ...Customer,
          loading: false,
          err: err.msg,
        });
      });
  }, [Customer.reload]);

  return (
    <div className="container form">
      <h1 className="px-3">Transfer Money</h1>
      <ul className="d-flex gap-5 list-unstyled ms-2">
        <li>
          Name :<span> {Customer.results.name}</span>
        </li>
        <li>
          Email:<span> {Customer.results.email}</span>{" "}
        </li>
        <li>
          Current Balance: <span>{Customer.results.balance}$</span>
        </li>
      </ul>

      <form>
        <Form.Select
          aria-label="Default select example "
          disabled
          className="select"
        >
          <option>{props.CusID}</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          className="select"
          onChange={(e) => setSecCustomer(e.target.value)}
        >
          <option>Select Customer To Send</option>
          {props.customers.map((Customer) => (
            <option value={Customer.id}>{Customer.id}</option>
          ))}
        </Form.Select>
        <InputGroup
          className="select"
          type="number"
          pattern="^[0-9\b]+$"
          style={{ backgroundColor: "black" }}
        >
          <InputGroup.Text>USD</InputGroup.Text>
          <Form.Control
            aria-label="Dollar amount (with dot and two decimal places)"
            type="number"
            pattern="^[0-9\b]+$"
            onChange={(e) => setBalance(e.target.value)}
          />
        </InputGroup>
        <Button
          variant="danger"
          type="submit"
          className="btn"
          onClick={(e) => HandleSubmit(e)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default TransferPage;
