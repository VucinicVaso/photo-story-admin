import React, { Fragment } from 'react';
import './App.css';

// redux
import { Provider } from 'react-redux';
import store        from './store/store';

// components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Routes from './components/layout/Routes';

const App = () => {

    return(
        <Provider store={ store }>

            <Fragment>
                <Header /> 
                    
                    <div className="container-fluid">
                        <Routes />
                    </div>

                <Footer />
            </Fragment>

        </Provider>
    );

}

export default App;
