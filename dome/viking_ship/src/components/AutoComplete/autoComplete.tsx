import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  ReactElement,
  useRef,
} from "react";
import classNames from "classnames";

import Input, { InputProps } from "../Input/input";
import Transition from "../Transition/transition";
import Icon from "../Icon/icon";

import useClickOutside from "../../hooks/useClickOutside";
import useDebounce from "../../hooks/useDebounce";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject; // T 泛型  T+DataSourceObject
export interface IAutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**获取下下拉单数据 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>; // [{value: "adf", number:123}]
  /**被选中的item对象 */
  onSelect?: (item: DataSourceType) => void;
  /**下拉单列表单一行的dom */
  renderOption?: (item: DataSourceType) => ReactElement;
}
/**
 * #### 引用
 * ~~~js
 * import { AutoComplete} from "vikingship"
 * ~~~
 */
export const AutoComplete: FC<IAutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false); // 可以看做javasctipt对象
  const componentRef = useRef<HTMLDivElement>(null); // 连到dom
  const debouncedValue = useDebounce(inputValue, 300);

  useClickOutside(componentRef, () => {
    // 绑定 点击外部的时候需要的行为
    setSuggestions([]);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSuggestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
  }, [debouncedValue, fetchSuggestions]); // 加fetchSuggestions限制useEffect渲染

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSuggestions([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};
export default AutoComplete;
