import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home'; 
import About from './About';
import Layout from './Layout';
import Sign from './Sign';
import New_account from './New_account';
import Fruits from './Fruits';
import Vegetables from './Vegetables';
import ProductDetail from './ProductDetail';
import Search from './Search';
import Dryfruits from './Dryfruits';
import Offers from './Offers';
import Dairy from './Dairy';
function MyRouter() {
  return (
    <BrowserRouter>
        <Routes>
          
          
            <Route path="/" element={<Layout/>} >
              <Route index element={<Home/>} />
              <Route path="about" element={<About/>} />
              <Route path="search" element={<Search/>} />
              <Route path="/fruits" element={<Fruits />} />
              <Route path="/vegetables" element={<Vegetables />} />
              <Route path="/dryfruits" element={<Dryfruits />} />
              <Route path="/dairys" element={<Dairy />} />

              <Route path="/offers" element={<Offers />} />
              <Route path="/product/:name" element={<ProductDetail />} />
              <Route path="signup" element={<Sign />} />
          
          <Route path="New_account" element={<New_account/>} />
              
           </Route>
        </Routes>
        </BrowserRouter>
  );
}

export default MyRouter