import * as React from "react";
import injectSheet, { StyledComponentProps, StyleCreator } from "react-jss";
import classNames from "classnames";

import { ITheme } from "../../styles/theme";

export interface ICardHeaderProps extends StyledComponentProps {
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  action?: React.ReactNode;
}

const CardHeader: React.FC<ICardHeaderProps> = ({
  classes,
  title,
  description,
  action,
  className
}) => {
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [className]: className
      })}
    >
      {(title || description) && (
        <div className={classes.headerTitle}>
          {title && <span className={classes.title}>{title}</span>}
          {description && (
            <span className={classes.description}>{description}</span>
          )}
        </div>
      )}
      {action && <div className={classes.action}>{action}</div>}
    </div>
  );
};

const styles: StyleCreator = (theme: ITheme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  headerTitle: {
    flex: 1
  },
  title: {
    fontWeight: "bold"
  },
  description: {
    display: "block",
    color: theme.colors.gray[3],
    fontSize: 14,
    marginTop: 5
  }
});

export default injectSheet(styles)(CardHeader);