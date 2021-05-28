# MYSQL

## 基础操作

增删改查

- INSERT

```js
INSERT INTO `news`(`newsID`,`newsTitle`,`newsImg`,`newsContent`,`addTime`) VALUES ([value-1], [value-2], [value-3], [value-4], [value-5])
```

- DELETE

```js
DELETE FROM `news` WHERE 0
```

- UPDATE

```js
UPDATE `news` SET `newsID`=[value-1], `newsTitle`=[value-2], `newsImg`=[value-3], `newsContext`=[value-4], `addTime`=[value-5] WHERE 1
```

- SELECT

```js
SELECT `newsID`, `newsTitle`, `newsImg`, `newsContent`, `addTime` FROM `news` WHERE 1
```
