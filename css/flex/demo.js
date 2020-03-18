function DP (n) {
	if(n == 1 || n ==2) {
		return n
    }
    let dp1 = 1, dp2 = 2, step;
    for(let i =3; i <= n; i++) {
    	step = dp2 + dp1;
        dp1 = dp2;
        dp2 = step;
	}
    return step;
}

console.log(DP(6))