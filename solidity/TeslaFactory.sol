// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.16;

contract TeslaFactory {
    int private teslaId;

    A type that contains collection of variables
    struct Tesla { 
        int id;
        string model;
    }

    // Key value mapping between owner's address and Tesla
    mapping(address => Tesla) private buyers;

    event TeslaSold(address buyer, Tesla tesla);

    function buyTesla() public {
        teslaId++;

        // memory variable will mark this data as temporary and will be used only inside this function
        Tesla memory tesla = Tesla(teslaId, "Model X");

        // msg is a global variable contains access properties (e.g. caller address, etc.)
        buyers[msg.sender] = tesla;
        emit TeslaSold(msg.sender, tesla);
    }        

    function hasTesla() public view returns (bool) {
        return buyers[msg.sender].id > 0;
    }
}
