'use strict';

var React = require('react/addons');
var { getRangeRandom, get30DegRandom, genImageURL} = require('../Util/util');
var ControllerUnit = require('./ControllerUnit');
var ImgFigure = require('./ImgFigure');
// less
require('../styles/style.less');

// 获取图片相关的数据
var imageDatas = require('../data/imageDatas.json');

// 将图片名信息转成图片URL路径信息
imageDatas = genImageURL(imageDatas);
var GalleryByReactApp = React.createClass({
    //初始化图片位置
    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        // 水平方向的取值范围
        hPosRange: {
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        // 垂直方向的取值范围
        vPosRange: {
            x: [0, 0],
            topY: [0, 0]
        }
    },
    inverse: function (index) {
        return function () {
            var imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    },
    /*
     * 重新布局所有图片
     * @param centerIndex 指定居中排布哪个图片
     */
    rearrange: function (centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,//位置属性
            centerPos = Constant.centerPos,//中间范围
            // 水平方向的取值范围
            hPosRange = Constant.hPosRange,//水平范围
            hPosRangeLeftSecX = hPosRange.leftSecX,//左侧区域的水平范围
            hPosRangeRightSecX = hPosRange.rightSecX,//右侧区域的水平范围
            hPosRangeY = hPosRange.y,//两侧的Y轴范围
            //垂直方向的取值范围
            vPosRange = Constant.vPosRange,//垂直范围
            vPosRangeTopY = vPosRange.topY,//中间上侧区域 垂直的取值范围
            vPosRangeX = vPosRange.x,//中间上侧区域 的取值范围

            imgsArrangeTopArr = [],//
            topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
            topImgSpliceIndex = 0,

            //截取出位于中心位置的图片  先处理
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);//获取中间图片的信息

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        // 随机获取出:除了中间位置图片 中的随机一张  topImgSpliceIndex为这张图片的位置，放回图片的时候要用到
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        //截取这一张，如果topImgNum为0 则不截取
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });
        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length; i < j; i++) {
            var hPosRangeLORX = null;
            // 前半部分布局左边， 右半部分布局右边
            if (Math.random() < 0.5) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };

        }
        //上面代码为：位置信息处理和生成随机值

        //下面的代码为重新合并数组
        //把位于上侧区域的一张图片放回原来的位置
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        //把中心位置的图片放回原来的位置
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        //设置state 可以触发重新渲染
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    },
    /*
     * 利用arrange函数， 居中对应index的图片
     * @param index, 需要被居中的图片对应的图片信息数组的index值
     * @returns {Function}
     */
    center: function (index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    },
    getInitialState: function () {
        return {
            imgsArrangeArr: [
                /*{
                 pos: {
                 left: '0',
                 top: '0'
                 },
                 rotate: 0,           // 旋转角度
                 isInverse: false,    // 图片正反面
                 isCenter: false,     // 图片是否居中
                 }*/
            ]
        };
    },
    // 组件加载以后， 为每张图片计算其位置的范围
    componentDidMount: function () {
        //scrollWidth 对象实际内容宽度，不包含滚动条等边性宽度内容，会随对象中内容超过可视区后扩大
        //clientWidth 对象内容的可视区的宽度，不包含滚动条等边线，会随对象显示大小的变化而改变
        //offsetWidth 对象整体实际宽度，包含滚动条等边线，会随对线显示大小的变化而改变
        // 首先拿到舞台的大小
        var stageDOM = React.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);
        // 拿到一个imageFigure的大小
        var imgFigureDOM = React.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);
        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };
        // 计算左侧，右侧区域图片排布位置的取值范围 top和left 所以
        //左侧 X轴范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        //右侧 X轴范围
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        //高度范围
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        //
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        // Math.floor( Math.random( ) * imageDatas.length )

        this.rearrange(Math.floor(Math.random() * imageDatas.length));
    },
    render: function () {
        var controllerUnits = [],
            imgFigures = [];
        imageDatas.forEach(function (value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: <false></false>
                };
            }
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index}
                                       arrange={this.state.imgsArrangeArr[index]}
                                       inverse={this.inverse(index)}
                                       center={this.center(index)}/>);
            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
                                                 inverse={this.inverse(index)} center={this.center(index)}/>);
        }.bind(this));
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});
React.render(<GalleryByReactApp />, document.getElementById('content')); // jshint ignore:line
module.exports = GalleryByReactApp;
