import React from "react";
import _ from "lodash";
import FadeIn from "react-fade-in";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar,
} from "@material-ui/core";
import PageviewIcon from "@material-ui/icons/Pageview";
import { Link } from "react-router-dom";

const MyCard = ({
  items,
  subtitle1,
  subtitble2,
  linkTo,
  customStyle,
  textProperty = "name",
}) => {
  return (
    <React.Fragment>
      <div className="row w-100 h-100 align-content-center justify-content-center m-0 p-3">
        {items.map((item) => (
          <FadeIn className={`${customStyle} my-3`} key={item._id || item.name}>
            <Link to={linkTo(item)} className="text-decoration-none">
              <CardActionArea className="w-100 h-100">
                <Card className="w-100 h-100 myCard">
                  <Avatar className="bg-primary ml-2 mt-1">
                    <PageviewIcon />
                  </Avatar>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {item[textProperty]}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {_.get(item, subtitle1)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {subtitble2}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Link>
          </FadeIn>
        ))}
      </div>
    </React.Fragment>
  );
};

export default MyCard;
