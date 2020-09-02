interface IPerson {
  readonly id: number; // 只读刷新
  name: string;
  age: number;
  address?: string; // 可选属性
}

const viking: IPerson = {
  id: 1212,
  name: "122",
  age: 12,
  // color: "blue",  添加接口没有的属性会报错
}
// viking.id = 122;  // 会报错
viking.name = "122";
