import React from 'react'
import {Menu,MenuItem,Tabs,TabPane} from './../../components/eda-design/index';
export default function Test(){
    function callback(key:string):void {
        console.log(key);
      }
      
    return <div>
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


