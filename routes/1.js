function f() {
    console.log(this)
    function a() {
        console.log(this)
    }
    return a
}
f()()