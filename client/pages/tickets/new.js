import { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router  from "next/router";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const {doRequest, errors} = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
        title, price
    },
    onSuccess: (ticket) => Router.push('/')
  });

  const onSubmit = (event) => {
    event.preventDefault();

    doRequest();
  }

  const onBlur = () => {

    // parseFloat ensures only a number is entered, value becomes NAN if string is entered
    const value = parseFloat(price);

    if (isNaN(value)) {
        return;
    }

    // This rounds up our number to 2dp
    setPrice(value.toFixed(2))
  };
  return (
    <div>
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onBlur ={onBlur}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
