import useRequest from '../../hooks/use-request';
import Router  from "next/router";

const TicketShow = ({ticket}) => {
    const {doRequest, errors} = useRequest({
        url: '/api/orders',
        method: 'post',
        body: {
            ticketId: ticket.id
        },

        // we do this due to the wildcard nature of the route
        onSuccess: (order) => {
          
            Router.push('/orders/[orderId]', `/orders/${order.order.id}`)}
    });
    return <div>
        <h1>{ticket.title}</h1>
        <h4>Price: {ticket.price}</h4>
        {errors}
        <button className="btn btn-primary" onClick={() => doRequest()}>Purchase</button>
    </div>
};

TicketShow.getInitialProps = async (context, client) => {

    // This enables us to get the ticketId in the square bracket route
    const {ticketId} = context.query;
    console.log(ticketId)
    const {data} = await client.get(`/api/tickets/${ticketId}`);

    // Whatever we return here is available inside the component
    return {ticket: data}
};

export default TicketShow;