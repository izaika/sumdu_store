import React from 'react';
import Content from '../../Content';
import Styles from './home.scss';

const Home = () => (
  <Content title="Welcome to our super-puper store">
    <img className={Styles.img} src={`${imgPath}/1.jpg`} alt="home page" />
  </Content>
);

export default Home;
