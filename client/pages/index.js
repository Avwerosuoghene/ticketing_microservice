import buildClient from "../api/build-client";
// In nextjs, filenames routes to route names
const LandingPage = ({ currentUser }) => {
 
  return currentUser? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
};

// This enables next js to get some data the component needs during serverside rendering
// React hooks cannot be used inside getInitialProps
LandingPage.getInitialProps = async (context) => {

    console.log('Landing Page')
    const client = buildClient(context)

    const {data} = await client.get('/api/users/currentuser')


    return data;


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
