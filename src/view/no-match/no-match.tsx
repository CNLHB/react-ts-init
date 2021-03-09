import React from 'react'
import {
    Cascader,
    EdaMenu,
    DateTimePicker,
    DropDown,
    DropDownMenu
    , Select, Button, Icon
  } from '../../components/eda-design/index';
export default function NoMatch(){
    return <div>  
         <DateTimePicker selType="before"></DateTimePicker>
         <DateTimePicker selType="before"></DateTimePicker>
         <DropDown position="left" type="click" overlay={<DropDownMenu>
              1111111csdads
              <p>111</p>
          </DropDownMenu>}>
          <div >
                    按钮
              </div>
          </DropDown>
          <DropDown position="right" type="click" overlay={<DropDownMenu>
              1111111csdads
              <p>111</p>
          </DropDownMenu>}>
          <div >
                    按钮
              </div>
          </DropDown>
          <DropDown position="center" type="click" overlay={<DropDownMenu>
              1111111csdads
              <p>111</p>
          </DropDownMenu>}>
          <div >
                    按钮
              </div>
          </DropDown>
          <DropDown position="center" overlay={<DropDownMenu>
              1111111csdads
              <p>111</p>
          </DropDownMenu>}>
          <div >
                    按钮
              </div>
          </DropDown>
    </div>
}