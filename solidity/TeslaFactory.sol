// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^0.8.16;

contract TeslaFactory {
    int private teslaId;

    struct Tesla { 
        int id;
        string model;
    }

    mapping(address => Tesla) private owners;

    event TeslaCreared(address owner, Tesla tesla);

    function createTesla() public {
        teslaId++;
        Tesla memory tesla = Tesla(teslaId, "Model X");

        owners[msg.sender] = tesla;
        emit TeslaCreared(msg.sender, tesla);
    }        

    function hasTesla() public view returns (bool) {
        return owners[msg.sender].id > 0;
    }
}
