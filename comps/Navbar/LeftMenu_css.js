import React from 'react';
import { Menu, Grid } from 'antd';
const SubMenu = Menu.SubMenu;
//const MenuItemGroup = Menu.ItemGroup;
import CATEGORY_LIST from './CategoryList.graphql'
import { useQuery } from '@apollo/client';
import Link from 'next/link';
import 'antd/dist/antd.css';

const { useBreakpoint } = Grid;

const LeftMenu = (props) => {

  const { lg } = useBreakpoint()
  const { loading, error, data } = useQuery(CATEGORY_LIST);
  if (loading) return <div>&nbsp;&nbsp;Loading</div>;
  if (error) return <div>&nbsp;&nbsp;Error.</div>;

  const items = data.categoryList[0].children;
  // const ConditionalWrapper = ({ children, condition }) => {
  //   return condition ? children: null
  // }

  const renderMenuItem = (menu, index) => {
    const { name, id, url_key, url_path, path, children_count, level } = menu;
    return (
      children_count > 0 && level < 3 ? renderSubMenuItem(menu, index) : (

        <li key={url_key + '_' + index} >
          <Link href={'/' + url_key + '.html'} key={id}>
            <a onClick={props.onClose}>
              {name}
            </a>
          </Link>
        </li>
      )
    );
  };

  const renderSubMenuItem = (menu, index) => {
    const { name, id, url_key, url_path, path, children } = menu;
    return (
      <>
        <li>
          <Link href={'/' + url_key + '.html'} key={id}>
            <a>
              {name}
            </a>
          </Link>

          <span class="arrow-down"></span>
          <ul key={url_key + '_' + index} className="dropdown">
            {
              children && children.filter(item => item.include_in_menu == 1).map((child, index) => {
                const copy = { ...child };
                copy.url_key = `${url_key}/${child.url_key}`;
                return renderMenuItem(copy, index);
              })
            }
          </ul>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div class="nav-fostrap">
        <ul>
          <Menu mode={lg ? "horizontal" : "inline"} >

            {/* <Menu.Item key="mail">
        <Link href="/"><a>Home</a></Link>
        </Menu.Item> */}
            {

              items.filter(
                item => item.include_in_menu == 1
              ).map(
                menu => renderMenuItem(menu)
              )
            }
            {/* <Menu.Item key="alipay">
        <Link href="/about"><a>About</a></Link>
        </Menu.Item> */}

          </Menu>
        </ul>
      </div>
    </nav>
  );
}

export default LeftMenu;