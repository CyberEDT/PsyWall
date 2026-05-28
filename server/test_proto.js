const hasPrototypePollution = (obj) => {
    if (!obj || typeof obj !== 'object') return false;

    for (const key in obj) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            return true;
        }
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            if (hasPrototypePollution(obj[key])) {
                return true;
            }
        }
    }
    return false;
};

const obj = JSON.parse('{"__proto__": {"polluted": true}}');
console.log('hasPrototypePollution(obj):', hasPrototypePollution(obj));
