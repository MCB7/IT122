import { expect } from 'chai';
import * as data from "../data.js";

describe("Data", function() {
    
    it("returns requested human", function() {
        let result = data.getItem("bill");
        expect(result).to.deep.equal({name : "bill", age :30, color:"blue", shape : "circle"});
    });
    
    it("fails to return an w/ invalid human", function() {
        let result = data.getItem("fake");
        expect(result).to.be.undefined;
    });

    it("adds a new human", function() {
        let result = data.addItem({name : "henry", age : 42, color : "magenta", shape: "orb"});
        expect(result.added).to.be.true;
    });
    it("fails to add an existing human", function() {
        let result = data.addItem({name : "bill", age :30, color:"blue", shape : "circle"});
        expect(result.added).to.be.false;
    });

    it("deletes an existing human", function() {
        let result = data.deleteItem("bill");
        expect(result.deleted).to.be.true;
    });
    it("fails to delete an invalid human", function() {
        let result = data.deleteItem("george");
        expect(result.deleted).to.be.false;
    });

});