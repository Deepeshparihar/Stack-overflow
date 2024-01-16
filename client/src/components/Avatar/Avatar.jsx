import React from "react";

const Avatar = ({ children, backgroundColor, padding,px,py,cursor, borderRadius,color,fontSize,textAlign }) => {
  const style = {
    backgroundColor,
    padding:`${px} ${py}`,
    borderRadius,
    color: color || 'black',
    fontSize,
    textAlign : 'center',
    cursor: cursor || null,
    textDecoration: "none"
  };

  return <div style={style}>{children}</div>;
};

export default Avatar;
