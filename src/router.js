import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Common from './common'
import OrderDetail from './pages/order/detail'
import Admin from "./admin";
import Home from "./pages/home";

const ERouter = () => {
    return (
       <HashRouter>
           <App>
               <Switch>
                   <Route path="/login" component={Login}/>
                   <Route path="/common" render={ ()=>
                       <Common>
                           <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                       </Common>
                   }/>
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/home" component={Home}/>
                                <Redirect to="/home" />
                            </Switch>
                        </Admin>
                    }/>
               </Switch>
           </App>
       </HashRouter>
    );
};

export default ERouter;
