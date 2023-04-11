import Link from "next/link";

export default ({ currentUser }) => {
  const links = [
    !currentUser && {
      label: "Signu Up",
      href: "/auth/signup",
    },
    !currentUser && {
      label: "Signu In",
      href: "/auth/signin",
    },
    currentUser && {
      label: "Signu Out",
      href: "/auth/signout",
    },
  ]
    // This takes out any false value in our array
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>{label}</Link>
        </li>
      );
    });
  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/">
        GitTrix
        {/* <a className="navbar-brand">GitTix</a> */}
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};
