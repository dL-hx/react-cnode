import React from 'react';
import { route } from './router/index'
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header'
import Footer from './components/Footer'
import './static/css/index.css';

function App() {
  return (
    <Layout className='page'>
      <Header />
      <Layout.Content>
        <div className='wrap'>
          <Switch>
            {
              route.map((itemData, index) => {
                return (<Route
                  key={index}
                  path={itemData.path}
                  exact={itemData.exact}
                  render={(props) => {
                    props.username = 'kkk';
                    return itemData.render(props)
                  }}
                />)
              })
            }
          </Switch>
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
