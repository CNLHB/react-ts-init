import React, { useState,useEffect,useLayoutEffect } from 'react'
import sv from '../../logo.svg'
import './index.less'
import {
    Menu, Spin, Message, Modal,
    Badge, Textarea, Switch, Alert,
    Notification,
    Avatar, MenuItem, Tabs, TabPane,
    Label,
    Breadcrumb,
    DropDown, DropDownMenu,
    Pagination,
    Table,
    SubMenu,
    Radio,
    Cascader
    , Select, Button, Icon
} from './../../components/eda-design/index';
import { Option } from './../../components/eda-design/select/option';
import Tag from './../../components/eda-design/tag/tag';
import { Input } from './../../components/eda-design/input/input';
const dataSource = [
    {
        key: '1',
        account: '1',
        action: "兑换优惠卷",
        time: 'time',
        integralChange: '-1',
        integralValue: '1',
    },
    {
        key: '2',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '3',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '4',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '5',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '6',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '7',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
    {
        key: '8',
        account: '2',
        action: 32,
        time: '西湖区湖底公园1号',
        integralChange: '西湖区湖底公园1号',
        integralValue: '西湖区湖底公园1号',
    },
];
let option = [{
    value: 'zhinan',
    label: '指南',
    children: [{
      value: 'shejiyuanze',
      label: '设计原则',
      children: [{
        value: 'yizhi',
        label: '一致'
      }, {
        value: 'fankui',
        label: '反馈'
      }, {
        value: 'xiaolv',
        label: '效率'
      }, {
        value: 'kekong',
        label: '可控'
      }]
    }, {
      value: 'daohang',
      label: '导航',
      children: [{
        value: 'cexiangdaohang',
        label: '侧向导航'
      }, {
        value: 'dingbudaohang',
        label: '顶部导航'
      }]
    }]
  }, {
    value: 'zujian',
    label: '组件',
    children: [{
      value: 'basic',
      label: 'Basic',
      children: [{
        value: 'layout',
        label: 'Layout 布局'
      }, {
        value: 'color',
        label: 'Color 色彩'
      }, {
        value: 'typography',
        label: 'Typography 字体'
      }, {
        value: 'icon',
        label: 'Icon 图标'
      }, {
        value: 'button',
        label: 'Button 按钮'
      }]
    }, {
      value: 'form',
      label: 'Form',
      children: [{
        value: 'radio',
        label: 'Radio 单选框'
      }, {
        value: 'checkbox',
        label: 'Checkbox 多选框'
      }, {
        value: 'input',
        label: 'Input 输入框'
      }, {
        value: 'input-number',
        label: 'InputNumber 计数器'
      }, {
        value: 'select',
        label: 'Select 选择器'
      }, {
        value: 'cascader',
        label: 'Cascader 级联选择器'
      }, {
        value: 'switch',
        label: 'Switch 开关'
      }, {
        value: 'slider',
        label: 'Slider 滑块'
      }, {
        value: 'time-picker',
        label: 'TimePicker 时间选择器'
      }, {
        value: 'date-picker',
        label: 'DatePicker 日期选择器'
      }, {
        value: 'datetime-picker',
        label: 'DateTimePicker 日期时间选择器'
      }, {
        value: 'upload',
        label: 'Upload 上传'
      }, {
        value: 'rate',
        label: 'Rate 评分'
      }, {
        value: 'form',
        label: 'Form 表单'
      }]
    }, {
      value: 'data',
      label: 'Data',
      children: [{
        value: 'table',
        label: 'Table 表格'
      }, {
        value: 'tag',
        label: 'Tag 标签'
      }, {
        value: 'progress',
        label: 'Progress 进度条'
      }, {
        value: 'tree',
        label: 'Tree 树形控件'
      }, {
        value: 'pagination',
        label: 'Pagination 分页'
      }, {
        value: 'badge',
        label: 'Badge 标记'
      }]
    }, {
      value: 'notice',
      label: 'Notice',
      children: [{
        value: 'alert',
        label: 'Alert 警告'
      }, {
        value: 'loading',
        label: 'Loading 加载'
      }, {
        value: 'message',
        label: 'Message 消息提示'
      }, {
        value: 'message-box',
        label: 'MessageBox 弹框'
      }, {
        value: 'notification',
        label: 'Notification 通知'
      }]
    }, {
      value: 'navigation',
      label: 'Navigation',
      children: [{
        value: 'menu',
        label: 'NavMenu 导航菜单'
      }, {
        value: 'tabs',
        label: 'Tabs 标签页'
      }, {
        value: 'breadcrumb',
        label: 'Breadcrumb 面包屑'
      }, {
        value: 'dropdown',
        label: 'Dropdown 下拉菜单'
      }, {
        value: 'steps',
        label: 'Steps 步骤条'
      }]
    }, {
      value: 'others',
      label: 'Others',
      children: [{
        value: 'dialog',
        label: 'Dialog 对话框'
      }, {
        value: 'tooltip',
        label: 'Tooltip 文字提示'
      }, {
        value: 'popover',
        label: 'Popover 弹出框'
      }, {
        value: 'card',
        label: 'Card 卡片'
      }, {
        value: 'carousel',
        label: 'Carousel 走马灯'
      }, {
        value: 'collapse',
        label: 'Collapse 折叠面板'
      }]
    }]
  }, {
    value: 'ziyuan',
    label: '资源',
    children: [{
      value: 'axure',
      label: 'Axure Components'
    }, {
      value: 'sketch',
      label: 'Sketch Templates'
    }, {
      value: 'jiaohu',
      label: '组件交互文档'
    }]
  }]
export default function Test() {
    let [vis, setVis] = useState(false)
    let [spin, setSpin] = useState(false)
    let [dataList, setDataList] = useState(dataSource)
    let [placeholder, setPlaceholderContent] = useState("morenzhi");
    const [opt, setOpt] = useState([{ value: "1", content: 2 }])
    const [opts, setOpts] = useState<Array<any>>([])

    const columns = [
        {
            title: '序号',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            width: 200
        },
        {
            title: '操作时间',
            dataIndex: 'time',
            key: 'time',
        },

        {
            title: '积分变化',
            dataIndex: 'integralChange',
            key: 'integralChange',
        },
        {
            title: '积分值',
            dataIndex: 'integralValue',
            key: 'integralValue',
        },
    ];
    useEffect(()=>{
      console.log("useEffect");
      
    },[])
    useLayoutEffect(()=>{
      console.log("useLayoutEffect");
    },[])
    return <div>
      <div style={{margin:"50px 50px"}}>
      <Radio defaultValue="child" buttonStyle="solid" onChange={(val:string)=>{
          console.log(val);
      }}>
          <Radio.Item value={"child"}> child </Radio.Item>
          <Radio.Item value={"child1"}> child1 </Radio.Item>
          <Radio.Item value={"child2"}> child2 </Radio.Item>
      </Radio>
      </div>
              {/* <Menu
              style={{width:300,height:700}}
            // defaultIndex={"0"}
            // defaultOpenSubMenus={["1"]}
            mode="vertical"
            onSelect={(index: string) => {
              console.log(index);
            }}
            // activeClass="menu-active-item"
          >
            <Menu.MenuItem icon={<Icon type="" iconType="error"></Icon>}>产品</Menu.MenuItem>
            <SubMenu title="dropdown">
              <MenuItem>dropdown1</MenuItem>
              <SubMenu title="dropdown1">
                <MenuItem>dropdown21</MenuItem>
                <MenuItem>dropdown22</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem>11111</MenuItem>
            <MenuItem>xxx2</MenuItem>
            <MenuItem>xxx3</MenuItem>
          </Menu>
          <div>1</div> */}
        <Button onClick={()=>[
            setOpts(option)
        ]}>opt</Button>
        <div style={{width:500}}>
            <Cascader options={option} 
            defaultValue={["zhinan","shejiyuanze","yizhi"]}
            placeholder="提示信息"
            onChange={(val:any)=> {
                console.log(val);
            }}
            ></Cascader></div>
        <div>
            <Table pagination={{
                total: 400, defaultPageSize: 50, onChange: (page, pageSize) => {
                    let data = dataSource.filter((item, index) => {
                        if ((index >= (page - 1) * pageSize) && (index < (page) * pageSize)) {
                            return true
                        } else {
                            return false
                        }
                    })
                    console.log(data);
                    setDataList(data)

                }
            }} stripe columns={columns} dataSource={dataList}>
            </Table>
        </div>
        <Icon type="" style={{ color: 'red' }} iconType="zhengque"></Icon>
        <Pagination total={400} onChange={(page, pageSize) => {
            console.log(page, pageSize);

        }}></Pagination>
        <Breadcrumb>
            <Breadcrumb.Item to="/aaa">Ant Design</Breadcrumb.Item>
            <Breadcrumb.Item to="/aaa">Component</Breadcrumb.Item>
            <Breadcrumb.Item>General</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ width: 500 }}>
            <Label name={"bitian"} required>
                <Input
                    showTip
                    onKeyUp={(event) => {
                        console.log(event.target);

                    }}></Input>
            </Label>
            <div style={{ margin: 50 }}></div>
            <Label width={75} name="玄天:"
                position="left" >
                <Input></Input>
            </Label>
        </div>
        <Button size="ssm">smm</Button>
        <Button btnType="warning" size="ssm">smm</Button>
        <Button btnType="success" size="ssm">smm</Button>
        <Button onClick={() => {
            setPlaceholderContent("自己改变")
            Notification
                .open({
                    message: "error" + Math.random(),

                    type: "error",
                    duration: 3
                })
        }}>
            notify
            </Button>
        <Button onClick={() => {
            Notification.open({
                message: "success" + Math.random(),
                type: "success",
                close: true
            })

        }}>
            notify
            </Button>
            <style>

            </style>


        <DropDown overlay={<DropDownMenu>
            1111111
              <p>111</p>
        </DropDownMenu>}>
            下拉列表
          </DropDown>
          <DropDown position="left" overlay={<DropDownMenu>
            1111111
              <p>111</p>
        </DropDownMenu>}>
            下拉列表
          </DropDown>
          <DropDown position="right" overlay={<DropDownMenu>
            1111111
              <p>111</p>
        </DropDownMenu>}>
            下拉列表
          </DropDown>
        <div style={{ marginTop: 50 }}></div>
        <Tag closable>tag1</Tag>
        <Tag type="danger">tag1</Tag>
        <Tag type="info" closable>tag1</Tag>
        <Tag type="success">tag1</Tag>
        <Tag type="warning">tag1</Tag>
        <div style={{ marginTop: 50 }}></div>
        <Alert title="警告"
            type="error"
            showIcon
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
        <Button size="sm" btnType="action">开启</Button>
        <Button style={{ zIndex: 9999 }} onClick={() => {
            if (vis) {
                setVis(false)


            } else {
                console.log(vis);
                setVis(true)
            }
        }}>显示隐藏</Button>
        <Button style={{ zIndex: 9999 }} onClick={() => {
            if (spin) {
                setSpin(false)
            } else {
                console.log(vis);
                setSpin(true)
            }
        }}>Spin</Button>
        <div style={{ marginBottom: 50 }}></div>

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
        <div style={{ marginBottom: 50 }}></div>
        <Modal visible={vis}
            className="modal-big"
            showClose
            title="吴迪" onOk={() => {
                console.log("ok");
                setVis(false)
            }}
            onCancel={() => {
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


        <div style={{ marginBottom: 50 }}></div>
        <Avatar href={sv} border="true" size="lg"></Avatar>
        <Avatar href="https://image.lceda.cn/avatars/2020/10/e36x5ZmcEpm2ibm91N30rs2CZoHeGz8Ew0eR6dKD.jpeg"></Avatar>

        <Textarea
            showTip
            resize={false}
            value="默认值"
            placeholder="请输入"></Textarea>
        <Input className="my" placeholder="name" onChangeInput={(val: string) => {
            console.log(val);
        }}></Input>

        <Switch disabled defaultChecked></Switch>
        <Switch defaultChecked onChange={(checked) => {
            console.log(checked);

        }}></Switch>


        <div style={{ width: 300 }}>

            <Select defaultValue="青玄1"
                placeholder={placeholder}
                onInput={(val) => {
                    console.log(val);
                    let opts = opt.concat([{ value: val, content: val }])
                    setOpt(opts)

                }}
                suffix={<Icon type="" iconType="edit1"></Icon>}
                onChange={(value: string) => {
                    console.log(value);
                }}>
                {opt.map((item) => {
                    return <Option key={item.value} value={item.value}>{item.content}</Option>
                })}

            </Select>

            <Select defaultValue="青玄1"
                placeholder={placeholder}
                onChange={(value: string) => {
                    console.log(value);
                }}>
                <Option value="青玄">青玄title</Option>
                <Option value="name1">name1青玄title</Option>
                <Option value="name2">name2title</Option>
                <Option value="name3">name3title</Option>
                <Option value="name4">name4title</Option>
            </Select>
        </div>
        {/* <Menu
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
        </Menu> */}
        <Tabs defaultActiveKey="0" onChange={(t: string) => { }}>
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


