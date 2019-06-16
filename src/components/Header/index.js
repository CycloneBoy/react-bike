import React from 'react'
import {Row,Col} from "antd";
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

class Header extends React.Component{
    state={};

    componentWillMount() {
        this.setState({
            username :"环球"
        })
        setInterval( ()=>{
            let sysTime = Util.formateDate(new Date().getTime());
            this.setState( {
                sysTime
            })
        }, 1000);
        this.getWeatherApiData();
    }

    getWeatherApiData(){
        let city = '深圳';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) =>{
            let data = res.results[0].weather_data[0];
            this.setState({
                dayPictureUrl:data.dayPictureUrl,
                weather:data.weather
            })
        })
    }

    render() {
        const {menuName, menuType} = this.props;
        return (
            <div>
                <div className="header">
                    <Row className="header-top">
                        {
                            menuType? <Col span={6} className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>CycloneBoy 通用管理系统</span>
                            </Col>:''
                        }
                        <Col span={menuType?18:24}>
                            <span>欢迎，{this.state.username}</span>
                            <a href="/">退出</a>
                        </Col>
                    </Row>
                    {
                        menuType?'':
                            <Row className="breadcrumb">
                                <Col span={4} className="breadcrumb-title">
                                    {menuName || '首页'}
                                </Col>
                                <Col span={20} className="weather">
                                    <span className="date">{this.state.sysTime}</span>
                                    <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                    <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                                </Col>
                            </Row>
                    }
                </div>
            </div>
        )
    }

}

export  default  Header;