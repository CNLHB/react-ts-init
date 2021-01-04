import React ,{useState}from 'react'
import sv from '../../logo.svg'
import './index.less'
import {Menu,SubMenu,Spin,Message,Modal,
    Badge,Textarea,Switch,Alert,
    Avatar,MenuItem,Tabs,TabPane
    ,Input,Select, Button} from './../../components/eda-design/index';
import { Option } from './../../components/eda-design/select/option';
import Tag from './../../components/eda-design/tag/tag';
export default function Test(){
   let [vis,setVis] = useState(false)
   let [spin,setSpin] = useState(false)
    return <div>
          {/* <Menu
            // defaultIndex={"0"}
            // defaultOpenSubMenus={["1"]}
            mode="horizontal"
            onSelect={(index: string) => {
              console.log(index);
            }}
          >
            <Menu.MenuItem>产品</Menu.MenuItem>
            <SubMenu title="dropdown">
              <MenuItem>dropdown1</MenuItem>
              <MenuItem>dropdown2</MenuItem>
            </SubMenu>
            <MenuItem>11111</MenuItem>
            <MenuItem>xxx2</MenuItem>
            <MenuItem>xxx3</MenuItem>
          </Menu> */}
          <div style={{marginTop:50}}></div>
          <Tag closable>tag1</Tag>
          <Tag type="danger">tag1</Tag>
          <Tag type="info">tag1</Tag>
          <Tag type="success">tag1</Tag>
          <Tag type="warning">tag1</Tag>
          <div style={{marginTop:50}}></div>
<Alert title="警告" 
    type="error"
    message="删除账号前请先解散或转移你的团队和工程。 该操作不可恢复！删除账号仅对立创EDA上的账号与数据进行删除， 如果需要删除立创商城/嘉立创账号请联系立创商城或嘉立创。"></Alert>
<Alert 
    type="error"
    showIcon
    close
    message="当前账号尚未激活邮箱，无法开启邮件提醒功能"></Alert>
    <Message 
     close 
     message="当前账号尚未当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱当前账号尚未激活邮箱激活邮箱"></Message>
    <Message 
      message="当前账号尚未当前账号箱"></Message>
          <Message 
    type="error"
     close message="当前账号尚未当前账号箱"></Message>
    <Message 
    
    type="success"
     close message="当前账号尚未当前账号箱"></Message>
<Alert title="提醒" 
    type="warning"
    showIcon
    close
    message="当前账号尚未激活邮箱，无法开启邮件提醒功能"></Alert>
    <Button style={{zIndex:9999}} onClick={()=>{
        if(vis){
            setVis(false)
        }else{
            console.log(vis);
            setVis(true)
        }
    }}>显示隐藏</Button>
        <Button style={{zIndex:9999}} onClick={()=>{
        if(spin){
            setSpin(false)
        }else{
            console.log(vis);
            setSpin(true)
        }
    }}>Spin</Button>
    <div style={{marginBottom:50}}></div>

    <div className="">
        <Spin spinning={true} ></Spin>
    </div>
    <Spin spinning={spin} tip="loading...">
        <div data-show="true" className="eda-alert ant-alert-info ant-alert-with-description ant-alert-no-icon" role="alert">
                    <div className="ant-alert-content">
                        <div className="ant-alert-message">
                            Alert message title</div>
                        <div className="ant-alert-description">
                            Further details about the context of this alert.
                        </div>
                    </div>
                </div>
    </Spin>
    <div style={{marginBottom:50}}></div>
    <Modal visible={vis}
    className="modal-big"
    showClose
     title="吴迪" onOk={()=>{
         console.log("ok");
         setVis(false)
     }} 
     onCancel={()=>{
        setVis(false)
        console.log("onCancel");
     }} >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
     </Modal>
    <Badge count={5} overflowCount={99}>
        <Avatar href={sv} border="true" size="ssm"></Avatar>
    </Badge>
    <Badge count={50}>
        <Avatar href={sv} size="lg"></Avatar>
    </Badge>


    <div style={{marginBottom:50}}></div>
        <Avatar href={sv} border="true" size="lg"></Avatar>
        <Avatar href="https://image.lceda.cn/avatars/2020/10/e36x5ZmcEpm2ibm91N30rs2CZoHeGz8Ew0eR6dKD.jpeg"></Avatar>
        
            <Textarea value="默认值" placeholder="请输入"></Textarea>
            {/* <Input className="my" placeholder="name" onChangeInput={(val:string)=>{console.log(val);
            }}></Input> */}

                <Switch disabled defaultChecked></Switch>
                <Switch  defaultChecked onChange={(checked)=>{
                    console.log(checked);
                    
                }}></Switch>


            <div style={{width:300}}>
                
            <Select defaultValue="青玄" onChange={(value:string)=>{console.log(value);
            }}>
                <Option value="青玄">青玄title</Option>
                <Option value="name1">name1青玄title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name3">name3title</Option>
            </Select>
            </div>
        <Menu
            defaultIndex={"0"}
            defaultOpenSubMenus={["1"]}
            mode="vertical"
            onSelect={(index: string) => {
            console.log(index);
            
            }}
            >
            <Menu.MenuItem>1</Menu.MenuItem>
            <MenuItem>xxx2</MenuItem>
            <MenuItem>xxx3</MenuItem>
            </Menu>
            <Tabs defaultActiveKey="0" onChange={()=>{}}>
                    <TabPane className="name" tab="Tab 1" key="1">
                    Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                    </TabPane>
                </Tabs>


    </div>
}


