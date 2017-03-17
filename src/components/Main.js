require('normalize.css/normalize.css');
require('styles/App.less');

import React from 'react';

//获取图片相关数据
let imageDatas=require('../data/imageDatas.json');
//利用自执行函数，将图片名信息转成URL路径信息
imageDatas=(function genImageUrl(imageDatasArr) {
    for(let i=0,j=imageDatasArr.length;i<j;i++){
        let singleImageData=imageDatasArr[i];

        singleImageData.imageUrl=require('../images/'+singleImageData.fileName);
        imageDatasArr[i] =singleImageData;
    }
    return imageDatasArr;
})(imageDatas)




class AppComponent extends React.Component {
    render() {
        return (
            <div className="index">
                <div className="notice">
                </div>
            </div>
        );
    }
}

AppComponent.defaultProps = {};

export default AppComponent;
