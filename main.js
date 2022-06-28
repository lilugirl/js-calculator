import './style.css'
import {data} from './src/comoponents/data';
import {dom} from './src/comoponents/dom';
import { animation} from './src/comoponents/animation';


data.info.forEach(element=>{
  if(dom.haveByID(element.id)){
    document.styleSheets[0].insertRule(`#${element.id}::before{
      content:"${element.tag}"
    }`)
  }
})

dom.button.forEach(btnDom=>{
  btnDom.addEventListener('mousedown',()=>{
    animation.btnPress(btnDom)
  })

  btnDom.addEventListener('mouseup',()=>{
    animation.btnRelease(btnDom)
  })

  btnDom.addEventListener('mouseout',()=>{
    animation.btnRelease(btnDom)
  })
})

data.info.forEach((info)=>{
   window.addEventListener('keydown',(event)=>{
      info.key.forEach((key)=>{
         if(event.key===key && dom.getByID(info.id)){
           animation.btnPress(dom.getByID(info.id))
         }
      })
   })

   window.addEventListener('keyup',(event)=>{
     info.key.forEach((key)=>{
       if(event.key===key && dom.getByID(info.id)){
         animation.btnRelease(dom.getByID(info.id))
       }
     })

   })
})

animation.switchBtnToDark({toDark:true})

dom.toggle.sun.addEventListener('click',()=>{
  animation.switchTheme({toDark:false,swtichBtnDuration:1,backgroundDuration:1.5,calculatorDuration:0.5,calculatorDelay:0.05})
})

dom.toggle.moon.addEventListener('click',()=>{
  animation.switchTheme({toDark:true,swtichBtnDuration:1,backgroundDuration:1.5,calculatorDuration:0.5,calculatorDelay:0.05})
})
