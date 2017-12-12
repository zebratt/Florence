/**
 * @fileOverView: 验证码倒计时逻辑
 * @author: xuejian.xu
 * @date: 2017/11/18.
 */

class VCode {
  constructor(options){
    this.options = Object.assign({
      timeLen: 60, //倒计时时长 单位：s
      delay: 1000, //倒计时间隔 单位：ms
      onTick: ()=>{},
      onEnd: ()=>{}
    }, options);
  }

  start(){
    let {timeLen, onTick, onEnd, delay} = this.options;

    onTick(timeLen);

    this.intervalId = window.setInterval(()=>{
      timeLen --;

      if(timeLen < 0){
        onEnd();

        window.clearInterval(this.intervalId);
      }else{
        onTick(timeLen);
      }
    }, delay);
  }
}

export default VCode;


