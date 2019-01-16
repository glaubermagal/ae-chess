import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../src/server'
const allPossibleMoves = require('../src/all_possible_moves.json');

chai.use(chaiHttp);
chai.should();


describe('Chess moves:', () => {
    describe('Impossible coordinates:', () => {
        it('it should return HTTP 400 (bad request) in case of empty coordinate', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should return HTTP 400 (bad request) in case of coordinate "HELLO"', (done) => {
            chai.request(app)
                .get('/?pos=HELLO')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should return HTTP 400 (bad request) in case of coordinate "0"', (done) => {
            chai.request(app)
                .get('/?pos=00')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should return HTTP 400 (bad request) in case of lowercase coordinate "d7"', (done) => {
            chai.request(app)
                .get('/?pos=d7')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });
    describe('Possible coordinates:', () => {
        for (let x of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
            for (let y = 1; y <= 8; y++) {
                const [ turn1, turn2 ] = allPossibleMoves[`${x}${y}`].turns
                it(`the knight in the coordinate ${x}${y} can only go to ${turn1} in one turn and go to ${turn2} in two turns`, (done) => {
                    chai.request(app)
                        .get(`/?pos=${x}${y}`)
                        .end((err, res) => {
                            res.should.have.status(200)
                            chai.expect(res.body[0]).to.have.members(turn1)
                            chai.expect(res.body[1]).to.have.members(turn2)
                            done();
                        });
                });
            }
        }
    });
});
