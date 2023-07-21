# TypeScript 常用操作符

- pick 操作符可以用来从一个类型中选择部分属性，返回新的类型

```js
type Person = {
  name: string,
  age: number,
  gender: string,
};
type PersonNameAndAge = Pick<Person, "name" | "age">;
// 等同于 type PersonNameAndAge = {name: string; age: number;}
```

- keyof 操作符可以用来获取一个类型的所有属性名，返回一个字符串字面量联合类型

```js
type Person = {
  name: string,
  age: number,
  gender: string,
};
type PersonKeys = keyof Person;
// type PersonKeys = "name" | "age" | "gender"
```

- typeof 操作符可以用来获取一个值的类型，返回一个类型

```js
const person = {
  name: "张三",
  age: 18,
  gender: "男",
};
type Person = typeof person;
```

- `Parital<T>`将类型 T 中的所有属性转换为可选属性，返回新类型

```js
type Person = {
  name: string,
  age: number,
  gender: string,
};
type ParitalPerson = Partial<Person>;
// 等同于  {
//   name?: string,
//   age?: number,
//   gender?: string,
// };
```

- `Required<T>`将所有属性转换为必选属性，返回新类型

```js
type Person = {
  name?: string,
  age?: number,
  gender?: string,
};
type RequiredPerson = Required<Person>;
```

- `Readonly<T>` 所有属性转为只读

```js
type Person = {
  name?: string,
  age?: number,
  gender?: string,
};
type ReadonlyPerson = Readonly<Person>;
// 等同于 { readonly name: string; readonly age: number; readonly gender: string; }
```

- `Record<K, T>`创建一个包含属性名为 K，属性类型为 T 的对象类型

```js
type Person = {
  name?: string,
  age?: number,
  gender?: string,
};
type RecordPerson = Record<"person1" | "person2", Person>;
// 等同于 { person1: Person; person2: Person; }
```

- `Exclude<T, U>` 从类型 T 中排除所有可以赋值给类型 U 的类型

```js
type MyExclude = Exclude<"a" | "b" | "c", "a" | "b">;
// 等同于 c
```

- `Extract<T, U>` 从类型 T 中提取所有可以赋值给类型 U 的类型，返回一个新类型

```js
type MyExclude = Extract<"a" | "b" | "c", "a" | "b">;
```

- `Omit<T, K>` 从类型 T 中

```js
type Person = {
  name: string,
  age: number,
  gender: string,
};
type PersonWithoutAge = Omit<Person, "age">;
// 等同于 {
//   name: string,
//   age: number,
// }
```

- `NonNullable<T>`将类型 T 中的所有可选属性转换为必选属性

```js
// Required
type Person = {
  name: string,
  age?: number,
  gender?: string,
};
type NonNullablePerson = NonNullable<Person>;
// 等同于 { name: string; age: number; gender: string; }
```

- `ReturnType<T>` 获取函数类型 T 的返回值类型

```js
function greet(name: string): string {
  return "ssss";
}
type GreetReturnType = ReturnType<typeof greet>;
```

- `Parameters<T>` 获取函数类型 T 的参数类型组成的元祖类型

```js
function greet(name: string, age: number): string {
  return `Hello, ${name}! You are ${age} years old`;
}
type GreetParameters = Parameters<typeof greet>;
```
