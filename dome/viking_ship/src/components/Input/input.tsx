import React, {
  FC,
  InputHTMLAttributes,
  ReactElement,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用Input */
  disabled?: boolean;
  /**设置input 大小 支持 lg 或是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement;
  /**input说明 */
  ariaLabel?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * Input 输入框
 * ~~~js
 * import {Input} from "vikingship"
 * ~~~
 * 支持HTMLInput的所有基础属性
 */
export const Input: FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    style,
    ariaLabel,
    ...restProps
  } = props;
  const cnames = classNames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        aria-label={ariaLabel}
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};
Input.defaultProps = {
  placeholder: "请输入",
  ariaLabel: "my input",
};
export default Input;
