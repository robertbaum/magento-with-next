import Footer from "~/comps/Footer"
import Navbar from "~/comps/Navbar"
import Container from '@material-ui/core/Container';
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="content" maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;