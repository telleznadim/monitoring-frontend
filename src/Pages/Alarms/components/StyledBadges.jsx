import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

const styles = (theme) => ({
  customBadge: {
    backgroundColor: (props) => props.customStyles.backgroundColor,
    color: (props) => props.customStyles.color,
    border: "solid",
    borderColor: (props) => props.customStyles.borderColor,
  },
});

function SimpleBadge(props) {
  const { classes, badgeContent } = props;
  return (
    <div>
      <Badge
        classes={{ badge: classes.customBadge }}
        className={classes.margin}
        badgeContent={badgeContent}
      >
        {props.children}
      </Badge>
    </div>
  );
}
export const StyledBadge = withStyles(styles)(SimpleBadge);
