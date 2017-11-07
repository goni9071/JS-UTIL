var RandomUtil = {};
RandomUtil.getRandomInt = function(최소값, 최대값) {
    return Math.floor((Math.random() * (최대값 - 최소값 + 1)) + 최소값);
};