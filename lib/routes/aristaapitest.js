var express = require('express');
var router = express.Router();
var {
    stakeEther,
    unstakeEther,
    getStakingInfo
} = require('./../controller/aristaController');
const rateLimit = require('express-rate-limit');

// Rate limiting middleware (2 requests within 2 minutes)
const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 2, 
    message: { error: 'Too many requests, please try again later.' } 
});

router.use(function timeLog(req, res, next) {
    req.txRequest = req.body && req.body.payload;
    if (req.txRequest) {
        console.log(`Arista API test runing ${Date.now()} ${req.txRequest.messageType}`);
    } 
    next();
});

// Route to send "Hello, world!" JSON data
router.get('/hello2', (req, res) => {
    res.json({ message: 'Hello, world! from arista' });
});

router.post('/stake', async (req, res) => {
    try {
        const { numDays, amount, userAddress } = req.body;
        const rawData = await stakeEther(numDays, amount, userAddress);
        console.log(rawData)
        const result = rawData.data;

        if(rawData.success === false) {
            return res.status(400).json({ error: rawData.error });
        }

        // Assuming 'result' now contains the complete transaction receipt
        const formattedResult = {
            cumulativeGasUsed: Number(result.cumulativeGasUsed),
            logsBloom: result.logsBloom,
            logs: result.logs,
            success: rawData.success,
            type: Number(result.type),
            transactionHash: result.transactionHash,
            transactionIndex: Number(result.transactionIndex),
            from: result.from,
            to: result.to,
            gasUsed: Number(result.gasUsed),
            effectiveGasPrice: Number(result.effectiveGasPrice),
            blockHash: result.blockHash,
            blockNumber: Number(result.blockNumber)
        };

        res.json(formattedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/unstake', async (req, res) => {
    try {
        const { positionId, userAddress } = req.body;
        const stakingInfo = await getStakingInfo(userAddress);
        const position = stakingInfo.positions.find(p => Number(p.positionId) === Number(positionId));
        if (!position) {
            return res.status(400).json({ error: 'Position not found' });
        }
        if (!position.open || position.walletAddress.toLowerCase() !== userAddress.toLowerCase()) {
            return res.status(400).json({ error: 'Invalid position or unauthorized' });
        }
        const stakedAmount = Number(position.weiStaked);
        if (stakedAmount <= 0) {
            return res.status(400).json({ error: 'No staked tokens found for this position' });
        }
        const rawData = await unstakeEther(positionId, userAddress);
        const result = rawData.data
        const formattedResult = {
            cumulativeGasUsed: Number(result.cumulativeGasUsed),
            logsBloom: result.logsBloom,
            logs: result.logs,
            success: rawData.success,
            type: Number(result.type),
            transactionHash: rawData.transactionHash,
            transactionIndex: Number(result.transactionIndex),
            from: result.from,
            to: result.to,
            gasUsed: Number(result.gasUsed),
            effectiveGasPrice: Number(result.effectiveGasPrice),
            blockHash: result.blockHash,
            blockNumber: Number(result.blockNumber)
        };
        console.log("data result unstake: ",result);
        res.json(formattedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/staking-info/:userAddress', async (req, res) => {
    try {
        const userAddress = req.params.userAddress;
        const stakingInfo = await getStakingInfo(userAddress);

        // Filter positions to only include those matching the userAddress
        const filteredPositions = stakingInfo.positions.filter(position => position.walletAddress.toLowerCase() === userAddress.toLowerCase()); 

        // Format and return the filtered positions
        const formattedPositions = filteredPositions.map(position => ({
            positionId: Number(position.positionId),
            walletAddress: position.walletAddress,
            createdDate: new Date(Number(position.createdDate) * 1000).toLocaleDateString(),
            unlockDate: new Date(Number(position.unlockDate) * 1000).toLocaleDateString(),
            percentInterest: Number(position.percentInterest),
            weiStaked: Number(position.weiStaked),
            weiInterest: Number(position.weiInterest),
            open: position.open,
            reward: Number(position.reward)
        }));

        res.json({ positions: formattedPositions }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;