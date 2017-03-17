import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';

require('normalize.css/normalize.css');
require('styles/App.less');

// 获取图片相关的数据
let imageDatas=require('./data/imageDatas.json');
//利用自执行函数，将图片名信息转成URL路径信息
imageDatas=(function genImageUrl(imageDatasArr) {
    for(let i=0,j=imageDatasArr.length;i<j;i++){
        let singleImageData=imageDatasArr[i];

        singleImageData.imageUrl=require('./images/'+singleImageData.fileName);
        imageDatasArr[i] =singleImageData;
    }
    return imageDatasArr;
})(imageDatas)

var ImgFigure = React.createClass({
    render:function () {
        return (
            <figure className="img-figure">
                <img src={this.props.data.imageUrl} alt={this.props.data.title} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
})


let GalleryByReactApp =React.createClass({
    render:function() {
        let controllerUnits=[],
            imgFigures=[];
        imageDatas.map(function (value) {
            imgFigures.push(<ImgFigure data={value}/>)
        })
        return (
            <section className="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
})

// Render the main component into the dom
ReactDOM.render(<GalleryByReactApp />, document.getElementById('app'));
module.exports = GalleryByReactApp;