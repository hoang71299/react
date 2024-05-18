import logo from './logo.svg';
import './App.css';
import Head from './components/Layout/Head';
import MenuLeft from './components/Layout/MenuLeft';
import Footer from './components/Layout/Footer';
import Member from './components/Member';

function App(props) {
  return (
    <>
      <Head/>
      <section >
        <div className="container">
          <div className="row">
            <MenuLeft/>
            {props.children}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default App;
