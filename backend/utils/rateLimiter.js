const usage = new Map();

const limitPerIP = (limit = 5) => {
    setInterval(() => {
        usage.clear();
    }, 60 * 60 * 1000); // Clear every hour
    return (req, res, next) => {
        const ip = req.ip;
        const count = usage.get(ip) || 0;

        if (count >= limit) {
        return res.status(429).json({ message: 'API limit reached for this demo.' });
        }

        usage.set(ip, count + 1);
        next();
    };
};

module.exports = { limitPerIP }