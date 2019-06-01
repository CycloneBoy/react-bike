import React from 'react';
import {Card, Row, Col, Modal,Icon, Avatar } from 'antd'

const { Meta } = Card;

export default class Gallery extends  React.Component{

    state = {
        visible:false,
        currentImg:''
    };

    openGallery = (imgSrc) =>{
        this.setState({
            visible: true,
            currentImg: '/gallery/' + imgSrc
        })
    };

    render() {
        // TODO 从服务端获取图片地址和图片的信息
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png','6.png'],
            [ '7.png', '8.png', '9.png', '10.png','11.png', '12.png'],
            [ '13.png', '14.png', '15.png','16.png', '17.png', '18.png'],
            [ '19.png', '20.png','21.png', '22.png', '23.png', '24.png'],
        ];

        const imgList = imgs.map((list) => list.map( (item) =>
            <Card
                style={{marginBottom:10}}
                cover={
                    <img
                        src={'/gallery/' + item}
                        onClick={() => this.openGallery(item)}
                        alt=""
                    />
                }
                actions={
                    [<Icon type="setting" onClick={()=>{
                        console.info("setting");
                    }}/>,
                        <Icon type="edit" onClick={()=>{
                            console.info("edit");
                        }}/>,
                        <Icon type="ellipsis" onClick={()=>{
                            console.info("ellipsis");
                        }}/>]
                }
            >
            <Meta
                avatar={<Avatar src={'/gallery/' + item} />}
                title="cycloneboy"
                description="www.cycloneboy.cn"/>
            </Card>
        ));
        return (
            <div className="card-wrap">
                <Row gutter={10}>
                    {
                         imgList.map((item) =>{
                            return <Col md={6}>
                                {item}
                            </Col>
                        })
                    }
                </Row>
                <Modal
                    width={300}
                    height={500}
                    visible={this.state.visible}
                    title="图片画廊"
                    onCancel={ ()=>{
                        this.setState({
                                visible: false,
                        })
                    }}
                    footer={null}
                    >
                    {<img src={this.state.currentImg} alt="" style={{width:'100%'}}/>}
                </Modal>
            </div>
        );
    }
};


