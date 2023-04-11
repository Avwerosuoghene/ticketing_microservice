import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

// Css passes whatever componenet we are looking at in our browser, i.e banana or index and
// pass it as a component prop here. This enables us use this wrapper as a global css
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser = {currentUser}/>

      {/* At this point the required information are sent to the individual pages */}
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);

//   common to all pages
  const { data } = await client.get("/api/users/currentuser");


let pageProps = {};

// This condition ensures components that don't have getInitialprops function don't crash
if (appContext.Component.getInitialProps) {
    //   This will be passed into the getInitial props of various pages
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
}

    // pageProps is gotten from the getInitial props of each component,
    // while data is from the getInitial props of this app component
  return {
    pageProps,
    ...data
  }
};

export default AppComponent;
