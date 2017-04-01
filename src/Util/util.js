/*
 * 获取区间内的一个随机值
 */
export function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}
/*
 * 获取 0~30° 之间的一个任意正负值
 */
export function get30DegRandom() {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}
/*
 * 将图片名信息转成图片URL路径信息
 */
export function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
}
