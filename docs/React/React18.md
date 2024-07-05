# React18
- 并发渲染：能够中断和恢复渲染过程，从而更好的管理UI更新的优先级
- 可中断渲染：在渲染过程中暂停优先级低的任务，如响应用户输入
- 自动批处理: 状态更新默认会被批量处理，这意味着如果在一个事件处理过程中触发多个setState，React会尝试一次性执行他们，减少重新渲染次数，从而提高性能
- 服务器端渲染的改进(SSR)： 支持流式传输，减少不必要的重新渲染
- 新的API
  - `useTransition` 和 `useDeferredValue` 控制状态更新的优先级和延迟非紧急更新，以优化体验
  - `useId`：为组件生成稳定的ID
  - 更新根的api，以启用并发模式和其他特性
- 严格模式加强（StrictMode）
~~~ts
import React, { useState, useTransition } from 'react';

function List() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [isPending, startTransition] = useTransition();

  const addItem = () => {
    // 使用useTransition开始一个非紧急状态更新
    startTransition(() => {
      setItems([...items, items.length + 1]);
    });
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ transition: 'all 0.5s', opacity: isPending ? 0.5 : 1 }}>
            Item {item}
          </li>
        ))}
      </ul>
      {isPending && <div>Loading...</div>}
    </div>
  );
}

export default List;e
~~~
用 Suspense 优化
~~~ts
import { Suspense } from 'react';
import { fetchData } from './api';

function DataFetchingComponent() {
  const data = fetchData();
  return <div>{data.message}</div>;
}

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DataFetchingComponent />
      </Suspense>
    </div>
  );
}
~~~