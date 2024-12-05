const {Web3} = require('web3');

// Connect to your Ethereum network
const web3 = new Web3('http://localhost:8545');

// Staking contract ABI and address
const stakingContractABI =  [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "positionId",
          "type": "uint256"
        }
      ],
      "name": "calculateReward",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "positionId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "newUnlockDate",
          "type": "uint256"
        }
      ],
      "name": "changeUnlockDate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "positionId",
          "type": "uint256"
        }
      ],
      "name": "closePosition",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentPositionId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        }
      ],
      "name": "getInterestRate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLockPeriods",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLockPeriodsPositions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "positionId",
          "type": "uint256"
        }
      ],
      "name": "getPositionById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "positionId",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "walletAddress",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "createdDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "unlockDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "percentInterest",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weiStaked",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weiInterest",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "open",
              "type": "bool"
            }
          ],
          "internalType": "struct Staking.Position",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        }
      ],
      "name": "getPositionIdsForAddress",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lockPeriods",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "basisPoints",
          "type": "uint256"
        }
      ],
      "name": "modifyLockPeriods",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "positionIdsByAddress",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "positions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "positionId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "walletAddress",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "createdDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "unlockDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "percentInterest",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "weiStaked",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "weiInterest",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "open",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "numDays",
          "type": "uint256"
        }
      ],
      "name": "stakeEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tiers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
const stakingContractAddress = process.env.STAKING_CONTRACT_ADDRESS;
const stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);

async function stakeEther(numDays, amount, userAddress) {
    try {
        const stakeData = stakingContract.methods.stakeEther(numDays).encodeABI();
        const gas = await web3.eth.estimateGas({
            from: userAddress,
            to: stakingContractAddress,
            data: stakeData,
            value: amount
        });

        const balance = await web3.eth.getBalance(userAddress);
        if (balance < amount) {
            return { success: false, error: 'Insufficient balance' };
        }

        const transaction = {
            from: userAddress,
            to: stakingContractAddress,
            data: stakeData,
            gas: gas,
            value: amount
        };
        const receipt = await web3.eth.sendTransaction(transaction);
        console.log('Staking receipt:', receipt);

        return { success: true, transactionHash: receipt.transactionHash, data: receipt, userBalance: balance };
    } catch (error) {
        console.error('Error during staking:', error);
        throw new Error('Failed to stake tokens');
    }
}

async function unstakeEther(positionId, userAddress) {
    try {
        const unstakeData = stakingContract.methods.closePosition(positionId).encodeABI();
        const gas = await web3.eth.estimateGas({
            from: userAddress,
            to: stakingContractAddress,
            data: unstakeData
        });

        const transaction = {
            from: userAddress,
            to: stakingContractAddress,
            data: unstakeData,
            gas: gas,
        };
        const receipt = await web3.eth.sendTransaction(transaction);

        return { success: true, transactionHash: receipt.transactionHash, data: receipt };
    } catch (error) {
        console.error('Error during unstaking:', error);
        throw new Error('Failed to unstake tokens');
    }
}

async function getStakingInfo(userAddress) {
    try {
        const positionIds = await stakingContract.methods.getPositionIdsForAddress(userAddress).call();

        const positions = [];
        for (const positionId of positionIds) {
            const position = await stakingContract.methods.getPositionById(positionId).call();
            const reward = await stakingContract.methods.calculateReward(positionId).call();

            positions.push({
                ...position,
                reward: reward
            });
        }

        return { positions };
    } catch (error) {
        console.error('Error fetching staking info:', error);
        throw new Error('Failed to fetch staking info');
    }
}

module.exports = {
    stakeEther,
    unstakeEther,
    getStakingInfo
};