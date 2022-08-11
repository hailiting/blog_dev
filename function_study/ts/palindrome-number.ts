function findPalindromeNumbers3(max: number): number[] {
  const res: number[] = [];
  if (max <= 0) return res;
  for (let i = 1; i <= max; i++) {
    let n = i;
    let rev = 0;
    while (n > 0) {
      rev = rev * 10 + (n % 10);
      n = Math.floor(n / 10);
    }
    if (i === rev) res.push(i);
  }
  return res;
}
console.info(findPalindromeNumbers3(200));
