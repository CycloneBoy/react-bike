import React from 'react';
import { HashRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Common from './common'
import OrderDetail from './pages/order/detail'
import Admin from "./admin";
import Home from "./pages/home";
import Gallery from "./pages/ui/gallery";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import HighTable from "./pages/table/highTable";
import BasicTable from "./pages/table/basicTable";
import City from "./pages/city";
import Order from "./pages/order";
import User from "./pages/user";
import Bar from "./pages/echarts/bar";
import Line from "./pages/echarts/line";
import Pie from "./pages/echarts/pie";


export default class ERouter extends React.Component{

    render() {
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
                                    <Route path="/ui/gallery" component={Gallery} />
                                    <Route path="/form/login" component={FormLogin} />
                                    <Route path="/form/reg" component={FormRegister} />
                                    <Route path="/table/basic" component={BasicTable} />
                                    <Route path="/table/high" component={HighTable} />
                                    <Route path="/city" component={City} />
                                    <Route path="/order" component={Order} />
                                    <Route path="/user" component={User} />
                                    <Route path="/charts/bar" component={Bar} />
                                    <Route path="/charts/pie" component={Pie} />
                                    <Route path="/charts/line" component={Line} />
                                    <Redirect to="/home" />
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        );
    };

}

