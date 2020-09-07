import React from "react";
import { CSSTransition } from "react-transition-group"; // 使用不同的class
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionExtendProps = {
  animation?: AnimationName;
  wrapper?: boolean;
};
type TransitionProps = TransitionExtendProps & CSSTransitionProps;
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    // unmountOnExit
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};
export default Transition;
