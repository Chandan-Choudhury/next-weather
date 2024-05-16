import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-dark py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              &copy; {new Date().getFullYear()} |{" "}
              <Link
                className="text-dark"
                href="https://chandanchoudhury.in"
                target="_blank"
              >
                Chandan Choudhury
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
