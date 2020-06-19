import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import DeleteButton from "../common/DeleteButton";

const ListItems = ({
  items,
  selectedItem,
  linkTo,
  handleSelect,
  deleteButton,
  onDelete,
  secondTextProperty = "",
  textProperty = "name",
  valueProperty = "_id",
}) => {
  return (
    <List component="ul">
      {items.map((item) => (
        <React.Fragment key={item[valueProperty]}>
          {linkTo && (
            <div className="row align-items-center">
              <Link to={linkTo(item)} className="text-decoration-none col-10">
                <ListItem
                  button
                  onClick={() => handleSelect(item)}
                  selected={selectedItem === item}
                >
                  <ListItemText
                    primary={item[textProperty]}
                    className="text-white text-center"
                  />
                  {secondTextProperty && (
                    <ListItemText
                      primary={item[secondTextProperty]}
                      className="text-center text-dark"
                    />
                  )}
                </ListItem>
                <Divider />
              </Link>
              {deleteButton && (
                <div className="col-2">
                  <DeleteButton
                    handleClick={() => onDelete(item)}
                    className="deleteButton"
                  />
                </div>
              )}
            </div>
          )}

          {!linkTo && (
            <React.Fragment className="row align-items-center">
              <div className="col-10">
                <ListItem
                  button
                  onClick={() => handleSelect(item)}
                  selected={selectedItem === item}
                  className="text-center"
                >
                  <ListItemText
                    primary={item[textProperty]}
                    className="text-white text-center"
                  />
                  {secondTextProperty && (
                    <ListItemText
                      primary={item[secondTextProperty]}
                      className="text-center text-dark"
                    />
                  )}
                </ListItem>
                <Divider />
              </div>
              {deleteButton && (
                <div className="col-2">
                  <DeleteButton
                    handleClick={() => onDelete(item)}
                    className="deleteButton"
                  />
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

// ListItems.defaultProps = {
//   textProperty: "name",
//   valueProperty: "_id",
// };

export default ListItems;
