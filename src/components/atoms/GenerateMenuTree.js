import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import CustomLink from "./CustomLink";

const createMenuHierarchy = (menuData, menuName) => {
  let tree = [],
    mappedArr = {},
    arrElem,
    mappedElem;

  // First map the nodes of the array to an object -> create a hash table.
  for (let i = 0, len = menuData?.length; i < len; i++) {
    arrElem = menuData[i]?.node;
    if (arrElem.menu_name === menuName && arrElem.enabled === true) {
      mappedArr[arrElem.drupal_id] = arrElem;
      if (
        arrElem?.drupal_parent_menu_item != null &&
        arrElem?.drupal_parent_menu_item?.includes("menu_link_content")
      ) {
        let stripped_drupal_id = arrElem?.drupal_parent_menu_item.replace(
          "menu_link_content" + ":",
          ""
        );
        mappedArr[arrElem.drupal_id].drupal_parent_menu_item =
          stripped_drupal_id;
      }
      mappedArr[arrElem.drupal_id]["children"] = [];
    }
  }

  for (let id in mappedArr) {
    if (mappedArr?.hasOwnProperty(id)) {
      mappedElem = mappedArr[id];

      // If the element is not at the root level, add it to its parent array of children.
      if (mappedElem?.drupal_parent_menu_item) {
        mappedArr?.[mappedElem.drupal_parent_menu_item]?.["children"]?.push(
          mappedElem
        );
      }
      // If the element is at the root level, add it to first level elements array.
      else {
        tree.push(mappedElem);
      }
    }
  }

  return tree;
};

const buildLink = (link) => {
  if (link?.link?.options?.attributes?.target) {
    return (
      <CustomLink variant="new-tab" text={link?.title} href={link?.link?.url} />
    );
  } else {
    return (
      <Link activeClassName="active" to={link?.link?.url}>
        {link.title}
      </Link>
    );
  }
};

const buildMenu = (menuArray) => {
  if (!menuArray) {
    return;
  }
  let menu = [];
  for (let item in menuArray) {
    if (menuArray[item].children.length !== 0) {
      menu.push(
        <li key={menuArray[item].drupal_id}>
          {buildLink(menuArray[item])}
          <div>
            <ul className="submenu">{buildMenu(menuArray[item]?.children)}</ul>
          </div>
        </li>
      );
    } else if (menuArray[item]?.link?.options?.attributes?.class) {
      let partition = menuArray[item]?.link?.options?.attributes?.class;
      menu.push(
        <>
          <li
            key={menuArray[item].drupal_id}
            className={partition ? "d-xl-flex" : ""}
          >
            {buildLink(menuArray[item])}
          </li>
          {partition?.[0] && <div className={partition}></div>}
        </>
      );
    } else {
      menu.push(
        <li key={menuArray[item].drupal_id}>{buildLink(menuArray[item])}</li>
      );
    }
  }

  return menu;
};

export const generateMenu = (menuLinks, menuName, type) => {
  let menu;

  if (type === "object") {
    menu = createMenuHierarchy(menuLinks?.edges, menuName);
    return menu;
  }
  menu = createMenuHierarchy(menuLinks?.edges, menuName);

  menu = buildMenu(menu);

  return menu;
};

const Menu = ({ menuName, queryResult, className }) => {
  return (
    <>
      <nav className={className}>
        <ul>{generateMenu(queryResult, menuName)}</ul>
      </nav>
    </>
  );
};

Menu.propTypes = {
  menuName: PropTypes.string,
};

Menu.defaultProps = {
  menuName: `main`,
};

export default Menu;
