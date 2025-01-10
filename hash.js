module.exports = {
    basicHash:function(string) {
        // Not the best due to high collision chance.
        var hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = ((hash << 5) - hash + string.charCodeAt(i) | 0);
        }
        return (hash >>> 0).toString(36);
    }
}