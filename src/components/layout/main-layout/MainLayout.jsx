import Header from "./header/Header";
import Footer from "./footer/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{marginTop: '55px'}}>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
