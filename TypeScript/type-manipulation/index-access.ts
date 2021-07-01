const test = ['tesla', 'modelseries'] as const;

type testType = typeof test;

// 访问testType类型的数组类型，并返回联合类型
type tesla = testType[number];

type ExpectedTuple = [number, number, number];

// 访问元祖的长度
type ExpectedLen = ExpectedTuple['length'];