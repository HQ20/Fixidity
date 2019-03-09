const FixidityLibMock = artifacts.require('./FixidityLibMock.sol');
const BigNumber = require('bignumber.js');
const chai = require('chai');

const { itShouldThrow } = require('../../utils');
// use default BigNumber
chai.use(require('chai-bignumber')()).should();


contract('FixidityLibMock - multiply', () => {
    let fixidityLibMock;
    // eslint-disable-next-line camelcase
    let fixed_1;
    // eslint-disable-next-line camelcase
    let fixed_e;
    // eslint-disable-next-line camelcase
    let max_fixed_mul;
    // eslint-disable-next-line camelcase
    let mul_precision;
    // eslint-disable-next-line camelcase
    let max_fixed_add;


    before(async () => {
        fixidityLibMock = await FixidityLibMock.deployed();
        // eslint-disable-next-line camelcase
        fixed_1 = new BigNumber(await fixidityLibMock.fixed_1());
        // eslint-disable-next-line camelcase
        fixed_e = new BigNumber(await fixidityLibMock.fixed_e());
        // eslint-disable-next-line camelcase
        max_fixed_mul = new BigNumber(await fixidityLibMock.max_fixed_mul());
        // eslint-disable-next-line camelcase
        mul_precision = new BigNumber(await fixidityLibMock.mul_precision());
        // eslint-disable-next-line camelcase
        max_fixed_add = new BigNumber(await fixidityLibMock.max_fixed_add());
    });

    describe('multiply', () => {
        it('multiply(max_fixed_mul(),0)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    0,
                    0,
                ),
            );
            result.should.be.bignumber.equal(0);
        });
        it('multiply(max_fixed_mul(),0)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    max_fixed_mul.toString(10),
                    0,
                ),
            );
            result.should.be.bignumber.equal(0);
        });
        it('multiply(0, max_fixed_mul())', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    0,
                    max_fixed_mul.toString(10),
                ),
            );
            result.should.be.bignumber.equal(0);
        });
        it('multiply(max_fixed_mul(),fixed_1())', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    max_fixed_mul.toString(10),
                    fixed_1.toString(10),
                ),
            );
            result.should.be.bignumber.equal(max_fixed_mul);
        });
        it('multiply(fixed_1(),max_fixed_mul())', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.toString(10),
                    max_fixed_mul.toString(10),
                ),
            );
            result.should.be.bignumber.equal(max_fixed_mul);
        });
        it('multiply(fixed_1()*2,fixed_1()*2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2).toString(10),
                    fixed_1.multipliedBy(2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(4));
        });
        it('multiply(fixed_1()*2,fixed_1()*2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2).toString(10),
                    fixed_1.multipliedBy(2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(5));
        });
        it('multiply(fixed_1()*2.5,fixed_1()*2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2).toString(10),
                    fixed_1.multipliedBy(2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(5));
        });
        it('multiply(fixed_1()*0.5,fixed_1()*0.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(0.5).toString(10),
                    fixed_1.multipliedBy(0.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(0.25));
        });
        it('multiply(fixed_1()/mul_precision(),fixed_1()*mul_precision())', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.dividedBy(mul_precision).toString(10),
                    fixed_1.dividedBy(mul_precision).toString(10),
                ),
            );
            result.should.be.bignumber.equal(1);
        });
        it('multiply(fixed_1()*2.5,fixed_1()*2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2.5).toString(10),
                    fixed_1.multipliedBy(2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(6.25));
        });

        it('multiply(fixed_1()*-2,fixed_1()*-2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2).toString(10),
                    fixed_1.multipliedBy(-2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(4));
        });
        it('multiply(fixed_1()*-2,fixed_1()*2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2).toString(10),
                    fixed_1.multipliedBy(2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-4));
        });
        it('multiply(fixed_1()*2,fixed_1()*-2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2).toString(10),
                    fixed_1.multipliedBy(-2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-4));
        });

        it('multiply(fixed_1()*-2.5,fixed_1()*-2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2.5).toString(10),
                    fixed_1.multipliedBy(-2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(5));
        });
        it('multiply(fixed_1()*-2.5,fixed_1()*2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2.5).toString(10),
                    fixed_1.multipliedBy(2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-5));
        });
        it('multiply(fixed_1()*2.5,fixed_1()*-2)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2.5).toString(10),
                    fixed_1.multipliedBy(-2).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-5));
        });

        it('multiply(fixed_1()*-2,fixed_1()*-2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2).toString(10),
                    fixed_1.multipliedBy(-2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(5));
        });
        it('multiply(fixed_1()*-2,fixed_1()*2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2).toString(10),
                    fixed_1.multipliedBy(2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-5));
        });
        it('multiply(fixed_1()*2,fixed_1()*-2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2).toString(10),
                    fixed_1.multipliedBy(-2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-5));
        });

        it('multiply(fixed_1()*-2.5,fixed_1()*-2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2.5).toString(10),
                    fixed_1.multipliedBy(-2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(6.25));
        });
        it('multiply(fixed_1()*-2.5,fixed_1()*2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(-2.5).toString(10),
                    fixed_1.multipliedBy(2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-6.25));
        });
        it('multiply(fixed_1()*2.5,fixed_1()*-2.5)', async () => {
            const result = new BigNumber(
                await fixidityLibMock.multiply(
                    fixed_1.multipliedBy(2.5).toString(10),
                    fixed_1.multipliedBy(-2.5).toString(10),
                ),
            );
            result.should.be.bignumber.equal(fixed_1.multipliedBy(-6.25));
        });
        itShouldThrow('multiply(max_fixed_add(),max_fixed_add())', async () => {
            await fixidityLibMock.add(
                max_fixed_add.toString(10),
                max_fixed_add.toString(10),
            );
        }, 'revert');
        // TODO: Test limits
        /*
        * Test multiply(max_fixed_mul()-1,max_fixed_mul()) equals multiply(max_fixed_mul(),max_fixed_mul()-1)
        * Test multiply(max_fixed_mul(),max_fixed_mul()) returns max_int256() // Probably not to the last digits
        * Test multiply(max_fixed_mul()+1,max_fixed_mul()) fails // Maybe it will need to be +fixed_1() to fail
        * Test multiply(max_fixed_mul(),max_fixed_mul()+1) fails // Maybe it will need to be +fixed_1() to fail
        */
    });
});
