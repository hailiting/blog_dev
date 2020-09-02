function sum(x, y) {
    return x + y;
}
var sum1 = sum;
function nameResolver(arg) {
    if (typeof arg === "string") {
        return arg;
    }
    else {
        return arg();
    }
}
