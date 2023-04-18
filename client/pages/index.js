import Link from "next/link";

// In nextjs, filenames routes to route names
const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          {/* We had to  put the relative path where the wildcard route is located*/}
          {/* The as contains the real route url */}
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            View
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

// This enables next js to get some data the component needs during serverside rendering
// React hooks cannot be used inside getInitialProps
LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };

  // This lets us know if we are in the browser, as window only exists in the browser
  //   if (typeof window === "undefined") {
  //     // we are on the server
  //     const { data } = await axios.get(
  //       // The domain indicated here enables us to reach out to ingress service on ingress-nginx
  //       "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
  //         headers: req.headers

  //         // headers: {

  //         //     // This lets ingress know the domain inside ingress-nginx we want to access
  //         //     Host: 'ticketing.com'
  //         // }
  //       }
  //     );
  //     return data;
  //   } else {
  //     // we are on the browser/client
  //     const { data } = await axios.get("/api/users/currentuser");
  //     return data;
  //   }
  //   return {};
};

export default LandingPage;
